import React, { useEffect, useState } from 'react';
import '../css/book-trial.css';
import HolidayCampTabSpace from './include/HolidayCampTabSpace';
import BookTrialTraining1 from './booking/BookTrialTraining1';
import BookTrialTraining2 from './booking/BookTrialTraining2';
import BookTrialTraining3 from './booking/BookTrialTraining3';
import { useDispatch, useSelector } from 'react-redux';
import { siteActionType } from '../actions/actionTypes';
import { CommonStyle } from '../common/Styles';
import Select from 'react-select';
import BorderButton from './include/BorderButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import Radiobox from './include/Radiobox/Radiobox';
import moment from 'moment';
import Utils from '../common/Utils';
import swal from 'sweetalert';

function BookTrialTraining() {
    const dispatch = useDispatch();
    const [findAcademy, setFindAcademy] = useState(false);
    const [activeTab, setActiveTab] = useState(1);
    const [dataStep1, setDataStep1] = useState({});
    const [dataStep2, setDataStep2] = useState({});
    const [showLogin, setShowLogin] = useState(false);
    const [bookSuccess, setBookSuccess] = useState(0);
    const [bookMessage, setBookMessage] = useState('');
    const [lstSite, setLstSite] = useState([]);
    const [siteSelected, setSiteSelected] = useState({});
    const [siteError, setSiteError] = useState('');
    const [lstCourse, setLstCourse] = useState([]);
    const [courseSelected, setCourseSelected] = useState({});
    const [lstStartDate, setLstStartDate] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [trialDateError, setTrialDateError] = useState('');
    const [responseCourse, setResponseCourse] = useState({});
    const [bookingFull, setBookingFull] = useState({});
    const [token, setToken] = useState('');
    const currentLat = localStorage.getItem('latitude');
    const currentLng = localStorage.getItem('longitude');

    const siteReducer = useSelector((state) => state.siteReducer);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (siteReducer.type) {
            if (
                siteReducer.type === siteActionType.FIND_NEARBY_ACADEMY_SUCCESS
            ) {
                setLstSite(siteReducer.data);
            }
            if (siteReducer.type === siteActionType.GET_LIST_COURSE_SUCCESS) {
                setLstCourse(siteReducer.data);
            }
            if (siteReducer.type === siteActionType.COURSE_START_DATE_SUCCESS) {
                setLstStartDate(siteReducer.data);
            }
            if (
                siteReducer.type === siteActionType.BOOK_COURSE_SIGNUP_SUCCESS
            ) {
                let { data } = siteReducer;
                // console.log(data);
                if (data.status === 200) {
                    let _data = data.data;
                    if (_data.Payment_URL)
                        setResponseCourse({
                            paymentUrl: _data.payment_url,
                            bookingId: _data.Booking_id,
                            token: _data.access_token,
                        });
                    setBookSuccess(1);
                    setActiveTab(3);
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
                if (siteReducer.data.payment_url)
                    setResponseCourse({
                        paymentUrl: siteReducer.data.payment_url,
                        bookingId: siteReducer.data.booking_id,
                        token: token,
                    });
                setBookSuccess(1);
                setActiveTab(3);
            }
            if (siteReducer.type === siteActionType.BOOK_COURSE_FAILED) {
                siteReducer.data &&
                    siteReducer.data.Booking_Error &&
                    swal(siteReducer.data.Booking_Error);
            }
            if (siteReducer.type === siteActionType.SELECT_ACADEMY) { 
                setSiteSelected(siteReducer.data); 
            }
        }
    }, [siteReducer]);

    function validateData() {
        let _validate = true;
        if (Utils.isEmpty(siteSelected)) {
            _validate = false;
            setSiteError('Please select a academy');
        } else setSiteError('');
        if (startDate === '') {
            _validate = false;
            setTrialDateError('Please choose trial date');
        } else setTrialDateError('');
        return _validate;
    }

    return (
        <div className="holiday-camp">
            {findAcademy ? (
                <div className="booking-find">
                    <div className="container">
                        <div
                            className="back"
                            onClick={() => {
                                setFindAcademy(false);
                            }}>
                            <FontAwesomeIcon
                                icon={faChevronLeft}
                                style={{
                                    margin: '0 0.8rem',
                                    fontSize: '0.8rem',
                                }}
                            />
                            back
                        </div>
                        <BorderButton
                            title="Find a different academy"
                            style={{ marginBottom: 40 }}
                        />
                    </div>
                    <div className="wSelect2">
                        <div className="">
                            <label>Nearest academy</label>
                            <Select
                                value={siteSelected}
                                options={lstSite}
                                isSearchable={false}
                                isMulti={false}
                                getOptionLabel={(option) =>
                                    option.ms_name
                                        ? option.ms_name +
                                          ' ' +
                                          Math.ceil(option.distance) +
                                          ' km'
                                        : ''
                                }
                                getOptionValue={(option) => option.ms_id}
                                styles={CommonStyle.select2}
                                onChange={(option) => {
                                    setSiteSelected(option);
                                    dispatch({
                                        type: siteActionType.GET_LIST_COURSE,
                                        company_id: option.pa_companyId,
                                        location_id: option.pa_locationId,
                                        course_type: 'course',
                                    });
                                }}
                            />
                            <label className="input-error">{siteError}</label>
                        </div>
                        {siteSelected && (
                            <div
                                style={{
                                    backgroundColor: 'white',
                                    padding: '2rem 0',
                                }}>
                                <div className="">
                                    <b>
                                        Choose your class time{' '}
                                        <span style={{ color: '#FF7100' }}>
                                            @{siteSelected.ms_name}
                                        </span>{' '}
                                        Academy
                                    </b>
                                </div>
                                <div>
                                    {lstCourse.map((item, index) => (
                                        <div
                                            key={index}
                                            className="classRow"
                                            style={{
                                                backgroundColor: `${
                                                    index % 2 === 0
                                                        ? '#F7F8F7'
                                                        : 'white'
                                                }`,
                                            }}>
                                            <Radiobox
                                                onChange={() => {
                                                    dispatch({
                                                        type:
                                                            siteActionType.COURSE_START_DATE,
                                                        course_id:
                                                            item.course_id,
                                                    });
                                                    setCourseSelected(item);
                                                }}
                                                checked={
                                                    item.course_id ===
                                                    courseSelected.course_id
                                                }>
                                                {item.day_of_week}
                                            </Radiobox>
                                            <label>
                                                {moment(
                                                    item.course_day_time_start,
                                                    'hh:mm:ss',
                                                ).format('hh:mma')}
                                                -
                                                {moment(
                                                    item.course_day_time_end,
                                                    'hh:mm:ss',
                                                ).format('hh:mma')}
                                            </label>
                                            <span>
                                                {item.min_age}-{item.max_age}{' '}
                                                year olds
                                            </span>
                                        </div>
                                    ))}
                                    {siteSelected.ms_trial === 1 && (
                                        <>
                                            <hr />
                                            <p
                                                style={{
                                                    textAlign: 'right',
                                                    fontWeight: 'bold',
                                                    marginRight: '1rem',
                                                }}>
                                                Total: &nbsp; £
                                                {courseSelected.course_price}
                                            </p>
                                        </>
                                    )}
                                </div>
                            </div>
                        )}
                        <div
                            style={{ marginTop: '4rem', marginBottom: '4rem' }}>
                            <div className="">
                                <label>Trial Date</label>
                                <Select
                                    defaultValue={0}
                                    options={lstStartDate}
                                    isSearchable={false}
                                    isMulti={false}
                                    getOptionLabel={(option) =>
                                        option.date_show
                                    }
                                    getOptionValue={(option) => option.date}
                                    styles={CommonStyle.select2}
                                    onChange={(option) => {
                                        setStartDate(option.date);
                                    }}
                                />
                                <label className="input-error">
                                    {trialDateError}
                                </label>
                            </div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <BorderButton
                                title="Book a free session"
                                onClick={() => {
                                    if (validateData()) {
                                        let _dataStep1 = { ...dataStep1 };
                                        _dataStep1.siteSelected = siteSelected;
                                        _dataStep1.courseSelected = courseSelected;
                                        _dataStep1.company_id =
                                            courseSelected.pa_companyId;
                                        _dataStep1.course_id =
                                            courseSelected.course_id;
                                        _dataStep1.start_date = moment(
                                            startDate,
                                        ).format('yyyy-MM-DD');
                                        setDataStep1(_dataStep1);

                                        let totalData = {
                                            ..._dataStep1,
                                            ...dataStep2,
                                        };

                                        dispatch({
                                            type:
                                                siteActionType.BOOK_COURSE_SIGNUP,
                                            totalData,
                                        });
                                        setFindAcademy(false);
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>
            ) : (
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
                            <BookTrialTraining1
                                onNext={(data) => {
                                    setDataStep1(data);
                                    setActiveTab(2);
                                }}
                            />
                        )}
                        {activeTab === 2 && (
                            <BookTrialTraining2
                                showLogin={showLogin}
                                dataStep1={dataStep1}
                                onNext={(data) => {
                                    setDataStep2(data);
                                    let totalData = { ...dataStep1, ...data };
                                    dispatch({
                                        type: siteActionType.BOOK_COURSE_SIGNUP,
                                        totalData,
                                    });
                                }}
                            />
                        )}
                        {activeTab === 3 && (
                            <BookTrialTraining3
                                success={bookSuccess}
                                message={bookMessage}
                                data={{ ...dataStep1, ...dataStep2 }}
                                goBack={() => setActiveTab(1)}
                                responseCourse={responseCourse}
                                bookingFull={bookingFull}
                                findAcademy={() => {
                                    setFindAcademy(true);
                                    dispatch({
                                        type:
                                            siteActionType.FIND_NEARBY_ACADEMY,
                                        lat: currentLat,
                                        long: currentLng,
                                    });
                                }}
                                bookOther={() => {
                                    dispatch({
                                        type: siteActionType.BOOK_COURSE,
                                        course_id:
                                            bookingFull.other_class.course_id,
                                        start_date:
                                            bookingFull.other_class.start_date
                                                .date,
                                        child_id: bookingFull.child_id,
                                        token: token,
                                    });
                                }}
                            />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default BookTrialTraining;
