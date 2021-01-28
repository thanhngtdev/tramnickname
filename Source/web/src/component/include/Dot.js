import React from 'react';

import PropTypes from 'prop-types';

Dot.propTypes = {
    fill: PropTypes.string,
    stroke: PropTypes.string,
    style: PropTypes.object,
};
export default function Dot(props) {
    return (
        <svg
            style={props.style}
            width="6px"
            height="6px"
            viewBox="0 0 6 6"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg">
            <g
                id="Page-1"
                stroke="none"
                strokeWidth="1"
                fill={props.fill || 'none'}
                fillRule="evenodd">
                <g
                    id="Holiday-Camps"
                    transform="translate(-938.000000, -2931.000000)"
                    stroke={props.stroke || '#5A5A5A'}>
                    <g
                        id="What-can-you-expect"
                        transform="translate(165.000000, 2307.000000)">
                        <g
                            id="pagination"
                            transform="translate(444.000000, 591.000000)">
                            <rect
                                id="Rectangle"
                                x="329.5"
                                y="33.5"
                                width="5"
                                height="5"
                                rx="2.5"></rect>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    );
}
