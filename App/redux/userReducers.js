import {FETCH_DATA_ACCOUNT} from '../redux/actionTypes';

const initialState = {};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA_ACCOUNT:

    default:
      return state;
  }
};

export default UserReducer;
