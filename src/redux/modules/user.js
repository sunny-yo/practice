import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import FirebaseAuth from '../../shared/firebase/firebaseAuth';

const FBapi = new FirebaseAuth();

const initialState = {
  user_info: {
    username: null,
    userid: null,
  },
  is_login: false,
};

export const getUserFB = createAsyncThunk('user/getUserFB', async () => {
  const userData = await FBapi.getUser();
  return userData;
});

export const sighupFB = createAsyncThunk(
  'user/sighupFB',
  async (registerData) => {
    const userData = await FBapi.signUp(registerData);
    return userData;
  }
);

export const loginFB = createAsyncThunk('user/loginFB', async (loginData) => {
  const userData = await FBapi.signIn(loginData);
  return userData;
});

export const logoutFB = createAsyncThunk(
  'user/logoutFB',
  async () => await FBapi.signOut()
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: {
    [getUserFB.fulfilled]: (state, action) => {
      state.user_info = { ...action.payload.user_info };
      state.is_login = action.payload.is_login;
    },
    [sighupFB.fulfilled]: (state, action) => {
      state.user_info = action.payload.user_info;
      state.is_login = action.payload.is_login;
    },
    [loginFB.fulfilled]: (state, action) => {
      state.user_info = action.payload.user_info;
      state.is_login = action.payload.is_login;
    },
    [logoutFB.fulfilled]: (state, action) => {
      state.user_info = initialState.user_info;
      state.is_login = initialState.is_login;
    },
  },
});

export default userSlice.reducer;
