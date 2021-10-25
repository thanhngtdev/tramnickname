import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

export default (props) => {
    //! State

    //! Function
    function onChange(value) {
        console.log('Captcha value:', value);
    }

    //! Render
    return (
        <div>
            <ReCAPTCHA
                sitekey="6Le-VPwUAAAAAA8Ob_fIKNaXUCp1eR5_n58uY0DU"
                onChange={onChange}
                type="image"
            />
        </div>
    );
};
