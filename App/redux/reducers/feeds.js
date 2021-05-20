import {SET_FEEDS} from '../actions/types';

const INITIAL_MESSAGE = {
  feeds: [],
};

const feedsReducer = (state = INITIAL_MESSAGE, action) => {
  switch (action.type) {
    case SET_FEEDS:
      state = null;
      state = new Object.assign({}, state, {feeds: action.payload});
      return state;

    default:
      return state;
  }
};

export default feedsReducer;
