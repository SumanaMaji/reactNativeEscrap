import axios from 'axios';
import {ApiUrl} from '../../constants/apiurls';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StorageKey} from '../../constants/text';
import {
  CREATE_TRANSACTION_THUMBNAIL,
  UPDATE_TRANSACTION_THUMBNAIL,
  DELETE_TRANSACTION_THUMBNAIL,
  SET_TRANSACTION_THUMBNAILS,
} from '../types/thumbnail-type';

export const fetchThumbnailAction = transactionId => {
  const url = `${ApiUrl.getTransactionThumbnail}${transactionId}/thumbnail`;
  return async dispatch => {
    // any async code you want!
    const userData = await AsyncStorage.getItem(StorageKey.UserData);
    const userDataJson = JSON.parse(userData);
   
    try {
      const config = {
        headers: {Authorization: `Bearer ${userDataJson.token}`},
      };

      await axios
        .get(
          url,
          //  bodyParameters,
          config,
        )
        .then(response => {
          console.info(
            `${response.data.thumbnail.length} thumbnails fournd test for ${transactionId} transaction id`,
          );
          dispatch({
            type: SET_TRANSACTION_THUMBNAILS,
            transactionThumbnails: response.data.thumbnail,
          });
        })
        .catch(err => {
          throw new Error(`Can not fetch thumbnais for the transaction from api - ${err.message}`);
        });
    } catch (err) {
      // send to custom analytics server
      throw err;
    }
  };
};
export const deleteThumbnailAction = productId => {
  return async dispatch => {
    const response = await fetch(
      `https://rn-complete-guide.firebaseio.com/products/${productId}.json`,
      {
        method: 'DELETE',
      },
    );

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }
    dispatch({type: DELETE_PRODUCT, pid: productId});
  };
};

export const createThumbnailAction = (title, description, imageUrl, price) => {
  return async dispatch => {
    // any async code you want!
    const response = await fetch(
      'https://rn-complete-guide.firebaseio.com/products.json',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
          price,
        }),
      },
    );

    const resData = await response.json();

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: resData.name,
        title,
        description,
        imageUrl,
        price,
      },
    });
  };
};

export const updateThumbnailAction = (id, title, description, imageUrl) => {
  return async dispatch => {
    const response = await fetch(
      `https://rn-complete-guide.firebaseio.com/products/${id}.json`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
        }),
      },
    );

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    dispatch({
      type: UPDATE_PRODUCT,
      pid: id,
      productData: {
        title,
        description,
        imageUrl,
      },
    });
  };
};
