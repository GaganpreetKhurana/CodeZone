import {
    UPDATE_POSTS,
    ADD_POST,
    ADD_COMMENT,
    UPDATE_POST_LIKE,
    UPDATE_COMMENT_LIKE,
  } from '../actions/actionTypes';

  const initialClassState = {
    posts: [],
  };
  export default function auth(state = initialClassState, action) {
    switch (action.type) {
      case ADD_POST:
        return {
          ...state,
          posts: action.posts,
        };
      default:
        return state;
    }
  }
  