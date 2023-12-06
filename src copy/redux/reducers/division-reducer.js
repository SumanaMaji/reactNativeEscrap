import {
  SET_DIVISIONS,
  CREATE_DIVISION,
  UPDATE_DIVISION,
  DELETE_DIVISION,
  SET_DIVISION_ACTION_RESULT,
} from '../types/division-type';

const initialState = {
  divisions: [],
  actionResult: false,
  actionMessage: '',
};

const divisionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DIVISIONS:
      return {
        divisions: action.divisions,
      };
    case CREATE_DIVISION:
      const divisionAdd = action.divisionData;

      return {
        ...state,
        divisions: state.divisions.concat(divisionAdd),
      };
    case UPDATE_DIVISION:
      const divisionIndex = state.divisions.findIndex(
        div => div._id === action.divisionData._id,
      );
      const divisionUpdate = action.divisionData;

      const updatedDivisions = [...state.divisions];
      updatedDivisions[divisionIndex] = divisionUpdate;
      return {
        ...state,
        divisions: updatedDivisions,
      };
    case DELETE_DIVISION:
      return {
        ...state,
        divisions: state.divisions.filter(
          division => division._id !== action.id,
        ),
      };
    case SET_DIVISION_ACTION_RESULT:
      return {...state, actionResult: false, actionMessage: action.message};
  }
  return state;
};

export default divisionReducer;
