import {
    EXECUTION_START,
    EXECUTION_SUCCESS,
    EXECUTION_FAILED,
    EXECUTION_CLEAR_STATE,
} from "./actionTypes";


//execution
export function startExecution() {
    return {
        type: EXECUTION_START,
    };
}

export function executionSuccessful(result) {
    return {
        type: EXECUTION_SUCCESS,
        result:result,
    };
}

export function executionFailed(errorMsg) {
    return {
        type: EXECUTION_FAILED,
        errorMsg:errorMsg,
    };
}
function getFormBody(params) {
    let FormBody = [];
    for (let property in params) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(params[property]);
        FormBody.push(encodedKey + "=" + encodedValue);
    }
    return FormBody.join("&");
}

export function executeCode(code, language,lab,input,languageVersion) {
    return (dispatch) => {
        dispatch(startExecution());
        const url = "/api/editor/compile";
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: getFormBody({ code, language,lab,input,languageVersion }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    dispatch(executionSuccessful(data.data));
                    return;
                }
                dispatch(executionFailed(data.message));
            });
    };
}

export function clearExecution() {
    return {
        type: EXECUTION_CLEAR_STATE,
    };
}