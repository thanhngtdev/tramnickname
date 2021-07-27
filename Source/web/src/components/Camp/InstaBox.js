import React, { Fragment } from 'react';
import 'slick-carousel/slick/slick.css';
import Slider from 'react-slick';
import Utils from '../../common/Utils';

const settings = {
    lazyLoad: 'ondemand',
    infinite: true,
    autoplaySpeed: 6000,
    autoplay: true,
};
function InstaBox(props) {
    const { instaFeed } = props || {};

    let numOfSlide = [];
    let lstImage = instaFeed ? instaFeed.cfg_value : [];

    if (lstImage && lstImage.length > 0) {
        let i;
        for (i = 0; i < lstImage.length / 6; i++) {
            let slideImage = [];
            slideImage.push(-1);
            if (lstImage.length > 6 * i) slideImage.push(lstImage[6 * i]);
            slideImage.push(-1);
            if (lstImage.length > 6 * i + 1)
                slideImage.push(lstImage[6 * i + 1]);
            if (lstImage.length > 6 * i + 2)
                slideImage.push(lstImage[6 * i + 2]);
            if (lstImage.length > 6 * i + 3)
                slideImage.push(lstImage[6 * i + 3]);
            if (lstImage.length > 6 * i + 4)
                slideImage.push(lstImage[6 * i + 4]);
            if (lstImage.length > 6 * i + 5)
                slideImage.push(lstImage[6 * i + 5]);
            numOfSlide.push(slideImage);
        }
    }

    return (
        <Fragment>
            {instaFeed && instaFeed !== 'undefined' && (
                <div
                    className="box-insta weekly"
                    style={{ backgroundColor: 'white' }}>
                    <h2 className="heading" style={{ color: 'black' }}>
                        {instaFeed.cfg_title || ''}
                    </h2>
                    <div className="box-slide">
                        <div className="row ">
                            <Slider className="list lazy" {...settings}>
                                {numOfSlide.map((element, index) => (
                                    <div className="item" key={index}>
                                        {element.map((item, idx) => {
                                            if (item === -1) {
                                                return (
                                                    <div
                                                        key={idx}
                                                        className="photo"
                                                    />
                                                );
                                            }
                                            return (
                                                <div
                                                    key={idx}
                                                    className="photo">
                                                    <img
                                                        alt=""
                                                        src={Utils.getThumb(
                                                            item.image,
                                                        )}
                                                    />
                                                    <div className="bg">
                                                        <h3 className="title">
                                                            {item.title}
                                                        </h3>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    </div>
                </div>
            )}
        </Fragment>
    );
}

export default InstaBox;
