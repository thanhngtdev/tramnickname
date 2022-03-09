import dayjs from 'dayjs';
import dynamic from 'next/dynamic';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { Fragment, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import Constants from 'src/common/Constants';
import useGetWidth from 'src/hooks/useGetWidth';
import { siteActionType } from 'src/redux/actions/actionTypes';

const BookingSuccessMap = dynamic(() =>
    import('src/components/include/BookingSuccessMap'),
);
const NearbyList = dynamic(() => import('./NearbyList'));
const EmailIcon = dynamic(() => import('src/components/Booking/EmailIcon'));
const TrainingIcon1 = dynamic(() =>
    import('src/components/Booking/TrainingIcon1'),
);
const TrainingIcon2 = dynamic(() =>
    import('src/components/Booking/TrainingIcon2'),
);
const TrainingIcon3 = dynamic(() =>
    import('src/components/Booking/TrainingIcon3'),
);

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
    // console.log(props.data, 'data');
    const dispatch = useDispatch();
    const isMobile = useGetWidth() <= 767;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    function renderOption() {
        return (
            <div className="tab-3">
                {props.showNearby ? (
                    <>
                        <div style={{ textAlignLast: 'start' }}>
                            <label>
                                <a
                                    href=""
                                    onClick={(evt) => {
                                        evt.preventDefault();
                                        props.setShowNearby(false);
                                    }}>
                                    Go back
                                </a>
                            </label>
                        </div>
                        <NearbyList
                            listNearby={props.listNearby}
                            data={props.data}
                            goBack={props.goBack}
                            bookingNearby={props.bookingNearby}
                            bookingFull={props.bookingFull}
                        />
                    </>
                ) : (
                    <>
                        <div style={{ marginBottom: '4rem' }}>
                            <h2>
                                Unfortunately, the trial session date you have
                                requested at this academy is fully booked
                            </h2>
                            <label>
                                <a
                                    href=""
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
                                <div
                                    className="row align-center"
                                    className={`row ${
                                        !isMobile ? 'align-center' : ''
                                    }`}>
                                    {!isEmpty(
                                        props?.bookingFull?.other_class,
                                    ) && (
                                        <div className="col-4">
                                            <div
                                                className="item"
                                                style={{
                                                    position: 'relative',
                                                }}>
                                                <TrainingIcon1 />
                                                <h3
                                                    className="title"
                                                    style={{
                                                        textAlign: 'center',
                                                    }}>
                                                    {`Could a different day at the ${props?.data?.siteSelected?.ms_name} work?`}
                                                </h3>
                                                <div
                                                    className="description"
                                                    style={{
                                                        textAlign: 'center',
                                                    }}>
                                                    {`Sign up for a free session
                                                    on the ${props.bookingFull?.other_class?.course_title}`}
                                                </div>
                                                <div>
                                                    <p>
                                                        {`${props.bookingFull?.other_class?.start_date?.date_show}`}
                                                        <br />
                                                        {`${props.bookingFull?.other_class?.available_space} x available spaces`}
                                                    </p>
                                                </div>
                                                <Button
                                                    style={styles.button}
                                                    onClick={() => {
                                                        if (props.bookOther)
                                                            props.bookOther();
                                                    }}>
                                                    {`Book a ${
                                                        props.data.siteSelected
                                                            .ms_trial === 1
                                                            ? 'trial'
                                                            : 'free'
                                                    } session`}
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                    <div className="col-4">
                                        <div
                                            className="item"
                                            style={{ position: 'relative' }}>
                                            <TrainingIcon2 />
                                            <h3
                                                className="title"
                                                style={{ textAlign: 'center' }}>
                                                The Saturday class is super
                                                popular. Please join our waiting
                                                list
                                            </h3>
                                            <div
                                                className="description"
                                                style={{ textAlign: 'center' }}>
                                                We will email you or call you as
                                                soon as a position opens up. You
                                                can check in your order in the
                                                queue in your Parent Area
                                                account.
                                            </div>
                                            <Button
                                                style={styles.button}
                                                onClick={() =>
                                                    dispatch({
                                                        type: siteActionType.ADD_WAITING,
                                                        course_id:
                                                            props.data
                                                                .courseSelected
                                                                .course_id,
                                                        child_id:
                                                            props.bookingFull
                                                                .child_id,
                                                        message: '',
                                                        token: props.bookingFull
                                                            .access_token,
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
                                                No need to resubmit the form -
                                                you just need to choose a new
                                                nearby academy and class time.
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
                    </>
                )}

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
                {/* {Utils.isEmpty(props.responseCourse) ? ( */}
                <>
                    <div style={{ marginBottom: '4rem' }}>
                        {props.addToWaiting ? (
                            <>
                                <h2>
                                    {`${
                                        props.data.child_first_name +
                                        ' ' +
                                        props.data.child_last_name
                                    } is added  to the waiting list for trial session at ${
                                        props.data.siteSelected.ms_name
                                    }. We will let you know when this session will be available.`}
                                </h2>
                                <label>
                                    <a
                                        href=""
                                        onClick={(evt) => {
                                            evt.preventDefault();
                                            if (props.goBack) props.goBack();
                                        }}>
                                        Go back
                                    </a>
                                </label>
                            </>
                        ) : (
                            <>
                                {!isEmpty(props.data) && (
                                    <h2>
                                        {`Woohoo! ${
                                            props?.data?.child_first_name +
                                            ' ' +
                                            props?.data?.child_last_name
                                        } is booked in for their ${
                                            props?.data?.siteSelected
                                                ?.ms_trial === 1
                                                ? 'trial'
                                                : 'free trial'
                                        } session at ${
                                            props?.data?.siteSelected?.ms_name
                                        } on`}
                                        <br />
                                        <span style={{ color: '#FF7100' }}>
                                            {`${dayjs(
                                                '2021-03-03T' +
                                                    props.data.courseSelected
                                                        .course_day_time_start,
                                            ).format('hh:mma')}-${dayjs(
                                                '2021-03-03T' +
                                                    props.data.courseSelected
                                                        .course_day_time_end,
                                            ).format('hh:mma')} on ${
                                                props?.data?.start_date
                                            }`}
                                        </span>
                                    </h2>
                                )}
                            </>
                        )}
                    </div>

                    <>
                        <div className="container">
                            <div className="success-booking">
                                <EmailIcon style={{ margin: '3rem' }} />
                                <div
                                    style={{
                                        flex: 1,
                                        textAlign: 'left',
                                    }}>
                                    <h3>We have emailed you all the details</h3>
                                    <p>
                                        Please click the link in this email to
                                        activate your Parent Area account so you
                                        can modify your booking.
                                    </p>
                                </div>
                            </div>
                            <div>
                                <p>Can&apos;t see the email? </p>
                                {/* <p>Check your spam folder or Resend email.</p> */}
                                <p>Check your spam folder</p>
                                <p>
                                    Your information is safe and secure with We
                                    Make Footballers.
                                </p>
                            </div>
                        </div>
                    </>
                    {!props.addToWaiting && (
                        <div
                            style={{
                                height: 500,
                                position: 'relative',
                                marginTop: 100,
                            }}>
                            <BookingSuccessMap
                                data={props.data}
                                siteSelected={props.data.siteSelected}
                                courseSelected={props.data.courseSelected}
                                responseCourse={props.responseCourse}
                                googleMapURL={Constants.GOOGLE_MAP_URL}
                                loadingElement={
                                    <div style={{ height: `100%` }} />
                                }
                                containerElement={
                                    <div style={{ height: `100%` }} />
                                }
                                mapElement={<div style={{ height: `100%` }} />}
                            />
                        </div>
                    )}
                </>
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
        cursor: 'pointer',
    },
};

export default BookTrialTraining3;
