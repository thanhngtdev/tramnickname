import React, { Fragment, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import BookingSuccessMap from '../include/BookingSuccessMap';
import EmailIcon from './EmailIcon';
import TrainingIcon1 from './TrainingIcon1';
import TrainingIcon2 from './TrainingIcon2';
import TrainingIcon3 from './TrainingIcon3';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { siteActionType } from '../../actions/actionTypes';
import Utils from '../../common/Utils';
import BorderButton from '../include/BorderButton';

BookTrialTraining3.propTypes = {
    success: PropTypes.number,
    data: PropTypes.object,
    goBack: PropTypes.func,
    findAcademy: PropTypes.func,
    responseCourse: PropTypes.object,
    bookingFull: PropTypes.object,
    bookOther: PropTypes.func,
    message: PropTypes.string,
};

function BookTrialTraining3(props) {
    const dispatch = useDispatch();
    const message1 = Utils.isEmpty(props.data)
        ? ''
        : 'Woohoo! ' +
          props.data.child_first_name +
          ' ' +
          props.data.child_last_name +
          ' is booked in for their trial session at ' +
          props.data.siteSelected.ms_name +
          ' on';
    const message2 = Utils.isEmpty(props.data)
        ? ''
        : props.data.start_date +
          ' at ' +
          moment(
              props.data.courseSelected.course_day_time_start,
              'hh:mm:ss',
          ).format('hh:mma') +
          '-' +
          moment(
              props.data.courseSelected.course_day_time_end,
              'hh:mm:ss',
          ).format('hh:mma');

    const [paidBooking, setPaidBooking] = useState(
        props.data.siteSelected.ms_trial == 1 ? false : true,
    );
    const [dataBooking, setDataBooking] = useState({});

    const showOtherClass = props.bookingFull.other_class;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const siteReducer = useSelector((state) => state.siteReducer);
    useEffect(() => {
        if (siteReducer.type) {
            if (siteReducer.type === siteActionType.GET_BOOKING_SUCCESS) {
                setDataBooking(siteReducer.data.data);
                if (siteReducer.data.data.payment_status === 'Paid') {
                    setPaidBooking(true);
                } else {
                    setPaidBooking(false);
                }
            }
        }
    }, [siteReducer]);

    function renderOption() {
        return (
            <div className="tab-3">
                <div style={{ marginBottom: '4rem' }}>
                    <h2>
                        Unfortunately, the trial session date you have requested
                        at this academy is fully booked
                    </h2>
                    <label>
                        <a
                            href="#"
                            onClick={(evt) => {
                                evt.preventDefault();
                                if (props.goBack) props.goBack();
                            }}>
                            Go back
                        </a>{' '}
                        - or choose from following options:
                    </label>
                </div>
                <div className="container">
                    <div
                        className="box-list-item-card"
                        style={{ top: 0, marginBottom: '2rem' }}>
                        <div className="row">
                            <div className="col-4">
                                {props.bookingFull && (
                                    <div
                                        className="item"
                                        style={{ position: 'relative' }}>
                                        <TrainingIcon1 />
                                        <h3
                                            className="title"
                                            style={{ textAlign: 'center' }}>
                                            Could a different day at the{' '}
                                            {props.data.siteSelected.ms_name}{' '}
                                            work?
                                        </h3>
                                        <div
                                            className="description"
                                            style={{ textAlign: 'center' }}>
                                            Sign up for a free session on the{' '}
                                            {
                                                props.bookingFull.other_class
                                                    .course_title
                                            }
                                        </div>
                                        <div
                                            className="classRow"
                                            style={{
                                                marginTop: 25,
                                                backgroundColor: '#F7F8F7',
                                            }}>
                                            <p>
                                                {
                                                    showOtherClass.start_date
                                                        .date_show
                                                }
                                            </p>
                                        </div>
                                        <p
                                            style={{
                                                marginTop: 25,
                                                marginBottom: 25,
                                                fontWeight: 'bold',
                                            }}>
                                            {
                                                props.bookingFull.other_class
                                                    .available_space
                                            }{' '}
                                            x available spaces
                                        </p>
                                        <Button
                                            style={styles.button}
                                            onClick={() => {
                                                if (props.bookOther)
                                                    props.bookOther();
                                            }}>
                                            Book a free session
                                        </Button>
                                    </div>
                                )}
                            </div>
                            <div className="col-4">
                                <div
                                    className="item"
                                    style={{ position: 'relative' }}>
                                    <TrainingIcon2 />
                                    <h3
                                        className="title"
                                        style={{ textAlign: 'center' }}>
                                        The Saturday class is super popular.
                                        Please join our waiting list
                                    </h3>
                                    <div
                                        className="description"
                                        style={{ textAlign: 'center' }}>
                                        We will email you or call you as soon as
                                        a position opens up. You can check in
                                        your order in the queue in your Parent
                                        Area account.
                                    </div>
                                    <Button
                                        style={styles.button}
                                        onClick={() =>
                                            dispatch({
                                                type:
                                                    siteActionType.ADD_WAITING,
                                                course_id:
                                                    props.data.courseSelected
                                                        .course_id,
                                                child_id:
                                                    props.bookingFull.child_id,
                                                message: '',
                                            })
                                        }>
                                        Go on the waiting list
                                    </Button>
                                </div>
                            </div>
                            <div className="col-4">
                                <div
                                    className="item"
                                    style={{ position: 'relative' }}>
                                    <TrainingIcon3 />
                                    <h3
                                        className="title"
                                        style={{ textAlign: 'center' }}>
                                        Find a different academy nearby
                                    </h3>
                                    <div
                                        className="description"
                                        style={{ textAlign: 'center' }}>
                                        No need to resubmit the form - you just
                                        need to choose a new nearby academy and
                                        class time.
                                    </div>
                                    <Button
                                        style={styles.button}
                                        onClick={() => {
                                            if (props.findAcademy)
                                                props.findAcademy();
                                        }}>
                                        another academy
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <p>
                    You can login to your Parent Area account anytime here to
                    manage your booking or add more children.
                </p>
                <p>
                    You can come back to the We Make Footballers website and
                    login anytime or use the link in email we just sent you.
                </p>
            </div>
        );
    }

    function renderSuccess() {
        return (
            <div className="tab-3">
                {Utils.isEmpty(props.responseCourse) ? (
                    <>
                        <div style={{ marginBottom: '4rem' }}>
                            {paidBooking ? (
                                <h2>
                                    {message1} <br />
                                    <span style={{ color: '#FF7100' }}>
                                        {message2}
                                    </span>
                                </h2>
                            ) : (
                                <h2>
                                    The booking status is{' '}
                                    {dataBooking
                                        ? dataBooking.payment_status
                                        : ''}
                                    <br /> Please log in to Parent Area{' '}
                                    <a
                                        href="https://www.parentarea.co/parent/login"
                                        target="_blank"
                                        rel="noreferrer">
                                        here
                                    </a>{' '}
                                    to complete booking
                                </h2>
                            )}
                        </div>
                        <div className="container">
                            <div className="success-booking">
                                <EmailIcon style={{ margin: '3rem' }} />
                                <div style={{ flex: 1, textAlign: 'left' }}>
                                    <h3>We have emailed you all the details</h3>
                                    <p>
                                        Please click the link in this email to
                                        activate your
                                    </p>
                                    <p>
                                        Parent Area account so you can modify
                                        your booking.
                                    </p>
                                </div>
                            </div>
                            <div>
                                <p>Can&apos;t see the email? </p>
                                <p>Check your spam folder or Resend email.</p>
                                <p>
                                    Your information is safe and secure with We
                                    Make Footballers.
                                </p>
                            </div>
                        </div>
                        <div
                            style={{
                                height: 500,
                                position: 'relative',
                                marginTop: 100,
                            }}>
                            <BookingSuccessMap
                                siteSelected={props.data.siteSelected}
                                courseSelected={props.data.courseSelected}
                                responseCourse={props.responseCourse}
                                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyClAeE9K0S0LZQ3DiTg0-j_w8HvVuMYgoc&v=3.exp&libraries=geometry,drawing,places"
                                loadingElement={
                                    <div style={{ height: `100%` }} />
                                }
                                containerElement={
                                    <div style={{ height: `100%` }} />
                                }
                                mapElement={<div style={{ height: `100%` }} />}
                            />
                        </div>
                    </>
                ) : (
                    <>
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
                                        booking_id:
                                            props.responseCourse.bookingId,
                                        token: props.responseCourse.token,
                                    });
                                }}
                            />
                        </div>
                    </>
                )}
            </div>
        );
    }

    function renderError() {
        return (
            <div style={{ marginBottom: '4rem' }}>
                <h2 dangerouslySetInnerHTML={{ __html: props.message }} />
            </div>
        );
    }

    return (
        <Fragment>
            {props.success === 1 && renderSuccess()}
            {props.success === 2 && renderError()}
            {props.success === 3 && renderOption()}
        </Fragment>
    );
}

const styles = {
    button: {
        position: 'absolute',
        bottom: 50,
        display: 'block',
        width: 'calc(100% - 70px)',
        borderRadius: 6,
        border: '1px solid rgb(255, 113, 0)',
        color: 'rgb(255, 113, 0)',
        textTransform: 'uppercase',
        padding: '1.5rem 0rem',
        backgroundColor: 'white',
    },
};

export default BookTrialTraining3;
