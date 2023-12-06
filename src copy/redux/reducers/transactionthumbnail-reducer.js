import {
  CREATE_TRANSACTION_THUMBNAIL,
  UPDATE_TRANSACTION_THUMBNAIL,
  DELETE_TRANSACTION_THUMBNAIL,
  SET_TRANSACTION_THUMBNAILS,
} from '../types/thumbnail-type';

const initialState = {
    transactionThumbnails:[]
}

const transactionThumbnailReducer = (state = initialState, action) => {

     switch (action.type) {
       case SET_TRANSACTION_THUMBNAILS:
         return {
           transactionThumbnails: action.transactionThumbnails,
         };
       case CREATE_TRANSACTION_THUMBNAIL:
         const newTransactionThumbnail = new TransactionThumbnail(
           action.transactionThumbnail.id,
           action.transactionThumbnail.transactionId,
           action.transactionThumbnail.thumbnailId,
           action.transactionThumbnail.base64,
           action.transactionThumbnail.createdAt,
         );
         return {
           ...state,
           transactionThumbnails: state.transactionThumbnails.concat(
             newTransactionThumbnail,
           ),
         };
       case UPDATE_TRANSACTION_THUMBNAIL:
         const transactionThumbnailIndex =
           state.transactionThumbnails.findIndex(
             transThumb => transThumb.id === action.id,
           );
         const updatedTransactionThumbnail = new TransactionThumbnail(
           action.transactionThumbnail.id,
           action.transactionThumbnail.transactionId,
           action.transactionThumbnail.thumbnailId,
           action.transactionThumbnail.base64,
           action.transactionThumbnail.createdAt,
         );

         const updatedTransactionThumbnails = [...state.transactionThumbnails];
         updatedTransactionThumbnails[transactionThumbnailIndex] =
           updatedTransactionThumbnail;
         return {
           ...state,
           transactionThumbnails: updatedTransactionThumbnails,
         };
       case DELETE_TRANSACTION_THUMBNAIL:
         return {
           ...state,
           transactionThumbnails: state.transactionThumbnails.filter(
             transThumb => transThumb.id !== action.id,
           ),
         };
     }
    return state;
}

export default transactionThumbnailReducer;