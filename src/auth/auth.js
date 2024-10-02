import axios from "axios";
import { APIAUTH, configureAxios } from "./config";
import { jwtDecode } from "jwt-decode";
import { AlertError, toastNotify } from "../helpers/alert-msg";

class Authentication {
  constructor(props) {
    this.result = {
      data: null,
      access: null,
      refresh: null,
      error: null,
      featureList: [],
      isPasswordExpired: null,
    };

    this.session = props.session;
    this.authCallback = null;
  }
  processFeatureData(result) {
    console.log("processFeatureData", result);
    let processFeatureList = [];

    if (result) {
      let tokenRoles = result?.roleList[0];

      // // this block will be erased in production
      // if (process.env.REACT_APP_NAME === "a2p-user") {
      //   processFeatureList.push("Admin");
      //   this.result.featureList = processFeatureList;

      //   return;
      // }

      if (tokenRoles.includes("Admin")) {
        processFeatureList.push("Admin");
        this.result.featureList = processFeatureList;
      } else {
        let processData = result?.businessInfo?.featureList;
        // eslint-disable-next-line
        processData?.map((item) => {
          if (item.actionChosen.length > 0) {
            processFeatureList.push(item.featureName);
          }
        });
        this.result.featureList = processFeatureList;
      }
    }
    console.log("processFeatureList", processFeatureList);
  }
  onSetResult(data = null, error = null) {
    if (data?.access) {
      this.result.data = jwtDecode(data.access);
      this.result.access = data.access;
      this.result.isPasswordExpired = 0.1;
      this.result.error = null;

      this.processFeatureData(this.result.data);

      localStorage.setItem(this.session, JSON.stringify(this.result));
      localStorage.setItem("time", new Date());
      localStorage.setItem(process.env.REACT_APP_USER_SESSION, "login");

      configureAxios({
        authToken: data.access,
        authCallback: this.authCallback,
      });

      return [true, this.result];
    }

    localStorage.removeItem(this.session);

    this.result.data = null;
    this.result.access = null;

    if (error?.response?.data?.errorMessage) {
      this.result.error = {
        errorMessage: error.response.data.errorMessage,
        errorCode: error.response.data.errorCode,
      };
    }

    return [false, this.result];
  }

  setAuthCallback(authCallback) {
    this.authCallback = authCallback;
  }

  currentSession() {
    return JSON.parse(localStorage.getItem(this.session));
  }

  async signin(username, password) {
    return axios
      .post(APIAUTH.login, {
        username: username,

        password: password,
      })
      .then((response) => this.onSetResult(response.data))
      .catch((error) => this.onSetResult("", error));
  }

  async tokenRequest(data) {
    return axios
      .post(APIAUTH.signinOtp, data)
      .then((response) => this.onSetResult(response.data))
      .catch((error) => this.onSetResult("", error));
  }

  async signout() {
    return axios
      .post(APIAUTH.logout)
      .then((res) => {
        if (res.status === 200) {
          localStorage.removeItem(this.session);
          toastNotify("success", res?.data?.message);
        }
        localStorage.removeItem(this.session);
      })
      .catch((err) => {
        localStorage.removeItem(this.session);
        toastNotify("success", err?.data?.message);
      });
  }

  async changePassword(data, from) {
    let path;
    path = this.getPath(from);
    return axios
      .post(path, data)
      .then((response) => {
        return this.onSetResult(response.data);
      })
      .catch((error) => {
        return [false, { error: error.response.data }];
      });
  }

  async expirePassword(data) {
    return axios
      .put(APIAUTH.expirePassword, data)
      .then((response) => this.onSetResult(response.data))
      .catch((error) => this.onSetResult("", error));
  }

  async setPassword(verifyCode, password) {
    return axios
      .post(APIAUTH.setPassword, {
        action: "create",
        payload: {
          verifyCode: verifyCode,
          password: password,
        },
      })
      .then((response) => this.onSetResult(response.data))
      .catch((error) => this.onSetResult("", error));
  }

  async verifyForgetCode(verifyCode) {
    // return apiInstance
    return axios
      .get(APIAUTH.setPassword, {
        params: { verifyCode: verifyCode },
      })
      .catch((error) => {
        return error.response;
      });
  }

  async forgetPassword(data) {
    return axios
      .get(APIAUTH.forgetPassword, {
        params: { email: data },
      })
      .catch((error) => AlertError(error));
  }
}

export const Auth = new Authentication({
  session: process.env.REACT_APP_SESSION,
});
