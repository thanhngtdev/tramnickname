import React from 'react';
import { useEffect, useState } from 'react';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { siteActionType } from '../actions/actionTypes';
import PathRoute from '../common/PathRoute';
import Utils from '../common/Utils';
import BorderButton from './include/BorderButton';
import SolidButton from './include/SolidButton';

export default function Policy() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({
            type: siteActionType.GET_POLICY,
        });
    }, [dispatch]);

    const [showContent, setShowContent] = useState(false);
    const [detailPolicy, setDetailPolicy] = useState(0);
    const [policy, setPolicy] = useState({});

    const siteReducer = useSelector((state) => state.siteReducer);
    useEffect(() => {
        if (siteReducer.type) {
            if (siteReducer.type === siteActionType.GET_POLICY_SUCCESS) {
                console.log(siteReducer.data);
                setPolicy(siteReducer.data);
            }
        }
    }, [siteReducer]);

    return showContent ? renderContent() : renderPolicyPage();

    function renderPolicyPage() {
        return (
            <Fragment>
                <div className="about-us" style={{ backgroundColor: 'white' }}>
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
                                style={{ maxWidth: '50%' }}>
                                {policy.cfg_title}
                            </h1>
                        </div>
                        <div className="container">
                            <div className="get-in-touch">
                                <div className="list-form about">
                                    <p className="pro-text">{policy.cfg_des}</p>
                                    <p
                                        className="pro-sub-text"
                                        dangerouslySetInnerHTML={{
                                            __html: policy.cfg_content,
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{ clear: 'both' }} />
                    <div
                        className="container"
                        style={{ marginTop: 120, marginBottom: 120 }}>
                        <h2 className="heading-w">Our Policies</h2>
                        <p className="text-1">
                            Select a card to view our company policies
                        </p>
                    </div>

                    <div className="container">
                        <div
                            className="list-item-card-2"
                            style={{ marginTop: 0 }}>
                            <div className="row">
                                {policy.cfg_value &&
                                    policy.cfg_value.map((item, index) => (
                                        <div
                                            key={index}
                                            className="col-6"
                                            style={{ marginBottom: 60 }}>
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
                                                <Link
                                                    to={
                                                        PathRoute.Sub_policy[
                                                            index
                                                        ]
                                                    }
                                                    className="more"
                                                    onClick={(evt) => {
                                                        evt.preventDefault();
                                                        setDetailPolicy(index);
                                                        setShowContent(true);
                                                    }}>
                                                    MORE INFORMATION
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                    <div style={{ height: 120 }} />
                </div>
            </Fragment>
        );
    }

    function renderContent() {
        return (
            <div
                className="container"
                style={{ marginTop: 20, marginBottom: 40 }}>
                <BorderButton
                    title="View all policies"
                    onClick={() => {
                        setShowContent(false);
                        setDetailPolicy(0);
                    }}
                />
                <div
                    dangerouslySetInnerHTML={{
                        __html: policy.cfg_value[detailPolicy].content,
                    }}
                />
            </div>
        );
    }
}
