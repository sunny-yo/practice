import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import UserApi from '../../service/apis/userApi';
import FirebaseAuth from '../../service/firebase/firebaseAuth';

const FBapi = new FirebaseAuth();
const Userapi = new UserApi();

const initialState = {
  user_info: {
    username: null,
    userid: null,
  },
  is_login: false,
};

export const sighupAxios = createAsyncThunk(
  'user/sighupAxios',
  async ({ registerData, navigate }) => {
    const sighupResult = await Userapi.signUp({ registerData, navigate });
    return sighupResult;
  }
);

export const signinAxios = createAsyncThunk(
  'user/sighinAxios',
  async ({ loginData, navigate }, { dispatch }) => {
    const userData = await Userapi.signIn({ loginData, navigate });
    if (userData) {
      dispatch(setUserToSession(userData.userData));
      return userData;
    }
  }
);

export const logoutAxios = createAsyncThunk(
  'user/logoutAxios',
  async ({ navigate }, { dispatch }) => {
    const result = await Userapi.signOut({ navigate });
    result && dispatch(deleteUserFromSession());
    return result;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserToSession: (state, action) => {
      sessionStorage.setItem('token', action.payload.token);
      sessionStorage.setItem('username', action.payload.username);
      sessionStorage.setItem('userId', action.payload.userId);
    },
    getUser: (state, action) => {
      state.user_info.username = sessionStorage.getItem('username');
      state.user_info.userid = sessionStorage.getItem('userId');
      state.is_login = true;
    },
    deleteUserFromSession: (state, action) => {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('username');
      sessionStorage.removeItem('userId');
    },
  },
  extraReducers: {
    [sighupAxios.fulfilled]: (state, action) => {
      // state.user_info = action.payload.user_info;
      // state.is_login = action.payload.is_login;
      console.log(action.payload);
    },
    [signinAxios.fulfilled]: (state, action) => {
      state.user_info = {
        username: action.payload.userData.username,
        userid: action.payload.userData.userId,
      };
      state.is_login = true;
    },
    [logoutAxios.fulfilled]: (state, action) => {
      if (action.payload) {
        state.user_info = initialState;
        state.is_login = false;
      }
    },
  },
});

export const { setUserToSession, getUser, deleteUserFromSession } =
  userSlice.actions;

export default userSlice.reducer;
