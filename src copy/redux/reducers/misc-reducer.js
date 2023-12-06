import {SET_CURRENT_LOGS} from '../types/misc-type';
const initialState = {
  systemLogs: [],
};

const miscReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_LOGS:
      return {
        ...state,
        systemLogs: action.types,
      };
  }
  return state;
};

export default miscReducer;
