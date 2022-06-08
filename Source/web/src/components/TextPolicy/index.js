import React from 'react';
import PathRoute from 'src/common/PathRoute';

const TextPolicy = () => {
    return (
        <p className="text-policy">
            For more information about our privacy practices, please read our{' '}
            <a className="link" href={PathRoute.Policy + '/privacy'}>
                Privacy Policy
            </a>
            . <br /> By clicking above, you agree that we may process your
            information in accordance with these terms.
        </p>
    );
};

export default TextPolicy;
