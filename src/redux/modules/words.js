// words.js

// Actions
const LOAD = 'words/LOAD';
const CREATE = 'words/CREATE';
const UPDATE = 'words/UPDATE';
const REMOVE = 'words/REMOVE';

// InitialState
const initialState = {
  postlist: [{ id: 1, word: 'word', desc: 'description', ex: 'example' }],
};

// Action Creators
export function loadWords(wordObj) {
  return { type: LOAD, data: wordObj };
}

export function createWord(wordObj) {
  return { type: CREATE, data: wordObj };
}

export function updateWord(wordObj) {
  return { type: UPDATE, data: wordObj };
}

export function removeWord(wordId) {
  return { type: REMOVE, data: wordId };
}

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return state;
    case CREATE: {
      const new_word_list = [...state.postlist, action.data];
      return { postlist: new_word_list };
    }
    case UPDATE: {
      const new_word_list = state.postlist.map((word) => {
        if (word.id === action.data.id) {
          return action.data;
        }
        return word;
      });
      return { postlist: new_word_list };
    }
    case REMOVE: {
      const new_word_list = state.postlist.filter((word) => {
        return word.id !== action.data;
      });
      return { postlist: new_word_list };
    }
    default:
      return state;
  }
}
