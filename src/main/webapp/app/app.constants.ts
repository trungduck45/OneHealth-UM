// These constants are injected via webpack environment variables.
// You can add more variables in webpack.common.js or in profile specific webpack.<dev|prod>.js files.
// If you change the values in the webpack config files, you need to re run webpack to update the application

export const VERSION = process.env.VERSION;
export const DEBUG_INFO_ENABLED = Boolean(process.env.DEBUG_INFO_ENABLED);
export const NODE_ENV = process.env.NODE_ENV;
export const SERVER_API_URL = process.env.SERVER_API_URL;
export const SERVER_PAYMENT_URL_API = process.env.SERVER_PAYMENT_URL_API;
export const BUILD_TIMESTAMP = process.env.BUILD_TIMESTAMP;

export const OPERATIONS = {
  DELETE: '/delete',
  SEARCH: '/search',
  UPDATE: '/update',
  DETAILS: '/details',
  CREATE: '/create',
  DONG_BENH_AN: '/close',
  MUON_BENH_AN: '/muonbenhan',
  TRA_BENH_AN: '/trabenhan',
  TONG_HOP: '/tonghop',
  HUY_SO_LUU_TRU: '/quanlylutru/huyso',
  CAP_SO_LUU_TRU: '/quanlylutru/capsoluutru',
  PHAN_LOAI_LUU_TRU: '/quanlylutru/phanloai',
  PHE_DUYET_PHIEU: '/pheduyet',
  TU_CHOI_PHIEU: '/tuchoi',
  GUI_PHIEU: '/guiphieu',
  HUY_PHIEU: '/huyphieu',
  GET_TREE: '/tree-of-diaphuong',
  GET_RESOURCE: '/resources',
  PRINT_REPORT: '/report/print',
  PRINT_REPORT_ICD: '/report/statistical',
  DOWNLOAD_FILE: '/download/file',
  KY_SO: '/sign/kyso',
  KY_SO_VER_2: '/sign/kyso-ver2',
  NHAN_BAN_GIAO: '/nhanbangiao',
  SEARCH_HTML_REPORT_GROUP: '/htmlreportgroup/search',
  SEARCH_HTML_REPORT: '/htmlreport/search',
  DETAILS_HTML_REPORT: '/htmlreport/details',
  RENDER_SAMPLE_HTML_REPORT: '/htmlreport/render-sample',
  RENDER_HTML_REPORT: '/htmlreport/render-report',
  CREATE_HTML_REPORT: '/htmlreport/benhan/create',
  UPDATE_HTML_REPORT: '/htmlreport/update',
  DELETE_HTML_REPORT: '/htmlreport/delete',
  GENERATE_CERT: '/generate-cert',
  SEARCH_LOAI_PHIEU: '/loaiphieu/search',
  UPLOAD: '/upload',
  DOWNLOAD: '/download',
  SEND_SAN_LUONG: '/congdulieu/send',
  SHOW_SAN_LUONG: '/congdulieu/show',
  GET_USER_INFO: '/user/info'
};

export const ERROR_MESSAGE = 'Thao tác thất bại, vui lòng thử lại!';
export const ERROR_LABEL = 'Error message';
export const SUCCESS_LABEL = 'Success message';

export const GOOGLE_API_CLIENT_ID = '836099167150-86n5dep9nthb4tvk4j51nrv09km200ii.apps.googleusercontent.com';
export const ACCESS_TOKEN = 'accessToken';
export const AUTHENTICATION_TOKEN = 'authenticationtoken';
export const FAKE_TOKEN = 'fake_token';
export const GOOGLE_API_TOKEN = 'google_api_token';
