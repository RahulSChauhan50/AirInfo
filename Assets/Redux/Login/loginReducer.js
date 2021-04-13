import {USER_LOGIN, USER_LOGOUT, USER_REGISTRATION} from './loginActionType';
import axios from 'axios';

const initialState = {
  email: null,
  username: null,
  password: null,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        email: action.payload.data.email,
        username: action.payload.data.user_name,
        password: action.payload.password,
      };
    case USER_LOGOUT:
      return {
        ...state,
        email: null,
        password: null,
        username: null,
      };
    case USER_REGISTRATION: {
      return {
        ...state,
        email: action.payload.email,
        password: action.payload.password,
        username: action.payload.username,
      };
    }
    default:
      return state;
  }
};

export default loginReducer;
