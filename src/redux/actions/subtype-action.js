import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ApiUrl} from '../../constants/apiurls';
import {StorageKey} from '../../constants/text';
import {
  CREATE_SUBTYPE,
  UPDATE_SUBTYPE,
  DELETE_SUBTYPE,
  SET_SUBTYPES,
  CLEAR_SUBTYPE_ACTION_MESSAGE,
  SET_ACTION_SUBTYPE_MESSAGE
} from '../types/subtype-type';

export const fetchSubTypeAction = () => {
  const url = ApiUrl.getAllSubTypes;
  return async dispatch => {
    // any async code you want!
    const userData = await AsyncStorage.getItem(StorageKey.UserData);
    const userDataJson = JSON.parse(userData);

    try {
      const config = {
        headers: {Authorization: `Bearer ${userDataJson.token}`},
      };

      await axios
        .get(url, config)
        .then(response => {
          dispatch({type: SET_SUBTYPES, subtypes: response.data.data});
        })
        .catch(err => {
          dispatch({
            type: SET_ACTION_SUBTYPE_MESSAGE,
            message:`Can not fetch sub types from api - ${err.message}`,
          });
        });
    } catch (err) {
      // send to custom analytics server
      throw err;
    }
  };
};

export const deleteSubTypeAction = subTypeId => {
  const url = `${ApiUrl.deleteSubType}/${subTypeId}`;
  return async dispatch => {
    const userData = await AsyncStorage.getItem(StorageKey.UserData);
    const userDataJson = JSON.parse(userData);
    const config = {
      headers: {Authorization: `Bearer ${userDataJson.token}`},
    };
    axios
      .delete(url, config)
      .then(response => {
        dispatch({type: DELETE_SUBTYPE, id: subTypeId});
      })
      .catch(error => {
        dispatch({
          type: SET_ACTION_SUBTYPE_MESSAGE,
          message: `Failed to delet type. ${JSON.stringify(error)}`,
        });
      });
  };
};

export const createSubTypeAction = (name, typeId, divisionId) => {
  const url = `${ApiUrl.createSubType}`;
  return async dispatch => {
    // any async code you want!
    const userData = await AsyncStorage.getItem(StorageKey.UserData);
    const userDataJson = JSON.parse(userData);
    const config = {
      headers: {Authorization: `Bearer ${userDataJson.token}`},
    };

    await axios
      .post(
        url,
        {
          subTypeName: name,
          division: divisionId,
          type: typeId,
        },
        config,
      )
      .then(response => {
        const data = response.data.data;
        dispatch({
          type: CREATE_SUBTYPE,
          data: data,
        });
      })
      .catch(function (err) {
        const error = `Failed to create subtype:${err}`;
        dispatch({type: SET_ACTION_SUBTYPE_MESSAGE, message: error});
      });
  };
};

export const updateSubTypeAction = (id, name, typeId, divisionId) => {
  const url = `${ApiUrl.updateSubType}/${id}`;
  return async dispatch => {
    // any async code you want!
    const userData = await AsyncStorage.getItem(StorageKey.UserData);
    const userDataJson = JSON.parse(userData);
    const config = {
      headers: {Authorization: `Bearer ${userDataJson.token}`},
    };

    axios
      .put(
        url,
        {
          subTypeName: name,
          division: divisionId,
          type: typeId,
        },
        config,
      )
      .then(response => {
        console.log(
          `Successfully updated subtype: ${JSON.stringify(response)}`,
        );
        const data = response.data.data;
        dispatch({
          type: UPDATE_SUBTYPE,
          id:id,
          subTypeData: data,
        });
      })
      .catch(function (err) {
        const error = `Failed to create Subtype:${err}`;
        dispatch({type: SET_ACTION_SUBTYPE_MESSAGE, message: error});
      });
  };
};

export const clearSubTypeMessageAction = () => {
  return async dispatch => {
    dispatch({type: CLEAR_SUBTYPE_ACTION_MESSAGE});
  };
};
