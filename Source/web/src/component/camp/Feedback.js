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

    console.log(props, 'data');
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

                <div
                    style={{ marginTop: 30, float: 'right', height: 27 }}
                    className="trustpilot-widget"
                    data-locale="en-GB"
                    data-template-id="5418015fb0d04a0c9cf721f2"
                    data-businessunit-id="5630b23d0000ff000584db47"
                    data-style-height="300px"
                    data-style-width="100%"
                    data-theme="light"
                    data-stars="4,5"
                    data-review-languages="en">
                    <a
                        className="alink"
                        style={{ color: props.color || 'white' }}
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
