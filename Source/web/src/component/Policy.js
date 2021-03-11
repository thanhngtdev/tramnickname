import { isString, snakeCase } from 'lodash-es';
import React, { useRef } from 'react';
import { useEffect, useState } from 'react';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Link,
    Route,
    Switch,
    useLocation,
    useParams,
    Redirect,
} from 'react-router-dom';

import '../css/policies.css';

import { siteActionType } from '../actions/actionTypes';
import PathRoute from '../common/PathRoute';
import Utils from '../common/Utils';
import useEqualElement from '../hooks/useEqualElement';
import BorderButton from './include/BorderButton';
import SolidButton from './include/SolidButton';

export default function Policy() {
    const params = useParams();
    const dispatch = useDispatch();
    const refListItem = useRef(null);
    const [showContent, setShowContent] = useState(false);
    const [detailPolicy, setDetailPolicy] = useState(0);
    const [policy, setPolicy] = useState({});

    const { title } = params;

    const isSubPage = !!title;

    useEffect(() => {
        dispatch({
            type: siteActionType.GET_POLICY,
        });
    }, []);

    const siteReducer = useSelector((state) => state.siteReducer);
    useEffect(() => {
        console.log(siteReducer.type);
        if (siteReducer.type) {
            if (siteReducer.type === siteActionType.GET_POLICY_SUCCESS) {
                setPolicy(siteReducer.data);
            }
            if (siteReducer.type === siteActionType.GET_POLICY_INDEX) {
                setDetailPolicy(siteReducer.index);
                setShowContent(true);
            }
        }
    }, [siteReducer]);

    useEqualElement(refListItem);

    return isSubPage ? renderContent() : renderPolicyPage();

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
                        className="container our-policies" >
                        <h2 className="heading-w">Our Policies</h2>
                        <p className="text-1">
                            Select a card to view our company policies
                        </p>
                    </div>

                    <div className="container">
                        <div
                            className="list-item-card-2"
                            style={{ marginTop: 0 }}>
                            <div className="row items" ref={refListItem}>
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
                                                    to={`${
                                                        PathRoute.Policy
                                                    }/${snakeCase(item.title)}`}
                                                    className="more">
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
        const elementFounded = (policy?.cfg_value || []).find(
            (el) => snakeCase(el.title) === snakeCase(title),
        );

        if (elementFounded) {
            return (
                <div
                    className="container"
                    style={{ marginTop: 20, marginBottom: 40 }}>
                    <Link to={PathRoute.Policy}>
                        <BorderButton title="View all policies" />
                    </Link>
                    <div
                        dangerouslySetInnerHTML={
                            elementFounded && {
                                __html: elementFounded.content,
                            }
                        }
                    />
                </div>
            );
        }

        return null;
    }
}
