import dayjs from 'dayjs';
import isEmpty from 'lodash/isEmpty';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Constants from 'src/common/Constants';
import BookingSuccessMap from 'src/components/include/BookingSuccessMap';
import saveList from 'src/hooks/useSaveList';
import { siteActionType } from 'src/redux/actions/actionTypes';
import siteService from 'src/services/siteService';

const EmailIcon = dynamic(() => import('src/components/Booking/EmailIcon'));
const EachTab = dynamic(() => import('src/components/EachTab'));
const HolidayCampTabSpace = dynamic(() =>
    import('src/components/include/HolidayCampTabSpace'),
);
const DefaultLayout = dynamic(() => import('src/layout/DefaultLayout'));

const PaymentResult = (props) => {
    // console.log(props, 'aaa');

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
                    <div className="tab-view">
                        <EachTab
                            active={false}
                            filled={-1 > 1}
                            labelBtn="1"
                            onClick={
                                () => {}
                                // onClickTab(1)
                            }
                        />

                        <HolidayCampTabSpace />
                        <EachTab
                            active={false}
                            filled={-1 > 2}
                            labelBtn="2"
                            onClick={
                                () => {}
                                // onClickTab(2)
                            }
                        />

                        <HolidayCampTabSpace />
                        <EachTab
                            active={true}
                            filled={false}
                            labelBtn="3"
                            onClick={() => {}}
                        />
                    </div>
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
                                        {dataPayment?.isCampBooking ? (
                                            <>
                                                <span
                                                    style={{
                                                        color: '#FF7100',
                                                    }}>
                                                    {`${dataPayment?.data?.courseSelected?.date} at ${dataPayment?.data?.courseSelected?.time}`}
                                                </span>
                                            </>
                                        ) : (
                                            <>
                                                <span
                                                    style={{
                                                        color: '#FF7100',
                                                    }}>
                                                    {`${
                                                        dataBooking?.start_date
                                                    } at ${dayjs(
                                                        '2021-03-03T' +
                                                            dataPayment?.data
                                                                ?.courseSelected
                                                                ?.course_day_time_start,
                                                    ).format('hh:mma')}-${dayjs(
                                                        '2021-03-03T' +
                                                            dataPayment?.data
                                                                ?.courseSelected
                                                                ?.course_day_time_end,
                                                    ).format('hh:mma')}`}
                                                </span>
                                            </>
                                        )}
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
                                            to activate your Parent Area account
                                            so you can modify your booking.
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
                            {paidBooking === true && (
                                <div
                                    style={{
                                        height: 500,
                                        position: 'relative',
                                        marginTop: 100,
                                    }}>
                                    <BookingSuccessMap
                                        data={dataPayment?.data}
                                        siteSelected={
                                            dataPayment?.data?.siteSelected
                                        }
                                        courseSelected={
                                            dataPayment?.data?.courseSelected
                                        }
                                        // responseCourse={props.responseCourse}
                                        googleMapURL={Constants.GOOGLE_MAP_URL}
                                        loadingElement={
                                            <div style={{ height: `100%` }} />
                                        }
                                        containerElement={
                                            <div style={{ height: `100%` }} />
                                        }
                                        mapElement={
                                            <div style={{ height: `100%` }} />
                                        }
                                    />
                                </div>
                            )}
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

export default PaymentResult;
