import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { siteActionType } from '../actions/actionTypes';
import PathRoute from '../common/PathRoute';

import logo from '../images/logo.svg';
import NearbyAcademy from './include/NearbyAcademy';

function Header() {
    const history = useHistory();
    const [menuMobile, setMenuMobile] = useState(false);
    const [fixHeader, setFixHeader] = useState(true);
    const [defaultAcademy, setDefaultAcademy] = useState(
        JSON.parse(localStorage.getItem('defaultAcademy')) || {},
    );

    const siteReducer = useSelector((state) => state.siteReducer);
    useEffect(() => {
        if (siteReducer.type) {
            if (siteReducer.type === siteActionType.FIND_NEARBY_SUCESS) {
                setDefaultAcademy(siteReducer.data);
            }
            if (siteReducer.type === siteActionType.PICK_DEFAULT_ACADEMY) {
                setDefaultAcademy(
                    JSON.parse(localStorage.getItem('defaultAcademy')),
                );
            }
        }
    }, [siteReducer]);

    useEffect(() => {
        if (defaultAcademy)
            global.bookTraining = {
                siteId: defaultAcademy.ms_id,
                siteName: defaultAcademy.ms_name,
            };
    }, [defaultAcademy]);

    function hideMenu() {
        setMenuMobile(false);
    }

    function handleScroll() {
        const newPos = document.body.getBoundingClientRect().top;
        if (newPos < -150 && fixHeader) setFixHeader(false);
        if (newPos > -50 && fixHeader) setFixHeader(true);
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={`header ${fixHeader ? '' : 'fixed-header'}`}>
            <div className="head-top-mobile">
                <div className="container">
                    <Link to="/">
                        <img src={logo} className="logo" alt="" />
                    </Link>
                    <button
                        className={`btn-button icon-menu ${
                            menuMobile ? 'show' : ''
                        }`}
                        onClick={() => setMenuMobile(!menuMobile)}>
                        menu
                    </button>
                </div>
            </div>
            <div className={`navi ${menuMobile ? 'show' : ''}`}>
                <div className="menu-top">
                    <div className="container">
                        <Link to={PathRoute.Home}>
                            <img
                                alt=""
                                src={logo}
                                className="logo"
                                onClick={hideMenu}
                            />
                        </Link>
                        <ul className="menu">
                            <li>
                                <Link
                                    to={PathRoute.WeeklyTraining}
                                    onClick={hideMenu}>
                                    Weekly Training
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to={PathRoute.HolidayCamp}
                                    onClick={hideMenu}>
                                    Holiday Camps
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to={PathRoute.OneTraining}
                                    onClick={hideMenu}>
                                    1-on-1 Training
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to={PathRoute.BirthdayParty}
                                    onClick={hideMenu}>
                                    Birthday Parties
                                </Link>
                            </li>
                            <li>
                                <a
                                    className="btn-book-free-session"
                                    href={PathRoute.BookTrialTraining}
                                    onClick={(evt) => {
                                        evt.preventDefault();
                                        setMenuMobile(false);
                                        if (defaultAcademy)
                                            global.bookTraining = {
                                                siteId: defaultAcademy.ms_id,
                                                siteName:
                                                    defaultAcademy.ms_name,
                                            };
                                        history.push(
                                            PathRoute.BookTrialTraining,
                                        );
                                    }}>
                                    Book a{' '}
                                    {defaultAcademy &&
                                    defaultAcademy.ms_trial === 1
                                        ? 'trial'
                                        : 'free'}{' '}
                                    session
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="container">
                    <div
                        className="menu-small"
                        style={{ float: 'left', paddingTop: 15 }}>
                        <div
                            className="trustpilot-widget"
                            data-locale="en-GB"
                            data-template-id="5419b732fbfb950b10de65e5"
                            data-businessunit-id="5630b23d0000ff000584db47"
                            data-style-height="24px"
                            data-style-width="100%"
                            data-theme="light"
                            style={{ marginLeft: '-16px' }}>
                            <a
                                href="https://uk.trustpilot.com/review/wemakefootballers.com"
                                target="_blank"
                                rel="noopener">
                                Trustpilot
                            </a>
                        </div>
                    </div>
                    <ul className="menu-small">
                        <li>
                            <Link to={PathRoute.AboutUs} onClick={hideMenu}>
                                About
                            </Link>
                        </li>
                        <li>
                            <a href={PathRoute.Contact} onClick={hideMenu}>
                                Contact Us
                            </a>
                        </li>
                        <li>
                            <Link to={PathRoute.Location} onClick={hideMenu}>
                                Locations
                            </Link>
                        </li>
                        <li className="login">
                            <a
                                href="https://www.parentarea.co/parent/login"
                                target="_blank"
                                rel="noreferrer">
                                Login
                            </a>
                        </li>
                        <li>
                            <NearbyAcademy onChangeLocation={hideMenu} />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Header;
