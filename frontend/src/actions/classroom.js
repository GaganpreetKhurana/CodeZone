import {
    FETCH_USER_CLASS_DETAILS,
    CLEAR_USER_CLASS_DETAILS
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