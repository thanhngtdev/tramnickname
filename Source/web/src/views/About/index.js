import React, { Fragment, useEffect, useState } from 'react';
import AboutGuide from './components/AboutGuide';
import 'css/about.css';
import type from 'redux/actions/actionTypes';
import { useDispatch, useSelector } from 'react-redux';
import Utils from 'common/Utils';
import PathRoute from 'common/PathRoute';
import { getAbout } from 'redux/actions/aboutAction';

const ClearBoth = function () {
    return <div style={{ clear: 'both' }} />;
};

const route = [PathRoute.WeeklyTraining, PathRoute.HolidayCamp];

function About() {
    const dispatch = useDispatch();
    const aboutReducer = useSelector((state) => state.aboutReducer);
    const { data } = aboutReducer;

    useEffect(() => {
        dispatch(getAbout());
    }, []);

    return (
        <Fragment>
            {data?.about && (
                <div className="about-us">
                    <div className="row">
                        <div className="col-6">
                            <p></p>
                        </div>
                        <div className="col-6" style={{ paddingLeft: 0 }}>
                            <img
                                alt=""
                                src={require('images/image_about.png')}
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
                                {data.about?.cfg_title || ''}
                            </h1>
                        </div>
                        <div className="container">
                            <div className="get-in-touch">
                                <div className="list-form about">
                                    <p className="pro-text">
                                        {data.about?.cfg_des || ''}
                                    </p>
                                    <p className="pro-sub-text">
                                        {data.about?.cfg_content || ''}
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
                            {data?.about?.cfg_value &&
                                data.about.cfg_value.map((item, index) => (
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
            <AboutGuide item={data?.about2 || {}} />
            <ClearBoth />
            {data?.about3 && (
                <div className="about-coach">
                    <div className="container">
                        <h2>{data.about3?.cfg_title || ''}</h2>
                        <p
                            dangerouslySetInnerHTML={{
                                __html: data.about3?.cfg_content,
                            }}></p>
                    </div>
                </div>
            )}
            <ClearBoth />
            {data?.about3 && data.about3?.cfg_value && (
                <div className="about-secure">
                    <div className="container">
                        <div className="box-list-item-card">
                            <div className="row">
                                {data.about3.cfg_value.map((item, index) => (
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
            <AboutGuide item={data?.about4 || {}} />
            <ClearBoth />
            {data?.about5 && data?.about5?.cfg_value && (
                <div className="about-type">
                    <div className="container">
                        <h2
                            className="heading-w"
                            style={{
                                maxWidth: '800px',
                                marginRight: 'auto',
                                marginLeft: 'auto',
                            }}>
                            {data.about5.cfg_title}
                        </h2>
                        <p className="text-1">{data.about5.cfg_des}</p>
                    </div>
                    <div className="type-anchor">
                        <div className="container">
                            <div className="list-item-card-2">
                                <div className="row">
                                    {data.about5.cfg_value.map(
                                        (item, index) => (
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
                                        ),
                                    )}
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
