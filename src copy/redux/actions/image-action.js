import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ApiUrl} from '../../constants/apiurls';
import {StorageKey} from '../../constants/text';
import {
  CREATE_TRANSACTION_IMAGE,
  UPDATE_TRANSACTION_IMAGE,
  DELETE_TRANSACTION_IMAGE,
  SET_TRANSACTION_IMAGES,
} from '../types/image-type';

export const fetchTransactionImageAction = (imageId) => {
  const url = `${ApiUrl.getTransactionThumbnail}${imageId}/image`;
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
            `${response.data.image.length} image fournd for ${imageId} image id`,
          );
          dispatch({
            type: SET_TRANSACTION_IMAGES,
            transactionImages: response.data.image,
          });
        })
        .catch(err => {
          throw new Error(`Can not fetch image from api - ${err.message}`);
        });
    } catch (err) {
      // send to custom analytics server
      throw err;
    }
  };
};

export const deleteTransactionImageAction = productId => {
  return async dispatch => {
    const response = await fetch(
      `https://rn-complete-guide.firebaseio.com/products/${productId}.json`,
      {
        method: 'DELETE'
      }
    );

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }
    dispatch({ type: DELETE_PRODUCT, pid: productId });
  };
};

export const createTransactionImageAction= (title, description, imageUrl, price) => {
  return async dispatch => {
    // any async code you want!
    const response = await fetch(
      'https://rn-complete-guide.firebaseio.com/products.json',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
          price
        })
      }
    );

    const resData = await response.json();

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: resData.name,
        title,
        description,
        imageUrl,
        price
      }
    });
  };
};

export const updateTransactionImageAction = (id, title, description, imageUrl) => {
  return async dispatch => {
    const response = await fetch(
      `https://rn-complete-guide.firebaseio.com/products/${id}.json`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl
        })
      }
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
        imageUrl
      }
    });
  };
};
