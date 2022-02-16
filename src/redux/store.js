import { configureStore } from '@reduxjs/toolkit';
import wordsSlice from './modules/wordsSlice';

const store = configureStore({
  reducer: {
    words: wordsSlice,
  },
});

export default store;
