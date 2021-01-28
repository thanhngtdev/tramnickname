import React from 'react';

export default class IconCheck extends React.Component {
    render() {
        return (
            <svg
                width="25px"
                height="25px"
                viewBox="0 0 25 25"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg">
                <title>Page 1</title>
                <desc>Created with Sketch.</desc>
                <defs>
                    <path
                        d="M266,935 L1174,935 C1177.31371,935 1180,937.686292 1180,941 L1180,1973 C1180,1976.31371 1177.31371,1979 1174,1979 L266,1979 C262.686292,1979 260,1976.31371 260,1973 L260,941 C260,937.686292 262.686292,935 266,935 Z"
                        id="path-1"></path>
                    <filter
                        x="-10.9%"
                        y="-7.7%"
                        width="121.7%"
                        height="119.2%"
                        filterUnits="objectBoundingBox"
                        id="filter-2">
                        <feOffset
                            dx="0"
                            dy="20"
                            in="SourceAlpha"
                            result="shadowOffsetOuter1"></feOffset>
                        <feGaussianBlur
                            stdDeviation="30"
                            in="shadowOffsetOuter1"
                            result="shadowBlurOuter1"></feGaussianBlur>
                        <feColorMatrix
                            values="0 0 0 0 0.00868440164   0 0 0 0 0.00775197185   0 0 0 0 0.115772192  0 0 0 0.0572552448 0"
                            type="matrix"
                            in="shadowBlurOuter1"></feColorMatrix>
                    </filter>
                </defs>
                <g
                    id="Page-1"
                    stroke="none"
                    strokeWidth="1"
                    fill="none"
                    fillRule="evenodd">
                    <g
                        id="Book-Holiday-Camp-Flow---Part-1"
                        transform="translate(-354.000000, -1706.000000)">
                        <g id="Rectangle">
                            <use
                                fill="black"
                                fillOpacity="1"
                                filter="url(#filter-2)"
                                xlinkHref="#path-1"></use>
                            <use
                                fill="#FFFFFF"
                                fillRule="evenodd"
                                xlinkHref="#path-1"></use>
                        </g>
                        <g
                            id="Group-4"
                            transform="translate(325.000000, 1304.000000)">
                            <rect
                                id="Rectangle"
                                fill="#F7F8F7"
                                x="0"
                                y="368"
                                width="790"
                                height="92"></rect>
                            <rect
                                id="Rectangle"
                                stroke="#FF7100"
                                strokeWidth="2"
                                fill="#FFFFFF"
                                x="30"
                                y="403"
                                width="23"
                                height="23"
                                rx="2"></rect>
                            <g
                                id="check-(2)"
                                transform="translate(34.000000, 409.000000)"
                                stroke="#FF7100"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2">
                                <polyline
                                    id="Path"
                                    points="15 0 5 11 0 6"></polyline>
                            </g>
                        </g>
                    </g>
                </g>
            </svg>
        );
    }
}
