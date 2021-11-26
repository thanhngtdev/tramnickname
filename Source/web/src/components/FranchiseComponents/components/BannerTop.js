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

BannerTop.propTypes = {
    site: PropTypes.object,
};

function BannerTop(props) {
    const dispatch = useDispatch();
    const { data } = useSelector((state) => state.homeReducer);
    let options = [];
    const history = useRouter();
    const siteName = getFranchiseName(props.site);

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

    function checkSubname(name = '') {
        if (!name) return '<> </>';

        if (name.includes(' - ')) {
            const split = name.split(' - ');

            return `${split[0]} Academy<br>
            <span className="subname-32">${split[1]}</span>`;
        }

        return `<span>${name}</span>`;
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
                <h1 style={{ lineHeight: '3rem' }}>
                    {/* {`${siteName.replace(' Academy', '')}`} */}
                    {parse(checkSubname(`${siteName.replace(' Academy', '')}`))}
                </h1>
                <div className="box-text">
                    <p>
                        Learn football the right way with the UK’s #1 weekly
                        training programs & holiday camps
                    </p>

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
                            history.push(PathRoute.BookTrialTraining);
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default BannerTop;
