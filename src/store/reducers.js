/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import agentReducer from './agentReducer.js';

const initialState = {
    currentPage: "abc",
    showConfetti: false
}
const globalReducer = (state = initialState, action) => {
    switch (action.type) {
      case "show.confetti": {
        return {...state, showConfetti: action.message}
      }
      case "hide.confetti": {
        return {...state, showConfetti: false}
      }
        default:
            return state
    }
}

export default function createReducer() {
  const rootReducer = combineReducers({
    global: globalReducer,
    agentReducer: agentReducer
  });

  return rootReducer;
}