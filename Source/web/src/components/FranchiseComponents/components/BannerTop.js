import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PathRoute from 'src/common/PathRoute';
import Utils from 'src/common/Utils';
import Button from 'src/components/Button';
import getFranchiseName from 'src/hooks/useFranchise';
import { siteActionType } from 'src/redux/actions/actionTypes';
import parse from 'html-react-parser';
import useGetWidth from 'src/hooks/useGetWidth';

BannerTop.propTypes = {
    site: PropTypes.object,
};

function BannerTop(props) {
    const isSubPage = props.isSubPage;
    const dispatch = useDispatch();
    const { data } = useSelector((state) => state.homeReducer);
    let options = [];
    const history = useRouter();
    const siteName = getFranchiseName(props.site);
    const isMobile = useGetWidth() <= 768;

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

    useEffect(() => {
        console.log(data, 'datahome');
    }, [data]);

    function checkSubname(item) {
        if (isSubPage) {
            return `Football Coaching near ${siteName}<br>
                    <span className="subname-32"> By We Make Footballers: ${
                        item.ms_name || ''
                    }</span>`;
        } else {
            return `${item.ms_name} <br>
            <span className="subname-32">${item.sub_name.text || ''}</span>`;
        }

        if (!name) return '<> </>';

        if (name.includes(' - ')) {
            const split = name.split(' - ');
        }

        return `<span>${name}</span>`;
    }

    return (
        <div
            className="banner-top"
            style={{
                backgroundImage: `url(${Utils.getThumb(
                    !isMobile
                        ? data?.bannerTop?.cfg_image
                        : data?.bannerTop?.cfg_mobileBanner,
                )})`,
            }}>
            <div className="container">
                <h1 style={{ lineHeight: '4rem' }}>
                    {/* {`${siteName.replace(' Academy', '')}`} */}
                    {parse(checkSubname(props.site))}
                </h1>
                <h2 className="box-text">
                    <p>
                        {isSubPage
                            ? `${props?.masterData?.about?.cfg_des} near ${siteName}`
                            : `${props?.masterData?.about?.cfg_des}`}
                    </p>
                </h2>
                <Button
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
        </div>
    );
}

export default BannerTop;
