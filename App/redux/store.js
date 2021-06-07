import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import UserReducer from './userReducers';
const rootReducer = combineReducers({
  userReducer: UserReducer,
});

const configureStore = () => createStore(rootReducer, applyMiddleware(thunk));
export default configureStore;
