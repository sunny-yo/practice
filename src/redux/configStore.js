import { configureStore } from '@reduxjs/toolkit';
import userReducer from './modules/user';
import postReducer from './modules/post';
import { createBrowserHistory } from 'history';
import { connectRouter } from 'connected-react-router';

export const history = createBrowserHistory();

export const store = configureStore({
  reducer: { user: userReducer, post: postReducer },
  router: connectRouter(history),
});
