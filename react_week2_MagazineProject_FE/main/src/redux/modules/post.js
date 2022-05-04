import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import PostApi from '../../service/apis/postApi';
import FBstorage from '../../service/firebase/storage';
import { setOnePost } from './postdetail';

const Storage = new FBstorage();
const Postapi = new PostApi();

const initialState = {
  data: [],
  paging: { load: true, size: 6, page: 1, sortBy: 'createdAt' },
  is_loading: false,
};

export const getPostAxios = createAsyncThunk(
  'post/getPostAxios',
  async (_, { dispatch, getState }) => {
    dispatch(setLoading(true));
    const { page, size, sortBy } = getState().post.paging;
    const resp = await Postapi.getPosts({ page, size, sortBy });
    dispatch(setPost(resp.boardResponseDtos));
    return resp;
  }
);

export const getOnePostAxios = createAsyncThunk(
  'post/getOnePostAxios',
  async (boardId, { dispatch }) => {
    dispatch(setLoading(true));
    const res = await Postapi.getOnePost({ boardId, dispatch });
    dispatch(setOnePost(res.boardResponseDto));
    return res.boardResponseDto;
  }
);

export const addPostAxios = createAsyncThunk(
  'post/addPostAxios',
  async ({ postData, navigate }, { getState, dispatch }) => {
    dispatch(setLoading(true));
    const _image = getState().image.preview;
    const _userid = getState().user.user_info.userid;
    const url = await Storage.uploadFile(_image, _userid);
    const res = await Postapi.addPost({
      postData: { ...postData, imageUrl: url },
      navigate,
    });
  }
);

export const updatePostAxios = createAsyncThunk(
  'post/updatePostAxios',
  async ({ boardId, postData, navigate }, { getState, dispatch }) => {
    dispatch(setLoading(true));
    const _image = getState().image.preview;
    const _userid = getState().user.user_info.userid;
    let result;
    if (postData.imageUrl === _image) {
      result = await Postapi.editPost({ boardId, postData, navigate });
    } else {
      const url = await Storage.uploadFile(_image, _userid);
      result = await Postapi.editPost({
        boardId,
        postData: { ...postData, imageUrl: url },
        navigate,
      });
    }
    return { result, postData, boardId };
  }
);

export const deletePostAxios = createAsyncThunk(
  'post/deletePostAxios',
  async ({ username, boardId, navigate }) => {
    await Postapi.deletePost({ username, boardId, navigate });
    return boardId;
  }
);

export const postLikeAxios = createAsyncThunk(
  'post/postLikeAxios',
  async (
    { userid, boardId, newLike, updatedCount, navigate },
    { dispatch }
  ) => {
    return {
      result: await Postapi.postLike({ userid, boardId, navigate, dispatch }),
      newLike,
      updatedCount,
      boardId,
    };
  }
);

export const postLikeCancelAxios = createAsyncThunk(
  'post/postLikeCancelAxios',
  async (
    { userid, boardId, newLike, updatedCount, navigate },
    { dispatch }
  ) => {
    return {
      result: await Postapi.postLikeCancel(
        { userid, boardId, navigate },
        { dispatch }
      ),
      newLike,
      updatedCount,
      boardId,
    };
  }
);

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.is_loading = action.payload;
    },
    setPost: (state, action) => {
      const postlist = action.payload;
      state.data = [...state.data, ...postlist];
    },
    setNewPaging: (state, action) => {
      state.data = initialState.data;
      state.paging.page = 1;
      state.paging.load = true;
      state.paging.next = null;
    },
  },
  extraReducers: {
    [getPostAxios.fulfilled]: (state, action) => {
      state.paging.load = !action.payload.last;
      state.paging.page += 1;
      state.is_loading = false;
    },
    [getOnePostAxios.fulfilled]: (state, action) => {
      state.is_loading = false;
    },
    [addPostAxios.fulfilled]: (state, action) => {
      state.is_loading = false;
    },
    [updatePostAxios.fulfilled]: (state, action) => {
      const { result, postData, boardId } = action.payload;
      if (result) {
        const updated = state.data.map(post => {
          if (post.boardId === boardId) {
            return {
              ...post,
              imageurl: postData.imageUrl,
              content: postData.content,
              grid: postData.grid,
            };
          }
          return post;
        });
        state.data = updated;
      }
      state.is_loading = false;
    },
    [deletePostAxios.fulfilled]: (state, action) => {
      state.data = state.data.filter(post => post.boardId !== action.payload);
    },
    [postLikeAxios.fulfilled]: (state, action) => {
      const { result, newLike, updatedCount, boardId } = action.payload;
      if (result) {
        state.data = state.data.map(card => {
          if (card.boardId === boardId) {
            return { ...card, likes: newLike, likeCount: updatedCount };
          } else return card;
        });
      }
    },
    [postLikeCancelAxios.fulfilled]: (state, action) => {
      const { result, newLike, updatedCount, boardId } = action.payload;
      state.data =
        result &&
        state.data.map(card => {
          if (card.boardId === boardId) {
            return { ...card, likes: newLike, likeCount: updatedCount };
          } else return card;
        });
    },
  },
});

export const {
  setLoading,
  setPost,
  setNewPaging,
  createPost,
  deletePost,
  editPost,
  postLike,
  postLikeCancel,
} = postSlice.actions;

export default postSlice.reducer;
