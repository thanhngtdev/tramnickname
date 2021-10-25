import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useDispatch, useSelector } from 'react-redux';
import { siteActionType } from 'src/redux/actions/actionTypes';
const DefaultLayout = dynamic(() => import('src/layout/DefaultLayout'));
import saveList from 'src/hooks/useSaveList';
import siteService from 'src/services/siteService';
import Constants from 'src/common/Constants';
import Utils from 'src/common/Utils';

const BookTrialCamp1 = dynamic(() =>
    import(
        'src/components/book-trial-campComponents/components/BookTrialCamp1'
    ),
);
const BookTrialCamp2 = dynamic(() =>
    import(
        'src/components/book-trial-campComponents/components/BookTrialCamp2'
    ),
);
const BookTrialCamp3 = dynamic(() =>
    import(
        'src/components/book-trial-campComponents/components/BookTrialCamp3'
    ),
);
const HolidayCampTabSpace = dynamic(() =>
    import('src/components/include/HolidayCampTabSpace'),
);

const DEFAULT_MESSAGE = `User registered but the booking is not completed, please Log in <a
href="https://www.parentarea.co/parent/login"
target="_blank"
rel="noreferrer"
className="alink">
here
</a> to continue booking on the Parent Area system`;

function BookTrialCamp({ listSite }) {
    saveList(listSite);
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
                        // console.log({ ...dataStep1, ...dataStep2 }, 'datad');
                        Utils.saveToLocal({
                            data: { ...dataStep1, ...dataStep2 },
                            token: _data.access_token,
                            isCampBooking: true,
                        });
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
        <DefaultLayout>
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
        </DefaultLayout>
    );
}

export async function getStaticProps() {
    const listRes = await siteService.getListSite();
    const listSite = listRes.data.data.lstSite;

    return { props: { listSite, revalidate: Constants.REVALIDATE } };
}

export default BookTrialCamp;
