import {
	QUIZ_CREATE_START,
	QUIZ_CREATE_SUCCESS,
	QUIZ_CREATE_FAILED,
	QUIZ_CREATE_CLEAR_STATE,
	QUIZ_FETCH_SUCCESS,
	QUIZ_SUBMIT_SUCCESS,
	QUIZ_CLEAR,
	QUIZ_FETCH_ALL_SUCCESS,
	QUIZ_FETCH_RESULT,
} from "./actionTypes";

//execution
export function startQuizCreate() {
	return {
		type: QUIZ_CREATE_START,
	};
}

export function quizCreateSuccessful(data) {
	return {
		type: QUIZ_CREATE_SUCCESS,
		quiz: data,
	};
}

export function quizCreateFailed(errorMsg) {
	return {
		type: QUIZ_CREATE_FAILED,
		errorMsg: errorMsg,
	};
}
// function getFormBody(params) {
// 	console.log(params);
// 	let FormBody = [];
// 	for (let property in params) {
// 		let encodedKey = encodeURIComponent(property);
// 		let encodedValue = params[property]);
// 		FormBody.push(encodedKey + "=" + encodedValue);
// 	}
// 	return FormBody.join("&");
// }

export function quizCreate(quizName,quizDescription,questionData,maxScore,classroom_id) {
	// console.log(quizName,quizDescription,questionData,maxScore,classroom_id);
	return (dispatch) => {
		dispatch(startQuizCreate());
		const url = "/api/quiz/create";
		fetch(url, {
			method: "POST",
			headers: {
				'content-type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
			body: JSON.stringify({
				"classroom_id": classroom_id,
				"quizName": quizName,
				"quizDescription": quizDescription,
				"questionData":questionData,
				"maxScore":maxScore
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.success) {
					// console.log(data);
					dispatch(quizCreateSuccessful(data.data));
					return;
				}
				dispatch(quizCreateFailed(data.message));
			});
	};
}

export function clearQuizCreate() {
	return {
		type: QUIZ_CREATE_CLEAR_STATE,
	};
}

export function fetchQuiz(quizID) {
	return (dispatch) => {
		const url = `/api/quiz/fetch/${quizID}`;
		fetch(url, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			}
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.success) {
					// console.log(data.message);
					dispatch(quizFetchSuccessful(data.data))
					return;
				}
			});
	};
}

export function quizFetchSuccessful(data) {
	return {
		type: QUIZ_FETCH_SUCCESS,
		quiz: data,
	};
}
export function quizFetchAllSuccessful(data) {
	return {
		type: QUIZ_FETCH_ALL_SUCCESS,
		quizList: data,
	};
}
export function clearQuiz(){
	return {
		type: QUIZ_CLEAR,
	}
}
export function submitQuiz(submission) {
	return (dispatch) => {
		const url = `/api/quiz/submit/${submission.quiz}`;
		fetch(url, {
			method: "POST",
			headers: {
				'content-type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
			body: JSON.stringify({
				"answers": submission.answers
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.success) {
					// console.log(data.message);
					dispatch(quizSubmitSuccessful(data.message))
					return;
				}
			});
	};
}

export function quizSubmitSuccessful(msg) {
	return {
		type: QUIZ_SUBMIT_SUCCESS,
		message: msg,
	};
}

export function fetchOpenQuiz(classroomID) {
	return (dispatch) => {
		const url = `/api/quiz/fetchAll/${classroomID}`;
		fetch(url, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			}
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.success) {
					// console.log(data.message);
					dispatch(quizFetchAllSuccessful(data.data))
					return;
				}
			});
	};
}

export function fetchQuizResult(classroomID) {
	return (dispatch) => {
		const url = `/api/quiz/result/student/${classroomID}`;
		fetch(url, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			}
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.success) {
					console.log(data.message,data.data);
					dispatch(quizFetchResultSuccessful(data.data))
					return;
				}
			});
	};
}

export function quizFetchResultSuccessful(data) {
	console.log(data);
	return {
		type: QUIZ_FETCH_RESULT,
		quizList: data,
	};
}