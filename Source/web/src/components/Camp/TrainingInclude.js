import {
    faChevronLeft,
    faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import Utils from 'src/common/Utils';
import useGetWidth from 'src/hooks/useGetWidth';

TrainingInclude.propTypes = {
    data: PropTypes.object,
};

export default function TrainingInclude(props) {
    const sliderRef = useRef(null);
    const [slideIndex, setSlideIndex] = useState(0);
    const isMobile = useGetWidth() < 768;

    const settings = {
        // lazyLoad: 'ondemand',
        infinite: true,
        initialSlide: 0,
        // variableWidth: true,
        beforeChange: (current, next) => setSlideIndex(next),
    };

    const slideItem = props.data.cfg_value
        ? props.data.cfg_value.filter(function (item) {
              return item.title !== '';
          })
        : [];

    useEffect(() => {
        // console.log(sliderRef.current, 'sliderRef');
        const slickTrack = document.getElementsByClassName('slick-track');
        console.log(slickTrack, 'slickTrack');
    }, []);

    return (
        <div className="container">
            {props.data && (
                <div className="training-include">
                    <h2 className="contact-header">{props.data.cfg_title}</h2>

                    <div
                        className="slide-container"
                        style={{
                            width: '100%',
                            maxWidth: '100vw',
                            overflowX: 'hidden',
                        }}>
                        <Slider
                            ref={sliderRef}
                            className="list lazy"
                            {...settings}>
                            {slideItem.map((element, index) => (
                                <div key={index}>
                                    <div className="slide-item">
                                        <div className="slide-image">
                                            <img
                                                alt=""
                                                src={Utils.getThumb(
                                                    element.image,
                                                )}
                                            />
                                        </div>

                                        <div className="slide-text">
                                            <p style={{ fontSize: '32px' }}>
                                                {element.title}
                                            </p>
                                            <p>{element.des}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                        <div className="slide-control">
                            <button
                                onClick={() => {
                                    sliderRef.current.slickGoTo(slideIndex - 1);
                                }}
                                className="slide-button">
                                <FontAwesomeIcon
                                    icon={faChevronLeft}
                                    className="icon"
                                />
                            </button>
                            <b className="slide-number">
                                {slideIndex + 1}/{slideItem.length}
                            </b>
                            <button
                                onClick={() => {
                                    sliderRef.current.slickGoTo(slideIndex + 1);
                                }}
                                className="slide-button">
                                NEXT{' '}
                                <FontAwesomeIcon
                                    icon={faChevronRight}
                                    className="icon"
                                />
                            </button>
                        </div>
                    </div>
                </div>
                // </div>
            )}
        </div>
    );
}
