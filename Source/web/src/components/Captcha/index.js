import Script from 'next/script';
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
        <>
            <Script
                src="https://www.google.com/recaptcha/api.js"
                strategy="lazyOnload"
            />
            <div
                id={id}
                className="g-recaptcha"
                data-sitekey="6Le-VPwUAAAAAA8Ob_fIKNaXUCp1eR5_n58uY0DU"></div>
        </>
    );
};

export default React.memo(Captcha);
