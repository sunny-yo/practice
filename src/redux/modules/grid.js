import { createSlice } from '@reduxjs/toolkit';

const initialState = { grid: 'column' };

export const gridSlice = createSlice({
  name: 'grid',
  initialState,
  reducers: {
    setGrid: (state, action) => {
      console.log(state);
      console.log(action);
      state.grid = action.payload;
    },
  },
});

export const { setGrid } = gridSlice.actions;

export default gridSlice.reducer;
