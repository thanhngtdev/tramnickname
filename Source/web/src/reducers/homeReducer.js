import { homeActionType } from '../actions/actionTypes';

const initialState = {
    message: '',
};

const homeReducer = (state = initialState, action) => {
    switch (action.type) {
        case homeActionType.GET_HOME_SUCCESS:
            return { type: homeActionType.GET_HOME_SUCCESS, data: action.data };
        case homeActionType.GET_HOME_FAILED:
            return {
                type: homeActionType.GET_HOME_FAILED,
                message: action.message,
            };
        case homeActionType.GET_ABOUT_SUCCESS:
            return {
                type: homeActionType.GET_ABOUT_SUCCESS,
                data: action.data,
            };
        case homeActionType.GET_ABOUT_FAILED:
            return {
                type: homeActionType.GET_ABOUT_FAILED,
                message: action.message,
            };
        default:
            return state;
    }
};

export default homeReducer;
