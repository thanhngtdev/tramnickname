import isEmpty from 'lodash/isEmpty';
import Link from 'next/link';
import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ModelManager from 'src/common/ModelManager';
import PathRoute from 'src/common/PathRoute';
import useComponentVisible from 'src/hooks/useComponentVisible';
import siteService from 'src/services/siteService';

function Footer() {
    //! state
    const { listSite } = useSelector((state) => state.listSiteReducer);
    const [showSelect, setShowSelect] = useState(false);
    const [footerConfig, setFooterConfig] = useState([]);
    const [defaultAcademy, setDefaultAcademy] = useState({});
    const { ref, isComponentVisible, setIsComponentVisible } =
        useComponentVisible(true);

    //! useEffect
    useEffect(() => {
        setDefaultAcademy(ModelManager.getLocation() || {});
        callFooterApi();
    }, []);

    useEffect(() => {
        if (!isComponentVisible && showSelect) {
            setShowSelect(!showSelect);
        }
    }, [isComponentVisible]);

    //! function
    // function onClickLocation(event, item) {
    //     setShowSelect(!showSelect);
    //     // localStorage.setItem('defaultAcademy', JSON.stringify(item));
    //     // console.log(item);
    //     // return;

    //     Utils.setDefaultAcademy(item.ms_id);

    //     window.location.href = `${'/' + item.ms_alias}`;
    // }

    const onClickLocation = async (item) => {
        setShowSelect(!showSelect);

        try {
            const res = await siteService.getDetailSite({ id: item.ms_id });
            if (res.data.status == 200) {
                const item = res.data?.data?.site || {};
                localStorage.setItem('defaultAcademy', JSON.stringify(item));
                window.location.href = `${'/' + item.ms_alias}`;
            }
        } catch (error) {
            console.log(error);
        }
    };

    const callFooterApi = async () => {
        try {
            const res = await siteService.getFooterConfig();
            if (res.data.status == 200) {
                setFooterConfig(res.data.data.cfg_value);
            }
            // console.log(res.data, "footer");
        } catch (error) {
            console.log(error);
        }
    };

    //! return
    return (
        <div className="footer">
            <div className="container">
                <div className="box-contact">
                    <img
                        loading="lazy"
                        src={'/static-file/images/logo-white.png'}
                        alt=""
                        height={'100%'}
                        width={'100%'}
                    />
                    <ul className="list">
                        {/* <li className="mail">
                            <a
                                // href={`mailto:${defaultAcademy ? defaultAcademy.ms_email : ""}`}
                                href={`mailto:${
                                    footerConfig && footerConfig[2]?.des
                                }`}>
                                Make an enquiry
                            </a>
                        </li> */}
                        <li className="mail">
                            <Link href={PathRoute.Contact} scroll>
                                Make an enquiry
                            </Link>
                        </li>

                        <li className="call">
                            <a
                                href={`tel:${
                                    (defaultAcademy &&
                                        defaultAcademy.ms_phone) ||
                                    (footerConfig && footerConfig[1]?.des)
                                }`}
                                // href={`tel:${footerConfig && footerConfig[1]?.des}`}
                            >
                                {(defaultAcademy && defaultAcademy.ms_phone) ||
                                    (footerConfig && footerConfig[1]?.des)}
                                {/* {footerConfig && footerConfig[1]?.des} */}
                            </a>
                        </li>
                        <li className="calender"> Mon-Fri 9am - 5pm </li>
                    </ul>
                </div>
                <div className="box-right">
                    <ul className="list">
                        <li>
                            <Link href={PathRoute.AboutUs}>About Us</Link>
                        </li>
                        <li>
                            <Link
                                href={`${
                                    !isEmpty(defaultAcademy)
                                        ? '/' +
                                          defaultAcademy.ms_alias +
                                          PathRoute.JoinUs
                                        : PathRoute.JoinUs
                                }`}
                                scroll>
                                Join Us
                            </Link>
                        </li>
                        <li>
                            <Link href={PathRoute.SchoolTraining} scroll>
                                School Partnerships
                            </Link>
                        </li>
                        <li>
                            <a
                                href="https://franchisewmf.com/"
                                target="_blank"
                                rel="noreferrer">
                                Franchise With Us
                            </a>
                        </li>
                        <li>
                            <Link href={PathRoute.ListQNA}>FAQs</Link>
                        </li>
                    </ul>
                    <ul className="list">
                        <li>
                            <Link href="/location">Locations</Link>
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
                            <Link
                                href={`${
                                    !isEmpty(defaultAcademy)
                                        ? '/' +
                                          defaultAcademy.ms_alias +
                                          PathRoute.HomeNews
                                        : PathRoute.HomeNews
                                }`}>
                                News
                            </Link>
                        </li>
                        <li>
                            <div ref={ref} className="custom-select">
                                <div
                                    className={`select-selected ${
                                        showSelect && 'active'
                                    }`}
                                    onClick={() => {
                                        setIsComponentVisible(true);
                                        setShowSelect(!showSelect);
                                    }}>
                                    {defaultAcademy?.ms_name
                                        ? defaultAcademy?.ms_name.substring(
                                              0,
                                              15,
                                          )
                                        : 'Select an acade'}
                                </div>
                                <div
                                    className={`select-items ${
                                        !showSelect && 'select-hide'
                                    }`}>
                                    {listSite.map((item) => (
                                        <div
                                            key={item.ms_id}
                                            onClick={(e) => {
                                                onClickLocation(item);
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
                    {defaultAcademy?.social ? (
                        <Fragment>
                            {defaultAcademy.social.map((item) => {
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
                        <Link href="/policies/privacy">Privacy Policy</Link>|
                        <Link href={PathRoute.ListQNA}> FAQ</Link>
                        <span>|</span>
                        <Link href="/policies">Terms &amp; Conditions</Link>|
                        {/* <a
                            // onClick={(e) => {
                            //     e.preventDefault();
                            //     window.location.href = `/sitemap.xml`;
                            // }}
                            href="/sitemap.xml"\
                        >
                            Sitemap
                        </a> */}
                        <Link href="/sitemap.xml">Sitemap</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
