import {
    // UPDATE_POSTS,
    ADD_POST,
    ADD_COMMENT,
    // UPDATE_POST_LIKE,
    // UPDATE_COMMENT_LIKE,
  } from './actionTypes';

function getFormBody(params) {
    let FormBody = [];
    for (let property in params) {
      let encodedKey = encodeURIComponent(property);
      let encodedValue = encodeURIComponent(params[property]);
      FormBody.push(encodedKey + '=' + encodedValue);
    }
    return FormBody.join('&');
  }

  export function addPost({posts}) {
    return {
      type: ADD_POST,
      posts,
    };
  }

export function createPost(content,classroom_id) {
    return (dispatch) => {
      const url = '/api/forum/create/post';
      fetch(url, {
        method: 'POST',
        headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: getFormBody({ content,classroom_id }),
      })
        .then((response) => response.json())
        .then((data) => {
  
          if (data.success) {
            dispatch(addPost(data.data));
          }
        });
    };
  }
  export function likePost(post_id) {
    return (dispatch) => {
      const url = `/api/forum/like/post:${post_id}`;
      fetch(url, {
        headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
  
          if (data.success) {
            dispatch(addPost(data.data));
          }
        });
    };
  }

  //comment
  export function addComment({posts}) {
    return {
      type: ADD_COMMENT,
      posts,
    };
  }

export function createComment(content,post_id) {
    return (dispatch) => {
      const url = '/api/forum/create/comment';
        console.log("request sent");
      fetch(url, {
        method: 'POST',
        headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: getFormBody({ content,post_id }),
      })
        .then((response) => response.json())
        .then((data) => {
  
          if (data.success) {
            dispatch(addComment(data.data));
          }
        });
    };
  }
  export function likeComment(comment_id) {
    return (dispatch) => {
      const url = `/api/forum/like/comment:${comment_id}`;
      fetch(url, {
        headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
  
          if (data.success) {
            dispatch(addComment(data.data));
          }
        });
    };
  }
export function deleteSuccess(){
  return {
    type: "SUCCESS",
  };
}
export function deleteError(message){
  return {
    type: "ERROR",
    message,
  };
}
export function clearMsg(){
  return {
    type: "CLEAR",
  }
}
//delete post
export function deletePost(post_id) {
  return (dispatch) => {
    const url = `/api/forum/delete/post:${post_id}`;
    fetch(url, {
      headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          dispatch(addPost(data.data));
        }
        else{
          dispatch(deleteError(data.message));
        }
      });
  };
}

//delete comment
export function deleteComment(comment_id) {
  return (dispatch) => {
    const url = `/api/forum/delete/comment:${comment_id}`;
    fetch(url, {
      headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          dispatch(addPost(data.data));
        }
        else{
          dispatch(deleteError(data.message));
        }
      });
  };
}

//update post/comment
export function updatePost(content,post_id) {
  return (dispatch) => {
    const url = '/api/forum/update/post';
    fetch(url, {
      method: 'POST',
      headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: getFormBody({ content,post_id }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          dispatch(addPost(data.data));
          dispatch(deleteSuccess());
        }
      });
  };
}
export function updateComment(content,comment_id) {
  return (dispatch) => {
    const url = '/api/forum/update/comment';
    fetch(url, {
      method: 'POST',
      headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: getFormBody({ content,comment_id }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          dispatch(addPost(data.data));
          dispatch(deleteSuccess());
        }
      });
  };
}

//update meet link
export function updateMeetLink(content,classroom_id) {
  return (dispatch) => {
    const url = "/api/classroom/link";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: getFormBody({ classroom_id, content }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          dispatch(deleteSuccess());
          return;
        }
        dispatch(deleteError(data.message));
      });
  };
}
