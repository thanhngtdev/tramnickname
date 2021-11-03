import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Utils from 'src/common/Utils';

AboutUs.propTypes = {
    data: PropTypes.object,
};

const PlayButton = () => {
    return (
        <svg
            id="Group_11"
            data-name="Group 11"
            xmlns="http://www.w3.org/2000/svg"
            width="100"
            height="100"
            viewBox="0 0 100 100">
            <path
                id="Combined_Shape"
                data-name="Combined Shape"
                d="M50,0A50,50,0,1,1,0,50,50,50,0,0,1,50,0Z"
                fill="#fff"
                opacity="0.7"
            />
            <path
                id="Path"
                d="M27.5,18.336a2,2,0,0,1,0,3.328L3.109,37.927A2,2,0,0,1,0,36.263V3.737A2,2,0,0,1,3.109,2.073Z"
                transform="translate(40 30)"
                fill="#ff7100"
            />
        </svg>
    );
};

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
                    cursor: 'pointer',
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
    const [showVideo, setShowVIdeo] = useState(false);
    const [title, setTitle] = useState('');
    const [des, setDes] = useState(props.data.cfg_des);

    console.log(props, 'props');
    useEffect(() => {
        if (isEmpty(props.site)) {
            if (props?.holidayCamp) {
                setTitle(
                    `${
                        props.data.cfg_title
                            .replace('In', '')
                            .replace('$AcademyName', '') +
                        ' ' +
                        ' With We Make Footballers'
                    }`,
                );
            } else {
                setTitle(
                    `${
                        props.data.cfg_title.replace('In $AcademyName', '') +
                        ' ' +
                        ' At We Make Footballers'
                    }`,
                );
            }
        } else {
            setTitle(
                `${props.data.cfg_title.replace(
                    '$AcademyName',
                    props.site.ms_name,
                )}`,
            );

            setDes(
                `${props.data.cfg_des.replace(
                    '$AcademyName',
                    props.site.ms_name,
                )}`,
            );
        }
    }, []);

    return (
        <div className="about-us">
            {showVideo &&
                props.data.cfg_content &&
                props.data.cfg_content.includes('youtube.com') && (
                    <PlayVideo
                        url={Utils.getLinkYoutube(
                            props?.data?.cfg_content || '',
                        )}
                        onClose={() => {
                            setShowVIdeo(false);
                        }}
                    />
                )}
            <div className="row">
                <div className="col-6">
                    <p></p>
                </div>
                <div
                    className="col-6"
                    style={{
                        paddingLeft: 0,
                    }}>
                    <img
                        loading="lazy"
                        alt=""
                        src={'/static-file/images/weekly-training-video.png'}
                        // height="1000px"
                    />
                    {props.data.cfg_content &&
                        props.data.cfg_content.includes('youtube.com') && (
                            <div
                                style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    backgroundColor: '#ffffff',
                                    borderRadius: '50%',
                                    width: '100px',
                                    height: '100px',
                                    alignItems: 'center',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    transform: 'translate(-50%, -50%)',
                                    zIndex: 1,
                                }}
                                onClick={() => setShowVIdeo(true)}>
                                <PlayButton />
                            </div>
                        )}
                </div>
            </div>
            <div className="about-us-content">
                <div className="container" style={{ pointerEvents: 'none' }}>
                    <h1
                        className="contact-header"
                        style={{ pointerEvents: 'none' }}>
                        {title}
                        {/* {props.data.cfg_title} */}
                    </h1>
                </div>
                <div className="container">
                    <div className="get-in-touch box">
                        <div className="list-form about">
                            <p
                                className="pro-sub-text"
                                style={{ color: '#5A5A5A', margin: '0px' }}>
                                {des}
                            </p>
                            <div
                                className="trustpilot-widget truspilot-big"
                                data-locale="en-GB"
                                data-template-id="53aa8807dec7e10d38f59f32"
                                data-businessunit-id="5630b23d0000ff000584db47"
                                data-style-height="150px"
                                data-style-width="50%"
                                data-theme="light">
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
