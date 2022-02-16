import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  {
    id: 1,
    word: 'word',
    desc: 'description',
    ex: 'example',
  },
  {
    id: 2,
    word: 'abc',
    desc: 'description',
    ex: 'example',
  },
  {
    id: 3,
    word: 'def',
    desc: 'description',
    ex: 'example',
  },
];

export const wordsSlice = createSlice({
  name: 'words',
  initialState,
  reducers: {
    // load: (state, action) => {
    //   state.postlist = action.payload;
    // },
    load: (state) => state,
    create: (state, action) => {
      state.push(action.payload);
    },
    update: (state, action) => {
      return state.map((word) =>
        word.id === action.payload.id ? action.payload : word
      );
    },
    remove: (state, action) => {
      return state.filter((word) => word.id !== action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { load, create, update, remove } = wordsSlice.actions;

export default wordsSlice.reducer;
