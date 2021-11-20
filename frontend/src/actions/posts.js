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
        console.log("request sent");
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
            console.log(data.data);
            dispatch(addPost(data.data));
          }
        });
    };
  }
  export function likePost(post_id) {
    return (dispatch) => {
      const url = `/api/forum/like/post:${post_id}`;
        console.log("request sent");
      fetch(url, {
        headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
  
          if (data.success) {
            console.log(data.data);
            dispatch(addPost(data.data));
          }
        });
    };
  }