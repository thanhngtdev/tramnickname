import type from '../actions/actionTypes';

const initialState = {
    message: '',
    listSite: [],
};

const listReducer = (state = initialState, action) => {
    switch (action.type) {
        case type.SAVE_lIST_SITE:
            return {
                ...state,
                listSite: action.data,
            };
        default:
            return state;
    }
};

export default listReducer;
