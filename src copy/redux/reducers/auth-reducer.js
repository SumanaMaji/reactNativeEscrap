import {
  AUTHENTICATE,
  LOGOUT,
  AUTH_ERROR,
  CLEAR_AUTH_ERROR,
} from '../types/auth-type';

const initialState = {
  token: '',
  role: '',
  message: '',
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        token: action.token,
        role: action.role,
        message:''
      };
    case LOGOUT:
      return initialState;
    case AUTH_ERROR:
      return {
        token: '',
        role: '',
        message: action.message,
      };
    case CLEAR_AUTH_ERROR:
      return {...initialState};
    default:
      return state;
  }
};
export default authReducer;
