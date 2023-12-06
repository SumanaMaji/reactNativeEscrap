import {combineReducers} from 'redux';
import authReducer from './auth-reducer';
import transactionReducer from './transaction-reducer';
import deviceReducer from './device-reducer';
import divisionReducer from './division-reducer';
import settingReducer from './setting-reducer';
import typeReducer from './type-reducer';
import subtypeReducer from './subtype-reducer';
import systemconfigReducer from './systemconfig-reducer';
import transactionimageReducer from './transactionimage-reducer';
import transactionThumbnailReducer from './transactionthumbnail-reducer';
import miscReducer from './misc-reducer';
import reportReducer from './report-reducer';
import transactionDocumentsReducer from './transactiondocuments-reducer';
export default combineReducers({
  auth: authReducer,
  transactions: transactionReducer,
  divisions: divisionReducer,
  settings: settingReducer,
  devices: deviceReducer,
  types: typeReducer,
  subtypes: subtypeReducer,
  systemconfig: systemconfigReducer,
  images: transactionimageReducer,
  thumbnails: transactionThumbnailReducer,
  reports: reportReducer,
  misc: miscReducer,
  documents: transactionDocumentsReducer,
});
