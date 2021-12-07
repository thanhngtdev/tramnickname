import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

export default (props) => {
    //! State

    //! Function
    function onChange(value) {
        console.log('Captcha value:', value);
    }

    console.log(process.env.STORAGE_URL, 'process.env.BASE_URL_API');

    //! Render
    return <div>{`${process.env.STORAGE_URL}`}</div>;
};
