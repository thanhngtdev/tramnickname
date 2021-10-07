import { isEmpty } from 'lodash';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EmailIcon from 'src/components/Booking/EmailIcon';
import saveList from 'src/hooks/useSaveList';
import DefaultLayout from 'src/layout/DefaultLayout';
import { siteActionType } from 'src/redux/actions/actionTypes';
import siteService from 'src/services/siteService';
const propTypes = {};

const PaymentResult = (props) => {
    console.log(props, 'aaa');

    //! State

    const dispatch = useDispatch();
    const siteReducer = useSelector((state) => state.siteReducer);

    const [dataBooking, setDataBooking] = useState({});
    const [paidBooking, setPaidBooking] = useState(false);
    const [dataPayment, setDataPayment] = useState({});
    const [token, setToken] = useState('');
    //! UseEffect
    saveList(props.listSite);

    useEffect(() => {
        if (!isEmpty(props?.id)) {
            const data = JSON.parse(window.localStorage.getItem('dataPayment'));
            setToken(data?.token);
            setDataPayment(data);
        } else {
            window.location.href = '/404';
        }
    }, []);

    useEffect(() => {
        if (props?.id && token) {
            dispatch({
                type: siteActionType.GET_BOOKING,
                booking_id: props.id,
                token: token,
            });
        }
    }, [token]);

    useEffect(() => {
        if (siteReducer.type) {
            if (siteReducer.type === siteActionType.GET_BOOKING_SUCCESS) {
                console.log(siteReducer);
                if (siteReducer.data) {
                    setDataBooking(siteReducer?.data?.data);
                    if (siteReducer.data.data.payment_status === 'Paid') {
                        setPaidBooking(true);
                    } else {
                        setPaidBooking(false);
                    }
                }
            }
        }
    }, [siteReducer]);

    //! Function

    //! Render
    if (isEmpty(props.id) || isEmpty(dataBooking)) return <> </>;

    return (
        <DefaultLayout>
            <div className="holiday-camp">
                <div className="container">
                    <div className="tab-content">
                        <div className="tab-3">
                            <div style={{ marginBottom: '4rem' }}>
                                {paidBooking ? (
                                    <h2>
                                        {`Woohoo! ${
                                            dataBooking?.child_name
                                        } is booked in for their trial session at ${
                                            dataPayment?.data?.siteSelected
                                                ?.ms_name || ''
                                        } on `}
                                        <br />
                                        <span style={{ color: '#FF7100' }}>
                                            {`${
                                                dataPayment?.data?.start_date
                                            } at ${moment(
                                                dataPayment?.data
                                                    ?.courseSelected
                                                    ?.course_day_time_start,
                                                'hh:mm:ss',
                                            ).format('hh:mma')}-${moment(
                                                dataPayment?.data
                                                    ?.courseSelected
                                                    ?.course_day_time_end,
                                                'hh:mm:ss',
                                            ).format('hh:mma')}`}
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
                                        <h3>
                                            We have emailed you all the details
                                        </h3>
                                        <p>
                                            Please click the link in this email
                                            to activate your
                                        </p>
                                        <p>
                                            Parent Area account so you can
                                            modify your booking.
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <p>Can&apos;t see the email? </p>
                                    <p>
                                        Check your spam folder or Resend email.
                                    </p>
                                    <p>
                                        Your information is safe and secure with
                                        We Make Footballers.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};

export async function getServerSideProps(ctx) {
    const split = ctx.query.param.split('?');

    if (!isNaN(split[0])) {
        const res = await siteService.getListSite();
        const list = res.data.data.lstSite;

        return { props: { id: split[0], listSite: list } };
    }

    return { props: { id: '' } };
}

PaymentResult.propTypes = propTypes;
export default PaymentResult;
