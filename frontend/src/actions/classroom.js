import {
    FETCH_USER_CLASS_DETAILS,
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
            console.log(data);
            if (data.success) {
                console.log(data.data);
              dispatch(userDetails(data.data));
              return;
            }
          });
      };
}