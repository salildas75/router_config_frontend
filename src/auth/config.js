import axios from "axios";

export class APIConfig {
  static BASE_URL = process.env.REACT_APP_BASE_URL;

  static AUTH_TOKEN = "";
  static POST_CONTENT_TYPE = "application/json";
  static AUTH_TOKEN_HEADER = "Authorization";
}

export function configureAxios({
  baseURL = APIConfig.BASE_URL,
  authToken = APIConfig.AUTH_TOKEN,
  authCallback = null,
  postContentType = APIConfig.POST_CONTENT_TYPE,
  ...props
} = {}) {
  axios.defaults.baseURL = baseURL;
  // axios.defaults.headers.common["xtr-app"] = process.env.REACT_APP_NAME;

  if (authToken !== null) {
    axios.defaults.headers.common[
      APIConfig.AUTH_TOKEN_HEADER
    ] = `Bearer ${authToken}`;
  } else {
    delete axios.defaults.headers.common[APIConfig.AUTH_TOKEN_HEADER];
  }

  configureAxios.authCallback = authCallback;
  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (401 === error.response.status) {
        switch (error.response.data.errorCode) {
          case 2005:
            return Promise.reject(error);
          case 2006:
            return Promise.reject(error);
          case 2007:
            return Promise.reject(error);
          case 2013:
            return Promise.reject(error);
          default:
            if (configureAxios.authCallback) {
              configureAxios.authCallback(error.response);
              window.location.reload();
            }
        }
      } else {
        return Promise.reject(error);
      }
    }
  );
}

const API_CONTEXT_PATH = "/sal/api/v1";
const API_LOGIN = `/users/signin/`;
const API_SET_PASSWORD = `${API_CONTEXT_PATH}/users/verify`;
const API_LOGOUT = `/users/signout/`;
const API_CHANGE_PASSWORD = `${API_CONTEXT_PATH}/set/password`;
const API_EXPIRE_PASSWORD = `${API_CONTEXT_PATH}`;
const API_FORGET_PASSWORD = `${API_CONTEXT_PATH}/users/password/forget`;
const API_CHANGE_FORGET_PASSWORD = `${API_CONTEXT_PATH}/set/password`;
const API_PASS_CHANGE = `${API_CONTEXT_PATH}/password/change`;

export class APIAUTH {
  static get passChange() {
    return API_PASS_CHANGE;
  }
  static get login() {
    return API_LOGIN;
  }
  static get setPassword() {
    return API_SET_PASSWORD;
  }
  static get changePassword() {
    return API_CHANGE_PASSWORD;
  }
  static get forgetChangePassword() {
    return API_CHANGE_FORGET_PASSWORD;
  }
  static get forgetPassword() {
    return API_FORGET_PASSWORD;
  }
  static get expirePassword() {
    return API_EXPIRE_PASSWORD;
  }
  static get logout() {
    return API_LOGOUT;
  }
}
