import BorderButton from 'component/include/BorderButton';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { siteActionType } from 'redux/actions/actionTypes';

const GENDER = ['Male', 'Female', 'Unspecified'];
function BookTrialTraining4(props) {
    const dispatch = useDispatch();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="tab-3">
            <iframe
                className="responsive-iframe"
                style={{ border: 'none' }}
                src={props.responseCourse.paymentUrl}
                width="100%"
                height="770"></iframe>
            <div style={{ marginTop: 20 }}>
                <BorderButton
                    title="Confirm"
                    onClick={() => {
                        dispatch({
                            type: siteActionType.GET_BOOKING,
                            booking_id: props.responseCourse.bookingId,
                            token: props.responseCourse.token,
                        });
                    }}
                />
            </div>
        </div>
    );
}

export default BookTrialTraining4;
