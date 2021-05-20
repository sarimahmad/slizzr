import {SET_FEEDS} from './types';

function setFeeds(feeds) {
  return (dispatch) => {
    dispatch({type: SET_FEEDS, payload: feeds});
  };
}

export {setFeeds};
