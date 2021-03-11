import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

const mockData = [1, 2, 3, 4, 5];
function QandA() {
    const [activeIndex, setActiveIndex] = useState(-1);
    return (
        <div className="qa">
            <div className="container">
                <h2>Frequently asked questions</h2>
                <div className="qList">
                    {mockData.map((item, index) => (
                        <div
                            key={index}
                            className={`qItem ${
                                activeIndex === index ? 'active' : ''
                            }`}
                            onClick={() => setActiveIndex(index)}>
                            <label className="qId">0{item}</label>
                            <div className="qContent">
                                <h4 className="question">
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Nullam vitae mi massa?
                                </h4>
                                <p className="answer">
                                    Sed quis ultricies velit, in dignissim
                                    purus. Donec ultricies, metus et varius
                                    ullamcorper, diam tellus imperdiet nulla,
                                    vel suscipit libero urna egestas risus.
                                    Pellentesque non massa fringilla, cursus
                                    tortor sed, lacinia nisl. Morbi semper
                                    accumsan massa at iaculis. Cras ac rutrum
                                    odio. Nam tristique metus sed arcu aliquam
                                    elementum.
                                </p>
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

export default QandA;
