import {TransactionImage} from '../../models/transactionimage-model';
import {
  CREATE_TRANSACTION_IMAGE,
  UPDATE_TRANSACTION_IMAGE,
  DELETE_TRANSACTION_IMAGE,
  SET_TRANSACTION_IMAGES,
} from '../types/image-type';
const initialState = {
  transactionImages: [],
};

const transactionImageReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TRANSACTION_IMAGES:
      return {
        transactionImages: action.transactionmages,
      };
    case CREATE_TRANSACTION_IMAGE:
      const newTransactionImage = new TransactionImage(
        action.transactionImage.id,
        action.transactionImage.transactionId,
        action.transactionImage.imageId,
        action.transactionImage.base64,
        action.transactionImage.createdAt,
      );
      return {
        ...state,
        transactionImages: state.transactionImages.concat(newTransactionImage),
      };
    case UPDATE_TRANSACTION_IMAGE:
      const transactionImageIndex = state.transactionImages.findIndex(
        transImage => transImage.id === action.id,
      );
      const updatedTransactionImage = new TransactionImage(
        action.transactionImage.id,
        action.transactionImage.transactionId,
        action.transactionImage.imageId,
        action.transactionImage.base64,
        action.transactionImage.createdAt,
      );

      const updatedTransactionImages = [...state.transactionImages];
      updatedTransactionImages[transactionImageIndex] = updatedTransactionImage;
      return {
        ...state,
        transactionImages: updatedTransactionImages,
      };
    case DELETE_TRANSACTION_IMAGE:
      return {
        ...state,
        transactionImages: state.transactionImages.filter(
          transImage => transImage.id !== action.id,
        ),
      };
  }
  return state;
};

export default transactionImageReducer;
