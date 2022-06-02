import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import saveList from 'src/hooks/useSaveList';
import { siteActionType } from 'src/redux/actions/actionTypes';
import {
    bookCourse,
    bookCourseSignUp,
} from 'src/redux/actions/bookTrialTrainingAction';
import { findNearByAcademy } from 'src/redux/actions/siteAction';
import siteService from 'src/services/siteService';
import swal from 'sweetalert';
import router, { Router, useRouter } from 'next/router';

const BookTrialTraining1 = dynamic(() =>
    import(
        'src/components/book-trial-trainingComponents/components/BookTrialTraining1'
    ),
);
const BookTrialTraining2 = dynamic(() =>
    import(
        'src/components/book-trial-trainingComponents/components/BookTrialTraining2'
    ),
);
const BookTrialTraining3 = dynamic(() =>
    import(
        'src/components/book-trial-trainingComponents/components/BookTrialTraining3'
    ),
);
const BookTrialTraining4 = dynamic(() =>
    import(
        'src/components/book-trial-trainingComponents/components/BookTrialTraining4'
    ),
);
const EachTab = dynamic(() => import('src/components/EachTab'));
const HolidayCampTabSpace = dynamic(() =>
    import('src/components/include/HolidayCampTabSpace'),
);
const DefaultLayout = dynamic(() => import('src/layout/DefaultLayout'));

function BookTrialTraining({ listSite }) {
    // console.log(listSite, 'list');
    saveList(listSite);
    const siteReducer = useSelector((state) => state.siteReducer);
    const dispatch = useDispatch();

    const [activeTab, setActiveTab] = useState(1);
    const [showLogin, setShowLogin] = useState(false);
    const [bookSuccess, setBookSuccess] = useState(0);
    const [bookMessage, setBookMessage] = useState('');
    const [responseCourse, setResponseCourse] = useState({});
    const [bookingFull, setBookingFull] = useState({});
    const [token, setToken] = useState('');
    const [showNearby, setShowNearby] = useState(false);
    const [listNearby, setListNearby] = useState([]);
    const [addToWaiting, setAddToWaiting] = useState(false);
    const [longLatSite, setLongLatSite] = useState({ long: '', lat: '' });
    const [totalData, setTotalData] = useState({});

    const saveToLocal = (data) => {
        window.localStorage.setItem('dataPayment', JSON.stringify(data));
    };

    // useEffect(() => {
    //     console.log(activeTab, 'tab');
    // }, [activeTab]);

    useEffect(() => {
        window.scrollTo(0, 0);
        setLongLatSite({
            long: localStorage.getItem('longitude'),
            lat: localStorage.getItem('latitude'),
        });
    }, []);

    const history = useRouter();
    const academyLocation = history.query.franchise;

    const defaultAcademyss = listSite.find(
        (e) => academyLocation === e.ms_alias,
    );

    useEffect(() => {
        if (siteReducer.type) {
            if (
                siteReducer.type === siteActionType.FIND_NEARBY_ACADEMY_SUCCESS
            ) {
                // setLstSite(siteReducer.data);
                const lstSiteNearest = [...siteReducer.data]
                    .sort((a, b) => a.distance - b.distance)
                    .filter(
                        (item) => item.ms_id !== totalData.siteSelected.ms_id,
                    );

                setShowNearby(true);
                setListNearby(lstSiteNearest);
            }

            if (siteReducer.type === siteActionType.ADD_WAITING_SUCCESS) {
                setBookSuccess(1);
                setActiveTab(3);
                setAddToWaiting(true);
            }

            if (
                siteReducer.type === siteActionType.BOOK_COURSE_SIGNUP_SUCCESS
            ) {
                let { data } = siteReducer;

                if (data.status === 200) {
                    let _data = data.data;

                    if (_data.payment_url)
                        saveToLocal({
                            data: {
                                courseSelected: totalData.courseSelected,
                                siteSelected: totalData.siteSelected,
                            },
                            token: _data.access_token,
                            isCampBooking: false,
                        });

                    setResponseCourse({
                        paymentUrl: _data.payment_url,
                        bookingId: _data.booking_id,
                        token: _data.access_token,
                    });

                    if (totalData?.siteSelected?.ms_trial === 0) {
                        setBookSuccess(1);
                        setActiveTab(3);
                    }
                    if (totalData?.siteSelected?.ms_trial === 1) {
                        setActiveTab(4);
                    }
                } else if (data.status === 709) {
                    //booking class full

                    setBookSuccess(3);
                    setActiveTab(3);
                    setBookingFull(data.data);
                    setToken(data.data.access_token);
                } else if (data.status === 704) {
                    //register email existed
                    setShowLogin(true);
                } else if (data.status === 701 || data.status === 702) {
                    //register error/invalid
                    setBookSuccess(2);
                    setBookMessage(
                        'Cannot register user on Parent Area system',
                    );
                    setActiveTab(3);
                } else {
                    // CreateChild_Existed, CreateChild_Error, CreateChild_Invalid,Booking_Error
                    setBookSuccess(2);
                    setBookMessage(data.message);
                    setActiveTab(3);
                }
            }
            if (siteReducer.type === siteActionType.BOOK_COURSE_SUCCESS) {
                // if() {

                // }

                // setShowNearby(false)
                if (totalData?.siteSelected?.ms_trial === 1) {
                    if (siteReducer?.data?.data?.payment_url) {
                        saveToLocal({
                            data: {
                                courseSelected: totalData.courseSelected,
                                siteSelected: totalData.siteSelected,
                            },
                            token: token,
                            isCampBooking: false,
                        });
                        setResponseCourse({
                            paymentUrl: siteReducer.data.data.payment_url,
                            bookingId: siteReducer.data.data.booking_id,
                            token: token,
                        });
                        setActiveTab(4);
                    }
                }

                if (totalData?.siteSelected?.ms_trial === 0) {
                    setBookSuccess(1);
                    setActiveTab(3);
                }
            }
            if (siteReducer.type === siteActionType.BOOK_COURSE_FAILED) {
                siteReducer.data &&
                    siteReducer.data.Booking_Error &&
                    swal(siteReducer.data.Booking_Error);
            }
        }
    }, [siteReducer]);

    //! Function
    const checkAndScrollBtnSubmit = () => {
        setTimeout(() => {
            const btnSubmitNextStep =
                document.querySelector('#btn-submit-step');
            if (btnSubmitNextStep) {
                window.scrollTo({
                    top: btnSubmitNextStep.offsetTop - 200,
                    behavior: 'smooth',
                });
            }
        }, 200);
    };

    const onClickTab = (tab) => () => {
        switch (tab) {
            case 1: {
                if (activeTab === 2) {
                    setActiveTab(1);
                }
                break;
            }

            case 2: {
                if (activeTab < 2) {
                    checkAndScrollBtnSubmit();
                }
                break;
            }

            case 3: {
                if (activeTab !== 3) {
                    checkAndScrollBtnSubmit();
                }
                break;
            }

            default:
                break;
        }
    };

    useEffect(() => {
        console.log(totalData, 'totalData');
    }, [totalData]);

    //! Render
    return (
        <DefaultLayout>
            <div className="holiday-camp">
                <div className="container">
                    <div className="tab-view">
                        <EachTab
                            active={activeTab === 1}
                            filled={activeTab > 1}
                            labelBtn="1"
                            onClick={onClickTab(1)}
                        />

                        <HolidayCampTabSpace />
                        <EachTab
                            active={activeTab === 2}
                            filled={activeTab > 2}
                            labelBtn="2"
                            onClick={onClickTab(2)}
                        />

                        <HolidayCampTabSpace />
                        <EachTab
                            active={activeTab === 3}
                            filled={false}
                            labelBtn="3"
                            onClick={onClickTab(3)}
                        />
                    </div>
                    <div className="tab-content">
                        {activeTab === 1 && (
                            <BookTrialTraining1
                                // defaultAcademyss={defaultAcademyss}
                                setLongLatSite={setLongLatSite}
                                onNext={(data) => {
                                    global.bookTraining = {
                                        ...global.bookTraining,
                                        ...data,
                                    };
                                    setTotalData({ ...totalData, ...data });
                                    setActiveTab(2);
                                }}
                            />
                        )}
                        {activeTab === 2 && (
                            <BookTrialTraining2
                                data={totalData}
                                showLogin={showLogin}
                                dataStep1={totalData}
                                onNext={(data) => {
                                    global.bookTraining = {
                                        ...global.bookTraining,
                                        ...data,
                                    };

                                    // const data = { ...totalData, data };
                                    setTotalData({ ...totalData, ...data });

                                    dispatch(
                                        bookCourseSignUp({
                                            totalData: {
                                                ...totalData,
                                                ...data,
                                            },
                                        }),
                                    );
                                }}
                            />
                        )}
                        {activeTab === 3 && (
                            <BookTrialTraining3
                                addToWaiting={addToWaiting}
                                showNearby={showNearby}
                                setShowNearby={setShowNearby}
                                listNearby={listNearby}
                                success={bookSuccess}
                                message={bookMessage}
                                data={totalData}
                                goBack={() => setActiveTab(1)}
                                responseCourse={responseCourse}
                                bookingFull={bookingFull}
                                findAcademy={() => {
                                    // setLstCourse([]);
                                    dispatch(
                                        findNearByAcademy(
                                            longLatSite.lat,
                                            longLatSite.long,
                                        ),
                                    );
                                }}
                                bookOther={() => {
                                    dispatch(
                                        bookCourse({
                                            course_id:
                                                bookingFull.other_class
                                                    .course_id,
                                            start_date:
                                                bookingFull.other_class
                                                    .start_date.date,
                                            child_id: bookingFull.child_id,
                                            token,
                                            totalData: totalData,
                                        }),
                                    );
                                }}
                                bookingNearby={(
                                    courseSelected,
                                    siteSelected,
                                    start_date,
                                ) => {
                                    const data = {
                                        ...totalData,
                                        courseSelected,
                                        siteSelected,
                                        start_date,
                                    };
                                    setTotalData({ ...data });

                                    dispatch(
                                        bookCourse({
                                            course_id: courseSelected.course_id,
                                            start_date: start_date,
                                            child_id: bookingFull.child_id,
                                            token,
                                            totalData: {
                                                ...data,
                                            },
                                        }),
                                    );
                                }}
                            />
                        )}
                        {activeTab === 4 && (
                            <BookTrialTraining4
                                responseCourse={responseCourse}
                                // url={paymentUrl}
                            />
                        )}
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
}

export async function getServerSideProps() {
    const listRes = await siteService.getListSite();
    const listSite = listRes.data.data.lstSite;

    return { props: { listSite } };
}

export default BookTrialTraining;
