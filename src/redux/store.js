// redux-toolkit store

import { configureStore } from '@reduxjs/toolkit';
import wordsSlice from './modules/wordsSliceFB'; // redux-toolkit (with firestore)
// import wordsSlice from './modules/wordsSlice'; // redux-toolkit (without firestore)

const store = configureStore({
  reducer: {
    words: wordsSlice,
  },
});

export default store;
