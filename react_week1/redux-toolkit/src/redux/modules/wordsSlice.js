// apply redux-toolkit (without linking to firestore)

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [{ id: 1, word: 'word', desc: 'description', ex: 'example' }],
};

export const wordsSlice = createSlice({
  name: 'words',
  initialState,
  reducers: {
    load: (state, action) => {
      state = state;
    },
    create: (state, action) => {
      state.list.push(action.payload);
    },
    update: (state, action) => {
      state.list = state.list.map((word) =>
        word.id === action.payload.id ? action.payload : word
      );
    },
    remove: (state, action) => {
      state.list = state.list.filter((word) => word.id !== action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { load, create, update, remove } = wordsSlice.actions;

export default wordsSlice.reducer;
