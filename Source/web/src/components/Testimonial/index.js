import isEmpty from 'lodash/isEmpty';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'react-slick';
import Utils from 'src/common/Utils';
import { getHome } from 'src/redux/actions/homeAction';
import { showTruspilot } from 'src/redux/actions/trustpilotAction';

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
        if (isEmpty(props.data)) {
            if (!isEmpty(testimonial)) {
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
                                    <img
                                        loading="lazy"
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
                <a
                    style={{
                        // cursor: 'pointer',
                        color: `${props.textColor}`,
                    }}
                    className="trustpilot"
                    target="_blank"
                    href="https://www.trustpilot.com/review/wemakefootballers.com">
                    <p>See more Reviews</p>
                </a>
            </div>
        </div>
    );
}
export default React.memo(Testimonial);
