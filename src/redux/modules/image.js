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
    uploading: (state, action) => {
      state.image_url = action.payload.image_url;
      state.uploading = false;
    },
    uploadImage: (state, action) => {
      state.uploading = action.payload.uploading;
    },
    setPreview: (state, action) => {
      state.preview = action.payload;
    },
  },
});

export const { uploading, uploadImage, setPreview } = imageSlice.actions;

export default imageSlice.reducer;
