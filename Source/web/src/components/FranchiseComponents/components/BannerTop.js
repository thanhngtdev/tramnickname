import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PathRoute from 'src/common/PathRoute';
import Utils from 'src/common/Utils';
import Button from 'src/components/Button';
import getFranchiseName from 'src/hooks/useFranchise';
import { siteActionType } from 'src/redux/actions/actionTypes';
import parse from 'html-react-parser';
import useGetWidth from 'src/hooks/useGetWidth';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowRight,
    faMousePointer,
    faPhone,
} from '@fortawesome/free-solid-svg-icons';
import dynamic from 'next/dynamic';
import saveList from 'src/hooks/useSaveList';
import siteService from 'src/services/siteService';
import isEmpty from 'lodash/isEmpty';
BannerTop.propTypes = {
    site: PropTypes.object,
};



const style = {
    fontSize: 14,
    fontWeight: 500,
    letterSpacing: 2.3,
    backgroundColor: 'white',
    border: '1px solid #ef9042',
    color: '#ef9042',
    // marginTop: 25,
    textAlign: 'left',
};

function BannerTop(props) {
    const isSubPage = props.isSubPage;
    const dispatch = useDispatch();
    const { defaultTypeform } = useSelector((state) => state.homeReducer);
    const { data } = useSelector((state) => state.homeReducer);
    let options = [];
    const history = useRouter();
    const siteName = getFranchiseName(props.site);
    const isMobile = useGetWidth() <= 768;
    const [showVideo, setShowVIdeo] = useState(false);

    const onClickTypeorm = () => {
        history.push(PathRoute.BookTrialTrainingWithAlias(props.site.ms_alias));
    };

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

    function checkSubname(item) {
        const isMobile = useGetWidth() <= 768;
        if (isSubPage) {
            return `Football Coaching near ${siteName}<br>
                    <span className="subname-32"> By We Make Footballers: ${
                        item.ms_name || ''
                    }</span>`;
        }

        if (item.sub_name?.text) {
            return `Football training for kids in ${
                item.location_name.text
            } <br>
            <span className="subname-32">${item.ms_name || ''}, ${
                item.sub_name.text
            }</span>`;
        }

        if (isMobile) {
            return `${item.ms_name || ''}`;
        }

        return `Football training for kids in ${item.location_name.text} <br>
        <span className="subname-32">${item.ms_name || ''}</span>`;
    }

    return (
        <div
            // className="banner-top"
            className={`${
                !props.isHeader && isMobile
                    ? 'banner-top bgUnset'
                    : 'banner-top'
            }`}
            style={{
                backgroundImage: `url(${Utils.getThumb(
                    !isMobile
                        ? data?.bannerTop?.cfg_image
                        : data?.bannerTop?.cfg_mobileBanner,
                )})`,
                marginTop: `${isMobile ? '0' : '60px'}`,
            }}>
            {/* <div className="container banner"> */}
            <div
                className={`${
                    props.isHeader
                        ? 'container banner mobileHeader'
                        : 'container banner'
                }`}>
                <div className="right-arrow"></div>

                {/* <div className="banner_left"> */}
                <div
                    className={`${
                        !props.isHeader && isMobile
                            ? 'banner_left displayNone'
                            : 'banner_left'
                    }`}>
                    <h1>{parse(checkSubname(props.site))}</h1>
                    <div className="box-text">
                        {isSubPage
                            ? `${props?.masterData?.about?.cfg_des} near ${siteName}`
                            : `${props?.masterData?.about?.cfg_des}`}
                    </div>
                    <Button
                        idTypeForm={
                            props.site.ms_use_typeform === 1
                                ? props.site.ms_typeform_id
                                : null
                        }
                        style={{ width: 350 }}
                        title={`${
                            props.site && props.site.ms_trial === 1
                                ? 'Book a trial session'
                                : 'Try a free session'
                        }`}
                        onClick={(evt) => {
                            dispatch({
                                type: siteActionType.SELECT_ACADEMY,
                                data: props.site,
                            });

                            history.push(
                                PathRoute.BookTrialTrainingWithAlias(
                                    props.site.ms_alias,
                                ),
                            );
                        }}
                    />
                </div>
                <div className="banner_right">
                    <div className="banner_right_box">
                        <div className="box_title">
                            <div className="title">
                                <b>Try a free training session</b>
                            </div>
                            <p className="sub_title">
                                to experience our training
                            </p>
                        </div>
                        <div
                            className={`${
                                isMobile
                                    ? 'box_contact isMobile'
                                    : 'box_contact'
                            }`}>
                            {/* <div className='box_contact'> */}
                            <Button
                                style={style}
                                onClick={(evt) => {}}
                                title={
                                    <a
                                        style={{ color: '#EF9042' }}
                                        className="phone"
                                        href={`tel:${
                                            props.site
                                                ? props.site.ms_phone
                                                : ''
                                        }`}>
                                        <b className="contact-book__bannertop">
                                            {props.site.ms_phone}
                                        </b>
                                    </a>
                                }
                                icon={
                                    <FontAwesomeIcon
                                        icon={faPhone}
                                        flip="horizontal"
                                        style={{
                                            color: '#EE7925',
                                            fontSize: '1.1rem',
                                            marginRight: '0.5rem',
                                            marginLeft: '0.5rem',
                                        }}
                                    />
                                }
                            />
                            <Button
                                style={style}
                                idTypeForm={
                                    defaultTypeform?.use_typeform === 1
                                        ? defaultTypeform?.default_typeform_id
                                        : null
                                }
                                onClick={onClickTypeorm}
                                title={
                                    <b className="contact-book__bannertop">{`Book a ${
                                        props.site && props.site.ms_trial === 1
                                            ? 'trial'
                                            : 'free'
                                    } session`}</b>
                                }
                                icon={
                                    <FontAwesomeIcon
                                        icon={faMousePointer}
                                        style={{
                                            color: '#EE7925',
                                            fontSize: '1.1rem',
                                            marginRight: '0.5rem',
                                            marginLeft: '0.5rem',
                                        }}
                                    />
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BannerTop;
