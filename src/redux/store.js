import { configureStore } from '@reduxjs/toolkit';
import wordsSlice from './modules/wordsSliceFB';

const store = configureStore({
  reducer: {
    words: wordsSlice,
  },
});

export default store;
