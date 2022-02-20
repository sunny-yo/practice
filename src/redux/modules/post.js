import { createSlice } from '@reduxjs/toolkit';
import { RESP, resp } from '../../shared/response';

const initialState = {
  data: RESP.data,
};

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    createPost: (state, action) => {
      state = state;
    },
    deletePost: (state, action) => {
      state = state;
    },
    editPost: (state, action) => {
      state = state;
    },
    postLike: (state, action) => {
      state.data.map((post) =>
        post.boardId === action.payload.boardId
          ? (post.likes.push({ userId: action.payload.userId }),
            post.likeCount++)
          : post
      );
    },
    postLikeCancel: (state, action) => {
      state.data.map((post) =>
        post.boardId === action.payload.boardId
          ? ((post.likes = post.likes.filter((user) => {
              return user.userId !== action.payload.userId;
            })),
            post.likeCount--)
          : post
      );
    },
  },
});

export const { createPost, deletePost, editPost, postLike, postLikeCancel } =
  postSlice.actions;

export default postSlice.reducer;
