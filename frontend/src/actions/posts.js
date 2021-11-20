import {
    UPDATE_POSTS,
    ADD_POST,
    ADD_COMMENT,
    UPDATE_POST_LIKE,
    UPDATE_COMMENT_LIKE,
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
            console.log("comment",data.data);
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
            console.log("comment",data.data);
            // dispatch(addComment(data.data));
          }
        });
    };
  }