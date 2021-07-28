import Link from 'next/link';
import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import PathRoute from 'src/common/PathRoute';
import Utils from 'src/common/Utils';

const propTypes = {};
const route = [PathRoute.WeeklyTraining, PathRoute.HolidayCamp];
const AboutType = ({ data }) => {
    //! State

    //! Function

    //! Render
    return (
        <div className="about-type">
            <div className="container">
                <h2
                    className="heading-w"
                    style={{
                        maxWidth: '800px',
                        marginRight: 'auto',
                        marginLeft: 'auto',
                    }}>
                    {data.about5.cfg_title}
                </h2>
                <p className="text-1">{data.about5.cfg_des}</p>
            </div>
            <div className="type-anchor">
                <div className="container">
                    <div className="list-item-card-2">
                        <div className="row">
                            {data.about5.cfg_value.map((item, index) => (
                                <div key={index} className="col-6">
                                    <div className="item">
                                        <LazyLoadImage
                                            alt=""
                                            src={Utils.getThumb(item.icon)}
                                            className="img"
                                        />
                                        <p className="title">{item.title}</p>
                                        <p className="description">
                                            {item.des}
                                        </p>
                                        <Link href={route[index]} passHref>
                                            <a className="more">
                                                MORE INFORMATION
                                            </a>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

AboutType.propTypes = propTypes;
export default AboutType;
