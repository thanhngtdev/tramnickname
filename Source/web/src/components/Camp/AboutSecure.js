import PropTypes from 'prop-types';
import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Utils from 'src/common/Utils';

// AboutSecure.propTypes = {
//     data: PropTypes.array,
// };

export default function AboutSecure(props) {
    return (
        <div className="about-secure">
            <div className="container">
                <div className="box-list-item-card">
                    <div className="list-intro">
                        {props.data.cfg_value &&
                            props.data.cfg_value.map((item, index) => (
                                <div key={index} className="list-intro-item">
                                    <div className="list-intro-item-img">
                                        {' '}
                                        <LazyLoadImage
                                            src={Utils.getThumb(item.image)}
                                            alt=""
                                        />
                                    </div>

                                    <h3 className="title">{item.title}</h3>
                                    <div
                                        className="description"
                                        dangerouslySetInnerHTML={{
                                            __html: item.des || item.content,
                                        }}
                                    />
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
