import { headerActionType } from '../actions/actionTypes';

const initialState = {
    message: '',
    param: {},
};

const headerReducer = (state = initialState, action) => {
    switch (action.type) {
        case headerActionType.CHANGE_LOCATION:
            return {
                ...state,
                type: headerActionType.CHANGE_LOCATION,
                data: action.data,
            };
        case headerActionType.CLOSE_LOCATION:
            return {
                ...state,
                type: headerActionType.CLOSE_LOCATION,
                param: action.param || {},
            };
        case headerActionType.CLOSE_MAP_POPUP:
            return { ...state, type: headerActionType.CLOSE_MAP_POPUP };
        default:
            return state;
    }
};

export default headerReducer;
