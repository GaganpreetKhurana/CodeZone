import {
    CREATE_CLASS_START,
    CREATE_CLASS_SUCCESS,
    CREATE_CLASS_FAILURE,
  } from "./actionTypes";

//create Classroom
export function startCreateClassroom() {
    return {
      type: CREATE_CLASS_START,
    };
  }
  
  export function classroomCreationFailed(errormsg) {
    return {
      type: CREATE_CLASS_FAILURE,
      error: errormsg,
    };
  }
  
  export function classroomCreationSuccess(code) {
    return {
      type: CREATE_CLASS_SUCCESS,
      code: code,
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
  
  export function createClassroom(subject, batch, description) {
    return (dispatch) => {
      dispatch(startCreateClassroom());
      const url = "/api/classroom/create";
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: getFormBody({ subject, batch, description }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            dispatch(classroomCreationSuccess(data.code));//classroom code sent back
            return;
          }
          dispatch(classroomCreationFailed(data.message));
        });
    };
  }