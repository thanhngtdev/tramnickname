import actionTypes from './actionTypes';

export const getDetailSite = (data) => {
    // console.log({ data }, 'data');
    return {
        type: actionTypes.GET_DETAIL_SITE,
        ...data,
    };
};
