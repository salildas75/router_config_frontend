/**
 * Path definition to route between JavaScript pages.
 * Paths can be accessed through Path's static
 * members, e.g., Path.index etc.
 * @type {string}
 */

const API_CONTEXT_PATH_USER = "/ttu/api/v1";
const API_FILE_MANaGMENT = "/dm/api/v1/local/files";
const API_CONTEXT_PATH_AUDIT = "/audit/api/v1";
const API_CONTEXT_PATH_HS = "/hs/api/v1";
const API_CONTEXT_PATH_VAT = "/vc/api/v1";
const API_CONTEXT_PATH_MUSHAK = "/mg/api/v1";

const API_PASSWORD_CHANGE = `${API_CONTEXT_PATH_USER}/users/password/change`;

const API_ACTIVITY_LOG = `${API_CONTEXT_PATH_AUDIT}/audits`;

const API_ADD_PORTAL_USERS = `${API_CONTEXT_PATH_USER}/users`;
const API_ROLES = `${API_CONTEXT_PATH_USER}/roles`;
const API_HS_CODES = `${API_CONTEXT_PATH_HS}/hscodes`;
const API_FEATURES = `${API_CONTEXT_PATH_USER}/features`;
const API_SYSTEM_ALL_USER = `${API_CONTEXT_PATH_USER}/users/system`;

const API_UPLOAD_HSCODES = `${API_CONTEXT_PATH_HS}/upload/hscodes`;

const API_SALES_INVOICE = `${API_CONTEXT_PATH_VAT}/sales/invoice`;

const API_PURCHASE_INVOICE = `${API_CONTEXT_PATH_VAT}/purchase/info`;

const API_DOWNLOAD_MUSHAK = `${API_CONTEXT_PATH_MUSHAK}/download/mushak`;

export class API {
  static get fileManagement() {
    return API_FILE_MANaGMENT;
  }

  static get passwordChange() {
    return API_PASSWORD_CHANGE;
  }

  static get activityLog() {
    return API_ACTIVITY_LOG;
  }

  static get addPortalUser() {
    return API_ADD_PORTAL_USERS;
  }

  static get roles() {
    return API_ROLES;
  }
  static get hsCodes() {
    return API_HS_CODES;
  }
  static get features() {
    return API_FEATURES;
  }
  static get systemAllUser() {
    return API_SYSTEM_ALL_USER;
  }

  static get uploadHscodes() {
    return API_UPLOAD_HSCODES;
  }
  static get salesInvoice() {
    return API_SALES_INVOICE;
  }
  static get purchaseInvoice() {
    return API_PURCHASE_INVOICE;
  }
  static get downloadMushak() {
    return API_DOWNLOAD_MUSHAK;
  }
}
