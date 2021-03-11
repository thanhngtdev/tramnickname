import actionTypes from './actionTypes';

export const getFranchiseDetail = (data) => {
    return {
        type: actionTypes.GET_FRANCHISE_DETAIL_REQUEST,
        ...data,
    };
};
