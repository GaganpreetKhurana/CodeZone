"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = auth;

var _actionTypes = require("../actions/actionTypes");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialClassState = {
  quiz: null,
  quizCreateStarted: null,
  success: null,
  error: null,
  quizList: [],
  submission: [],
  quizResult: []
};

function auth() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialClassState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _actionTypes.QUIZ_CREATE_SUCCESS:
      return _objectSpread({}, state, {
        success: true,
        error: null,
        quiz: action.quiz,
        quizCreateStarted: null
      });

    case _actionTypes.QUIZ_SUBMISSION_FETCH_SUCCESS:
      return _objectSpread({}, state, {
        success: true,
        error: null,
        submission: action.submission
      });

    case _actionTypes.QUIZ_FETCH_ALL_SUCCESS:
      return _objectSpread({}, state, {
        success: true,
        error: null,
        quizList: action.quizList // quiz: null,

      });

    case _actionTypes.QUIZ_FETCH_RESULT:
      return _objectSpread({}, state, {
        success: true,
        error: null,
        quizResult: action.quizList // quiz: null,

      });

    case _actionTypes.QUIZ_FETCH_SUCCESS:
      return _objectSpread({}, state, {
        success: true,
        error: null,
        quiz: action.quiz,
        quizCreateStarted: null
      });

    case _actionTypes.QUIZ_SUBMIT_SUCCESS:
      return _objectSpread({}, state, {
        success: true,
        error: null,
        quiz: null,
        quizCreateStarted: null
      });

    case _actionTypes.QUIZ_CREATE_FAILED:
      return _objectSpread({}, state, {
        success: false,
        error: action.errorMsg,
        quizCreateStarted: false
      });

    case _actionTypes.QUIZ_CREATE_START:
      return _objectSpread({}, state, {
        quizCreateStarted: true,
        success: null,
        error: null
      });

    case _actionTypes.QUIZ_CREATE_CLEAR_STATE:
      return _objectSpread({}, state, {
        quiz: null,
        quizCreateStarted: null,
        success: null,
        error: null
      });

    case _actionTypes.QUIZ_CLEAR:
      return _objectSpread({}, state, {
        quiz: null,
        quizCreateStarted: null,
        success: null,
        error: null,
        quizList: []
      });

    default:
      return state;
  }
}