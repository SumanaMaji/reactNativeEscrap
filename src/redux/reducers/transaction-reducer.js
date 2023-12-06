import {Transaction} from '../../models/transaction-model';
import {
  CREATE_TRANSACTION,
  UPDATE_TRANSACTION,
  DELETE_TRANSACTION,
  SET_TRANSACTIONS,
  SET_TO_BE_PROCCESSED_TRANSACTION,
  TEXT_BASED_FILTERED_TRANSACTION,
  SET_TRANSACTION_ACTION_MESSAGE,
  CLEAR_TRANSACTION_ACTION_MESSAGE,
  FETCH_UNREAD_TRANSACTIONS,
  FETCH_READ_TRANSACTIONS,
  SET_TRANSACTION_ACTION_RESULT
} from '../types/transaction-type';

const initialState = {
  transactions: [],
  toBeProccessed: [],
  transactionActionMessage: '',
  count: 5,
  nextpage: 2,
  limit: 5,
  actionResult: false,
};

const transactionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TRANSACTIONS:
      return {
        transactions: action.transactions,
        count: action.count,
        nextpage: action.nextpage,
        limit: action.limit,
        transactionActionMessage: '',
      };
    case SET_TO_BE_PROCCESSED_TRANSACTION:
      return {
        ...state,
        transactionActionMessage: '',
        toBeProccessed: action.tobeProcessed,
      };

    case CREATE_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.concat(action.transaction),
        // toBeProccessed: state.toBeProccessed.filter(
        //   tobe => tobe.gate_pass_no !== action.transaction.gatePassNumber,
        // ),
        transactionActionMessage: 'Successfully created transaction',
      };
    case UPDATE_TRANSACTION:
      const transactionIndex = state.transactions.findIndex(
        trans => trans.id === action.id,
      );
      const updatedTransaction = new Transaction(
        action.transaction.id,
        action.transaction.division,
        action.transaction.divisionName,
        action.transaction.date,
        action.transaction.typeName,
        action.transaction.subTypeName,
        action.transaction.vechileNo,
        action.transaction.gateInOut,
        action.transaction.partyName,
        action.transaction.ERPRefNo,
        action.transaction.ERPRefDate,
        action.transaction.remark,
        action.transaction.active,
        action.transaction.createdAt,
      );

      const updatedTransactions = [...state.transactions];
      updatedTransactions[transactionIndex] = updatedTransaction;
      return {
        ...state,
        transactions: updatedTransactions,
      };
    case DELETE_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.filter(
          transaction => transaction.id !== action.id,
        ),
        transactionActionMessage: 'Successfully deleted transaction',
      };
    case SET_TRANSACTION_ACTION_RESULT:
        return {...state, actionResult: false, transactionActionMessage: action.message};
    case SET_TRANSACTION_ACTION_MESSAGE:
      return {
        ...state,
        transactionActionMessage: action.message,
      };
    case CLEAR_TRANSACTION_ACTION_MESSAGE:
      return {
        ...state,
        transactionActionMessage: '',
      };
    case FETCH_UNREAD_TRANSACTIONS:
      return {
        transactions: action.transactions,
        count: action.count,
        transactionActionMessage: action.message,
      };
    case FETCH_READ_TRANSACTIONS:
      return {
        transactions: action.transactions,
        transactionActionMessage: action.message,
    };
      
  }
  return state;
};

export default transactionReducer;
