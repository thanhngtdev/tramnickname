import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Testimonial from './Testimonial';
import Gallery from './ImageGallery';
import type from 'redux/actions/actionTypes';
import Utils from 'common/Utils';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import PathRoute from 'common/PathRoute';

WhatWeDo.propTypes = {
    gallery: PropTypes.object,
};

const ROUTE = [PathRoute.WeeklyTraining, PathRoute.HolidayCamp];

function WhatWeDo(props) {
    const [whatWeDo, setWhatWeDo] = useState({});
    const homeReducer = useSelector((state) => state.homeReducer);

    useEffect(() => {
        if (homeReducer.type) {
            if (homeReducer.type === type.GET_HOME_SUCCESS) {
                setWhatWeDo(homeReducer.data.whatWeDo);
            }
        }
    }, [homeReducer]);

    return (
        <div>
            <div className="container">
                <h2 className="heading-w">What we do</h2>
                <p className="text-1">{whatWeDo.cfg_des}</p>
            </div>
            <div className="box-bg-orange">
                <div className="container">
                    <div className="list-item-card-2">
                        <div className="row">
                            {whatWeDo.cfg_value &&
                                whatWeDo.cfg_value.map((item, index) => (
                                    <div className="col-6" key={index}>
                                        <div className="item">
                                            <img
                                                alt=""
                                                src={Utils.getThumb(item.icon)}
                                                className="img"
                                            />
                                            <h3 className="title">
                                                {item.title}
                                            </h3>
                                            <p className="description">
                                                {item.des}
                                            </p>
                                            <Link
                                                to={ROUTE[index]}
                                                className="more">
                                                MORE INFORMATION
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                    {/* box slide review */}
                    <Testimonial />

                    {/* professional */}
                    <Gallery gallery={props.gallery} />
                </div>
            </div>
        </div>
    );
}

export default WhatWeDo;
