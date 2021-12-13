import {
    ADD_POST,
    ADD_COMMENT,
  } from '../actions/actionTypes';

  const initialClassState = {
    posts: [],
    success: null,
    error: null
  };
  export default function auth(state = initialClassState, action) {
    switch (action.type) {
      case ADD_POST:
      case ADD_COMMENT:
        return {
          ...state,
          posts: action.posts,
        };
      case "SUCCESS":
        return {
          ...state,
          success:true,
          error: null
        }
      case "ERROR":
          return {
            ...state,
            error:action.message,
            success: null
          }
      case "CLEAR":
        return{
          ...state,
          error: null,
          success: null,
        }
      default:
        return state;
    }
  }
  