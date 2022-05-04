import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  post: {
    boardId: '0',
    creater: 'sunny',
    content: '첫번째 게시글 입니다',
    imageurl:
      'https://cdn.pixabay.com/photo/2020/03/25/16/01/children-4967808_960_720.jpg',
    grid: 'column',
    likeCount: '2',
    createdAt: '2022-02-19 18:00:00',
    likes: [{ userid: '0' }, { userid: '1' }],
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
