import React from 'react';
import Utils from '../../common/Utils';
import PropTypes from 'prop-types';

Intro.propTypes = {
    intro: PropTypes.array,
};

function Intro(props) {
    return (
        <div className="container">
            <div className="box-list-item-card">
                <div className="row">
                    {props.intro.map((item, index) => {
                        return (
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
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Intro;
