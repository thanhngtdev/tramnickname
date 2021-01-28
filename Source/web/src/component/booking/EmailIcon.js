import React from 'react';

export default function EmailIcon(props) {
    return (
        <svg
            style={props.style}
            width="132px"
            height="132px"
            viewBox="0 0 132 132"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg">
            <title>Page 1</title>
            <desc>Created with Sketch.</desc>
            <defs>
                <path
                    d="M6,0 L914,0 C917.313708,-6.08718376e-16 920,2.6862915 920,6 L920,236 C920,239.313708 917.313708,242 914,242 L6,242 C2.6862915,242 4.05812251e-16,239.313708 0,236 L0,6 C-4.05812251e-16,2.6862915 2.6862915,6.08718376e-16 6,0 Z"
                    id="path-1"></path>
                <filter
                    x="-10.9%"
                    y="-33.1%"
                    width="121.7%"
                    height="182.6%"
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
                    id="Book-Free-Trial-Flow-=-Availability---Parent-Area-Login-Copy"
                    transform="translate(-315.000000, -575.000000)">
                    <g
                        id="We-have"
                        transform="translate(260.000000, 520.000000)">
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
                        <rect
                            id="Rectangle"
                            stroke="#FF7100"
                            strokeWidth="2"
                            x="56"
                            y="56"
                            width="130"
                            height="130"
                            rx="14"></rect>
                        <g
                            id="mail-(2)"
                            transform="translate(96.000000, 101.000000)"
                            stroke="#FF7100"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="4">
                            <path
                                d="M5,0 L45,0 C47.75,0 50,2.25 50,5 L50,35 C50,37.75 47.75,40 45,40 L5,40 C2.25,40 0,37.75 0,35 L0,5 C0,2.25 2.25,0 5,0 Z"
                                id="Path"></path>
                            <polyline
                                id="Path"
                                points="50 5 25 22.5 0 5"></polyline>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    );
}
