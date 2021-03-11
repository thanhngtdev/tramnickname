import { entries, isArray, lowerFirst } from 'lodash';
import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import type from 'redux/actions/actionTypes';
import Utils from 'common/Utils';

function Reason() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [reason, setReason] = useState([]);
    const homeReducer = useSelector((state) => state.homeReducer);

    // useEffect(() => {
    //     if (isArray(reason) && reason.length > 0) {
    //         const boxReasonDOM = document.querySelector('.box-reasons');
    //         const listContent =
    //             boxReasonDOM.children[0].children[1].children[0];
    //         const intersectionObserver = new IntersectionObserver((entries) => {
    //             entries.forEach((entry) => {
    //                 if (entry.intersectionRatio > 0) {
    //                     setTimeout(() => {
    //                         entry.target.classList.add('active');
    //                     }, 1000);
    //                 } else {
    //                     entry.target.classList.remove('active');
    //                 }
    //             });
    //         });
    //         for (let i = 0; i < listContent.children.length; i++) {
    //             const eachContent = listContent.children[i];
    //             console.log({ eachContent });
    //             intersectionObserver.observe(eachContent);
    //         }
    //     }
    // }, []);

    useEffect(() => {
        if (homeReducer.type) {
            if (homeReducer.type === type.GET_HOME_SUCCESS) {
                setReason(homeReducer.data.reason.cfg_value);
            }
        }
    }, [homeReducer]);

    return (
        <div className="box-reasons">
            <div className="container">
                <h2 className="heading">
                    5 Reasons you and your child{' '}
                    <span>will love We Make Footballers:</span>
                </h2>
                <div className="content-small">
                    <ul className="nav-tabs">
                        {reason.map((item, index) => (
                            <li
                                // ref={inputRef}
                                key={index}
                                className={
                                    activeIndex === index ? 'active' : ''
                                }
                                onMouseEnter={() => {
                                    setActiveIndex(index);
                                }}
                                onWheel={() => {
                                    setActiveIndex(index);
                                }}>
                                <a data-toggle="tab">
                                    <span className="number">0{index + 1}</span>
                                    {item.des}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <div className="tab-content">
                        {reason.map((item, index) => (
                            <div
                                key={index}
                                className={`tab-pane ${
                                    activeIndex === index ? 'active' : ''
                                }`}
                                id={index + 1}>
                                <img
                                    alt=""
                                    src={Utils.getThumb(item.image, 'c1')}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Reason;
