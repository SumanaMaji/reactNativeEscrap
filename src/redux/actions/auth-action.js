import {
  AUTHENTICATE,
  LOGOUT,
  AUTH_ERROR,
  CLEAR_AUTH_ERROR,
} from '../types/auth-type';
import localStorage from '@react-native-async-storage/async-storage';
import {ApiUrl} from '../../constants/apiurls';
import {StorageKey} from '../../constants/text';
let timer;

export const authenticate = (token, role, expiryTime) => {
  return dispatch => {
    //dispatch(setLogoutTimer(expiryTime));
    dispatch({type: AUTHENTICATE, role: role, token: token});
  };
};

export const loginAction = (username, password) => {
  const url = ApiUrl.loginURL;

  return async dispatch => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName: username,
          password: password,
        }),
      });

      // return error and dispatch
      if (!response.ok) {
        dispatch({type: AUTH_ERROR, message: response.data.message});
        return Promise.resolve(false);
      }

      const resData = await response.json();

      if (resData.success) {
        dispatch({
          type: AUTHENTICATE,
          token: resData.token,
          role: resData.role,
        });
      } else {
        return dispatch({
          type: AUTH_ERROR,
          message: resData.message,
        });
      }

      const expirationDate = new Date(
        new Date().getTime() + resData.loginExpire,
      ).toISOString();

      authenticate(resData.token, resData.role, expirationDate);
      saveDataToStorage(resData.token, resData.role, expirationDate);

      return Promise.resolve(true);
    } catch (err) {

      dispatch({type: AUTH_ERROR, message: `${err}`});
      return Promise.reject();
    }
  };
};

export const logoutAction = () => {
  clearLogoutTimer();
  localStorage.removeItem(StorageKey.UserData);
  return {type: LOGOUT};
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const setLogoutTimer = expirationTime => {
  return dispatch => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};

const saveDataToStorage = (token, role, expirationDate) => {
  localStorage.setItem(
    StorageKey.UserData,
    JSON.stringify({
      token: token,
      role: role,
      expiryDate: expirationDate,
    }),
  );
  // remove finally
  localStorage.setItem(StorageKey.user_token, token);
};

export const clearAuthError = () => {
  return async dispatch => {
    dispatch({type: CLEAR_AUTH_ERROR});
  };
};
