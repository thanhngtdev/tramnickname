import React, { Fragment, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Checkbox from 'component/include/Checkbox/Checkbox';
import SolidButton from 'component/include/SolidButton';
import TrainingIcon1 from './TrainingIcon1';
import TrainingIcon2 from './TrainingIcon2';
import TrainingIcon3 from './TrainingIcon3';
import PropTypes from 'prop-types';
import { siteActionType } from 'redux/actions/actionTypes';
import { useDispatch, useSelector } from 'react-redux';
import BorderButton from 'component/include/BorderButton';
import EmailIcon from './EmailIcon';
import Utils from 'common/Utils';

BookTrialCamp3.propTypes = {
    success: PropTypes.number,
    data: PropTypes.object,
    goBack: PropTypes.func,
    findAcademy: PropTypes.func,
    responseCourse: PropTypes.object,
};

function BookTrialCamp3(props) {
    const dispatch = useDispatch();

    // console.log(props);

    const [showSuccess, setShowSuccess] = useState(false);
    const [getBooking, setGetBooking] = useState(false);
    const [paidBooking, setPaidBooking] = useState(false);
    const [message, setMessage] = useState('');
    const [showPayment, setShowPayment] = useState(false);
    const [buttonTitle, setButtonTitle] = useState('Make Payment');
    const [dataBooking, setDataBooking] = useState({});

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const siteReducer = useSelector((state) => state.siteReducer);
    useEffect(() => {
        if (siteReducer.type) {
            if (siteReducer.type === siteActionType.GET_BOOKING_SUCCESS) {
                // console.log(siteReducer.data);
                setDataBooking(siteReducer.data.data);
                setGetBooking(true);
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
                                <div
                                    className="item"
                                    style={{ position: 'relative' }}>
                                    <TrainingIcon1 />
                                    <h3
                                        className="title"
                                        style={{ textAlign: 'center' }}>
                                        Could a different day at the{' '}
                                        {props.data.siteSelected &&
                                            props.data.siteSelected
                                                .ms_name}{' '}
                                        work?
                                    </h3>
                                    <div
                                        className="description"
                                        style={{ textAlign: 'center' }}>
                                        Sign up for a free session on the
                                        Wednesday class at 5pm.
                                    </div>
                                    <p
                                        style={{
                                            marginTop: 25,
                                            marginBottom: 25,
                                            fontWeight: 'bold',
                                        }}>
                                        4 x available spaces for 5 year olds
                                    </p>
                                    <Button
                                        style={styles.button}
                                        onClick={() => {
                                            if (props.goBack) props.goBack();
                                        }}>
                                        Book a free session
                                    </Button>
                                </div>
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
                                                child_id: '',
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

    function renderError() {
        return (
            <div style={{ marginBottom: '4rem' }}>
                <h2 dangerouslySetInnerHTML={{ __html: props.message }} />
            </div>
        );
    }

    function renderSuccess() {
        if (getBooking) return renderSuccess2();
        return (
            <>
                {props.data.courseSelected && (
                    <div
                        style={{
                            backgroundColor: 'white',
                            padding: '2rem',
                        }}>
                        <div className="wSelect2">
                            <b>Summary of your booking:</b>
                            <p>{props.data.courseSelected.date}</p>
                        </div>
                        <div className="wSelect2">
                            <b>LOCATION: </b>
                            <br />
                            <p>{props.data.siteSelected.ms_address}</p>
                        </div>
                        <div className="wSelect2">
                            {props.data.lstDate.map((item, index) =>
                                index % 2 === 0 ? (
                                    <div
                                        key={index}
                                        className="classRow"
                                        style={{
                                            backgroundColor: '#F7F8F7',
                                        }}>
                                        <div className="classInfo">
                                            <p>{item}</p>
                                        </div>
                                        <b>£{props.data.lstPrice[index]}</b>
                                    </div>
                                ) : (
                                    <div key={index} className="classRow">
                                        <div className="classInfo">
                                            <p>{item}</p>
                                        </div>
                                        <p>£{props.data.lstPrice[index]}</p>
                                    </div>
                                ),
                            )}
                            <hr />
                            <p
                                style={{
                                    textAlign: 'right',
                                    fontWeight: 'bold',
                                    marginRight: '1rem',
                                }}>
                                Total: &nbsp; £{props.data.totalPrice}
                            </p>
                        </div>
                    </div>
                )}
                {showPayment ? (
                    <iframe
                        className="responsive-iframe"
                        style={{ border: 'none' }}
                        src={props.responseCourse.paymentUrl}
                        width="100%"
                        height="770"></iframe>
                ) : (
                    <>
                        <div
                            className="wSelect2"
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                paddingTop: '2rem',
                            }}>
                            <Checkbox checked={true} />
                            <p style={{ marginTop: 0 }}>
                                Please confirm you comply with our{' '}
                                <a href="/#">Terms and Conditions</a>
                            </p>
                        </div>
                        <img src={require('images/paypal.png')} />
                    </>
                )}
                <div style={{ marginTop: '3rem' }}>
                    <SolidButton
                        title={buttonTitle}
                        onClick={() => {
                            if (!showPayment) {
                                setShowPayment(true);
                                setButtonTitle('Confirm');
                            } else {
                                dispatch({
                                    type: siteActionType.GET_BOOKING,
                                    booking_id: props.responseCourse.bookingId,
                                    token: props.responseCourse.token,
                                });
                            }
                        }}
                    />
                </div>
            </>
        );
    }

    function renderSuccess2() {
        return (
            <>
                <div style={{ marginBottom: '4rem' }}>
                    {paidBooking ? (
                        <h2>
                            Woohoo! Tony is booked in for a Holiday Camp at
                            Isleworth Academy on the following dates:
                        </h2>
                    ) : (
                        <h2>
                            The booking status is {dataBooking.payment_status}{' '}
                            Please log in to Parent Area{' '}
                            <a
                                href="https://www.parentarea.co/parent/login"
                                target="_blank"
                                rel="noreferrer"
                                className="alink">
                                here
                            </a>{' '}
                            to complete booking
                        </h2>
                    )}
                </div>
                {paidBooking && (
                    <div>
                        <ul className="camp-paid">
                            {dataBooking &&
                                dataBooking.sessions.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                        </ul>
                    </div>
                )}
                <div className="container">
                    <div className="success-booking">
                        <EmailIcon style={{ margin: '3rem' }} />
                        <div
                            style={{
                                flex: 1,
                                textAlign: 'left',
                                paddingRight: '4rem',
                            }}>
                            <p>
                                We have emailed you all the details. Click the
                                link in the email to confirm your address and
                                start your child’s footballing journey.
                            </p>
                        </div>
                    </div>
                    <div style={{ maxWidth: 600, margin: '0 auto' }}>
                        <p>
                            You can login to your Parent Area account anytime{' '}
                            <a
                                href="https://www.parentarea.co/parent/login"
                                target="_blank"
                                rel="noreferrer"
                                className="alink">
                                here
                            </a>{' '}
                            to manage your booking or add more children.
                        </p>

                        <p>
                            You can come back to the We Make Footballers website
                            and login anytime or use the link in email we just
                            sent you.
                        </p>
                    </div>
                </div>
            </>
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

export default BookTrialCamp3;
