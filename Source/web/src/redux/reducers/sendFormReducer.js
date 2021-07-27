import types from '../actions/actionTypes';

const initialState = {
    data: {},
    error: null,
    success: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case types.SEND_FORM_SUCCESS:
            return {
                ...state,
                data: action.data,
                success: true,
                error: null,
            };

        case types.SEND_FORM_FAILED:
            return {
                ...state,
                data: {},
                success: false,
                error: action.error,
            };

        case types.CLEAR_SEND_FORM:
            return {
                initialState,
            };

        default:
            return state;
    }
};
