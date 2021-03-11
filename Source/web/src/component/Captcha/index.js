import React, { useEffect } from 'react';

const Captcha = ({ id = 'captcha', event }) => {
    useEffect(() => {
        if (window.grecaptcha && window.grecaptcha.render) {
            try {
                window.grecaptcha.render(id);
            } catch (error) {
                console.log('Captcha -> error', error);
            }
        }
    }, []);

    return (
        <div
            id={id}
            className="g-recaptcha"
            data-sitekey="6Le-VPwUAAAAAA8Ob_fIKNaXUCp1eR5_n58uY0DU"
            // data-callback={() => {
            //     console.log('call');
            // }}
        ></div>
    );
};

export default React.memo(Captcha);
