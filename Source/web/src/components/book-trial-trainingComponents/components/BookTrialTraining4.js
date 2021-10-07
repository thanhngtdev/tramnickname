import BorderButton from 'src/components/include/BorderButton';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { siteActionType } from 'src/redux/actions/actionTypes';

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
                sandbox="allow-top-navigation allow-scripts allow-same-origin allow-forms"
                width="100%"
                height="770"></iframe>
            {/* <div style={{ marginTop: 20 }}>
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
            </div> */}
        </div>
    );
}

export default BookTrialTraining4;
