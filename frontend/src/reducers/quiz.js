import {
	QUIZ_CREATE_SUCCESS,
	QUIZ_CREATE_START,
	QUIZ_CREATE_FAILED,
	QUIZ_CREATE_CLEAR_STATE,
	QUIZ_FETCH_SUCCESS,
	QUIZ_SUBMIT_SUCCESS,
} from '../actions/actionTypes';

const initialClassState = {
	quiz: null,
	quizCreateStarted: null,
	success: null,
	error: null,
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
		case QUIZ_FETCH_SUCCESS:
			console.log("FETCH",action.quiz,console.log(action));
			return {
				...state,
				success:true,
				error: null,
				quiz:action.quiz,
				quizCreateStarted: null,
			};
		case QUIZ_SUBMIT_SUCCESS:
			console.log("SUBMIT");
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
			console.log("HHII")
			return {
				...state,
				quiz: null,
				quizCreateStarted: null,
				success: null,
				error: null,
			}
		default:
			return state;
	}
}
