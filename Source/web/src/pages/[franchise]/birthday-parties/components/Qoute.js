import React from 'react';

const propTypes = {};

const Qoute = (props) => {
    //! State

    //! Function

    //! Render
    return (
        <div className="about-info about-info-birthday">
            <div className="container">
                <div className="birthday-qoute">
                    <img src={'static/images/left-quote.png'} />
                    <span className="slide-text">{props.data?.cfg_des}</span>
                </div>
            </div>
        </div>
    );
};

Qoute.propTypes = propTypes;
export default Qoute;
