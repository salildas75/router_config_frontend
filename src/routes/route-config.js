/**
 * Path definition to route between JavaScript pages.
 * Paths can be accessed through Path's static
 * members, e.g., Path.index etc.
 * @type {string}
 */
const INDEX = "/";
const LOGIN = "/login";
const FORGET = "/forget";
const OTP = "/otp";
const SET_PASSWORD = "/set-password";
const SIGNUP = "/signup";

const DASHBOARD = "dashboard";

const USERS = "user/users";
const ROLES = "user/roles";

const ACTIVITY_LOG = "activity-log";
const PROFILE = "profile";

export class Path {
  static get index() {
    return INDEX;
  }
  static get login() {
    return LOGIN;
  }
  static get forget() {
    return FORGET;
  }
  static get otp() {
    return OTP;
  }
  static get setPassword() {
    return SET_PASSWORD;
  }
  static get signup() {
    return SIGNUP;
  }
  static get dashboard() {
    return DASHBOARD;
  }
  static get users() {
    return USERS;
  }
  static get roles() {
    return ROLES;
  }
  static get profile() {
    return PROFILE;
  }
  static get activityLog() {
    return ACTIVITY_LOG;
  }
}
