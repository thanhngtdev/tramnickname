import React, { useEffect } from 'react';

const Captcha = ({ id = 'captcha' }) => {
    useEffect(() => {
        window.grecaptcha && window.grecaptcha.render(id);
    }, []);

    return (
        <div
            id={id}
            className="g-recaptcha"
            data-sitekey="6Le-VPwUAAAAAA8Ob_fIKNaXUCp1eR5_n58uY0DU"></div>
    );
};

export default React.memo(Captcha);
