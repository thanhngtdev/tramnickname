import { isEmpty } from 'lodash';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ModelManager from 'src/common/ModelManager';
import PathRoute from 'src/common/PathRoute';
import NearbyAcademy from 'src/components/include/NearbyAcademy';
// import NearbyAcademy from "./include/NearbyAcademy";

const LinkItem = (props) => {
    const { title, href, hideMenu } = props;
    return (
        <li onClick={hideMenu} className="menu-link" style={props?.style || {}}>
            <Link href={href} scroll>
                {title}
            </Link>
        </li>
    );
};

function Header() {
    const router = useRouter();
    const [menuMobile, setMenuMobile] = useState(false);
    const [fixHeader, setFixHeader] = useState(true);
    const [defaultAcademy, setDefaultAcademy] = useState({});

    useEffect(() => {
        setDefaultAcademy(ModelManager.getLocation() || {});
    }, []);

    // const siteReducer = useSelector((state) => state.siteReducer);
    // useEffect(() => {
    //     if (siteReducer.type) {
    //         if (
    //             siteReducer.type === siteActionType.FIND_NEARBY_SUCESS &&
    //             !defaultAcademy?.ms_id
    //         ) {
    //             setDefaultAcademy(siteReducer.data);
    //         }
    //         if (siteReducer.type === siteActionType.PICK_DEFAULT_ACADEMY) {
    //             setDefaultAcademy(
    //                 JSON.parse(localStorage.getItem('defaultAcademy')),
    //             );
    //         }
    //     }
    // }, [siteReducer]);

    function hideMenu() {
        setMenuMobile(false);
    }

    function handleScroll() {
        const newPos = document.body.getBoundingClientRect().top;
        if (newPos < -200 && fixHeader) setFixHeader(false);
        if (newPos > -150 && fixHeader) setFixHeader(true);
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={`header ${fixHeader ? '' : 'fix-header'}`} style={{}}>
            <div className="head-top-mobile">
                <div className="container">
                    <Link href={PathRoute.Home}>
                        <LazyLoadImage
                            // src="/static-file/images/logo.svg"
                            src="/static-file/images/logo.svg"
                            className="logo"
                            alt="Logo"
                            height={'100%'}
                            width={'100%'}
                        />
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
                        <Link href={PathRoute.Home} scroll>
                            <LazyLoadImage
                                alt=""
                                src="/static-file/images/logo.svg"
                                className="logo"
                                onClick={hideMenu}
                            />
                        </Link>
                        <ul className="menu">
                            <LinkItem
                                title={'Weekly Training'}
                                hideMenu={hideMenu}
                                href={`${
                                    !isEmpty(defaultAcademy)
                                        ? '/' +
                                          defaultAcademy.ms_alias +
                                          PathRoute.WeeklyTraining
                                        : PathRoute.WeeklyTraining
                                }`}
                            />

                            <LinkItem
                                title={'Holiday Camps'}
                                hideMenu={hideMenu}
                                href={`${
                                    !isEmpty(defaultAcademy)
                                        ? '/' +
                                          defaultAcademy.ms_alias +
                                          PathRoute.HolidayCamp
                                        : PathRoute.HolidayCamp
                                }`}
                            />

                            <LinkItem
                                title={'1-on-1 Training'}
                                hideMenu={hideMenu}
                                href={`${
                                    !isEmpty(defaultAcademy)
                                        ? '/' +
                                          defaultAcademy.ms_alias +
                                          PathRoute.OneTraining
                                        : PathRoute.OneTraining
                                }`}
                            />

                            <LinkItem
                                title={'Birthday Parties'}
                                hideMenu={hideMenu}
                                href={`${
                                    !isEmpty(defaultAcademy)
                                        ? '/' +
                                          defaultAcademy.ms_alias +
                                          PathRoute.BirthdayParty
                                        : PathRoute.BirthdayParty
                                }`}
                            />

                            <li>
                                <a
                                    className="btn-book-free-session white-hover"
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

                                        router.push(
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
                <div className="menu-down">
                    <div className="container">
                        <div className="menu-small widget-header">
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
                            {!isEmpty(defaultAcademy) && (
                                <LinkItem
                                    style={{ marginLeft: 0 }}
                                    title={defaultAcademy.ms_name + ''}
                                    hideMenu={hideMenu}
                                    href={`/${defaultAcademy.ms_alias}`}
                                />
                            )}

                            <LinkItem
                                title={'About'}
                                hideMenu={hideMenu}
                                href={PathRoute.AboutUs}
                            />
                            <LinkItem
                                title={'Contact Us'}
                                hideMenu={hideMenu}
                                href={PathRoute.Contact}
                            />
                            <LinkItem
                                title={'Locations'}
                                hideMenu={hideMenu}
                                href={PathRoute.Location}
                            />

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
        </div>
    );
}

export default Header;
