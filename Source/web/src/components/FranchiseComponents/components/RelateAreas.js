import React from 'react';
import Utils from 'src/common/Utils';
import PropTypes from 'prop-types';
import PathRoute from 'src/common/PathRoute';
import { LazyLoadImage } from 'react-lazy-load-image-component';

RelateAreas.propTypes = {
    site: PropTypes.object,
    article: PropTypes.object,
};

function RelateAreas(props) {
    return (
        <div className="areas">
            <div className="container">
                <div className="area-cover">
                    <h2>
                        Areas the {props.site ? props.site.ms_name : ''} academy
                        covers:
                    </h2>
                    <div className="list-tag">
                        {props.site &&
                            props.site.sub_page &&
                            props.site.sub_page.map((item, index) => (
                                <a
                                    key={index}
                                    href={`/${item.sub_alias}`}
                                    className="cover-tag">
                                    {item.sub_name}
                                </a>
                            ))}
                    </div>
                </div>
                <div className="related-areas">
                    <div className="other-academy">
                        <h3>
                            Other academies nearby you might be interested in:
                        </h3>
                        <div className="rList-academy">
                            {props &&
                                props.site &&
                                props.site.associalted &&
                                props.site.associalted.map((item, index) => (
                                    <div key={index} className="rAcademy">
                                        <LazyLoadImage
                                            alt=""
                                            src={Utils.getThumb(
                                                item.ms_avatar,
                                                'c1',
                                            )}
                                        />
                                        <p>
                                            {item.ms_name} -{' '}
                                            {item.distance.toFixed(2)}KM
                                        </p>
                                    </div>
                                ))}
                        </div>
                        <a href="/#">See more academies nearby</a>
                    </div>
                    <div className="latest-news">
                        <div>
                            <h3>Latest news:</h3>
                            <div className="rList-news">
                                {props.article && (
                                    <div className="rNews">
                                        <img
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
                        <a href={PathRoute.HomeNews}>
                            See all {props.site ? props.site.ms_name : ''} news
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RelateAreas;
