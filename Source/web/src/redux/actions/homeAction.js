import actionTypes from './actionTypes';

export const getHome = (data) => {
    return {
        ...data,
        type: actionTypes.GET_HOME,
    };
};

export const saveDefautConfig = (data) => {
    return {
        ...data,
        type: actionTypes.SAVE_DEFAULT_CONFIG_TYPEFORM,
    };
};
