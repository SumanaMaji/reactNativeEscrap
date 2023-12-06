//const baseUrl = 'https://escrap-staging.herokuapp.com';
const baseUrl = 'https://escrap-api-staging.herokuapp.com';
//login endpoints
export const login = baseUrl + '/api/v1/auth/login';
//transaction endpoints
export const submitTransaction = baseUrl + '/api/v1/transaction/create';
export const getAllTransaction = baseUrl + '/api/v1/transaction/getall';
export const getTransactionThumbnail = baseUrl + '/api/v1/transaction/';
export const getTransactionERP = baseUrl + '/api/v1/transaction/erprefno';
export const toBeProccessed = baseUrl + '/api/v1/sync/tobeproccessed/';
export const deleteTransactionThumbnail = baseUrl + '/api/v1/transaction/delete/';
export const updateTransaction = baseUrl + '/api/v1/transaction/update';
//dvisions enpoints
export const getAllDivisions = baseUrl + '/api/v1/division/getall';
export const createDivision = baseUrl + '/api/v1/division/create';
export const updateDivision = baseUrl + '/api/v1/division/update';
export const deleteDivision = baseUrl + '/api/v1/division/delete';
export const getDivisionDetails = baseUrl + '/api/v1/division/details';
//types endpoints
export const getAllTypes = baseUrl + '/api/v1/type/getall';
export const getAllTypesByDivision = baseUrl + '/api/v1/type/division';
export const createType = baseUrl + '/api/v1/type/create';
export const updateType = baseUrl + '/api/v1/type/update';
export const deleteType = baseUrl + '/api/v1/type/delete';
export const detailsType = baseUrl + '/api/v1/type/details';

//subtype endpoints
export const getAllSubTypes = baseUrl + '/api/v1/subtype/getall';
export const getAllTypesByType = baseUrl + '/api/v1/subtype/type';
export const getAllTypesByDivisionType = baseUrl + '/api/v1/subtype/divisiontype';
export const createSubType = baseUrl + '/api/v1/subtype/create';
export const updateSubType = baseUrl + '/api/v1/subtype/update';
export const deleteSubType = baseUrl + '/api/v1/subtype/delete';
//user management endpoints
export const createUserType = baseUrl + '/api/v1/auth/register';
export const getAllUserLists = baseUrl + '/api/v1/user/getall';
export const deleteUser = baseUrl + '/api/v1/user/delete';
export const updateUser = baseUrl + '/api/v1/user/update';
export const updateUserPassword= baseUrl + '/api/v1/user/updatepassword';
