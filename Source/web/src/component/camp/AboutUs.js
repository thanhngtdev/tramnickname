import React, { useEffect, useState } from 'react';
import ModelManager from 'common/ModelManager';
import Utils from 'common/Utils';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faTimes } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

AboutUs.propTypes = {
    data: PropTypes.object,
};

const Play = styled.div`
    position: absolute;
    top: 50%;
    left: 35%;
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 50%;
    width: 100px;
    height: 100px;
    align-items: center;
    display: flex;
    justify-content: center;
    cursor: pointer;
`;

function PlayVideo(props) {
    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: 1000,
                backgroundColor: 'rgba(0,0,0,0.6)',
                width: '100%',
                height: '100%',
                padding: '5% 2%',
            }}>
            <div
                style={{
                    background: 'white',
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    float: 'right',
                    marginBottom: 10,
                }}
                onClick={() => {
                    if (props.onClose) props.onClose();
                }}>
                <FontAwesomeIcon
                    icon={faTimes}
                    style={{ color: '#EE7925', fontSize: '0.7em' }}
                />
            </div>
            <iframe
                width="100%"
                height="100%"
                src={props.url + '?&autoplay=1'}
                frameBorder="0"
                allowFullScreen
                allow="autoplay"></iframe>
        </div>
    );
}

export default function AboutUs(props) {
    console.log(props.data.cfg_content);
    const siteReducer = useSelector((state) => state.siteReducer);

    const currentAcademy = ModelManager.getLocation() || {};
    const [showVideo, setShowVIdeo] = useState(false);
    const [title, setTitle] = useState('');

    useEffect(() => {
        if (props.data.cfg_title) {
            setTitle(
                props.data.cfg_title +
                    ' ' +
                    (currentAcademy.ms_name || siteReducer.lstSite[0]?.ms_name),
            );
        }
    }, [props.data.cfg_title]);

    return (
        <div className="about-us">
            {showVideo &&
                props.data.cfg_content &&
                props.data.cfg_content.includes('youtube') && (
                    <PlayVideo
                        url={Utils.getLinkYoutube(
                            props?.data?.cfg_content || '',
                        )}
                        onClose={() => setShowVIdeo(false)}
                    />
                )}
            <div className="row">
                <div className="col-6">
                    <p></p>
                </div>
                <div className="col-6" style={{ paddingLeft: 0 }}>
                    <img
                        alt=""
                        src={require('images/weekly-training-video.png')}
                    />
                    <Play onClick={() => setShowVIdeo(true)}>
                        <FontAwesomeIcon
                            icon={faPlay}
                            style={{ fontSize: 22 }}
                        />
                    </Play>
                </div>
            </div>
            <div
                style={{
                    position: 'absolute',
                    top: 50,
                    width: '100%',
                    pointerEvents: 'none',
                }}>
                <div className="container" style={{ pointerEvents: 'none' }}>
                    <h1
                        className="contact-header"
                        style={{ pointerEvents: 'none' }}>
                        {title}
                    </h1>
                </div>
                <div className="container">
                    <div className="get-in-touch">
                        <div className="list-form about">
                            <p className="pro-sub-text" style={{color: "#5A5A5A", margin: "0px"}}>{props.data.cfg_des}</p>
                            <div
                                class="trustpilot-widget truspilot-big"
                                data-locale="en-GB"
                                data-template-id="53aa8807dec7e10d38f59f32"
                                data-businessunit-id="5630b23d0000ff000584db47"
                                data-style-height="150px"
                                data-style-width="50%"
                                data-theme="light"
                                style={{marginTop: "60px", width: "70%"}}>
                                <a
                                    href="https://uk.trustpilot.com/review/wemakefootballers.com"
                                    target="_blank"
                                    rel="noopener">
                                    Trustpilot
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
