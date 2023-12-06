import axios from 'axios';
import {ApiUrl} from '../../constants/apiurls';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StorageKey} from '../../constants/text';
import {
  SET_TRANSACTION_STATUS_REPORT,
  CLEAR_FILTERED_REPORT_TRANSACTION,
  TIME_RANGE_BASED_FILTERED_TRANSACTION,
  TEXT_BASED_FILTERED_TRANSACTION,
  DATE_CODE_BASED_FILTERED_TRANSACTION,
  CLEAR_TEXT_BASED_FILTERED_TRANSACTION,
  CLEAR_DATE_CODE_BASED_FILTERED_TRANSACTION,
  LOAD_REPORT_LOADING,
} from '../types/report-type';

export const fetchStatusReportAction = (searchtext, division) => {
  const url = `${ApiUrl.getTransactionReportStatus}/${searchtext}/${division}`;
  return async dispatch => {
    const userData = await AsyncStorage.getItem(StorageKey.UserData);
    const userDataJson = JSON.parse(userData);

    // any async code you want!
    try {
      const config = {
        headers: {Authorization: `Bearer ${userDataJson.token}`},
      };
      dispatch({ type: LOAD_REPORT_LOADING });
      await axios
        .get(url, config)
        .then(response => {
          dispatch({
            type: SET_TRANSACTION_STATUS_REPORT,
            filteredRecord: response.data,
          });
        })
        .catch(err => {
          throw new Error(`Can not fetch reports from api - ${err.message}`);
        });
    } catch (err) {
      // send to custom analytics server
      throw err;
    }
  };
};

export const clearFilteredReportAction = action => {
  return async dispatch => {
    dispatch({type: CLEAR_FILTERED_REPORT_TRANSACTION});
  };
};

export const fetchTranactionByTimeRangeAction = (from, to) => {
  const url = `${ApiUrl.getRecordsBetweenTimeRange}/${from}/${to}`;
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
          console.info(
            `${response.data?.total} transactions by time range found`,
          );
          dispatch({
            type: TIME_RANGE_BASED_FILTERED_TRANSACTION,
            filteredByTimeRange: response.data.data,
          });
        })
        .catch(err => {
          console.error(JSON.stringify(err));
          throw new Error(
            `Can not fetch transactions by time range from api - ${err.message}`,
          );
        });
    } catch (err) {
      console.error(JSON.stringify(err));
      // send to custom analytics server
      throw err;
    }
  };
};

export const fetchTranactionBySearchTextAction = searchText => {
  const url = `${ApiUrl.getRecordFromSearchBy}/${searchText}`;
  
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
        console.info(
          `${response.data.total} transactions based on text filter found`,
        );
        dispatch({
          type: TEXT_BASED_FILTERED_TRANSACTION,
          filteredByTextSearch: response.data.data,
        });
      })
      .catch(err => {
        console.error(JSON.stringify(err));
      });
  };
};
export const fetchTranactionBySearchDateCode = (from, to, code) => {
  const url = `${ApiUrl.getRecordFromSearchByCode}/${from}/${to}/${code}`;
  
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
        console.info(
          `${response.data.total} transactions based on date-code filter found`,
        );
        dispatch({
          type: DATE_CODE_BASED_FILTERED_TRANSACTION,
          filteredByDateCodeSearch: response.data.data,
        });
      })
      .catch(err => {
        console.error(JSON.stringify(err));
      });
  };
};
export const clearTransactionBySearchTextAction = () => {
  return async dispatch => {
    dispatch({type: CLEAR_TEXT_BASED_FILTERED_TRANSACTION});
  };
};
export const clearTransactionBySearchDateCodeAction = () => {
  return async dispatch => {
    dispatch({type: CLEAR_DATE_CODE_BASED_FILTERED_TRANSACTION});
  };
};
