import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ApiUrl} from '../../constants/apiurls';
import {StorageKey} from '../../constants/text';
import {
  CREATE_TYPE,
  UPDATE_TYPE,
  DELETE_TYPE,
  SET_TYPES,
  SET_ACTION_TYPE_MESSAGE,
  CLEAR_TYPE_ACTION_MESSAGE,
} from '../types/type-type';

export const fetchTypeAction = () => {
  const url = ApiUrl.getAllTypes;

  return async dispatch => {
    // any async code you want!
    const userData = await AsyncStorage.getItem(StorageKey.UserData);
    const userDataJson = JSON.parse(userData);

    const config = {
      headers: {Authorization: `Bearer ${userDataJson.token}`},
    };

    await axios
      .get(url, config)
      .then(response => {
        console.info(`${response.data.total} type found`);
        dispatch({type: SET_TYPES, types: response.data.data});
      })
      .catch(err => {
        throw new Error(`Can not fetch types from api - ${err.message}`);
      });
  };
};

export const deleteTypeAction = typeId => {
  const url = `${ApiUrl.deleteType}/${typeId}`;
  return async dispatch => {
    const userData = await AsyncStorage.getItem(StorageKey.UserData);
    const userDataJson = JSON.parse(userData);
    const config = {
      headers: {Authorization: `Bearer ${userDataJson.token}`},
    };
    axios
      .delete(url, config)
      .then(response => {
        console.log(response);
        dispatch({type: DELETE_TYPE, id: typeId});
      })
      .catch(error => {
        dispatch({
          type: SET_ACTION_TYPE_MESSAGE,
          message: `Failed to delet type. ${JSON.stringify(error)}`,
        });
      });
  };
};

export const createTypeAction = (divisionId, typeName) => {
  const url = `${ApiUrl.createType}`;
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
          typeName: typeName,
          division: divisionId,
        },
        config,
      )
      .then(response => {
        console.log(`Successfully added type: ${JSON.stringify(response)}`);
        const data = response.data.data;
        dispatch({
          type: CREATE_TYPE,
          data: data,
        });
      })
      .catch(function (err) {
        const error = `Failed to create type:${err}`;
        dispatch({type: SET_ACTION_TYPE_MESSAGE, message: error});
      });
  };
};

export const updateTypeAction = (id, name, divisionId) => {
  const url = `${ApiUrl.updateType}/${id}`;
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
          typeName: name,
          divisionId: divisionId,
        },
        config,
      )
      .then(response => {
        console.log(`Successfully updated type: ${JSON.stringify(response)}`);

        dispatch({
          type: UPDATE_TYPE,
          id: id,
          typeName: name,
          division: divisionId,
        });
      })
      .catch(function (err) {
        const error = `Failed to create Type:${err}`;
        dispatch({type: SET_ACTION_TYPE_MESSAGE, message: error});
      });
  };
};

export const clearTypeMessageAction = () => {
  return async dispatch => {
    dispatch({type: CLEAR_TYPE_ACTION_MESSAGE});
  };
};
