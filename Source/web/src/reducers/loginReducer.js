import { loginActionType } from '../actions/actionTypes';

const initialState = {
    message: '',
};

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case loginActionType.LOGIN_SUCCESS: // login succecss
            return { type: loginActionType.LOGIN_SUCCESS, data: action.data };
        case loginActionType.LOGIN_FAILED: // login failed
            return {
                type: loginActionType.LOGIN_FAILED,
                message: action.message,
            };
        default:
            return state;
    }
};

export default loginReducer;
