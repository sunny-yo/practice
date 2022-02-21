import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Firestore from '../../shared/firebase/firestore';

const FSapi = new Firestore();

export const getPostFB = createAsyncThunk(
  'post/getPostFB',
  async () => await FSapi.getPost()
);

export const addPostFB = createAsyncThunk(
  'post/addPostFB',
  async (postData, getState) => {
    const docRef = await FSapi.addPost(postData);
    return { ...postData, boardId: docRef.id };
  }
);

export const updatePostFB = createAsyncThunk(
  'post/updatePostFB',
  async wordObj => {
    await FSapi.updatePost(wordObj);
    return wordObj;
  }
);

export const deletePostFB = createAsyncThunk(
  'post/deletePostFB',
  async boardId => {
    await FSapi.deletePost(boardId);
    return boardId;
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
      state.list = state.list.map(word => {
        if (word.id === action.payload.id) {
          return action.payload;
        }
        return word;
      });
    },
    [deletePostFB.fulfilled]: (state, action) => {
      state.data = state.data.filter(post => post.boardId !== action.payload);
    },
  },
});

export const { createPost, deletePost, editPost, postLike, postLikeCancel } =
  postSlice.actions;

export default postSlice.reducer;
