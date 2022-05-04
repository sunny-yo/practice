import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  image_url: '',
  uploading: false,
  preview: null,
};

export const imageSlice = createSlice({
  name: 'image',
  initialState,
  reducers: {
    setPreview: (state, action) => {
      state.preview = action.payload;
    },
  },
});

export const { setPreview } = imageSlice.actions;

export default imageSlice.reducer;
