import {
  CREATE_CLASS_START,
  CREATE_CLASS_SUCCESS,
  CREATE_CLASS_FAILURE,
  CLEAR_CLASS_CODE,
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
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: getFormBody({ subject, batch, description }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          dispatch(classroomCreationSuccess(data.data.code)); //classroom code sent back
          return;
        }
        dispatch(classroomCreationFailed(data.message));
      });
  };
}

//to clear state that is remove class code
export function clearClassCode() {
  return {
    type: CLEAR_CLASS_CODE,
  };
}

//join classroom
export function joinClassroom(code) {
  return (dispatch) => {
    dispatch(startCreateClassroom());
    const url = "/api/classroom/join";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: getFormBody({ code }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          dispatch(classroomCreationSuccess(data.message));
          return;
        }
        dispatch(classroomCreationFailed(data.message));
      });
  };
}

//create new lab
export function createNewLab(description, question, input, output, language, maxMarks, classroomId) {
  return (dispatch) => {
    dispatch(startCreateClassroom());
    const url = "/api/classroom/createLab";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: getFormBody({ description, question, input, output, language, maxMarks, classroomId }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          dispatch(classroomCreationSuccess(data.data.code));
          return;
        }
        dispatch(classroomCreationFailed(data.message));
      });
  };
}