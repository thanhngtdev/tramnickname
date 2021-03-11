import types from 'redux/actions/actionTypes';

const initialState = {
    message: '',
};

const aboutReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_ABOUT_SUCCESS:
            return {
                type: types.GET_ABOUT_SUCCESS,
                data: action.data,
            };
        case types.GET_ABOUT_FAILED:
            return {
                type: types.GET_ABOUT_FAILED,
                message: action.message,
            };
        default:
            return state;
    }
};

export default aboutReducer;
