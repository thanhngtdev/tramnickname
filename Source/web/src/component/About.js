import React, { Fragment, useEffect, useState } from 'react';
import AboutGuide from './about/AboutGuide';
import '../css/about.css';
import { homeActionType } from '../actions/actionTypes';
import { useDispatch, useSelector } from 'react-redux';
import Utils from '../common/Utils';
import PathRoute from '../common/PathRoute';

const ClearBoth = function () {
    return <div style={{ clear: 'both' }} />;
};

const route = [PathRoute.WeeklyTraining, PathRoute.HolidayCamp];

function About() {
    const dispatch = useDispatch();
    const [about, setAbout] = useState({});
    const [about2, setAbout2] = useState({});
    const [about3, setAbout3] = useState({});
    const [about4, setAbout4] = useState({});
    const [about5, setAbout5] = useState({});
    useEffect(() => {
        dispatch({
            type: homeActionType.GET_ABOUT,
        });
    }, [dispatch]);

    const homeReducer = useSelector((state) => state.homeReducer);
    useEffect(() => {
        if (homeReducer.type) {
            if (homeReducer.type === homeActionType.GET_ABOUT_SUCCESS) {
                // console.log(homeReducer.data);
                setAbout(homeReducer.data.about || {});
                setAbout2(homeReducer.data.about2 || {});
                setAbout3(homeReducer.data.about3 || {});
                setAbout4(homeReducer.data.about4 || {});
                setAbout5(homeReducer.data.about5 || {});
            }
        }
    }, [homeReducer]);
    return (
        <Fragment>
            {about && (
                <div className="about-us">
                    <div className="row">
                        <div className="col-6">
                            <p></p>
                        </div>
                        <div className="col-6" style={{ paddingLeft: 0 }}>
                            <img
                                alt=""
                                src={require('../images/image_about.png')}
                            />
                        </div>
                    </div>
                    <div
                        style={{
                            position: 'absolute',
                            top: 50,
                            width: '100%',
                        }}>
                        <div className="container">
                            <h1
                                className="contact-header"
                                style={{ maxWidth: '14ch' }}>
                                {about.cfg_title}
                            </h1>
                        </div>
                        <div className="container">
                            <div className="get-in-touch">
                                <div className="list-form about">
                                    <p className="pro-text">{about.cfg_des}</p>
                                    <p className="pro-sub-text">
                                        {about.cfg_content}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <ClearBoth />
            <div className="about-info">
                <div className="container">
                    <div className="wrap-info">
                        <div className="row">
                            {about.cfg_value &&
                                about.cfg_value.map((item, index) => (
                                    <div key={index} className="col-6">
                                        <h2>{item.title}</h2>
                                        <hr />
                                        <p>{item.content}</p>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
            <ClearBoth />
            <AboutGuide item={about2} />
            <ClearBoth />
            {about3 && (
                <div className="about-coach">
                    <div className="container">
                        <h2>{about3.cfg_title}</h2>
                        <p
                            dangerouslySetInnerHTML={{
                                __html: about3.cfg_content,
                            }}></p>
                    </div>
                </div>
            )}
            <ClearBoth />
            {about3 && about3.cfg_value && (
                <div className="about-secure">
                    <div className="container">
                        <div className="box-list-item-card">
                            <div className="row">
                                {about3.cfg_value.map((item, index) => (
                                    <div className="col-4" key={index}>
                                        <div className="item">
                                            <img
                                                alt=""
                                                src={Utils.getThumb(item.image)}
                                            />
                                            <h3 className="title">
                                                {item.title}
                                            </h3>
                                            <div className="description">
                                                {item.content}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <ClearBoth />
            <AboutGuide item={about4} />
            <ClearBoth />
            {about5 && about5.cfg_value && (
                <div className="about-type">
                    <div className="container">
                        <h2
                            className="heading-w"
                            style={{
                                maxWidth: '800px',
                                marginRight: 'auto',
                                marginLeft: 'auto',
                            }}>
                            {about5.cfg_title}
                        </h2>
                        <p className="text-1">{about5.cfg_des}</p>
                    </div>
                    <div className="type-anchor">
                        <div className="container">
                            <div className="list-item-card-2">
                                <div className="row">
                                    {about5.cfg_value.map((item, index) => (
                                        <div key={index} className="col-6">
                                            <div className="item">
                                                <img
                                                    alt=""
                                                    src={Utils.getThumb(
                                                        item.icon,
                                                    )}
                                                    className="img"
                                                />
                                                <h3 className="title">
                                                    {item.title}
                                                </h3>
                                                <p className="description">
                                                    {item.des}
                                                </p>
                                                <a
                                                    href={route[index]}
                                                    className="more">
                                                    MORE INFORMATION
                                                </a>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Fragment>
    );
}

export default About;
