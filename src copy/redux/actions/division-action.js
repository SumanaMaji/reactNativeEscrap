import axios from 'axios';
import {ApiUrl} from '../../constants/apiurls';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StorageKey} from '../../constants/text';
import {
  CREATE_DIVISION,
  UPDATE_DIVISION,
  DELETE_DIVISION,
  SET_DIVISIONS,
  SET_DIVISION_ACTION_RESULT,
} from '../types/division-type';

export const fetchDivisionAction = () => {
  const url = ApiUrl.getAllDivisions;
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
        console.info(`${response.data.total} divisions found`);
        dispatch({type: SET_DIVISIONS, divisions: response.data.data});
        dispatch({
          type: SET_DIVISION_ACTION_RESULT,
          actionMessage: 'Successfully fetched divisions.',
        });
      })
      .catch(err => {
        console.error(JSON.stringify(err));
        dispatch({
          type: SET_DIVISION_ACTION_RESULT,
          actionMessage: `Failed to fetch divisions. ${JSON.stringify(
            err.message,
          )}`,
        });
      });
  };
};

export const deleteDivisionAction = divisionId => {
  const url = `${ApiUrl.deleteDivision}/${divisionId}`;
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
        dispatch({type: DELETE_DIVISION, id: divisionId});
        dispatch({
          type: SET_DIVISION_ACTION_RESULT,
          actionMessage: 'Successfully deleted divisions.',
        });
      })
      .catch(error => {
        console.error(JSON.stringify(err));
        throw new Error('Something went wrong!' + JSON.stringify(error));
      });
  };
};

export const createDivisionAction = (shortName, name, city, unit) => {
  const url = `${ApiUrl.createDivision}`;
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
          division: shortName,
          divisionName: name,
          city: city,
          unit: unit,
        },
        config,
      )
      .then(response => {
        console.log(`Successfully added division: ${JSON.stringify(response)}`);
        const data = response.data.data;
        dispatch({
          type: CREATE_DIVISION,
          divisionData: data,
        });
      })
      .catch(function (err) {
        console.error(`Failed to create Division:${err}`);
        throw new Error('Failed to create new division');
      });
  };
};

export const updateDivisionAction = (id, shortName, name, city, unit) => {
  const url = `${ApiUrl.updateDivision}/${id}`;
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
          division: shortName,
          divisionName: name,
          city: city,
          unit: unit,
        },
        config,
      )
      .then(response => {
        console.log(
          `Successfully updated division: ${JSON.stringify(response)}`,
        );
        const data = response.data.data;

        dispatch({
          type: UPDATE_DIVISION,
          id: data._id,
          divisionData: data,
        });
      })
      .catch(function (err) {
        console.error(JSON.stringify(err));
        throw new Error('Failed to update new division');
      });
  };
};
