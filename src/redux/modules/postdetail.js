import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  post: {
    boardId: '',
    creater: '',
    content: '',
    imageurl: '',
    grid: '',
    likeCount: '',
    createdAt: '',
    likes: [],
  },
};

export const postdetailSlice = createSlice({
  name: 'postdetail',
  initialState,
  reducers: {
    setOnePost: (state, action) => {
      state.post = action.payload;
    },
    setOnePostLike: (state, action) => {
      state.post.likes = action.payload.newLike;
      state.post.likeCount = action.payload.updatedCount;
    },
  },
});

export const { setOnePost, setOnePostLike } = postdetailSlice.actions;

export default postdetailSlice.reducer;
