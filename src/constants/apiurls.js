const productionUrl = 'https://escrap-api-staging.herokuapp.com';
const stagingUrl = 'https://escrap-api.codemetrics.in';
const developmentUrl = 'http://localhost:5000';

const baseUrl = productionUrl;
export const ApiUrl = {
  loginURL: baseUrl + '/api/v1/auth/login',
  fcmTokenURL: baseUrl + '/api/v1/auth/fcmtoken',

  //transaction endpoints
  submitTransaction: baseUrl + '/api/v1/transaction/create',
  getAllTransaction: baseUrl + '/api/v1/transaction/getall',
  getTransactionThumbnail: baseUrl + '/api/v1/transaction/',
  deleteTransactionThumbnail: baseUrl + '/api/v1/transaction/delete/',
  updateTransaction: baseUrl + '/api/v1/transaction/update',

  getRecordsToBeProcesed:baseUrl+'/api/v1/sync/tobeproccessed',
  getTransactionDocuments: baseUrl + '/api/v1/transaction/documents/',
  getUnReadTransaction: baseUrl + '/api/v1/transaction/getallunreadtransaction',
  getUnReadTransactionDetails: baseUrl + '/api/v1/transaction/readunreadtransaction',

  // division endpoints
  getAllDivisions: baseUrl + '/api/v1/division/getall',
  createDivision: baseUrl + '/api/v1/division/create',
  updateDivision: baseUrl + '/api/v1/division/update',
  deleteDivision: baseUrl + '/api/v1/division/delete',
  // type endpoints
  getAllTypes: baseUrl + '/api/v1/type/getall',
  getAllTypesByDivision: baseUrl + '/api/v1/type/division',
  createType: baseUrl + '/api/v1/type/create',
  updateType: baseUrl + '/api/v1/type/update',
  deleteType: baseUrl + '/api/v1/type/delete',
  detailsType: baseUrl + '/api/v1/type/details',
  //subtype endpoints
  getAllSubTypes: baseUrl + '/api/v1/subtype/getall',
  getAllTypesByType: baseUrl + '/api/v1/subtype/type',
  createSubType: baseUrl + '/api/v1/subtype/create',
  updateSubType: baseUrl + '/api/v1/subtype/update',
  deleteSubType: baseUrl + '/api/v1/subtype/delete',
  // logs
  getAllLogs: baseUrl + '/api/v1/getalllog',
  // reports
  getRecordsBetweenTimeRange: baseUrl + '/api/v1/transaction/searchByDate',
  getTransactionReportStatus: baseUrl + '/api/v2/sync/datastatus',
  getRecordFromSearchBy: baseUrl + '/api/v1/transaction/searchby',
  // vendor
  getAllVendorTransaction: baseUrl + '/api/v1/transaction/vendor/getall',
  getRecordFromSearchByCode: baseUrl + '/api/v1/transaction/searchbydatecode',

};
