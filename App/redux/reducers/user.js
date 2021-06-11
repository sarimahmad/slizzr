import {
  SET_USER,
  ALTER_USER,
  ALTER_JUST_USER,
  SET_TOKEN,
} from '../actions/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TOKEN, USERDETAIL } from '../../helper/Constant';

const INITIAL_USER = {
  userDetail: '',
  userToken: '',
  loading: true,
};

const userReducer = (state = INITIAL_USER, action) => {
  switch (action.type) {
    case SET_USER:
      state = Object.assign({}, state, {
        userDetail: action.payload.user,
        userToken:action.payload.uid,
        loading: false,
      });
      AsyncStorage.setItem(USERDETAIL, JSON.stringify(action.payload));
      AsyncStorage.setItem(TOKEN, JSON.stringify(action.payload.uid));
     
      return state;

    case ALTER_USER:
      console.log(action.payload.user,action.payload.uid)
      state = new Object.assign({}, state, {
        userDetail: action.payload.user,
        userToken: action.payload.uid,
        loading: false,
      });
      return state;

    case ALTER_JUST_USER:
      state = Object.assign({}, state, {userDetail: action.payload});
      // AsyncStorage.setItem(USERDETAIL, JSON.stringify(action.payload));
      return state;

    case SET_TOKEN:
      state = Object.assign({}, state, {userToken: action.payload});
      // AsyncStorage.setItem(TOKEN, JSON.stringify(action.payload));
      return state;

    default:
      return state;
  }
};

export default userReducer;
