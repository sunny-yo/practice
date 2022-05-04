//configStore.js
import { createBrowserHistory } from 'history';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import words from './modules/words';

export const history = createBrowserHistory();

const middlewares = [thunk];

const enhancer = applyMiddleware(...middlewares);

// root reducer
const rootReducer = combineReducers({ words });
// store
const store = createStore(rootReducer, enhancer);

export default store;
