import actionTypes from './actionTypes';

export const getListNews = (data) => {
    return {
        type: actionTypes.GET_LIST_NEWS,
        ...data,
    };
};

export const getAllListNews = (data) => {
    return {
        type: actionTypes.GET_LIST_ALL_NEW,
        ...data,
    };
};

export const getDetailNews = (data) => {
    return {
        type: actionTypes.DETAIL_ARTICLE,
        ...data,
    };
};
