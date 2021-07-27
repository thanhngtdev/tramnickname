import actionTypes from './actionTypes';

export const getHome = (data) => {
    return {
        ...data,
        type: actionTypes.GET_HOME,
    };
};
