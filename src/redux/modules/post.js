import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Firestore from '../../shared/firebase/firestore';
import FBstorage from '../../shared/firebase/storage';

const FSapi = new Firestore();
const Storage = new FBstorage();

const initialState = {
  data: [],
  paging: { load: true, next: null, size: 10 },
  is_loading: false,
};

export const getPostFB = createAsyncThunk(
  'post/getPostFB',
  async (_, { dispatch, getState }) => {
    dispatch(setLoading(true));
    const resp = await FSapi.getPost(getState().post.paging);
    dispatch(setPost(resp.postlist));
    return resp;
  }
);

export const addPostFB = createAsyncThunk(
  'post/addPostFB',
  async (postData, { getState }) => {
    const _image = getState().image.preview;
    const _userid = getState().user.user_info.userid;
    const url = await Storage.uploadFile(_image, _userid);
    const docRef = await FSapi.addPost({ ...postData, imageurl: url });
    return { ...postData, boardId: docRef.id, imageurl: url };
  }
);

export const updatePostFB = createAsyncThunk(
  'post/updatePostFB',
  async (postData, { getState }) => {
    const _image = getState().image.preview;
    const _userid = getState().user.user_info.userid;
    if (_image !== postData.imageurl) {
      const url = await Storage.uploadFile(_image, _userid);
      await FSapi.updatePost({ ...postData, imageurl: url });
      return { ...postData, imageurl: url };
    } else {
      await FSapi.updatePost(postData);
      return postData;
    }
  }
);

export const deletePostFB = createAsyncThunk(
  'post/deletePostFB',
  async boardId => {
    await FSapi.deletePost(boardId);
    return boardId;
  }
);

export const postLikeFB = createAsyncThunk(
  'post/postLikeFB',
  async postData => {
    await FSapi.updatePost(postData);
    return postData;
  }
);

export const postLikeCancelFB = createAsyncThunk(
  'post/postLikeCancelFB',
  async postData => {
    await FSapi.updatePost(postData);
    return postData;
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
      if (postlist.length === state.paging.size + 1) {
        postlist.pop();
      } else {
        state.paging.load = false;
      }
      state.data = [...state.data, ...postlist];
    },
    setNewPaging: (state, action) => {
      state.data = initialState.data;
      state.paging.load = true;
      state.paging.next = null;
    },
  },
  extraReducers: {
    [getPostFB.fulfilled]: (state, action) => {
      state.paging.next = action.payload.lastVisible;
      state.is_loading = false;
    },
    [addPostFB.fulfilled]: (state, action) => {
      state.data = [action.payload].concat(state.data);
    },
    [updatePostFB.fulfilled]: (state, action) => {
      state.data = state.data.map(post => {
        if (post.boardId === action.payload.boardId) {
          return action.payload;
        }
        return post;
      });
    },
    [deletePostFB.fulfilled]: (state, action) => {
      state.data = state.data.filter(post => post.boardId !== action.payload);
    },
    [postLikeFB.fulfilled]: (state, action) => {
      state.data = state.data.map(post => {
        if (post.boardId === action.payload.boardId) {
          return action.payload;
        }
        return post;
      });
    },
    [postLikeCancelFB.fulfilled]: (state, action) => {
      state.data = state.data.map(post => {
        if (post.boardId === action.payload.boardId) {
          return action.payload;
        }
        return post;
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
