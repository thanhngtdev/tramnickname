import React from 'react';
import parse from 'html-react-parser';
import img from '../../../public/static-file/images/left-quote.png';

const propTypes = {};
const src = '/static-file/images/left-quote.png';

const Qoute = (props) => {
    //! State

    //! Function

    //! Render
    return (
        <div className="about-info about-info-birthday">
            <div className="container">
                <div className="birthday-qoute">
                    <img src={src} />
                    <span className="slide-text">
                        {parse(props.data?.cfg_content)}
                    </span>
                </div>
            </div>
        </div>
    );
};

Qoute.propTypes = propTypes;
export default Qoute;
