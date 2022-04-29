import type from '../actions/actionTypes';

const initialState = {
    message: '',
};

const articleReducer = (state = initialState, action) => {
    switch (action.type) {
        case type.GET_LIST_NEWS_SUCCESS:
            return {
                type: type.GET_LIST_NEWS_SUCCESS,
                data: action.data,
            };
        case type.GET_LIST_NEWS_FAILED:
            return {
                type: type.GET_LIST_NEWS_FAILED,
                message: action.message,
            };
        case type.GET_LIST_ALL_NEW_SUCCESS:
            return {
                type: type.GET_LIST_ALL_NEW_SUCCESS,
                data: action.data,
            };
        case type.GET_LIST_ALL_NEW_FAILED:
            return {
                type: type.GET_LIST_ALL_NEW_FAILED,
                message: action.message,
            };
        case type.DETAIL_ARTICLE_SUCCESS:
            return {
                type: type.DETAIL_ARTICLE_SUCCESS,
                data: action.data,
                failed: false,
            };
        case type.DETAIL_ARTICLE_FAILED:
            return {
                type: type.DETAIL_ARTICLE_FAILED,
                message: action.message,
                failed: true,
            };
        default:
            return state;
    }
};

export default articleReducer;
