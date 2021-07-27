import Utils from '../../common/Utils';
import React, { useEffect, useRef, useState } from 'react';

function Reason(props) {
    //! State
    const timer = useRef(null);
    const boxRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    //! Effect
    //* Handle scroll to active nav bar
    useEffect(() => {
        const list =
            boxRef.current.children[0].children[1].children[0].children;

        if (list.length === activeIndex) {
            setActiveIndex(0);
            return;
        }

        handleMouseOver(activeIndex);
    }, [activeIndex]);

    useEffect(() => {
        timer.current = setInterValIncreaseActiveIdx();
    }, []);

    //! functions
    const setInterValIncreaseActiveIdx = () => {
        return setInterval(() => {
            setActiveIndex((currenState) => currenState + 1);
        }, 3000);
    };

    const handleClickReason = (index) => {
        if (timer.current) {
            clearInterval(timer.current);
            setActiveIndex(index);
            timer.current = setInterValIncreaseActiveIdx();
        }
    };

    function handleMouseOver(index) {
        const listTab = document.getElementsByClassName('tab-content-small');
        for (let i = 0; i < listTab.length; i++) {
            if (i === index) {
                listTab[i].classList.add('active');
            } else {
                listTab[i].classList.remove('active');
            }
        }
    }

    // console.log(activeIndex,"activeIndex");
    //! Render
    return (
        <div ref={boxRef} className="box-reasons">
            {props.reason && (
                <div className="container">
                    <h2 className="heading">
                        5 Reasons you and your child{' '}
                        <span>will love We Make Footballers:</span>
                    </h2>
                    <div className="content-small">
                        <ul className="nav-tabs">
                            {props.reason.map((item, index) => (
                                <li
                                    key={index}
                                    // style={{ height: 105 }}
                                    value={index + 1}
                                    onClick={() => handleClickReason(index)}
                                    className="tab-content-small">
                                    <a data-toggle="tab">
                                        <span className="number">
                                            0{index + 1}
                                        </span>
                                        {item.des}
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <div
                            className="tab-content"
                            style={{ position: 'relative' }}>
                            {props.reason.map((item, index) => (
                                <div
                                    key={index}
                                    className={`tab-pane ${
                                        activeIndex === index ? 'active' : ''
                                    }`}
                                    id={index + 1}>
                                    <img
                                        style={{
                                            maxWidth: '100%',
                                            height: 'auto',
                                        }}
                                        alt=""
                                        src={Utils.getThumb(item.image, 'c1')}
                                    />
                                </div>
                            ))}
                            <div
                                style={{
                                    width: '100%',
                                    backgroundColor: '#5f5f5f',
                                    position: 'absolute',
                                    bottom: '0px',
                                }}>
                                <div
                                    className="reason-scroll"
                                    style={{
                                        width: `${(activeIndex + 1) * 20}%`,
                                    }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
export default Reason;
