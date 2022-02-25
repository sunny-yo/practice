import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import PostApi from '../../service/apis/postApi';
import Firestore from '../../service/firebase/firestore';
import FBstorage from '../../service/firebase/storage';
import { setOnePost } from './postdetail';

const FSapi = new Firestore();
const Storage = new FBstorage();
const Postapi = new PostApi();

const initialState = {
  data: [],
  paging: { load: true, next: null, size: 10 },
  is_loading: false,
};

export const getPostAxios = createAsyncThunk(
  'post/getPostAxios',
  async (_, { dispatch }) => {
    dispatch(setLoading(true));
    const resp = await Postapi.getPosts();
    dispatch(setPost(resp.boardResponseDtos));
    return resp;
  }
);

export const getOnePostAxios = createAsyncThunk(
  'post/getOnePostAxios',
  async (boardId, { dispatch }) => {
    dispatch(setLoading(true));
    const res = await Postapi.getOnePost({ boardId, dispatch });
    return res.data;
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
    console.log(postData.imageUrl);
    console.log(_image);
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
      state.data = postlist;
    },
    setNewPaging: (state, action) => {
      state.data = initialState.data;
      state.paging.load = true;
      state.paging.next = null;
    },
  },
  extraReducers: {
    [getPostAxios.fulfilled]: (state, action) => {
      // state.paging.next = action.payload.lastVisible;
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
