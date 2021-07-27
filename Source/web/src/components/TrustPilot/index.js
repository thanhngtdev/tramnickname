import React from 'react';
import useTruspilot from 'src/hooks/useTruspilot';

const TrustPilot = () => {
    //! useEffect
    useTruspilot();
    //! Function

    //! Render
    return (
        <div
            // style={{ marginTop: 0, float: 'right', height: 20 }}
            className="trustpilot-widget"
            data-locale="en-GB"
            data-template-id="5418015fb0d04a0c9cf721f2"
            data-businessunit-id="5630b23d0000ff000584db47"
            data-style-height="30px"
            data-style-width="100%"
            data-theme="light"
            data-stars="4,5"
            data-review-languages="en">
            <a
                className="alink"
                href="https://uk.trustpilot.com/review/wemakefootballers.com"
                target="_blank"
                rel="noopener">
                See more Reviews
            </a>
        </div>
    );
};

export default TrustPilot;
