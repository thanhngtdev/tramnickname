import types from '../actions/actionTypes';

const initialState = {
    message: '',
    data: {},
    cate: {},
    lstCate: [],
    faqSearching: false,
};

const FaqReducer = (state = initialState, action) => {
    console.log(action, 'action');
    switch (action.type) {
        case types.GET_LIST_FAQ_SUCCESS:
            return {
                type: types.GET_LIST_FAQ_SUCCESS,
                data: action.data,
                lstCate: action.data.lstCate,
                cate: action.data.cate,
            };
        case types.GET_LIST_FAQ_FAILED:
            return {
                type: types.GET_LIST_FAQ_FAILED,
                message: action.message,
            };

        case types.SEARCH_FAQ_SUCCESS:
            return {
                ...state,
                data: action.data,
                faqSearching: true,
            };
        case types.SEARCH_FAQ_FAILED:
            return {
                ...state,
                message: action.message,
                faqSearching: false,
            };

        default:
            return state;
    }
};

export default FaqReducer;
