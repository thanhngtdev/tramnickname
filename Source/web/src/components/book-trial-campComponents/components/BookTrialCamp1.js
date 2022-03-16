import dayjs from 'dayjs';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { Fragment, useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import Flatpickr from 'react-flatpickr';
import PhoneInput from 'react-phone-number-input';
import flags from 'react-phone-number-input/flags';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import PathRoute from 'src/common/PathRoute';
import { CommonStyle } from 'src/common/Styles';
import Utils from 'src/common/Utils';
import BorderButton from 'src/components/include/BorderButton';
import Checkbox from 'src/components/include/Checkbox/Checkbox';
import { siteActionType } from 'src/redux/actions/actionTypes';
import { checkEmail, getListCourse } from 'src/redux/actions/siteAction';

BookTrialCamp1.propTypes = {
    onNext: PropTypes.func,
};
const options = {
    id: 0,
    show: 'Full day',
};

function BookTrialCamp1(props) {
    const siteReducer = useSelector((state) => state.siteReducer);
    const { emailData } = siteReducer;
    const dispatch = useDispatch();
    const [lstSite, setLstSite] = useState(siteReducer.lstSiteCamp);
    const [siteSelected, setSiteSelected] = useState({});
    const [lstHoliday, setLstHoliday] = useState([]);
    const [courseSelected, setCourseSelected] = useState(null);

    const [companyId, setCompanyId] = useState(0);
    const [date, setDate] = useState(new Date());

    const [eventDate, setEventDate] = useState([]);
    const [dateSelect, setDateSelect] = useState([]);
    const [dateCourseSelect, setDateCourseSelect] = useState([]);
    const [fullCourseSelect, setFullCourseSelect] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);

    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');

    const [siteError, setSiteError] = useState('');
    const [courseError, setCourseError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [timeError, setTimeError] = useState('');
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [dateError, setDateError] = useState('');
    const [disabled, setDisabled] = useState(false);
    const [availableEmail, setAvailableEmail] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        setSiteSelected(JSON.parse(localStorage.getItem('defaultAcademy')));

        if (isEmpty(siteReducer.lstSiteCamp)) {
            dispatch({ type: siteActionType.GET_SITE_HAS_CAMP });
        }

        return () => {
            setAvailableEmail(false);
            setEmailError('');
        };
    }, []);

    useEffect(() => {
        if (siteSelected?.pa_companyId) {
            setCompanyId(siteSelected?.pa_companyId);
            dispatch(
                getListCourse({
                    company_id: siteSelected.pa_companyId,
                    course_type: 'event',
                }),
            );
        }
    }, [siteSelected]);

    useEffect(() => {
        //check if all fields filled
        if (
            !Utils.isEmpty(siteSelected) &&
            dateCourseSelect.some((item) => item.checkBox) &&
            email &&
            phone &&
            firstName &&
            lastName &&
            date &&
            availableEmail === false
        ) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [
        siteSelected,
        dateCourseSelect,
        email,
        phone,
        firstName,
        lastName,
        date,
        availableEmail,
    ]);

    useEffect(() => {
        // console.log('====================================');
        // console.log(date.getFullYear(), dayjs().year());

        // console.log(courseSelected, '====================================');
        if (courseSelected) {
            const old = dayjs().year() - date.getFullYear();

            if (old < courseSelected.min_age) {
                setDisabled(true);
                setDateError(
                    'Your child is too young for this holiday camp, please select another camp',
                );
                return;
            } else if (old > courseSelected.max_age) {
                setDisabled(true);
                setDateError(
                    'Your child is too old for this holiday camp, please select another camp',
                );
                return;
            }
            setDateError('');
        }
    }, [date]);

    useEffect(() => {
        if (!isEmpty(emailData)) {
            // console.log(emailData, 'emailData');
            try {
                const { data } = emailData;
                if (data.email_exist === 'yes') {
                    setAvailableEmail(true);
                    setEmailError('Have an account already? ');
                }
                if (data.email_exist === 'no') {
                    setAvailableEmail(false);
                    setEmailError('');
                }
            } catch (error) {}
        }

        if (siteReducer.type) {
            if (siteReducer.type === siteActionType.GET_SITE_HAS_CAMP_SUCCESS) {
                setLstSite(siteReducer.lstSiteCamp);
                if (global.bookCamp) {
                    let _currentSite = siteReducer.data.lstSite.filter(
                        function (site) {
                            return (
                                site.ms_id === parseInt(global.bookCamp.siteId)
                            );
                        },
                    );
                }
            }
            if (siteReducer.type === siteActionType.GET_LIST_COURSE_SUCCESS) {
                // console.log(siteReducer.data);
                setLstHoliday(siteReducer.data);
            }
            if (siteReducer.type === siteActionType.GET_LIST_COURSE_FAILED) {
                // console.log(siteReducer.data);
                setSiteError(
                    'The Holiday Camp you have selected is not available',
                );
            }
            if (siteReducer.type === siteActionType.EVENT_DATE_SUCCESS) {
                console.log(siteReducer.data, 'redux');
                setEventDate(siteReducer.data);
                setDateSelect(siteReducer.data.map(() => false));

                setDateCourseSelect(
                    siteReducer.data.map(() => {
                        return {
                            id: 0,
                            price: courseSelected.single_day_price,
                            checkBox: false,
                        };
                    }),
                );
            }
            if (siteReducer.type === siteActionType.SELECT_ACADEMY) {
                setSiteSelected(siteReducer.data);
                setCompanyId(siteReducer.data.pa_companyId);
            }
        }
    }, [siteReducer]);

    useEffect(() => {
        if (!isEmpty(dateCourseSelect)) {
            const checkFullCheckBox = dateCourseSelect.find(
                (item) => item.checkBox === false,
            );

            // undefine === checkBoxfull;
            if (fullCourseSelect) {
                setTotalPrice(courseSelected.course_price);
                // setFullCourseSelect(true);
                return;
            }

            let totalPrice = 0;
            dateCourseSelect.map((item) => {
                if (item.checkBox) {
                    totalPrice += parseFloat(item.price);
                }
            });
            setTotalPrice(totalPrice);
            // setFullCourseSelect(false);
        } else {
            // setTotalPrice(0);
            // setFullCourseSelect(false);
        }
    }, [dateCourseSelect]);

    function validateData() {
        let _validate = true;

        // if (Utils.isEmpty(siteSelected)) {
        //     _validate = false;
        //     setSiteError('Please select a academy');
        // } else setSiteError('');

        // if (!courseSelected) {
        //     _validate = false;
        //     setCourseError('Please select a holiday camp');
        // } else setCourseError('');

        if (!Utils.checkEmail(email)) {
            _validate = false;
            setEmailError('Please fill correct format of mail');
        }

        if (!Utils.checkPhone(phone)) {
            _validate = false;
            setPhoneError('Please fill phone number');
        }

        if (firstName.length > 50 || firstName.length < 1) {
            _validate = false;
            setFirstNameError('Please fill first name, 1-50 characters');
        }

        if (lastName.length > 50 || lastName.length < 1) {
            _validate = false;
            setLastNameError('Please fill last name, 1-50 characters');
        }
        //  else setLastNameError('');

        if (date === '') {
            _validate = false;
            setDateError('Please choose child&apos;s date of birth');
        }

        if (!dateCourseSelect.some((item) => item.checkBox)) {
            _validate = false;
            setTimeError('Please select course');
        } else {
            setTimeError('');
        }

        return _validate;
    }

    function changeCourse(index) {
        let handleCheckBox = [...dateCourseSelect];

        handleCheckBox = handleCheckBox.map((item, i) => {
            let temp = item;
            if (index === i) {
                if (item.checkBox) {
                    temp = { ...temp, checkBox: false };
                } else {
                    temp = { ...temp, checkBox: true };
                }
            }
            return temp;
        });
        setDateCourseSelect(handleCheckBox);
    }

    function changeDate(option, index) {
        let _dateCourse = [...dateCourseSelect];

        _dateCourse = _dateCourse.map((item, i) => {
            let temp = item;
            if (i === index) {
                temp = {
                    ...item,
                    id: option.id,
                    price:
                        option.id === 0
                            ? courseSelected.single_day_price
                            : courseSelected.half_day_price,
                };
            }

            return temp;
        });
        setDateCourseSelect(_dateCourse);
    }

    useEffect(() => {
        let _dateCourse = [...dateCourseSelect];
        // console.log('aaaa', fullCourseSelect);
        if (!fullCourseSelect) {
            _dateCourse = _dateCourse.map((item) => {
                return { ...item, checkBox: false };
            });
        } else {
            _dateCourse = _dateCourse.map((item) => {
                return { ...item, checkBox: true };
            });
        }

        setDateCourseSelect(_dateCourse);
    }, [fullCourseSelect]);

    function handleFullCheckBox() {
        setFullCourseSelect(!fullCourseSelect);
    }

    return (
        <div className="tab-1">
            <h2>Let’s sign you up & book a holiday camp!</h2>
            <label>
                It only takes three minutes to create an account and make a
                booking.
            </label>
            <p>
                Have an account already?{' '}
                <a
                    href="https://www.parentarea.co/parent/login"
                    target="_blank"
                    rel="noreferrer">
                    Log in here.
                </a>
            </p>
            <div className="wSelect2">
                <label>Select academy</label>
                <Select
                    value={siteSelected}
                    options={lstSite}
                    isSearchable={false}
                    isMulti={false}
                    getOptionLabel={(option) => {
                        return Utils.renderItem(option);
                    }}
                    getOptionValue={(option) => option.ms_id}
                    styles={CommonStyle.select2}
                    onChange={(option) => {
                        setLstHoliday([]);
                        setCourseSelected(null);
                        setSiteSelected(option);
                        // setCompanyId(option.pa_companyId);
                        // dispatch({
                        //     type: siteActionType.GET_LIST_COURSE,
                        //     company_id: option.pa_companyId,
                        //     course_type: 'event',
                        // });
                        setSiteError('');
                    }}
                />
                <label className="input-error">{siteError}</label>
            </div>
            <div className="wSelect2">
                <label>Choose holiday camp</label>
                <Select
                    value={courseSelected}
                    options={lstHoliday}
                    isSearchable={false}
                    isMulti={false}
                    getOptionLabel={(option) => option.course_title}
                    getOptionValue={(option) => option.course_id}
                    styles={CommonStyle.select2}
                    onChange={(option) => {
                        // console.log(courseSelected, 'course selected');
                        setCourseSelected(option);
                        dispatch({
                            type: siteActionType.EVENT_DATE,
                            course_id: option.course_id,
                        });
                    }}
                />
                <label className="input-error">{courseError}</label>
            </div>
            {courseSelected && (
                <div style={{ backgroundColor: 'white', padding: '2rem' }}>
                    {eventDate.length > 0 ? (
                        <Fragment>
                            <div className="wSelect2">
                                <label>LOCATION: </label>
                                <br />
                                <p>{siteSelected.ms_address}</p>
                            </div>
                            <Fragment>
                                {/* {eventDate.length > 0 && ( */}
                                <div
                                    className="classRow"
                                    style={{
                                        backgroundColor: '#F7F8F7',
                                    }}>
                                    <div className="classInfo">
                                        <Checkbox
                                            checked={fullCourseSelect}
                                            onChange={() => {
                                                handleFullCheckBox();
                                            }}
                                        />
                                        <label>
                                            Full Course (
                                            {courseSelected.course_title})
                                        </label>
                                    </div>
                                    <b>£{courseSelected.course_price}</b>
                                </div>
                                {/* // )} */}
                                {eventDate.map((item, index) => (
                                    <div
                                        className="classRow"
                                        key={index}
                                        style={{
                                            backgroundColor: `${
                                                index % 2 === 1
                                                    ? '#F7F8F7'
                                                    : 'white'
                                            }`,
                                        }}>
                                        <div className="classInfo">
                                            <Checkbox
                                                checked={
                                                    dateCourseSelect[index]
                                                        .checkBox
                                                }
                                                onChange={() => {
                                                    changeCourse(index);
                                                }}
                                            />
                                            <p>{item.date}</p>
                                            <div
                                                style={{
                                                    flex: 1,
                                                    marginLeft: '2rem',
                                                    textAlign: 'left',
                                                }}>
                                                <Select
                                                    defaultValue={options}
                                                    options={[
                                                        options,
                                                        ...item.time,
                                                    ]}
                                                    isSearchable={false}
                                                    isMulti={false}
                                                    styles={CommonStyle.select2}
                                                    getOptionLabel={(option) =>
                                                        option.show
                                                    }
                                                    getOptionValue={(option) =>
                                                        option.id
                                                    }
                                                    onChange={(option) => {
                                                        changeDate(
                                                            option,
                                                            index,
                                                        );
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <p>
                                            £
                                            {dateCourseSelect[index].price +
                                                `${
                                                    dateCourseSelect[index]
                                                        .id === 0
                                                        ? ' per full day'
                                                        : ' per half day'
                                                }`}
                                            {/* {dateCourseSelect[index] == 2 ||
                                            dateCourseSelect[index] == 3
                                                ? courseSelected.half_day_price +
                                                  ' per half day'
                                                : courseSelected.single_day_price +
                                                  ' per full day'} */}
                                        </p>
                                    </div>
                                ))}
                                <label className="input-error">
                                    {timeError}
                                </label>
                                <hr />
                                <p
                                    style={{
                                        textAlign: 'right',
                                        fontWeight: 'bold',
                                        marginRight: '1rem',
                                    }}>
                                    Total: &nbsp; £{totalPrice}
                                </p>
                            </Fragment>
                        </Fragment>
                    ) : (
                        <div>
                            <p style={{ color: 'red', fontSize: '30px' }}>
                                There is no date available for this Holiday Camp
                            </p>
                        </div>
                    )}
                </div>
            )}
            {courseSelected && eventDate.length > 0 && (
                <div
                    style={{
                        marginTop: '4rem',
                        marginBottom: '4rem',
                        // display: 'none',
                    }}>
                    <div className="wSelect2">
                        <label>Your Email</label>
                        <input
                            // disabled={true}
                            type="text"
                            className="inputText"
                            placeholder="example@mail.com"
                            onChange={(event) => {
                                setEmail(event.target.value);
                                setEmailError('');
                            }}
                            onBlur={(event) => {
                                if (email && Utils.checkEmail(email)) {
                                    dispatch(
                                        checkEmail({
                                            email: event.target.value,
                                            company_id:
                                                siteSelected.pa_companyId,
                                        }),
                                    );
                                }
                            }}
                        />
                        <label className="input-error">
                            <p>
                                {emailError}
                                {emailError && availableEmail && (
                                    <Fragment>
                                        <a
                                            target="_blank"
                                            style={{
                                                color: '#EE7925',
                                                fontWeight: 'bold',
                                            }}
                                            href={
                                                'https://www.parentarea.co/parent/login'
                                            }>
                                            Login in here
                                        </a>
                                    </Fragment>
                                )}
                            </p>
                        </label>
                    </div>
                    <div className="wSelect2">
                        <label>Your first name</label>
                        <input
                            type="text"
                            className="inputText"
                            placeholder="Example name"
                            onChange={(event) => {
                                setFirstName(event.target.value);
                                setFirstNameError('');
                            }}
                        />
                        <label className="input-error">{firstNameError}</label>
                    </div>
                    <div className="wSelect2">
                        <label>Your last name</label>
                        <input
                            type="text"
                            className="inputText"
                            placeholder="Example name"
                            onChange={(event) => {
                                setLastName(event.target.value);
                                setLastNameError('');
                            }}
                        />
                        <label className="input-error">{lastNameError}</label>
                    </div>
                    <div className="wSelect2">
                        <label className="label" style={{ display: 'block' }}>
                            Child's date of birth{' '}
                            <span className="required">*</span>
                        </label>

                        <Flatpickr
                            data-enable-time
                            className="input-text"
                            value={date}
                            options={{
                                mode: 'single',
                                dateFormat: 'm/d/Y',
                                allowInput: true,
                                enableTime: false,
                                maxDate: dayjs().format('MM/DD/YYYY'),
                            }}
                            placeholder="Select date..."
                            onChange={(date) => {
                                // getClassTime(new Date(date));
                                setDate(date[0]);
                            }}
                        />

                        <label className="input-error">{dateError}</label>
                    </div>
                    <div className="wSelect2">
                        <label>Your phone number</label>

                        <PhoneInput
                            flag={flags}
                            defaultCountry="GB"
                            international
                            value={phone}
                            onChange={(event) => {
                                // console.log(event);
                                setPhone(event);
                                setPhoneError('');
                            }}
                        />

                        <label className="input-error">{phoneError}</label>
                    </div>
                    <BorderButton
                        title="Next step of booking"
                        disabled={disabled}
                        onClick={() => {
                            // console.log(eventDate, 'event');
                            // console.log(dateSelect, 'dateSe');
                            let _dates = [];
                            let _lstDate = [];
                            let _lstPrice = [];

                            dateCourseSelect.map((item, index) => {
                                if (item.checkBox) {
                                    if (item.id === 0) {
                                        _lstDate.push(
                                            eventDate[index].date +
                                                ' - Full day',
                                        );

                                        eventDate[index].time.map((it, idx) =>
                                            _dates.push(it.id),
                                        );
                                    } else {
                                        _lstDate.push(
                                            eventDate[index].date +
                                                ' - Half day',
                                        );

                                        _dates.push(item.id);
                                    }

                                    _lstPrice.push(item.price);
                                }
                            });

                            let dataObject = {
                                siteSelected,
                                courseSelected,
                                parent_first_name: firstName,
                                parent_last_name: lastName,
                                email: email,
                                phone_number: phone,
                                course_id: courseSelected.course_id,
                                dates: _dates,
                                date_of_birth: dayjs(date).format('YYYY-MM-DD'),
                                company_id: companyId,
                                lstDate: _lstDate,
                                lstPrice: _lstPrice,
                                totalPrice,
                            };

                            // console.log(dataObject);
                            if (validateData()) {
                                props.onNext(dataObject);
                            }
                        }}
                    />
                </div>
            )}

            <div>
                <p>
                    For more information about our privacy practices, please
                    read our{' '}
                    <a href={PathRoute.Policy + '/privacy'}>Privacy Policy.</a>
                </p>
                <p>
                    By clicking above, you agree that we may process your
                    information in accordance with these terms.
                </p>
            </div>
        </div>
    );
}

export default BookTrialCamp1;
