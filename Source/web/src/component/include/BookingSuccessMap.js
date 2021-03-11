import React, { useEffect, useState } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';
import Constants from 'common/Constants';
import CustomMarker from './CustomMarker';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { siteActionType } from 'redux/actions/actionTypes';

function BookingSuccessMap(props) {
    const timeStart = props?.courseSelected?.course_day_time_start;
    const timeEnd = props?.courseSelected?.course_day_time_end;
    const [bookingInfo, setBookingInfo] = useState({});

    const defaultCenter = {
        lat: Constants.DEFAULT_LOCATION.lat,
        lng: Constants.DEFAULT_LOCATION.lng,
    };

    const defaultMarker = {
        ms_latitude: Constants.DEFAULT_LOCATION.lat,
        ms_longitude: Constants.DEFAULT_LOCATION.lng,
    };

    const siteReducer = useSelector((state) => state.siteReducer);
    useEffect(() => {
        if (siteReducer.type) {
            if (
                siteReducer.type === siteActionType.BOOK_COURSE_SIGNUP_SUCCESS
            ) {
                setBookingInfo(siteReducer.data.data);
            }
            if (siteReducer.type === siteActionType.BOOK_COURSE_SUCCESS) {
                setBookingInfo(siteReducer.data.data);
            }
            if (siteReducer.type === siteActionType.BOOK_TRIAL_SIGNUP_SUCCESS) {
                setBookingInfo(siteReducer.data.data);
            }
        }
    }, [siteReducer]);

    return (
        <GoogleMap defaultZoom={12} center={defaultCenter}>
            <div className="contact-map" style={{ top: 0, bottom: 0 }}>
                <div
                    className="text-content"
                    style={{
                        textAlign: 'left',
                        maxWidth: 450,
                        height: '100%',
                    }}>
                    <h4 style={{ marginBottom: 0 }}>Payment made </h4>
                    <p style={{ marginTop: 0 }}>
                        £
                        {bookingInfo?.total_price
                            ? bookingInfo.total_price
                            : '0'}
                    </p>
                    <h4 style={{ marginBottom: 0 }}>Reference number:</h4>
                    <p style={{ marginTop: 0 }}>{bookingInfo?.booking_id}</p>
                    <h4 style={{ marginBottom: 0 }}>Time:</h4>
                    <p style={{ marginTop: 0 }}>
                        {timeStart && timeEnd
                            ? timeStart.slice(0, 5) + '-' + timeEnd.slice(0, 5)
                            : ''}
                    </p>
                    <h4 style={{ marginBottom: 0 }}>Address</h4>
                    <p style={{ marginTop: 0 }}>
                        {props?.siteSelected?.ms_address
                            ? props.siteSelected.ms_address
                            : ''}
                    </p>
                    <a href="#">Add to your calendar</a>
                </div>
            </div>
            <CustomMarker item={defaultMarker} />
        </GoogleMap>
    );
}

export default withScriptjs(withGoogleMap(BookingSuccessMap));
