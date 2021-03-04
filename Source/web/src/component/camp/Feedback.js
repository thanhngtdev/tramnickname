import React from 'react';
import Slider from 'react-slick';
import Utils from '../../common/Utils';
import PropTypes from 'prop-types';

Feedback.propTypes = {
    data: PropTypes.array,
    color: PropTypes.string,
};

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

export default function Feedback(props) {
    // if (props && props.data && props.data.length < 2) {
    //     settings.slidesToShow = 1;
    //     settings.slidesToScroll = 1;
    //     settings.responsive[0].settings.slidesToShow = 1;
    //     settings.responsive[0].settings.slidesToScroll = 1;
    // }

    // console.log(props, 'data');
    return (
        <div className="container">
            <div className="">
                <Slider className="slide responsive" {...settings}>
                    {props.data &&
                        props.data.map((item, index) => (
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

                <div style={{ marginTop: -10, float: 'right', height: 20 }}>
                    <a
                        className="alink"
                        href="https://uk.trustpilot.com/review/wemakefootballers.com"
                        target="_blank"
                        rel="noopener">
                        See more Reviews
                    </a>
                </div>
            </div>
        </div>
    );
}
