import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { homeActionType } from '../../actions/actionTypes';
import Utils from '../../common/Utils';

function Reason() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [reason, setReason] = useState([]);
    const homeReducer = useSelector((state) => state.homeReducer);

    useEffect(() => {
        if (homeReducer.type) {
            if (homeReducer.type === homeActionType.GET_HOME_SUCCESS) {
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
                                key={index}
                                className={
                                    activeIndex === index ? 'active' : ''
                                }
                                onMouseEnter={() => setActiveIndex(index)}
                                onWheel={() => setActiveIndex(index)}>
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
