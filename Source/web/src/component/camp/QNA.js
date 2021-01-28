import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

QNA.propTypes = {
    data: PropTypes.array,
};

export default function QNA(props) {
    const [activeIndex, setActiveIndex] = useState(-1);
    return (
        <div className="qa qna-detail">
            <div className="container">
                <h2>Frequently asked questions</h2>
                <div className="qList">
                    {props.data.map((item, index) => (
                        <div
                            key={index}
                            className={`qItem ${
                                activeIndex === index ? 'active' : ''
                            }`}
                            onClick={() => setActiveIndex(index)}>
                            <label className="qId">{index + 1}</label>
                            <div className="qContent">
                                <h4 className="question">{item.atc_sapo}</h4>
                                <p
                                    className="answer"
                                    dangerouslySetInnerHTML={{
                                        __html: item.atc_content,
                                    }}></p>
                            </div>
                            <div className="qIcon">
                                <FontAwesomeIcon
                                    icon={
                                        activeIndex === index ? faMinus : faPlus
                                    }
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
