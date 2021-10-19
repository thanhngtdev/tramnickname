import React from 'react';
import Utils from 'src/common/Utils';

const propTypes = {};

const TrustUs = ({ data }) => {
    //! State

    //! Function

    //! Render
    return (
        <div className="trust-us">
            <h2 className="heading">{data.cfg_name || ''}</h2>
            <div className="trust-us-list-image">
                {data.cfg_value.length > 0 &&
                    data.cfg_value.map((item, index) => {
                        return (
                            <div key={index} className="trust-us-image">
                                <img
                                    loading="lazy"
                                    src={Utils.getThumb(item.image)}
                                    alt=""
                                />
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

TrustUs.propTypes = propTypes;
export default TrustUs;
