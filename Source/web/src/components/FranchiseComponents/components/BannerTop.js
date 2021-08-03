import PathRoute from 'src/common/PathRoute';
import { CommonStyle } from 'src/common/Styles';
import Utils from 'src/common/Utils';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { siteActionType } from 'src/redux/actions/actionTypes';
import { LazyLoadImage } from 'react-lazy-load-image-component';

BannerTop.propTypes = {
    site: PropTypes.object,
};

function BannerTop(props) {
    const dispatch = useDispatch();
    const history = useRouter();
    const { data } = useSelector((state) => state.homeReducer);
    const { franchise } = history.query;
    let alias = franchise;
    let siteName = '';
    let options = [];

    if (props.site.ms_alias) siteName = props.site.ms_name;
    else if (props.site && props.site.sub_page) {
        props.site.sub_page.map((item) => {
            if (item.sub_alias === alias) siteName = item.sub_name;
        });
    }

    let fbLink = '',
        twLink = '',
        igLink = '';
    if (props.social && props.social.length > 0) {
        props.social.map((item) => {
            if (item.name === 'Facebook') fbLink = item.link;
            if (item.name === 'Instagram') igLink = item.link;
            if (item.name === 'Twitter') twLink = item.link;
        });
    }

    if (props.site) {
        options.push({
            label: props.site.ms_address,
            alias: props.site.ms_alias,
            value: props.site.ms_id,
        });
        props.site.associalted &&
            props.site.associalted.map((item) =>
                options.push({
                    label: item.ms_address,
                    alias: item.ms_alias,
                    value: item.ms_id,
                }),
            );
    }

    return (
        <div
            className="banner-top"
            style={{
                backgroundImage: `url(${Utils.getThumb(
                    data?.bannerTop?.cfg_value[0]?.image,
                )})`,
            }}>
            <div className="container">
                <h1>{siteName} Academy</h1>
                <div className="box-text">
                    <p>
                        Learn football the right way with the UK’s #1 weekly
                        training programs & holiday camps
                    </p>
                    <a
                        href="/#"
                        className="btn-book"
                        onClick={(evt) => {
                            localStorage.setItem(
                                'defaultAcademy',
                                JSON.stringify(props.site),
                            );
                            dispatch({
                                type: siteActionType.PICK_DEFAULT_ACADEMY,
                            });
                            evt.preventDefault();
                            history.push(PathRoute.BookTrialTraining);
                        }}>
                        {props.site && props.site.ms_trial === 1
                            ? 'Book a trial session'
                            : 'Try a free session'}
                    </a>
                </div>
                <div className="academy-info">
                    <div className="group-info">
                        <label className="group-name">Address</label>
                        <div className="wrap-contact">
                            {options.length > 1 ? (
                                <div>
                                    <Select
                                        value={options[0]}
                                        options={options}
                                        isSearchable={false}
                                        isMulti={false}
                                        styles={CommonStyle.select2}
                                        onChange={(option) => {
                                            history.push('/' + option.alias);
                                        }}
                                    />
                                    <p className="appendix">
                                        *{props.site && props.site.ms_name} has{' '}
                                        {options.length} different locations.
                                        Choose your preference here
                                    </p>
                                </div>
                            ) : (
                                <p style={{ margin: '8px 16px' }}>
                                    {options[0].label}
                                </p>
                            )}

                            <a
                                className="text-express-enquiry"
                                style={{
                                    margin: '10px 16px',
                                }}
                                href=""
                                onClick={() => {
                                    localStorage.setItem(
                                        'defaultAcademy',
                                        JSON.stringify(props.site),
                                    );
                                    dispatch({
                                        type: siteActionType.PICK_DEFAULT_ACADEMY,
                                    });
                                    window.location.reload();
                                }}>
                                Make this my default location
                            </a>
                        </div>
                    </div>
                    <div className="group-info">
                        <label className="group-name">Contact</label>
                        <div style={{ paddingTop: '6px' }}>
                            <a
                                className="text-express-enquiry"
                                href={PathRoute.Contact}>
                                Make an enquiry
                            </a>
                            <div>
                                <p className="text-express">
                                    Phone (9am - 5pm):{' '}
                                    <a
                                        className="phone"
                                        href={`tel:${
                                            props.site
                                                ? props.site.ms_phone
                                                : ''
                                        }`}>
                                        {props.site ? props.site.ms_phone : ''}
                                    </a>
                                </p>
                            </div>

                            <div>
                                <a
                                    href={fbLink}
                                    target="_blank"
                                    rel="noreferrer">
                                    <LazyLoadImage
                                        alt=""
                                        src={
                                            'static-file/images/icon-fb-small.png'
                                        }
                                    />
                                </a>
                                <a
                                    href={twLink}
                                    target="_blank"
                                    rel="noreferrer">
                                    <LazyLoadImage
                                        alt=""
                                        src={
                                            'static-file/images/icon-twitter-small.png'
                                        }
                                    />
                                </a>
                                <a
                                    href={igLink}
                                    target="_blank"
                                    rel="noreferrer">
                                    <LazyLoadImage
                                        alt=""
                                        src={
                                            'static-file/images/icon-insta-small.png'
                                        }
                                    />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BannerTop;
