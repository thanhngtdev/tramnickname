import React from 'react';
import { useDispatch } from 'react-redux';
import { showTruspilot } from 'src/redux/actions/trustpilotAction';

const TrustPilotText = (props) => {
    //! State
    const dispatch = useDispatch();

    //! Function

    //! Render
    return (
        <a
            href="#"
            className="alink"
            target="_blank"
            href="https://www.trustpilot.com/review/wemakefootballers.com">
            <p>See more Reviews</p>
        </a>
    );
};

export default TrustPilotText;
