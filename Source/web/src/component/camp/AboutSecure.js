import React from 'react';
import Utils from '../../common/Utils';
import PropTypes from 'prop-types';

AboutSecure.propTypes = {
    data: PropTypes.array,
};

export default function AboutSecure(props) {
    console.log(props);
    return (
        <div className="about-secure">
            <div className="container">
                <div className="box-list-item-card" style={{ top: 130 }}>
                    <div className="row">
                        {props.data &&
                            props.data.map((item, index) => (
                                <div key={index} className="col-4">
                                    <div className="item">
                                        <img
                                            src={Utils.getThumb(item.image)}
                                            alt=""
                                        />
                                        <h3 className="title">{item.title}</h3>
                                        <div
                                            className="description"
                                            dangerouslySetInnerHTML={{
                                                __html: item.content,
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
