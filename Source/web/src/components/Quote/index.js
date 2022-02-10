import React from 'react';
import parse from 'html-react-parser';

const propTypes = {};

const Qoute = (props) => {
    //! State

    //! Function

    //! Render
    return (
        <div className="about-info about-info-birthday">
            <div className="container">
                <div className="birthday-qoute">
                    <img
                        loading="lazy"
                        src={'/static-file/images/left-quote.png'}
                    />
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
