import type from './actionTypes';

export const sendForm = (data) => {
    return {
        type: type.SEND_FORM,
        param: data,
    };
};
