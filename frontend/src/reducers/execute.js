import {
    EXECUTION_SUCCESS,
    EXECUTION_START,
    EXECUTION_FAILED,
} from '../actions/actionTypes';

const initialClassState = {
    customOutput: null,
    statusCode: null,
    memory: null,
    cpuTime: null,
    success: null,
    error: null,
    customInput: null,
    executionStarted: null
};

export default function auth(state = initialClassState, action) {
    switch (action.type) {

        case EXECUTION_SUCCESS:
            return {
                ...state,
                success:true,
                error: null,
                customInput: action.result.input,
                customOutput: action.result.output,
                statusCode: action.result.statusCode,
                memory: action.result.memory,
                cpuTime: action.result.CPUTime,
                executionStarted: null,
            };
        case EXECUTION_FAILED:
            return {
                ...state,
                success:false,
                error: action.errorMsg,
                executionOutput: null,
            };
        case EXECUTION_START:
            return {
                ...state,
                executionStarted: true,
                customOutput: null,
                statusCode: null,
                memory: null,
                cpuTime: null,
                success: null,
                error: null,
            }
        default:
            return state;
    }
}
