import {
	QUIZ_CREATE_START,
	QUIZ_CREATE_SUCCESS,
	QUIZ_CREATE_FAILED,
	QUIZ_CREATE_CLEAR_STATE,
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
	console.log(quizName,quizDescription,questionData,maxScore,classroom_id);
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
					console.log(data);
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

// export function finalSubmitCode(code, content, finalSubmit, submittedAt) {
// 	return (dispatch) => {
// 		const url = "/api/editor/submitCode";
// 		fetch(url, {
// 			method: "POST",
// 			headers: {
// 				"Content-Type": "application/x-www-form-urlencoded",
// 				Authorization: `Bearer ${localStorage.getItem("token")}`,
// 			},
// 			body: getFormBody({ code, content, finalSubmit, submittedAt }),
// 		})
// 			.then((response) => response.json())
// 			.then((data) => {
// 				if (data.success) {
// 					console.log(data.message);
// 					return;
// 				}
// 			});
// 	};
// }
