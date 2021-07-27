import type from '../actions/actionTypes';

const initialState = {
    message: '',
    testimonial: [],
};

const homeReducer = (state = initialState, action) => {
    switch (action.type) {
        case type.GET_HOME_SUCCESS:
            return {
                type: type.GET_HOME_SUCCESS,
                data: action.data,
                testimonial: action.data.testimonial,
            };
        case type.GET_HOME_FAILED:
            return {
                type: type.GET_HOME_FAILED,
                message: action.message,
            };
        default:
            return state;
    }
};

export default homeReducer;
