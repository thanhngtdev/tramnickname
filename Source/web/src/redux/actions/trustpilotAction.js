import actionTypes from './actionTypes';

export const showTruspilot = (data) => {
    return {
        ...data,
        type: 'SHOW_TRUSPILOT',
    };
};
