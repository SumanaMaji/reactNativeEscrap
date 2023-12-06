import {Type} from '../../models/type-model';
import {
  CREATE_TYPE,
  UPDATE_TYPE,
  DELETE_TYPE,
  SET_TYPES,
  SET_ACTION_TYPE_MESSAGE,
  CLEAR_TYPE_ACTION_MESSAGE,
} from '../types/type-type';
const initialState = {
  types: [],
  typeActionMessage: '',
};

const typeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TYPES:
      return {
        typeActionMessage: '',
        types: action.types,
      };
    case CREATE_TYPE:
      return {
        ...state,
        typeActionMessage: 'Successfully added type',
        types: state.types.concat(action.data),
      };
    case UPDATE_TYPE:
      const typeIndex = state.types.findIndex(type => type._id === action.id);

      // const updatedTypes = [...state.types];
      let updatedTypes = [...state.types];
      let updatedType = updatedTypes[typeIndex];
      updatedType.typeName = action.typeName;
      updatedType.division = action.division;

      updatedTypes[typeIndex] = updatedType;
      return {
        ...state,
        typeActionMessage: 'Successfully updated type',
        types: updatedTypes,
      };
    case DELETE_TYPE:
      return {
        ...state,
        typeActionMessage: 'Successfully deleted type',
        types: state.types.filter(type => type._id !== action.id),
      };
    case SET_ACTION_TYPE_MESSAGE:
      return {
        ...state,
        typeActionMessage: action.message,
      };
    case CLEAR_TYPE_ACTION_MESSAGE:
      return {
        ...state,
        typeActionMessage: '',
      };
  }
  return state;
};

export default typeReducer;
