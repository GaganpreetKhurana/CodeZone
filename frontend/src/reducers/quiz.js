import {
	QUIZ_CREATE_SUCCESS,
	QUIZ_CREATE_START,
	QUIZ_CREATE_FAILED,
	QUIZ_CREATE_CLEAR_STATE,
	QUIZ_FETCH_SUCCESS,
	QUIZ_SUBMIT_SUCCESS,
	QUIZ_CLEAR,
	QUIZ_FETCH_ALL_SUCCESS,
	QUIZ_FETCH_RESULT,
	QUIZ_SUBMISSION_FETCH_SUCCESS,
} from '../actions/actionTypes';

const initialClassState = {
	quiz: null,
	quizCreateStarted: null,
	success: null,
	error: null,
	quizList: [],
	submission :[],
	quizResult:[],
};

export default function auth(state = initialClassState, action) {
	switch (action.type) {
		
		case QUIZ_CREATE_SUCCESS:
			return {
				...state,
				success:true,
				error: null,
				quiz:action.quiz,
				quizCreateStarted: null,
			};
		case QUIZ_SUBMISSION_FETCH_SUCCESS:
			return {
				...state,
				success: true,
				error: null,
				submission: action.submission,
			}
		case QUIZ_FETCH_ALL_SUCCESS:
			return {
				...state,
				success:true,
				error: null,
				quizList:action.quizList,
				// quiz: null,
			};
		case QUIZ_FETCH_RESULT:
			return {
				...state,
				success:true,
				error: null,
				quizResult:action.quizList,
				// quiz: null,
			};
		case QUIZ_FETCH_SUCCESS:
			return {
				...state,
				success:true,
				error: null,
				quiz:action.quiz,
				quizCreateStarted: null,
			};
		case QUIZ_SUBMIT_SUCCESS:
			return {
				...state,
				success:true,
				error: null,
				quiz: null,
				quizCreateStarted: null,
			};
		case QUIZ_CREATE_FAILED:
			return {
				...state,
				success:false,
				error: action.errorMsg,
				quizCreateStarted: false,
				
			};
		case QUIZ_CREATE_START:
			return {
				...state,
				quizCreateStarted: true,
				success: null,
				error: null,
			}
		case QUIZ_CREATE_CLEAR_STATE:
			return {
				...state,
				quiz: null,
				quizCreateStarted: null,
				success: null,
				error: null,
			}
		case QUIZ_CLEAR:
			return {
				...state,
				quiz: null,
				quizCreateStarted: null,
				success: null,
				error: null,
				quizList: []
			}
		default:
			return state;
	}
}
