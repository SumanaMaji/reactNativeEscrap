import {
  SET_RESET_TRANSACTION_DOCUMENTS,
    SET_TRANSACTION_DOCUMENTS,
  } from '../types/document-type';
  
  const initialState = {
    'transactionDocuments': []
  };
  
  const transactionDocumentsReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_TRANSACTION_DOCUMENTS:
        return {
          ...state,
          transactionDocuments: action.transactionDocuments,
        };
      case SET_RESET_TRANSACTION_DOCUMENTS:
          return initialState;
    }
    return state;
  };
  
  export default transactionDocumentsReducer;
  