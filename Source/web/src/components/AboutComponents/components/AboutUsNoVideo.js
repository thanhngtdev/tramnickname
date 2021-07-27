import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

const propTypes = {};

const AboutUsNoVideo = ({ data }) => {
    //! State
    const dispatch = useDispatch();

    //! Function

    //! Render
    return (
        <div className="about-us">
            <div className="row">
                <div className="col-6">
                    <p></p>
                </div>
                <div className="col-6" style={{ paddingLeft: 0 }}>
                    <img alt="" src={'static-file/images/image_about.png'} />
                </div>
            </div>
            <div className="about-us-content">
                <div className="container">
                    <h1 className="contact-header about-contact-header">
                        {data.about?.cfg_title || ''}
                    </h1>
                </div>

                <div className="container">
                    <div className="get-in-touch">
                        <div className="list-form about">
                            <p style={{ marginTop: 0 }} className="pro-text">
                                {data.about?.cfg_des || ''}
                            </p>
                            <p
                                style={{
                                    fontSize: '20px',
                                    lineHeight: '30px',
                                }}
                                className="pro-sub-text">
                                {data.about?.cfg_content || ''}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

AboutUsNoVideo.propTypes = propTypes;
export default AboutUsNoVideo;
