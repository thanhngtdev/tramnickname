import { headerActionType } from '../actions/actionTypes';

const initialState = {
    message: '',
};

const headerReducer = (state = initialState, action) => {
    switch (action.type) {
        case headerActionType.CHANGE_LOCATION:
            return {
                type: headerActionType.CHANGE_LOCATION,
                data: action.data,
            };
        case headerActionType.CLOSE_LOCATION:
            return { type: headerActionType.CLOSE_LOCATION };
        case headerActionType.CLOSE_MAP_POPUP:
            return { type: headerActionType.CLOSE_MAP_POPUP };
        default:
            return state;
    }
};

export default headerReducer;
