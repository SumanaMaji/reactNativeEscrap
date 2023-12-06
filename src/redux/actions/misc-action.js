import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ApiUrl} from '../../constants/apiurls';
import {StorageKey} from '../../constants/text';
import {
    SET_CURRENT_LOGS
} from '../types/misc-type';


export const fetchLogsAction = () => {
    const url = ApiUrl.getAllLogs;
  
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
          console.info(`${response.data.total} logs found`);
          dispatch({type: SET_CURRENT_LOGS, logs: response.data.data});
        })
        .catch(err => {
          throw new Error(`Can not fetch types from api - ${err.message}`);
        });
    };
  };
  