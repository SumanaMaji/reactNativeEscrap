import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ApiUrl} from '../../constants/apiurls';
import {StorageKey} from '../../constants/text';
import {
  CREATE_TRANSACTION,
  UPDATE_TRANSACTION,
  DELETE_TRANSACTION,
  SET_TRANSACTIONS,
  SET_TO_BE_PROCCESSED_TRANSACTION,
  FETCH_UNREAD_TRANSACTIONS,
  FETCH_READ_TRANSACTIONS,
} from '../types/transaction-type';

export const fetchTranactionAction = () => {
  const url = ApiUrl.getAllTransaction;
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
          console.info(`${response.data.count} transactions found`);
          dispatch({
            type: SET_TRANSACTIONS,
            transactions: response.data.data,
            count: response.data.count,
            nextpage: response.data.pagination?.next?.page,
            limit: response.data.pagination?.next?.limit,
          });
        })
        .catch(err => {
          console.error(JSON.stringify(err));
          throw new Error(
            `Can not fetch transactions from api - ${err.message}`,
          );
        });
    } catch (err) {
      console.error(JSON.stringify(err));
      // send to custom analytics server
      throw err;
    }
  };
};

export const fetchTranactionToBeProccessed = (division, gatePassDate) => {

  const url = `${ApiUrl.getRecordsToBeProcesed}/${division}/${gatePassDate}T00:00:00.00`;
  return async dispatch => {
    // any async code you want!
    const userData = await AsyncStorage.getItem(StorageKey.UserData);
    const userDataJson = JSON.parse(userData);

    const config = {
      headers: {Authorization: `Bearer ${userDataJson.token}`},
    };

    await axios
      .get(
        url,
        config,
      )
      .then(response => {
        console.info(
          `${response.data?.data?.length} tobeProcessed transactions found`,
        );
        dispatch({
          type: SET_TO_BE_PROCCESSED_TRANSACTION,
          tobeProcessed: response.data.data,
        });
      })
      .catch(err => {
        console.error(JSON.stringify(err));
        throw new Error(
          `Can not fetch tobeProcessed transaction from api - ${err.message}`,
        );
      });
  };
};

export const deleteProductAction = productId => {
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

export const createTransactionAction = data => {
  const url = ApiUrl.submitTransaction;

  return async dispatch => {
    // any async code you want!
    const userData = await AsyncStorage.getItem(StorageKey.UserData);
    const userDataJson = JSON.parse(userData);
    try {
      const config = {
        headers: {Authorization: `Bearer ${userDataJson.token}`},
      };

      await axios
        .post(url, data, config)
        .then(response => {
          console.info(
            `Successfully created transaction ${JSON.stringify(response.data)}`,
          );
          dispatch({
            type: CREATE_TRANSACTION,
            transaction: response.data.data,
          });
        })
        .catch(err => {
          console.error(JSON.stringify(err));
          throw new Error(
            `API Error: Can not create transactions: - ${err.message}`,
          );
        });
    } catch (err) {
      console.error(JSON.stringify(err));
      console.error('Failed Url endpoint: ' + url);
      console.error('Failed transaction payload:' + JSON.stringify(data));
      // send to custom analytics server
      throw err;
    }
  };
};

export const updateProductAction = (id, title, description, imageUrl) => {
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

export const deleteTransactionAction = transactionId => {
  const url = `${ApiUrl.deleteTransactionThumbnail}${transactionId}/transaction`;
  //const url = `${ApiUrl.getTransactionThumbnail}${imageId}/image`;
  return async dispatch => {
    const userData = await AsyncStorage.getItem(StorageKey.UserData);
    const userDataJson = JSON.parse(userData);
    const config = {
      headers: {Authorization: `Bearer ${userDataJson.token}`},
    };
    axios
      .delete(url, config)
      .then(response => {
        console.log(response);
        dispatch({type: DELETE_TRANSACTION, id: transactionId});
        // dispatch({
        //   type: SET_TRANSACTIONS,
        //   actionMessage: 'Successfully deleted transaction.',
        // });
      })
      .catch(error => {
        console.error(JSON.stringify(error));
        throw new Error('Something went wrong!' + JSON.stringify(error));
      });
  };
};

export const fetchUnReadTranactionAction = () => {
  const url = ApiUrl.getUnReadTransaction;
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
          console.info(`${response.data.count} un-read transactions found`);
          dispatch({
            type: FETCH_UNREAD_TRANSACTIONS,
            transactions: response.data.data,
            count: response.data.count,
            message: response.data.message,
          });
        })
        .catch(err => {
          console.error(JSON.stringify(err));
          throw new Error(
            `Can not fetch transactions from api - ${err.message}`,
          );
        });
    } catch (err) {
      console.error(JSON.stringify(err));
      // send to custom analytics server
      throw err;
    }
  };
};

export const fetchReadTranactionAction = (transactionId) => {
  const url = `${ApiUrl.getUnReadTransactionDetails}/${transactionId}`;

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
          console.info(`${response.data?.data?.length} read transaction found`);
          dispatch({
            type: FETCH_READ_TRANSACTIONS,
            transactions: response.data.data,
            message: response.data.message,
          });
        })
        .catch(err => {
          console.error(JSON.stringify(err));
          throw new Error(
            `Can not fetch transactions from api - ${err.message}`,
          );
        });
    } catch (err) {
      console.error(JSON.stringify(err));
      // send to custom analytics server
      throw err;
    }
  };
};