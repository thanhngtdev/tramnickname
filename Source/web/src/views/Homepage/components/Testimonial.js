/* eslint-disable class-methods-use-this */
/* eslint-disable global-require */
/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from 'react';
import 'slick-carousel/slick/slick.css';
import 'css/slick-theme.css';
import Slider from 'react-slick';
import { useDispatch, useSelector } from 'react-redux';
import type from 'redux/actions/actionTypes';
import Utils from 'common/Utils';
import { getHome } from 'redux/actions/homeAction';

const settings = {
    dots: true,
    infinite: false,
    speed: 300,
    slidesToShow: 2,
    slidesToScroll: 2,
    responsive: [
        {
            breakpoint: 1920,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                autoplaySpeed: 6000,
                infinite: true,
                dots: true,
            },
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplaySpeed: 6000,
                autoplay: true,
                infinite: true,
            },
        },
    ],
};

function Testimonial(props) {
    const [lstFb, setLstFb] = useState([]);
    const homeReducer = useSelector((state) => state.homeReducer);
    const dispatch = useDispatch();
    
    useEffect(() => {
        if(!lstFb[0]){
            dispatch(getHome());
        }
    },[lstFb]);

    useEffect(() => {
        if (homeReducer.type) {
            if (homeReducer.type === type.GET_HOME_SUCCESS) {
                setLstFb(homeReducer.data.testimonial);
            }
        }
    }, [homeReducer]);

    return (
        <div className={`box-slide-review ${props.style}`}>
            <Slider className="slide responsive" {...settings}>
                {lstFb &&
                    lstFb.map((item, index) => (
                        <div key={index} className="col-6">
                            <div className="box-acc-review">
                                <img
                                    alt=""
                                    src={Utils.getThumb(item.fb_image)}
                                    className="avatar"
                                />
                                <div className="info">
                                    <p className="description">
                                        {item.fb_content}
                                    </p>
                                    <h3 className="name">
                                        {item.fb_name}, {item.fb_role}
                                    </h3>
                                </div>
                            </div>
                        </div>
                    ))}
            </Slider>
            <div
                style={{ marginTop: 30, float: 'right', height: 20 }}
                className="trustpilot-widget"
                data-locale="en-GB"
                data-template-id="5418015fb0d04a0c9cf721f2"
                data-businessunit-id="5630b23d0000ff000584db47"
                data-style-height="30px"
                data-style-width="100%"
                data-theme="light"
                data-stars="4,5"
                data-review-languages="en">
                <a
                    className="alink"
                    href="https://uk.trustpilot.com/review/wemakefootballers.com"
                    target="_blank"
                    rel="noopener">
                    See more Reviews
                </a>
            </div>
        </div>
    );
}
export default Testimonial;
