import type from '../actions/actionTypes';

const initialState = {
    message: '',
    testimonial: [],
    defaultTypeform: {},
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

        case type.SAVE_DEFAULT_CONFIG_TYPEFORM:
            return {
                defaultTypeform: action.defaultConfig,
            };
        default:
            return state;
    }
};

export default homeReducer;
