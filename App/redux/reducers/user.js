import {SET_TOKEN, SET_USER} from '../actions/types';
import AsyncStorage from '@react-native-community/async-storage';

const INITIAL_USER = {
  userDetail: '',
  userToken: '',
  loading: true,
};

const userReducer = (state = INITIAL_USER, action) => {
  switch (action.type) {
    case SET_USER:
      state = Object.assign({}, state, {
        userDetail: action.payload,
        userToken: action.payload.token,
        loading: false,
      });
      try {
        AsyncStorage.setItem('USERDETAIL', JSON.stringify(action.payload));
      } catch (e) {
        // saving error
      }
      return state;
    case SET_TOKEN:
      state = Object.assign({}, state, {
        userToken: action.payload,
        loading: false,
      });
      return state;

    default:
      return state;
  }
};

export default userReducer;
