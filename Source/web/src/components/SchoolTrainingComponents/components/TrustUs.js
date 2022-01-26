import React from 'react';
import Utils from 'src/common/Utils';

const propTypes = {};

const TrustUs = ({ data }) => {
    //! State

    //! Function

    //! Render
    return (
        <div className="trust-us">
            <div className="container">
                <div className="heading">
                    <div class="left">
                        <h2 className="">{data.cfg_name || ''}</h2>
                    </div>
                    <div class="right"></div>
                </div>
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
        </div>
    );
};

TrustUs.propTypes = propTypes;
export default TrustUs;
