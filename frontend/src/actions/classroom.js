import {
    FETCH_USER_CLASS_DETAILS,
    CLEAR_USER_CLASS_DETAILS,
    FETCH_LAB_DETAILS,
    CLEAR_LAB_DETAILS,
    CREATE_CODE_EDITOR,
    FECTH_CURRENT_CLASSROOM_DETAILS,
    CLEAR_CURRENT_CLASSROOM_DETAILS,
    GET_EARLIER_MESSAGES,
    CLEAR_EARLIER_MESSAGES
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
    const url = `/api/classroom/fetchExistingLabDetails/${classroomId}`;
    fetch(url, {
      headers: {
         Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
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
function codeEditorDetails({editor,lab}){
  return {
      type : CREATE_CODE_EDITOR,
      codeEditorDetails: editor,
      labDetails: lab,
  }
}
export function createNewCodeEditor(userId, labId){
  return (dispatch) => {
    const url = `/api/classroom/createEditor/${userId}/${labId}`;
    fetch(url, {
      headers: {
         Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          dispatch(codeEditorDetails(data.data));
          return;
        }
      });
  };
}

//fetching classroom details posts/announcementd/studentlist etc
function classroomDetails(details){
  return {
      type : FECTH_CURRENT_CLASSROOM_DETAILS,
      students: details.students,
      teachers: details.teachers,
      announcements: details.announcements,
      posts: details.posts,
      ClassMeetLink : details.ClassMeetLink
  }
}
export function fetchClassroomDetails(classroom_id){
  return (dispatch) => {
      const url = `/api/classroom/classroomDetails/${classroom_id}`;
      fetch(url, {
        headers: {
           Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            dispatch(classroomDetails(data.data));
            return;
          }
        });
    };
}

export function clearClassroomDetails(){
  return {
      type : CLEAR_CURRENT_CLASSROOM_DETAILS,
  }
}
//receinving and clearing chat messages
function updateChatDetails(messageArray){
  return {
      type : GET_EARLIER_MESSAGES,
      messageArray
  }
}
export function getEarlierMessages(room){
  return (dispatch) => {
      const url = `/api/classroom/classroomDetails/${room}`;
      fetch(url, {
        headers: {
           Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            dispatch(updateChatDetails(data.data));
            return;
          }
        });
    };
}

export function clearEarlierMessages(){
  return {
      type : CLEAR_EARLIER_MESSAGES,
  }
}