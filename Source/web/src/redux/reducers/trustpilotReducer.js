import type from '../actions/actionTypes';

const initialState = {
    show: false,
};

const trustpilotReducer = (state = initialState, action) => {
    switch (action.type) {
        case type.SHOW_TRUSPILOT:
            return {
                show: action.show,
            };
        default:
            return state;
    }
};

export default trustpilotReducer;
