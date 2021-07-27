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
                <defs>
                    <path
                        d="M6,0 L724,0 C727.313708,-6.08718376e-16 730,2.6862915 730,6 L730,495 C730,498.313708 727.313708,501 724,501 L6,501 C2.6862915,501 4.05812251e-16,498.313708 0,495 L0,6 C-2.18216909e-15,2.6862915 2.6862915,6.08718376e-16 6,0 Z"
                        id="path-1"></path>
                    <filter
                        x="-13.7%"
                        y="-16.0%"
                        width="127.4%"
                        height="139.9%"
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
                        id="Book-Free-Trial-Flow---Part-1-Copy"
                        transform="translate(-450.000000, -1193.000000)">
                        <g
                            id="Choose-your-class"
                            transform="translate(355.000000, 935.000000)">
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
                                fill="#FFFFFF"
                                x="96"
                                y="259"
                                width="23"
                                height="23"
                                rx="11.5"></rect>
                            <rect
                                id="Rectangle"
                                fill="#FF7100"
                                x="101"
                                y="264"
                                width="13"
                                height="13"
                                rx="6.5"></rect>
                        </g>
                    </g>
                </g>
            </svg>
        );
    }
}
