import React, { useEffect, useState } from 'react';
import 'css/book-trial.css';
import { useDispatch, useSelector } from 'react-redux';
import { siteActionType } from 'redux/actions/actionTypes';
import BookTrialCamp1 from './components/BookTrialCamp1';
import BookTrialCamp2 from './components/BookTrialCamp2';
import BookTrialCamp3 from './components/BookTrialCamp3';
import HolidayCampTabSpace from 'component/include/HolidayCampTabSpace';

const DEFAULT_MESSAGE = `User registered but the booking is not completed, please Log in <a
href="https://www.parentarea.co/parent/login"
target="_blank"
rel="noreferrer"
className="alink">
here
</a> to continue booking on the Parent Area system`;

function BookTrialCamp() {
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState(1);
    const [dataStep1, setDataStep1] = useState({});
    const [dataStep2, setDataStep2] = useState({});

    const [showLogin, setShowLogin] = useState(false);
    const [responseCourse, setResponseCourse] = useState({});
    const [bookSuccess, setBookSuccess] = useState(1);
    const [bookMessage, setBookMessage] = useState('');
    const [findAcademy, setFindAcademy] = useState(false);

    const siteReducer = useSelector((state) => state.siteReducer);
    useEffect(() => {
        if (siteReducer.type) {
            if (siteReducer.type === siteActionType.BOOK_EVENT_SIGNUP_SUCCESS) {
                let { data } = siteReducer;
                // console.log(data);
                if (data.status === 200) {
                    let _data = data.data;
                    if (_data.payment_url)
                        setResponseCourse({
                            paymentUrl: _data.payment_url,
                            bookingId: _data.booking_id,
                            token: _data.access_token,
                        });
                    setBookSuccess(1);
                    setActiveTab(3);
                } else if (data.status === 709) {
                    //booking class full
                    setBookSuccess(3);
                    setActiveTab(3);
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
                    setBookMessage(data.message || DEFAULT_MESSAGE);
                    setActiveTab(3);
                }
            }
        }
    }, [siteReducer]);

    return (
        <div className="holiday-camp">
            <div className="container">
                <div className="tab-view">
                    <div
                        className={`wrap-tab ${
                            activeTab === 1 ? 'active' : ''
                        } ${activeTab > 1 ? 'filled' : ''}`}>
                        <button>1</button>
                    </div>

                    <HolidayCampTabSpace />
                    <div
                        className={`wrap-tab ${
                            activeTab === 2 ? 'active' : ''
                        } ${activeTab > 2 ? 'filled' : ''}`}>
                        <button>2</button>
                    </div>
                    <HolidayCampTabSpace />
                    <div
                        className={`wrap-tab ${
                            activeTab === 3 ? 'active' : ''
                        }`}>
                        <button>3</button>
                    </div>
                </div>
                <div className="tab-content">
                    {activeTab === 1 && (
                        <BookTrialCamp1
                            onNext={(data) => {
                                setDataStep1(data);
                                setActiveTab(2);
                            }}
                        />
                    )}
                    {activeTab === 2 && (
                        <BookTrialCamp2
                            showLogin={showLogin}
                            dataStep1={dataStep1}
                            onNext={(data) => {
                                setDataStep2(data);
                                let totalData = { ...dataStep1, ...data };
                                dispatch({
                                    type: siteActionType.BOOK_EVENT_SIGNUP,
                                    totalData,
                                });
                            }}
                        />
                    )}
                    {activeTab === 3 && (
                        <BookTrialCamp3
                            success={bookSuccess}
                            message={bookMessage}
                            data={{ ...dataStep1, ...dataStep2 }}
                            goBack={() => setActiveTab(1)}
                            responseCourse={responseCourse}
                            findAcademy={() => {
                                setFindAcademy(true);
                            }}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default BookTrialCamp;
