import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Firestore from '../../shared/firebase/firestore';
import FBstorage from '../../shared/firebase/storage';

const FSapi = new Firestore();
const Storage = new FBstorage();

export const getPostFB = createAsyncThunk(
  'post/getPostFB',
  async () => await FSapi.getPost()
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
  initialState: { data: [] },
  // reducers: {
  //   createPost: (state, action) => {
  //     console.log(action.payload);
  //     state = state;
  //   },
  //   deletePost: (state, action) => {
  //     state = state;
  //   },
  //   editPost: (state, action) => {
  //     state = state;
  //   },
  //   postLike: (state, action) => {
  //     state.data.map((post) =>
  //       post.boardId === action.payload.boardId
  //         ? (post.likes.push({ userId: action.payload.userId }),
  //           post.likeCount++)
  //         : post
  //     );
  //   },
  //   postLikeCancel: (state, action) => {
  //     state.data.map((post) =>
  //       post.boardId === action.payload.boardId
  //         ? ((post.likes = post.likes.filter((user) => {
  //             return user.userId !== action.payload.userId;
  //           })),
  //           post.likeCount--)
  //         : post
  //     );
  //   },
  // },
  extraReducers: {
    [getPostFB.fulfilled]: (state, action) => {
      state.data = action.payload;
    },
    [addPostFB.fulfilled]: (state, action) => {
      state.data = [...state.data, action.payload];
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

export const { createPost, deletePost, editPost, postLike, postLikeCancel } =
  postSlice.actions;

export default postSlice.reducer;
