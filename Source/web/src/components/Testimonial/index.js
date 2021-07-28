/* eslint-disable class-methods-use-this */
/* eslint-disable global-require */
/* eslint-disable react/no-unescaped-entities */
import Utils from 'src/common/Utils';
// import 'css/slick-theme.css';
import _ from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'react-slick';
import { getHome } from 'src/redux/actions/homeAction';
// import { showTruspilot } from "redux/actions/trustpilotAction";
import 'slick-carousel/slick/slick.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
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
    const isFirstRun = useRef(true);
    const [lstFb, setLstFb] = useState([]);
    const dispatch = useDispatch();
    const { testimonial } = useSelector((state) => state.homeReducer);

    useEffect(() => {
        if (_.isEmpty(props.data)) {
            if (!_.isEmpty(testimonial)) {
                setLstFb(testimonial);
            } else {
                dispatch(
                    getHome({
                        callbacks: {
                            onSuccess: (res) => {
                                setLstFb(res?.data?.data?.testimonial);
                            },
                            onFailed: () => {},
                        },
                    }),
                );
            }
        } else {
            setLstFb(props.data);
        }
    }, [props.data]);

    return (
        <div className="container">
            <div
                className={`box-slide-review ${props.style}`}
                style={{ position: 'relative' }}>
                <Slider className="slide responsive" {...settings}>
                    {lstFb &&
                        lstFb.map((item, index) => (
                            <div key={index} className="col-6">
                                <div className="box-acc-review">
                                    <LazyLoadImage
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
                    style={{
                        color: `${props.textColor}`,
                    }}
                    className="trustpilot"
                    onClick={() => {
                        // dispatch(
                        //   showTruspilot({
                        //     show: true,
                        //   })
                        // );
                    }}>
                    <p>See more Reviews</p>
                </div>
            </div>
        </div>
    );
}
export default React.memo(Testimonial);
