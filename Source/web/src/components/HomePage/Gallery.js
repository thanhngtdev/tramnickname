import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import Utils from 'src/common/Utils';

Gallery.propTypes = {
    gallery: PropTypes.object,
};

// const images = [
//     {
//         original: 'https://picsum.photos/id/1018/1000/600/',
//         thumbnail: 'https://picsum.photos/id/1018/250/150/',
//     },
//     {
//         original: 'https://picsum.photos/id/1015/1000/600/',
//         thumbnail: 'https://picsum.photos/id/1015/250/150/',
//     },
//     {
//         original: 'https://picsum.photos/id/1019/1000/600/',
//         thumbnail: 'https://picsum.photos/id/1019/250/150/',
//     },
// ];

export default function Gallery(props) {
    const galleryRef = useRef(null);
    const lstImage = props.gallery.cfg_value || [];
    const lstView = props.gallery2.cfg_value || [];
    const [fullScreen, setFullScreen] = useState(false);

    const images = !_.isEmpty(lstView)
        ? lstView.map((item) => {
              return {
                  original: Utils.getThumb(item.image),
                  thumbnail: Utils.getThumb(item.image, 'c2'),
              };
          })
        : [];

    return (
        <div className="container">
            <div className="box-professional">
                <div className="box-head">
                    <h2 className="heading">Professional, safe &amp; fun!</h2>
                    <p className="text-sub">
                        {props?.title ||
                            'See what over 3,000 children do at our sessions each week'}
                    </p>
                </div>
                <div className="list-item">
                    <div className="row">
                        <div className="item hiden-mobile">
                            <div className="row">
                                {lstImage && lstImage.length > 0 && (
                                    <div className="item mt-285">
                                        <img
                                            alt=""
                                            src={Utils.getThumb(
                                                lstImage[0].image,
                                                'c1',
                                            )}
                                        />
                                    </div>
                                )}
                                {lstImage && lstImage.length > 1 && (
                                    <div className="item mt-285">
                                        <img
                                            alt=""
                                            src={Utils.getThumb(
                                                lstImage[1].image,
                                                'c1',
                                            )}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="item">
                            <div className="row">
                                <div className="col-6">
                                    {lstImage && lstImage.length > 2 && (
                                        <img
                                            alt=""
                                            src={Utils.getThumb(
                                                lstImage[2].image,
                                                'c2',
                                            )}
                                            className="mb-30"
                                        />
                                    )}
                                    {lstImage && lstImage.length > 3 && (
                                        <img
                                            alt=""
                                            src={Utils.getThumb(
                                                lstImage[3].image,
                                                'c2',
                                            )}
                                        />
                                    )}
                                </div>
                                <div className="col-6">
                                    {lstImage && lstImage.length > 4 && (
                                        <img
                                            alt=""
                                            src={Utils.getThumb(
                                                lstImage[4].image,
                                                'c1',
                                            )}
                                        />
                                    )}
                                </div>
                            </div>
                            <div className="full-width mt-30 hiden-mobile">
                                {lstImage && lstImage.length > 5 && (
                                    <img
                                        alt=""
                                        src={Utils.getThumb(
                                            lstImage[5].image,
                                            'c3',
                                        )}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="text-center">
                    <a
                        href="/#"
                        className="more"
                        onClick={(evt) => {
                            evt.preventDefault();
                            galleryRef.current.fullScreen();
                        }}>
                        View gallery
                    </a>
                </div>
                <div style={{ display: fullScreen ? 'block' : 'none' }}>
                    <ImageGallery
                        ref={galleryRef}
                        items={images}
                        showThumbnails={false}
                        infinite={false}
                        showBullets={true}
                        showPlayButton={false}
                        onScreenChange={(isFullScren) => {
                            setFullScreen(isFullScren);
                        }}
                    />
                </div>
            </div>
        </div>
    );
}