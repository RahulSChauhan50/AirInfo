import {USER_LOGIN, USER_LOGOUT, USER_REGISTRATION} from './loginActionType';

export const loginAction = (data,password) => {
  return {
    type: USER_LOGIN,
    payload: {
        data:data,
        password:password
    },
  };
};

export const logoutAction = () => {
  return {
    type: USER_LOGOUT,
  };
};

export const registerAction = (email,password,username) => {
  return {
    type: USER_REGISTRATION,
    payload: {
        email:email,
        password:password,
        username:username
    },
  };
};
