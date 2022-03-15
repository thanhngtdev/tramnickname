import isEmpty from 'lodash/isEmpty';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import ModelManager from 'src/common/ModelManager';
import PathRoute from 'src/common/PathRoute';
import useGetWidth from 'src/hooks/useGetWidth';
import useComponentVisible from 'src/hooks/useComponentVisible';

const Button = dynamic(() => import('src/components/Button'), { ssr: true });
const NearbyAcademy = dynamic(
    () => import('src/components/include/NearbyAcademy'),
    { ssr: true },
);

const ukFlag = <img src={'static-file/images/uk-flag.svg'}></img>;
const usFlag = <img src={'static-file/images/us-flag.svg'}></img>;
const list = [
    {
        title: 'Weekly Training',
        href: PathRoute.WeeklyTraining,
    },
    {
        title: 'Holiday Camps',
        href: PathRoute.HolidayCamp,
    },
    {
        title: '1-on-1 Training',
        href: PathRoute.OneTraining,
    },
    {
        title: 'Birthday Parties',
        href: PathRoute.BirthdayParty,
    },
];
const LinkItem = (props) => {
    const { title, href, hideMenu } = props;
    return (
        <li onClick={hideMenu} className="menu-link" style={props?.style || {}}>
            <Link href={href || ''} passHref scroll>
                <a style={{ color: props.isOrange === true ? '#EE7925' : '' }}>
                    {title}
                </a>
            </Link>
        </li>
    );
};

function Header() {
    const router = useRouter();
    // console.log(router, 'router');
    const [menuMobile, setMenuMobile] = useState(false);
    const [fixHeader, setFixHeader] = useState(true);
    const [defaultAcademy, setDefaultAcademy] = useState({});
    // const isShowLogo = useGetWidth() > 1240 || useGetWidth() <= 768;
    const isShowLogoHome = useGetWidth() <= 1060;
    const mobile = useGetWidth();
    const [isShowLogo, setIsShowLogo] = useState(mobile);
    const [showSelect, setShowSelect] = useState(false);
    const { ref, isComponentVisible, setIsComponentVisible } =
        useComponentVisible(true);

    useEffect(() => {
        if (!isComponentVisible && showSelect) {
            setShowSelect(false);
        }
    }, [isComponentVisible]);

    useEffect(() => {
        setDefaultAcademy(ModelManager.getLocation() || {});
    }, []);

    useEffect(() => {
        setIsShowLogo(mobile > 1240 || mobile <= 768);
    }, [mobile]);

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
    const { pathname, query, asPath, locales, locale: activeLocale } = router;
    const otherLocales = (locales || []).filter(
        (locale) => locale !== activeLocale,
    );

    return (
        <div className={`header ${fixHeader ? '' : 'fix-header'}`} style={{}}>
            <div className="head-top-mobile">
                <div className="container">
                    <Link href={PathRoute.Home}>
                        <img
                            // src="/static-file/images/logo.svg"
                            loading="lazy"
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
                    <div className="menu-left">
                        {!isShowLogoHome && (
                            <Link href={PathRoute.Home} scroll>
                                <img
                                    loading="lazy"
                                    alt=""
                                    src="/static-file/images/logo.svg"
                                    className="logo"
                                    onClick={hideMenu}
                                />
                            </Link>
                        )}

                        <div ref={ref} className="custom-select">
                            {/* <div
                                className={`select-selected ${
                                    showSelect && 'active'
                                }`}
                                onClick={() => {
                                    setIsComponentVisible(true);
                                    setShowSelect(!showSelect);
                                }}>
                                {router.locale === 'us' ? (
                                    <>{usFlag}&nbsp;US</>
                                ) : (
                                    <>{ukFlag}&nbsp;UK</>
                                )}
                            </div> */}
                            <div
                                className={`select-items ${
                                    !showSelect && 'select-hide'
                                }`}>
                                {otherLocales.map((locale) => {
                                    const { pathname, query, asPath } = router;
                                    return (
                                        <Link
                                            href={{ pathname, query }}
                                            as={asPath}
                                            locale={locale}>
                                            <a
                                                className="select-item"
                                                onClick={() => {
                                                    setShowSelect(false);
                                                }}>
                                                {locale === 'us' ? (
                                                    <>{usFlag}&nbsp;US</>
                                                ) : (
                                                    <>{ukFlag}&nbsp;UK</>
                                                )}
                                            </a>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <ul className="menu">
                        {list.map((item) => (
                            <LinkItem
                                title={item.title}
                                hideMenu={hideMenu}
                                href={`${
                                    !isEmpty(defaultAcademy)
                                        ? '/' +
                                          defaultAcademy.ms_alias +
                                          item.href
                                        : item.href
                                }`}
                            />
                        ))}
                        {isShowLogo && (
                            <li>
                                <Button
                                    style={{
                                        fontSize: 14,
                                        marginLeft: 40,
                                        fontWeight: 500,
                                        letterSpacing: 2.3,
                                    }}
                                    onClick={(evt) => {
                                        // evt.preventDefault();
                                        setMenuMobile(false);

                                        if (defaultAcademy)
                                            global.bookTraining = {
                                                siteSelected: defaultAcademy,
                                            };

                                        router.push(
                                            PathRoute.BookTrialTraining,
                                        );
                                    }}
                                    title={`Book a ${
                                        defaultAcademy &&
                                        defaultAcademy.ms_trial === 1
                                            ? 'trial'
                                            : 'free'
                                    } session`}
                                />
                            </li>
                        )}
                    </ul>
                </div>
                <div className="menu-down">
                    <div
                    // className="container"
                    >
                        {isShowLogo && (
                            <div className="menu-small widget-header">
                                <a
                                    href="https://uk.trustpilot.com/review/wemakefootballers.com"
                                    target="_blank"
                                    // rel="noopener"
                                >
                                    <img
                                        loading="lazy"
                                        src="/static-file/images/header_trustpilot.png"
                                        // height="25px"
                                    ></img>
                                </a>
                            </div>
                        )}
                        <ul className="menu-small">
                            {!isEmpty(defaultAcademy) && (
                                <LinkItem
                                    style={{ marginLeft: 0 }}
                                    isOrange={!menuMobile}
                                    // title={defaultAcademy.ms_name}
                                    title={defaultAcademy.ms_name || ''}
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
                                title={'News'}
                                hideMenu={hideMenu}
                                href={`${
                                    !isEmpty(defaultAcademy)
                                        ? '/' +
                                          defaultAcademy.ms_alias +
                                          PathRoute.HomeNews
                                        : PathRoute.HomeNews
                                }`}
                            />

                            <li className="menu-link">
                                <a
                                    href="https://franchisewmf.com/"
                                    target="_blank"
                                    rel="noreferrer">
                                    Franchise
                                </a>
                            </li>

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

                            {isShowLogo && (
                                <>
                                    <li className="login">
                                        <a
                                            href="https://www.parentarea.co/parent/login"
                                            target="_blank"
                                            rel="noreferrer">
                                            Login
                                        </a>
                                    </li>

                                    {/* <li className="select-mobile">
                                        <div
                                            ref={ref}
                                            className="custom-select-mobile">
                                            <div
                                                className={`select-selected-mobile ${
                                                    showSelect && 'active'
                                                }`}
                                                onClick={() => {
                                                    setIsComponentVisible(true);
                                                    setShowSelect(!showSelect);
                                                }}>
                                                {router.locale === 'us' ? (
                                                    <>{usFlag}&nbsp;US</>
                                                ) : (
                                                    <>{ukFlag}&nbsp;UK</>
                                                )}
                                            </div>
                                            <div
                                                className={`select-items ${
                                                    !showSelect && 'select-hide'
                                                }`}>
                                                {otherLocales.map((locale) => {
                                                    const {
                                                        pathname,
                                                        query,
                                                        asPath,
                                                    } = router;
                                                    return (
                                                        <Link
                                                            href={{
                                                                pathname,
                                                                query,
                                                            }}
                                                            as={asPath}
                                                            locale={locale}>
                                                            <a
                                                                className="select-item"
                                                                onClick={() => {
                                                                    setShowSelect(
                                                                        false,
                                                                    );
                                                                    setMenuMobile(
                                                                        false,
                                                                    );
                                                                }}>
                                                                {locale ===
                                                                'us' ? (
                                                                    <>
                                                                        {usFlag}
                                                                        &nbsp;US
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        {ukFlag}
                                                                        &nbsp;UK
                                                                    </>
                                                                )}
                                                            </a>
                                                        </Link>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </li> */}

                                    <li>
                                        <NearbyAcademy
                                            onChangeLocation={hideMenu}
                                        />
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
