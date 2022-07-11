import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Utils from 'src/common/Utils';
import getFranchiseName from 'src/hooks/useFranchise';
import isEmpty from 'lodash/isEmpty';

RelateAreas.propTypes = {
    site: PropTypes.object,
    article: PropTypes.object,
};

function RelateAreas(props) {
    const [listNearBy, setListNearBy] = useState([]);
    const [isFull, setIsFull] = useState(false);

    useEffect(() => {
        const { site, listSite } = props;
        if (!isEmpty(site) && !isEmpty(listSite)) {
            const list = [...listSite].filter(
                (item) => item.ms_id !== site.ms_id,
            );

            const listNearBy = list.filter(
                (item) =>
                    (item.ms_addresses.map((el) => (
                        el.distance = Utils.getDistanceFromLatLonInKm(
                            site.ms_latitude,
                            site.ms_longitude,
                            el.ms_latitude,
                            el.ms_longitude
                        )
                    )))
            );

            listNearBy.sort((a, b) => a.distance - b.distance);
            setListNearBy([...listNearBy.slice(0, 10)]);
        }
    }, []);

    const siteName = getFranchiseName(props.site) || '';
    return (
        <div className="areas">
            <div className="container">
                <div className="area-cover">
                    <h2>Areas the {siteName} covers:</h2>
                    <div className="list-tag">
                        {props.site &&
                            props.site.sub_page &&
                            props.site.sub_page.map((item, index) => {
                                if (siteName !== item.sub_name) {
                                    return (
                                        <a
                                            key={index}
                                            href={`/${item.sub_alias}`}
                                            className="cover-tag">
                                            {item.sub_name}
                                        </a>
                                    );
                                }
                            })}
                    </div>
                </div>
                <div className="related-areas">
                    <div className="other-academy">
                        <h3>
                            Other academies nearby you might be interested in:
                        </h3>
                        <div className="rList-academy">
                            {!isEmpty(listNearBy) &&
                                listNearBy
                                    .slice(0, isFull ? 10 : 2)
                                    .map((item, index) => (
                                        <>
                                            <div
                                                key={index}
                                                className="rAcademy">
                                                <img
                                                    loading="lazy"
                                                    alt=""
                                                    src={Utils.getThumb(
                                                        item.ms_avatar,
                                                        'c1',
                                                    )}
                                                />
                                                <a
                                                    href={item.ms_alias}
                                                    onclick={(e) => {
                                                        e.preventDefault();
                                                        props.onClickLocation({
                                                            value: item.ms_id,
                                                        });
                                                    }}>
                                                    <p>
                                                        {item.ms_name} -{' '}
                                                        {item.distance?.toFixed(
                                                            2,
                                                        )}
                                                        km
                                                    </p>
                                                </a>
                                            </div>
                                        </>
                                    ))}
                        </div>
                        {!isFull && (
                            <a
                                href="/#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setIsFull(true);
                                }}>
                                See more academies nearby
                            </a>
                        )}
                    </div>
                    <div className="latest-news">
                        <div>
                            <h3>Latest news:</h3>
                            <div className="rList-news">
                                {props.article && (
                                    <div className="rNews">
                                        <img
                                            loading="lazy"
                                            alt=""
                                            src={Utils.getThumb(
                                                props.article.atc_featureImg,
                                                'c2',
                                            )}
                                        />
                                        <p className="rTitle">
                                            {props.article.atc_title}
                                        </p>
                                        <p className="rSapo">
                                            {props.article.atc_sapo}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                        <a href={'/' + props.site.ms_alias + '/news'}>
                            See all {props.site ? props.site.ms_name : ''} news
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RelateAreas;
