import React, { Fragment, useEffect, useState } from 'react';
// import 'slick-carousel/slick/slick.css';
import Slider from 'react-slick';
import Utils from 'src/common/Utils';
import useGetWidth from 'src/hooks/useGetWidth';

function InstaBox(props) {
    const { instaFeed } = props || {};
    const isMobile = useGetWidth() <= 768;
    const [numOfSlide, setNumOfSlide] = useState([]);
    let lstImage = instaFeed ? instaFeed.cfg_value : [];

    let settings = {
        // lazyLoad: 'ondemand',
        infinite: true,
        autoplaySpeed: 2500,
        autoplay: !isMobile,
        speed: 1000,
    };

    useEffect(() => {
        if (instaFeed.cfg_value) {
            let i;
            let slideImage = [];
            let newList = [];
            let marker = 0;

            if (isMobile) {
                for (i = 0; i < lstImage.length; i++) {
                    if (marker < 6 && i === lstImage.length - 1) {
                        newList.push(slideImage);
                    }

                    if (marker === 6) {
                        newList.push(slideImage);
                        marker = 0;
                        slideImage = [];
                    }

                    if (i % 2 === 0) slideImage.push(-1);
                    slideImage.push(lstImage[i]);
                    marker++;
                }
            } else {
                for (i = 0; i < lstImage.length / 6; i++) {
                    let slideImage = [];
                    slideImage.push(-1);
                    if (lstImage.length > 6 * i)
                        slideImage.push(lstImage[6 * i]);
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
                    newList.push(slideImage);
                }
            }

            setNumOfSlide(newList);
        }
    }, [isMobile]);

    // if (isMobile) {
    //     if (lstImage && lstImage.length > 0) {
    //         let i;
    //         let slideImage = [];
    //         for (i = 0; i < lstImage.length; i++) {
    //             slideImage.push(lstImage[i]);
    //         }
    //         numOfSlide.push(slideImage);

    //         settings = { ...settings, autoplay: false };
    //     }
    // } else {
    //     if (lstImage && lstImage.length > 0) {
    //         let i;
    //         for (i = 0; i < lstImage.length / 6; i++) {
    //             let slideImage = [];
    //             slideImage.push(-1);
    //             if (lstImage.length > 6 * i) slideImage.push(lstImage[6 * i]);
    //             slideImage.push(-1);
    //             if (lstImage.length > 6 * i + 1)
    //                 slideImage.push(lstImage[6 * i + 1]);
    //             if (lstImage.length > 6 * i + 2)
    //                 slideImage.push(lstImage[6 * i + 2]);
    //             if (lstImage.length > 6 * i + 3)
    //                 slideImage.push(lstImage[6 * i + 3]);
    //             if (lstImage.length > 6 * i + 4)
    //                 slideImage.push(lstImage[6 * i + 4]);
    //             if (lstImage.length > 6 * i + 5)
    //                 slideImage.push(lstImage[6 * i + 5]);
    //             numOfSlide.push(slideImage);
    //         }
    //     }
    // }

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
                                                        loading="lazy"
                                                        alt=""
                                                        src={Utils.getThumb(
                                                            item.image,
                                                        )}
                                                    />
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
