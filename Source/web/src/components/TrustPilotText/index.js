import React from 'react';
import { useDispatch } from 'react-redux';
import { showTruspilot } from '../../redux/actions/trustpilotAction';

const TrustPilotText = (props) => {
    //! State
    const dispatch = useDispatch();

    //! Function

    //! Render
    return (
        <>
            <a
                href="#"
                className="alink"
                onClick={(e) => {
                    e.preventDefault();
                    dispatch(
                        showTruspilot({
                            show: true,
                        }),
                    );
                }}>
                <p>See more Reviews</p>
            </a>
        </>
    );
};

export default TrustPilotText;
