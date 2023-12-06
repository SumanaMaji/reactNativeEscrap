// https://materialdesignicons.com/
import Colors from './colors';
const SUPERADMIN = [
  {
    id: 'logs-report',
    title: 'Logs Report',
    color: Colors.orange,
    navigateTo: 'LogsReportScreen',
    icon: 'file-table-outline',
  },
];
const SYSTEM = [
  {
    id: 'data-entry',
    title: 'Data Entry',
    color: Colors.red,
    navigateTo: 'MemoizedDataEntryScreen',
    icon: 'database',
  },
  {
    id: 'user-management',
    title: 'User Management',
    color: Colors.cyan,
    navigateTo: 'UserManagmentScreen',
    icon: 'account-plus',
  },
];

const TRANSACTION = [
  {
    id: 'transaction-entry',
    title: 'Transation Entry',
    color: Colors.green,
    navigateTo: 'TransactionEntryScreen',
    icon: 'cube-outline',
  },
];

const VENDOR = [
  // {
  //   id: 'vendor',
  //   title: 'Vendor',
  //   color: Colors.green,
  //   navigateTo: 'VendorScreen',
  //   icon: 'cube-outline',
  // },
];

const REPORTS = [
  {
    id: 'transaction-report',
    title: 'Transaction Report',
    color: Colors.orange,
    navigateTo: 'TransactionReportScreen',
    icon: 'file-table-box-multiple',
  },
  {
    id: 'find-and-search',
    title: 'Search',
    color: Colors.lightblue,
    navigateTo: 'FindAndSearchTransactionScreen',
    icon: 'file-find-outline',
  },
  {
    id: 'transaction-status',
    title: 'Transaction Status',
    color: Colors.pink,
    navigateTo: 'StatusReportScreen',
    icon: 'monitor-eye',
  },
];

const DATA_ENTRY_MENU = [
  {
    id: 'dataentry-division',
    title: 'Division',
    color: Colors.orange,
    navigateTo: 'DivisionScreen',
    icon: 'asterisk',
  },
  {
    id: 'dataentry-type',
    title: 'Type',
    color: Colors.lightblue,
    navigateTo: 'MemoizedTypeListScreen',
    icon: 'atom-variant',
  },
  {
    id: 'dataentry-subtype',
    title: 'Sub Type',
    color: Colors.green,
    navigateTo: 'MemoizedSubTypeListScreen',
    icon: 'atlassian',
  },
];

const SYSTEM_LOGS_MENU = [
  {
    id: 'sync-logs',
    title: 'Synch Logs',
    color: Colors.orange,
    navigateTo: 'SyncLogsReportScreen',
    icon: 'asterisk',
  },
  {
    id: 'system-logs',
    title: 'System Error Logs',
    color: Colors.lightblue,
    navigateTo: 'ErrorLogsReportScreen',
    icon: 'atom-variant',
  },
];

export const SUPER_ADMIN_TILES = () => [
  ...SUPERADMIN,
  ...SYSTEM,
  ...TRANSACTION,
  ...REPORTS,
];
export const ADMIN_TILES = () => [...SYSTEM, ...TRANSACTION, ...REPORTS];
export const OPERATOR_TILES = () => [...TRANSACTION, ...REPORTS];
export const MANAGER_TILES = () => [...REPORTS];
export const VENDOR_TILES = () => [...VENDOR, ...REPORTS];

// For data entry screen
export const DATA_ENTRY_TILES = () => [...DATA_ENTRY_MENU];
export const SYSTEM_LOGS_TILES = () => [...SYSTEM_LOGS_MENU];
