import {
    FETCH_USER_CLASS_DETAILS,
    CLEAR_USER_CLASS_DETAILS,
    FETCH_LAB_DETAILS,
    CLEAR_LAB_DETAILS,
    CREATE_CODE_EDITOR
  } from "./actionTypes";

function userDetails(userDetails){
    return {
        type : FETCH_USER_CLASS_DETAILS,
        userDetails: userDetails
    }
}
export function fetchUserClassDetails(){
    return (dispatch) => {
        const url = "/api/classroom/details";
        fetch(url, {
          headers: {
             Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              dispatch(userDetails(data.data));
              return;
            }
          });
      };
}

export function clearUserClassDetails(){
  return {
    type:CLEAR_USER_CLASS_DETAILS
  }
}
//fetch lab details
function labDetails(labDetails){
  return {
      type : FETCH_LAB_DETAILS,
      labDetails: labDetails
  }
}
export function fetchClassLabDetails(classroomId){
  return (dispatch) => {
    const url = `/api/classroom//fetchExistingLabDetails/${classroomId}`;
    fetch(url, {
      headers: {
         Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log(data.data);
          dispatch(labDetails(data.data));
          return;
        }
      });
  };
}

//clear lab details
export function clearLabDetails(){
  return {
    type: CLEAR_LAB_DETAILS
  }
}


//create new code editor for user 
export function createNewCodeEditor(userId, labId){
  return (dispatch) => {
    const url = `/api/classroom//fetchExistingLabDetails/${classroomId}`;
    fetch(url, {
      headers: {
         Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log(data.data);
          dispatch(labDetails(data.data));
          return;
        }
      });
  };
}