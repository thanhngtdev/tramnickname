import React, { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import logoWhite from '../images/logo-white.png';
import { siteActionType } from '../actions/actionTypes';
import { Link, useHistory } from 'react-router-dom';
import PathRoute from '../common/PathRoute';
import useComponentVisible from '../hooks/useComponentVisible';
import Utils from '../common/Utils';

function Footer() {
    const dispatch = useDispatch();
    const history = useHistory();

    const [showSelect, setShowSelect] = useState(false);
    const [location, setLocation] = useState('');
    const [lstSite, setLstSite] = useState([]);
    const [defaultAcademy, setDefaultAcademy] = useState(
        JSON.parse(localStorage.getItem('defaultAcademy')) || {},
    );
    const [footerConfig, setFooterConfig] = useState([]);
    const [socialAcademy, setSocialAcademy] = useState([]);
    const {
        ref,
        isComponentVisible,
        setIsComponentVisible,
    } = useComponentVisible(true);

    useEffect(() => {
        setTimeout(() => {
            dispatch({
                type: 'GET_FOOTER_CONFIG',
            });
        }, 200);

        dispatch({
            type: siteActionType.PICK_DEFAULT_ACADEMY,
        });
    }, [dispatch]);

    useEffect(() => {
        setLocation(defaultAcademy?.ms_name);
        setSocialAcademy(defaultAcademy?.social);
    }, [defaultAcademy]);

    useEffect(() => {
        if (!isComponentVisible && showSelect) {
            setShowSelect(!showSelect);
        }
    }, [isComponentVisible]);

    const siteReducer = useSelector((state) => state.siteReducer);
    useEffect(() => {
        console.log(siteReducer.type);
        if (siteReducer.type) {
            if (siteReducer.type === siteActionType.GET_LIST_SITE_SUCCESS) {
                setLstSite(siteReducer.data.lstSite);
                if (location === '' && siteReducer.data.lstSite.length > 0) {
                    setLocation(siteReducer.data.lstSite[0].ms_name);
                }
            }
            if (siteReducer.type === siteActionType.PICK_DEFAULT_ACADEMY) {
                setDefaultAcademy(
                    JSON.parse(localStorage.getItem('defaultAcademy')),
                );
            }
            if (siteReducer.type === siteActionType.GET_FOOTER_CONFIG_SUCCESS) {
                // console.log(siteReducer.data);
                setFooterConfig(siteReducer.data.cfg_value);
            }
        }
    }, [siteReducer, location]);

    function onClickLocation(event, item) {
        setShowSelect(!showSelect);
        setLocation(event.target.textContent);
        localStorage.setItem('defaultAcademy', JSON.stringify(item));
        dispatch({
            type: siteActionType.PICK_DEFAULT_ACADEMY,
        });
    }

    function linkToPrivate(index) {
        Utils.linkToPolicy(dispatch, index);
        history.push(PathRoute.Policy);
    }

    // console.log(socialAcademy, 'social ' + defaultAcademy.ms_name);
    // console.log(defaultAcademy, 'defaul');
    return (
        <div className="footer">
            <div className="container">
                <div className="box-contact">
                    <img src={logoWhite} alt="" />
                    <ul className="list">
                        <li className="mail">
                            <a
                                href={`mailto:${
                                    defaultAcademy
                                        ? defaultAcademy.ms_email
                                        : ''
                                }`}>
                                Make an enquiry
                            </a>
                        </li>
                        <li className="call">
                            <a
                                href={`tel:${
                                    defaultAcademy
                                        ? defaultAcademy.ms_phone
                                        : ''
                                }`}>
                                {defaultAcademy ? defaultAcademy.ms_phone : ''}
                            </a>
                        </li>
                        <li className="calender"> Mon-Fri 9am - 5pm </li>
                    </ul>
                </div>
                <div className="box-right">
                    <ul className="list">
                        <li>
                            <Link to={PathRoute.AboutUs}>About Us</Link>
                        </li>
                        <li>
                            <a href="/#">Join Us</a>
                        </li>
                        <li>
                            <a href="/#">School Partnerships</a>
                        </li>
                        <li>
                            <a
                                href="https://franchisewmf.com/ "
                                target="_blank"
                                rel="noreferrer">
                                Franchise With Us
                            </a>
                        </li>
                        <li>
                            <a href={PathRoute.ListQNA}>FAQs</a>
                        </li>
                    </ul>
                    <ul className="list">
                        <li>
                            <Link to="/location">Locations</Link>
                        </li>
                        <li>
                            <a
                                href=" https://www.kitlocker.com/wemakefootballers/"
                                target="_blank"
                                rel="noreferrer">
                                Shop
                            </a>
                        </li>
                        <li>
                            <a href={PathRoute.HomeNews}>Training Tips</a>
                        </li>
                        <li>
                            <div ref={ref} className="custom-select">
                                <div
                                    className="select-selected"
                                    onClick={() => {
                                        setIsComponentVisible(true);
                                        setShowSelect(!showSelect);
                                    }}>
                                    {location
                                        ? location.substring(0, 12)
                                        : 'Select academy'}
                                </div>
                                <div
                                    className={`select-items ${
                                        !showSelect && 'select-hide'
                                    }`}>
                                    {lstSite.map((item) => (
                                        <div
                                            key={item.ms_id}
                                            onClick={(e) => {
                                                onClickLocation(e, item);
                                            }}>
                                            {item.ms_name}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="Social">
                    {socialAcademy && socialAcademy.length > 0 ? (
                        <Fragment>
                            {socialAcademy.map((item) => {
                                if (item.name === 'Facebook')
                                    return (
                                        <a
                                            key={1}
                                            href={item.link}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="icon-fb"
                                        />
                                    );
                                if (item.name === 'Instagram')
                                    return (
                                        <a
                                            key={2}
                                            href={item.link}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="icon-lin"
                                        />
                                    );
                                if (item.name === 'Twitter')
                                    return (
                                        <a
                                            key={3}
                                            href={item.link}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="icon-wt"
                                        />
                                    );
                            })}
                        </Fragment>
                    ) : (
                        <Fragment>
                            {footerConfig &&
                                footerConfig.length > 0 &&
                                footerConfig.map((item) => {
                                    if (item.title === 'Facebook')
                                        return (
                                            <a
                                                key={1}
                                                href={item.des}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="icon-fb"
                                            />
                                        );
                                    if (item.title === 'Insta')
                                        return (
                                            <a
                                                key={2}
                                                href={item.des}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="icon-lin"
                                            />
                                        );
                                    if (item.title === 'Twitter')
                                        return (
                                            <a
                                                key={3}
                                                href={item.des}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="icon-wt"
                                            />
                                        );
                                })}
                        </Fragment>
                    )}

                    <div className="menu-ft">
                        <a onClick={() => linkToPrivate(3)}>Privacy Policy</a>|
                        <a href={PathRoute.ListQNA}> FAQ</a>
                        <span>|</span>
                        <a href="/#"> Terms &amp; Conditions</a>|
                        <a href="/#">Sitemap</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
