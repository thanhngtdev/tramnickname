import PropTypes from 'prop-types';
import React from 'react';
import Utils from 'src/common/Utils';
import getFranchiseName from 'src/hooks/useFranchise';

RelateAreas.propTypes = {
    site: PropTypes.object,
    article: PropTypes.object,
};

function RelateAreas(props) {
    // console.log(props, 'props');

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
                        {props?.site?.associalted.length > 0 && (
                            <>
                                <h3>
                                    Other academies nearby you might be
                                    interested in:
                                </h3>
                                <div className="rList-academy">
                                    {props.site.associalted.map(
                                        (item, index) => (
                                            <>
                                                <div
                                                    key={index}
                                                    className="rAcademy">
                                                    <a
                                                        href={item.ms_alias}
                                                        onclick={(e) => {
                                                            e.preventDefault();
                                                            props.onClickLocation(
                                                                {
                                                                    value: item.ms_id,
                                                                },
                                                            );
                                                        }}>
                                                        <img
                                                            loading="lazy"
                                                            alt=""
                                                            src={Utils.getThumb(
                                                                item.ms_avatar,
                                                                'c1',
                                                            )}
                                                            // height="100px"
                                                            // width="100px"
                                                        />
                                                        <p>
                                                            {item.ms_name} -{' '}
                                                            {item.distance.toFixed(
                                                                2,
                                                            )}
                                                            KM
                                                        </p>
                                                    </a>
                                                </div>
                                            </>
                                        ),
                                    )}
                                </div>
                                <a href="/#">See more academies nearby</a>
                            </>
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
                                                'c1',
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
