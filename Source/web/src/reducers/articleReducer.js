import { articleActionType } from '../actions/actionTypes';

const initialState = {
    message: '',
};

const articleReducer = (state = initialState, action) => {
    switch (action.type) {
        case articleActionType.GET_LIST_NEWS_SUCCESS:
            return {
                type: articleActionType.GET_LIST_NEWS_SUCCESS,
                data: action.data,
            };
        case articleActionType.GET_LIST_NEWS_FAILED:
            return {
                type: articleActionType.GET_LIST_NEWS_FAILED,
                message: action.message,
            };
        case articleActionType.DETAIL_ARTICLE_SUCCESS:
            return {
                type: articleActionType.DETAIL_ARTICLE_SUCCESS,
                data: action.data,
                failed: false
            };
        case articleActionType.DETAIL_ARTICLE_FAILED:
            return {
                type: articleActionType.DETAIL_ARTICLE_FAILED,
                message: action.message,
                failed: true
            };
        case articleActionType.GET_LIST_FAQ_SUCCESS:
            return {
                type: articleActionType.GET_LIST_FAQ_SUCCESS,
                data: action.data,
            };
        case articleActionType.GET_LIST_FAQ_FAILED:
            return {
                type: articleActionType.GET_LIST_FAQ_FAILED,
                message: action.message,
            };
        default:
            return state;
    }
};

export default articleReducer;
