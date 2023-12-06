import _ from 'underscore';
import {
  SET_TRANSACTION_STATUS_REPORT,
  CLEAR_FILTERED_REPORT_TRANSACTION,
  TIME_RANGE_BASED_FILTERED_TRANSACTION,
  TEXT_BASED_FILTERED_TRANSACTION,
  CLEAR_TEXT_BASED_FILTERED_TRANSACTION,
  DATE_CODE_BASED_FILTERED_TRANSACTION,
  CLEAR_DATE_CODE_BASED_FILTERED_TRANSACTION,
  LOAD_REPORT_LOADING,
} from '../types/report-type';
const initialState = {
  filteredRecord: null,
  filteredByTimeRange: [],
  filteredByTextSearch: [],
  filteredByDateCodeSearch: [],
  fetchInProgress: false,
};

const reportReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TRANSACTION_STATUS_REPORT:
      // DO NOT DELETE
      // let notAdded = [];
      // // loop through all the result
      // action.statusReports.forEach(report => {
      //   // its it not added to store than add it
      //   if (_.findWhere(allStatusReport, report) == null) {
      //     notAdded.push(report);
      //   }
      // });
      // // update store and return
      // return {
      //   ...state,
      //   allStatusReport: [...state.allStatusReport, notAdded],
      // };

      return {
        ...state,
        filteredRecord: action.filteredRecord,
        fetchInProgress: false,
      };
    case CLEAR_FILTERED_REPORT_TRANSACTION:
      return {
        ...state,
        filteredRecord: [],
      };
    case TIME_RANGE_BASED_FILTERED_TRANSACTION:
      return {
        ...state,
        filteredByTimeRange: action.filteredByTimeRange,
      };
    case TEXT_BASED_FILTERED_TRANSACTION:
      return {
        ...state,
        filteredByTextSearch: action.filteredByTextSearch,
    };
    case CLEAR_TEXT_BASED_FILTERED_TRANSACTION:
      return {
        ...state,
        filteredByTextSearch: []
      };
    case DATE_CODE_BASED_FILTERED_TRANSACTION:
      return {
        ...state,
        filteredByDateCodeSearch: action.filteredByDateCodeSearch,
      };
      case CLEAR_DATE_CODE_BASED_FILTERED_TRANSACTION:
        return {
          ...state,
          filteredByDateCodeSearch: []
        };
      case LOAD_REPORT_LOADING:
        return {
          ...state,
          fetchInProgress: true
        };
    default:
      return state;
  }
};

export default reportReducer;
