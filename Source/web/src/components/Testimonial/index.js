import isEmpty from 'lodash/isEmpty';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'react-slick';
import Utils from 'src/common/Utils';
import { getHome } from 'src/redux/actions/homeAction';
import { showTruspilot } from 'src/redux/actions/trustpilotAction';
import useGetWidth from 'src/hooks/useGetWidth';


const settings = {
    dots: true,
    infinite: false,
    speed: 1000,
    slidesToShow: 2,
    slidesToScroll: 2,
    responsive: [
        {
            breakpoint: 1920,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                autoplaySpeed: 2500,
                infinite: true,
                dots: true,
            },
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplaySpeed: 2500,
                autoplay: true,
                infinite: true,
            },
        },
    ],
};

function Testimonial(props) {
    // console.log(
    //     process.env.BASE_URL_API,
    //     process.env.STORAGE_URL_API,
    //     'process.env.STORAGE_URL;',
    // );
    const isMobile = useGetWidth() <= 768;
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
    }, [props.data, testimonial]);

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
                                        <p className="description" style={{color: `${isMobile ? '#000':''}`}}>
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
                        color: `${isMobile?'#000':`${props.textColor}`}`
                        // color: `${props.textColor}`,
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
