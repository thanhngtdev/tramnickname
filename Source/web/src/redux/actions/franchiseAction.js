import actionTypes from './actionTypes';

export const getFranchiseDetail = (data) => {
    return {
        type: actionTypes.GET_FRANCHISE_DETAIL_REQUEST,
        ...data,
    };
};

export const clearFranchiseDetail = () => {
    return {
        type: actionTypes.CLEAR_FRANCHISE_DETAIL,
    };
};
