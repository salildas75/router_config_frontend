/**
 * Path definition to route between JavaScript pages.
 * Paths can be accessed through Path's static
 * members, e.g., Path.index etc.
 * @type {string}
 */

const API_CONTEXT_PATH_USER = "/ttu/api/v1";
const API_FILE_MANaGMENT = "/dm/api/v1/local/files";

const API_PASSWORD_CHANGE = `${API_CONTEXT_PATH_USER}/users/password/change`;
const API_ADD_PORTAL_USERS = `${API_CONTEXT_PATH_USER}/users`;
const API_ROLES = `${API_CONTEXT_PATH_USER}/roles`;
const API_SYSTEM_ALL_USER = `${API_CONTEXT_PATH_USER}/users/system`;

const API_ROLES_PERMISSIONS = "/roles/permissions/";

export class API {
  static get fileManagement() {
    return API_FILE_MANaGMENT;
  }

  static get passwordChange() {
    return API_PASSWORD_CHANGE;
  }

  static get addPortalUser() {
    return API_ADD_PORTAL_USERS;
  }

  static get roles() {
    return API_ROLES;
  }

  static get rolesPermissions() {
    return API_ROLES_PERMISSIONS;
  }
  static get systemAllUser() {
    return API_SYSTEM_ALL_USER;
  }
}
