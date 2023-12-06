import axios from 'axios';
import {ApiUrl} from '../../constants/apiurls';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StorageKey} from '../../constants/text';
import {
  SET_RESET_TRANSACTION_DOCUMENTS,
  SET_TRANSACTION_DOCUMENTS,
} from '../types/document-type';

export const fetchDocumentAction = transactionId => {
  const url = `${ApiUrl.getTransactionDocuments}${transactionId}`;
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
            `${response.data.documents.length} documents for ${transactionId} transaction id`,
          );
          dispatch({
            type: SET_TRANSACTION_DOCUMENTS,
            transactionDocuments: response.data.documents,
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
export const resetDocumentation = () => {
  return {type: SET_RESET_TRANSACTION_DOCUMENTS};
};


