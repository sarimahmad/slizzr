import {SET_USER, ALTER_USER, ALTER_JUST_USER, SET_TOKEN} from './types';

function setUser(userData) {
  return dispatch => {
    dispatch({type: SET_USER, payload: userData});
  };
}
function setToken(token) {
  return dispatch => {
    dispatch({type: SET_TOKEN, payload: token});
  };
}

function alterUser(user) {
  return dispatch => {
    dispatch({type: ALTER_USER, payload: user});
  };
}
function alterJustUser(user) {
  return dispatch => {
    dispatch({type: ALTER_JUST_USER, payload: user});
  };
}

export {setUser, alterUser, alterJustUser, setToken};
