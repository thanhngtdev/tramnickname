import type from '../actions/actionTypes';

const initialState = {
    message: '',
    testimonial: [],
    defaultTypeform: {
        default_typeform_id: '',
        use_typeform: 0,
    },
};

const homeReducer = (state = initialState, action) => {
    switch (action.type) {
        case type.GET_HOME_SUCCESS:
            return {
                ...state,
                type: type.GET_HOME_SUCCESS,
                data: action.data,
                testimonial: action.data.testimonial,
            };
        case type.GET_HOME_FAILED:
            return {
                ...state,
                type: type.GET_HOME_FAILED,
                message: action.message,
            };

        case type.SAVE_DEFAULT_CONFIG_TYPEFORM:
            return {
                ...state,
                defaultTypeform: action.defaultConfig,
            };
        default:
            return state;
    }
};

export default homeReducer;
