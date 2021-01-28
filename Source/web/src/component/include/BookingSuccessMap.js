import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';
import Constants from '../../common/Constants';
import CustomMarker from './CustomMarker';
import moment from 'moment';

function BookingSuccessMap(props) {
    const defaultCenter = {
        lat: Constants.DEFAULT_LOCATION.lat,
        lng: Constants.DEFAULT_LOCATION.lng,
    };

    const defaultMarker = {
        ms_latitude: Constants.DEFAULT_LOCATION.lat,
        ms_longitude: Constants.DEFAULT_LOCATION.lng,
    };

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
                        {props.courseSelected
                            ? props.courseSelected.course_price
                            : 0}
                    </p>
                    <h4 style={{ marginBottom: 0 }}>Reference number:</h4>
                    <p style={{ marginTop: 0 }}>
                        {props.responseCourse
                            ? props.responseCourse.bookingId
                            : ''}
                    </p>
                    <h4 style={{ marginBottom: 0 }}>Time:</h4>
                    <p style={{ marginTop: 0 }}>
                        {props.data.courseSelected
                            ? moment(
                                  props.data.courseSelected
                                      .course_day_time_start,
                                  'hh:mm:ss',
                              ).format('hh:mma') +
                              '-' +
                              moment(
                                  props.data.courseSelected.course_day_time_end,
                                  'hh:mm:ss',
                              ).format('hh:mma')
                            : ''}
                    </p>
                    <h4 style={{ marginBottom: 0 }}>Address</h4>
                    <p style={{ marginTop: 0 }}>
                        {props.data.siteSelected
                            ? props.data.siteSelected.ms_address
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
