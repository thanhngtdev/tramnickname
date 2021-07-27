import React, { useRef, useState } from 'react';
import Slider from 'react-slick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronLeft,
    faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import Utils from 'src/common/Utils';
import PropTypes from 'prop-types';

TrainingInclude.propTypes = {
    data: PropTypes.object,
};

export default function TrainingInclude(props) {
    const sliderRef = useRef(null);
    const [slideIndex, setSlideIndex] = useState(0);

    const settings = {
        lazyLoad: 'ondemand',
        infinite: true,
        initialSlide: 0,
        beforeChange: (current, next) => setSlideIndex(next),
    };

    const slideItem = props.data.cfg_value
        ? props.data.cfg_value.filter(function (item) {
              return item.title !== '';
          })
        : [];

    return (
        <div className="training-include">
            {props.data && (
                <div className="container">
                    <h2 className="contact-header">{props.data.cfg_title}</h2>
                    <Slider ref={sliderRef} className="list lazy" {...settings}>
                        {slideItem.map((element, index) => (
                            <div key={index}>
                                <div className="slide-item">
                                    <div className="slide-image">
                                        <img
                                            alt=""
                                            src={Utils.getThumb(element.image)}
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
                        <b
                            className="slide-number"
                            // style={{ margin: '0 2rem' }}
                        >
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
            )}
        </div>
    );
}
