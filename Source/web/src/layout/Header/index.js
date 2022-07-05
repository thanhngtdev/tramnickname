import isEmpty from 'lodash/isEmpty';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ModelManager from 'src/common/ModelManager';
import PathRoute from 'src/common/PathRoute';
import useComponentVisible from 'src/hooks/useComponentVisible';
import useGetWidth from 'src/hooks/useGetWidth';
import { saveDefautConfig } from 'src/redux/actions/homeAction';
import siteService from 'src/services/siteService';

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
    const dispatch = useDispatch();
    const router = useRouter();
    const academyLocation = router.query.franchise;
    const { listSite } = useSelector((state) => state.listSiteReducer);
    const { defaultTypeform } = useSelector((state) => state.homeReducer);
    const defaultAcademyss = listSite.find(
        (e) => academyLocation === e.ms_alias,
    );
    const [menuMobile, setMenuMobile] = useState(false);
    const [fixHeader, setFixHeader] = useState(true);
    const [defaultAcademy, setDefaultAcademy] = useState({});
    const isShowLogoHome = useGetWidth() <= 1060;
    const mobile = useGetWidth();
    const [isShowLogo, setIsShowLogo] = useState(mobile);
    const [showSelect, setShowSelect] = useState(false);
    const { ref, isComponentVisible, setIsComponentVisible } =
        useComponentVisible(true);
    const { pathname, query, asPath, locales, locale: activeLocale } = router;
    const otherLocales = (locales || []).filter(
        (locale) => locale !== activeLocale,
    );
    
    useEffect(() => {
        if (!isComponentVisible && showSelect) {
            setShowSelect(false);
        }
    }, [isComponentVisible]);

    useEffect(() => {
        async function getDefaultTypeForm() {
            try {
                const res = await siteService.getHome();
                if (res?.data?.status === 200 && res?.data?.data) {
                    const { defaultConfig } = res?.data?.data;
                    // console.log(defaultConfig, 'defaultConfig');
                    defaultConfig &&
                        dispatch(
                            saveDefautConfig({ defaultConfig: defaultConfig }),
                        );
                }
            } catch (error) {
                console.log(error, 'error');
            }
        }

        const selectedAcademy = ModelManager.getLocation();
        if (!isEmpty(selectedAcademy)) {
            dispatch(
                saveDefautConfig({
                    defaultConfig: {
                        default_typeform_id: selectedAcademy.ms_typeform_id,
                        use_typeform: selectedAcademy.ms_use_typeform,
                    },
                }),
            );
        } else {
            getDefaultTypeForm();
        }

        setDefaultAcademy(selectedAcademy);
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

    useEffect(() => {
        if (defaultAcademyss) {
            setDefaultAcademy(defaultAcademyss);
        }
    }, [defaultAcademyss]);

    return (
        <div className={`header ${fixHeader ? '' : 'fix-header'}`} style={{}}>
            <div className="head-top-mobile">
                <div className="container displayFlex">
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
                    <ul className='menu-small'>
                        <li className='menu-link'>
                            <NearbyAcademy
                                onChangeLocation={hideMenu}
                                isHeader={true}
                                defaultAcademyProps={
                                    defaultAcademyss
                                }
                            />
                        </li>
                    </ul>
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
                        {list &&
                            list.map((item) => (
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
                                    idTypeForm={
                                        defaultTypeform?.use_typeform === 1
                                            ? defaultTypeform?.default_typeform_id
                                            : null
                                    }
                                    onClick={(evt) => {
                                        setMenuMobile(false);
                                        if (defaultAcademyss === undefined) {
                                            if (defaultAcademy) {
                                                router.push(
                                                    PathRoute.BookTrialTrainingWithAlias(
                                                        defaultAcademy.ms_alias,
                                                    ),
                                                );
                                            } else {
                                                router.push(
                                                    PathRoute.BookTrialTraining,
                                                );
                                            }
                                        } else if (defaultAcademyss) {
                                            router.push(
                                                PathRoute.BookTrialTrainingWithAlias(
                                                    defaultAcademyss.ms_alias,
                                                    {
                                                        step: 1,
                                                    },
                                                ),
                                            );
                                        }
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
                                    title={
                                        defaultAcademy
                                            ? defaultAcademy.ms_name
                                            : ''
                                    }
                                    // title={
                                    //     defaultAcademyss === undefined
                                    //         ? ''
                                    //         : defaultAcademy.ms_name
                                    // }
                                    hideMenu={hideMenu}
                                    // href={
                                    //     defaultAcademyss
                                    //         ? `/${defaultAcademyss.ms_alias}`
                                    //         : `/${defaultAcademy.ms_alias}`
                                    // }
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

                                    <li>
                                        <NearbyAcademy
                                            onChangeLocation={hideMenu}
                                            defaultAcademyProps={
                                                defaultAcademyss
                                            }
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
