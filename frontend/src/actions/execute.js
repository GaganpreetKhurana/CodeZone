import {
    EXECUTION_START,
    EXECUTION_SUCCESS,
    EXECUTION_FAILED,
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
    // console.log("YY")
    return (dispatch) => {
        // console.log("SENDINH");
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
                // console.log("XXXXXXXXXXXX");
                // console.log(data);
                if (data.success) {
                    dispatch(executionSuccessful(data.data));
                    return;
                }
                dispatch(executionFailed(data.message));
            });
    };
}
