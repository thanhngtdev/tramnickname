import {
    faChevronLeft,
    faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import parse from 'html-react-parser';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import Slider from 'react-slick';
import Utils from 'src/common/Utils';
import useGetWidth from 'src/hooks/useGetWidth';
CampInclude.propTypes = {
    data: PropTypes.object,
};

export default function CampInclude(props) {
    // console.log(props, 'props');

    const sliderRef = useRef(null);
    const [slideIndex, setSlideIndex] = useState(0);
    const width = useGetWidth();

    // console.log({ width });

    const settings = {
        lazyLoad: 'ondemand',
        infinite: true,
        beforeChange: (current, next) => setSlideIndex(next),
    };

    // console.log(props.data);
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
                    <div className="slide-container">
                        <Slider
                            ref={sliderRef}
                            className="list lazy"
                            {...settings}>
                            {props.data.cfg_value &&
                                props.data.cfg_value.map((element, index) => (
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
                                                {/* <p>{element.content}</p> */}
                                                {parse(element.content + '')}
                                                <h3>{element.title}</h3>
                                                <p>{element.des}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </Slider>
                        <div
                            className={
                                width > 767
                                    ? 'slide-control'
                                    : 'slide-control mobile'
                            }>
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
                            <b>
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
            )}
        </div>
    );
}

const styles = {
    paging: {
        backgroundColor: '#ef9042',
        borderRadius: '50%',
        border: '1px solid white',
        width: 44,
        height: 44,
        padding: 2,
        display: 'inline-block',
        margin: '0 1rem',
    },
    pagingButton: {
        backgroundColor: 'white',
        borderRadius: '50%',
        border: '1px solid #5a5a5a',
        width: 44,
        height: 44,
        margin: '0 1rem',
    },
    pagingActive: {
        backgroundColor: '#ef9042',
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        border: '1px solid white',
        color: 'white',
    },
};
