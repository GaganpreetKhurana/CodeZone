import {
  LOGIN_START,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  SIGNUP_START,
  SIGNUP_FAILURE,
  SIGNUP_SUCCESS,
  AUTHENTICATE_USER,
  LOG_OUT,
  CLEAR_AUTH_STATE,
} from "./actionTypes";

//login
export function startLogin() {
  return {
    type: LOGIN_START,
  };
}

export function loginFailed(errormsg) {
  return {
    type: LOGIN_FAILURE,
    error: errormsg,
  };
}

export function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    user: user,
  };
}

function getFormBody(params) {
  let FormBody = [];
  for (let property in params) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(params[property]);
    FormBody.push(encodedKey + "=" + encodedValue);
  }
  return FormBody.join("&");
}

export function login(email, password) {
  return (dispatch) => {
    dispatch(startLogin());
    const url = "/api/users/login";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: getFormBody({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          localStorage.setItem("token", data.data.token);
          dispatch(loginSuccess(data.data.user));
          return;
        }
        dispatch(loginFailed(data.message));
      });
  };
}

//signup
export function startsignup() {
  return {
    type: SIGNUP_START,
  };
}
export function signupFailed(errormsg) {
  return {
    type: SIGNUP_FAILURE,
    error: errormsg,
  };
}
export function signupSuccess(user) {
  return {
    type: SIGNUP_SUCCESS,
    user: user,
  };
}

export function signup(email, password, confirmpassword, name,role,SID) {
  return (dispatch) => {
    dispatch(startsignup());
    const url = "/api/users/signup";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: getFormBody({
        email,
        password,
        confirm_password: confirmpassword,
        name,
        role,
        SID
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          localStorage.setItem("token", data.data.token);
          console.log(data.data.user);
          dispatch(signupSuccess(data.data.user));
          return;
        }
        dispatch(signupFailed(data.message));
      });
  };
}

//authenticate and logout
export function authenticateUser(user) {
  return {
    type: AUTHENTICATE_USER,
    user: user,
  };
}

export function logoutUser() {
  return {
    type: LOG_OUT,
  };
}
export function clearAuth() {
  return {
    type: CLEAR_AUTH_STATE,
  };
}
