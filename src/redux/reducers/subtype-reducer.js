import {
  CREATE_SUBTYPE,
  UPDATE_SUBTYPE,
  DELETE_SUBTYPE,
  SET_SUBTYPES,
  CLEAR_SUBTYPE_ACTION_MESSAGE,
  SET_ACTION_SUBTYPE_MESSAGE,
} from '../types/subtype-type';
const initialState = {
  subtypes: [],
  subtypeActionMessage: '',
};

const subtypeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SUBTYPES:
      return {
        subtypeActionMessage: '',
        subtypes: action.subtypes,
      };
    case CREATE_SUBTYPE:
      return {
        ...state,
        subtypeActionMessage: 'Successfully added subtype',
        subtypes: state.subtypes.concat(action.data),
      };
    case UPDATE_SUBTYPE:
      const subtypeIndex = state.subtypes.findIndex(
        type => type._id === action.id,
      );
      const subtypeUpdate = action.subTypeData;
      const updatedSubTypes = [...state.subtypes];
      updatedSubTypes[subtypeIndex] = subtypeUpdate;
      return {
        ...state,
        subtypeActionMessage: 'Updated subtype',
        subtypes: updatedSubTypes,
      };

    case DELETE_SUBTYPE:
      return {
        ...state,
        subtypeActionMessage: 'Sucessfully deleted subtype.',
        subtypes: state.subtypes.filter(subtype => subtype._id !== action.id),
      };
    case CLEAR_SUBTYPE_ACTION_MESSAGE:
      return {
        ...state,
        subtypeActionMessage: '',
      };
    case SET_ACTION_SUBTYPE_MESSAGE:
      return {
        ...state,
        subtypeActionMessage: action.message,
      };
  }
  return state;
};

export default subtypeReducer;
