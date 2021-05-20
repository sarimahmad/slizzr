import {combineReducers} from 'redux';
import userReducer from './user';
import appState from './appState';
import feedsReducer from './feeds';
import AsyncStorage from '@react-native-community/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['bookmarks'],
};
const reducer = combineReducers({
  user: userReducer,
  appState: appState,
  feeds: feedsReducer,
});
export default reducer;
