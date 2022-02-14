//configStore.js
import { createStore, combineReducers } from 'redux';
import words from './modules/words';

// root reducer
const rootReducer = combineReducers({ words });

// store
const store = createStore(rootReducer);

export default store;
