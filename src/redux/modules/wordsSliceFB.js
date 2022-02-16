import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Firestore from '../../service/firestore';

const FSapi = new Firestore();

export const loadWordsFB = createAsyncThunk(
  'words/loadWordsFB',
  async () => await FSapi.loadWords()
);

export const createWordFB = createAsyncThunk(
  'words/createWordsFB',
  async (wordObj) => {
    const docRef = await FSapi.createWord(wordObj);
    return { id: docRef.id, ...wordObj };
  }
);

export const updateWordFB = createAsyncThunk(
  'words/updateWordFB',
  async (wordObj) => {
    await FSapi.updateWord(wordObj);
    return wordObj;
  }
);

export const removeWordFB = createAsyncThunk(
  'words/removeWordFB',
  async (wordId) => {
    await FSapi.removeWord(wordId);
    return wordId;
  }
);

export const wordsSlice = createSlice({
  name: 'words',
  initialState: { list: [] },
  extraReducers: {
    [loadWordsFB.fulfilled]: (state, action) => {
      state.list = action.payload;
    },
    [createWordFB.fulfilled]: (state, action) => {
      state.list.push(action.payload);
    },
    [updateWordFB.fulfilled]: (state, action) => {
      state.list = state.list.map((word) => {
        if (word.id === action.payload.id) {
          return action.payload;
        }
        return word;
      });
    },
    [removeWordFB.fulfilled]: (state, action) => {
      state.list = state.list.filter((word) => word.id !== action.payload);
    },
  },
});

export default wordsSlice.reducer;
