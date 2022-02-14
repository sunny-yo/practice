// words.js

// Actions
const LOAD = 'words/LOAD';
const CREATE = 'words/CREATE';
const UPDATE = 'words/UPDATE';
const REMOVE = 'words/REMOVE';

// InitialState
const initialState = {
  postlist: [
    { word: 'word', desc: 'description', ex: 'example' },
    { word: 'word', desc: 'description', ex: 'example' },
    { word: 'word', desc: 'description', ex: 'example' },
    { word: 'word', desc: 'description', ex: 'example' },
    { word: 'word', desc: 'description', ex: 'example' },
  ],
};

// Action Creators
export function loadWords() {
  return { type: LOAD };
}

export function createWord(wordObj) {
  return { type: CREATE, data: wordObj };
}

export function updateWord(wordObj) {
  return { type: UPDATE, data: wordObj };
}

export function removeWord(wordObj) {
  return { type: REMOVE, data: wordObj };
}

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return state;
    case CREATE:
      return state;
    default:
      return state;
  }
}
