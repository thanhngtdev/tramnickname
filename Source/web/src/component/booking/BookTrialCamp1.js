import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { CommonStyle } from '../../common/Styles';
import Checkbox from '../include/Checkbox/Checkbox';
import BorderButton from '../include/BorderButton';
import { useDispatch, useSelector } from 'react-redux';
import { siteActionType } from '../../actions/actionTypes';
import DatePicker from 'react-datepicker';
import Utils from '../../common/Utils';
import PropTypes from 'prop-types';
import moment from 'moment';

BookTrialCamp1.propTypes = {
    onNext: PropTypes.func,
};
const options = {
    id: 0,
    show: 'Full day',
};

function BookTrialCamp1(props) {
    const dispatch = useDispatch();

    const [lstSite, setLstSite] = useState([]);
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
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [dateError, setDateError] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch({ type: siteActionType.GET_SITE_HAS_CAMP });
    }, [dispatch]);

    useEffect(() => {
        console.log(siteSelected.pa_companyId)
        dispatch({
            type: siteActionType.GET_LIST_COURSE,
            company_id: siteSelected.pa_companyId,
            course_type: 'event',
        });
    }, [siteSelected]);

    const siteReducer = useSelector((state) => state.siteReducer);
    useEffect(() => {
        if (siteReducer.type) {
            if (siteReducer.type === siteActionType.GET_SITE_HAS_CAMP_SUCCESS) {
                setLstSite(siteReducer.data.lstSite);
                if (global.bookCamp) {
                    let _currentSite = siteReducer.data.lstSite.filter(
                        function (site) {
                            return (
                                site.ms_id === parseInt(global.bookCamp.siteId)
                            );
                        },
                    );
                    if (_currentSite.length > 0) {
                        setSiteSelected(_currentSite[0]);
                        setCompanyId(_currentSite[0].pa_companyId);
                        dispatch({
                            type: siteActionType.GET_LIST_COURSE,
                            company_id: _currentSite[0].pa_companyId,
                            course_type: 'event',
                        });
                    }
                }
            }
            if (siteReducer.type === siteActionType.GET_LIST_COURSE_SUCCESS) {
                // console.log(siteReducer.data);
                setLstHoliday(siteReducer.data);
            }
            if (siteReducer.type === siteActionType.EVENT_DATE_SUCCESS) {
                // console.log(siteReducer.data);
                setEventDate(siteReducer.data);
                setDateSelect(siteReducer.data.map(() => false));
                setDateCourseSelect(siteReducer.data.map(() => 0));
            }
            if (siteReducer.type === siteActionType.SELECT_ACADEMY) { 
                setSiteSelected(siteReducer.data); 
            }
        }
    }, [siteReducer, dispatch]);

    function validateData() {
        let _validate = true;
        if (Utils.isEmpty(siteSelected)) {
            _validate = false;
            setSiteError('Please select a academy');
        } else setSiteError('');
        if (!courseSelected) {
            _validate = false;
            setCourseError('Please select a holiday camp');
        } else setCourseError('');
        if (email === '' || !Utils.checkEmail(email)) {
            _validate = false;
            setEmailError('Please fill Email');
        } else setEmailError('');
        if (phone === '' || !Utils.checkPhone(phone)) {
            _validate = false;
            setPhoneError('Please fill phone number');
        } else setPhoneError('');
        if (firstName === '' || firstName.length > 50 || firstName.length < 1) {
            _validate = false;
            setFirstNameError('Please fill first name, 1-50 characters');
        } else setFirstNameError('');
        if (lastName === '' || lastName.length > 50 || lastName.length < 1) {
            _validate = false;
            setLastNameError('Please fill last name, 1-50 characters');
        } else setLastNameError('');
        if (date === '') {
            _validate = false;
            setDateError('Please choose child&apos;s date of birth');
        } else setDateError('');
        return _validate;
    }

    function changeCourse(index) {
        let _dateSelected = [...dateSelect];
        let _dateUnselect = dateSelect.filter((item) => !item);
        if (_dateUnselect.length === 1 && !dateSelect[index]) {
            setFullCourseSelect(true);
            setTotalPrice(parseFloat(courseSelected.course_price));
        } else if (_dateUnselect.length === 0) {
            setFullCourseSelect(false);
            let _price = 0;
            dateSelect.map((it, idx) => {
                if (it && idx !== index)
                    _price +=
                        dateCourseSelect[index] === 2 ||
                        dateCourseSelect[index] === 3
                            ? parseFloat(courseSelected.half_day_price)
                            : parseFloat(courseSelected.single_day_price);
            });
            setTotalPrice(_price);
        } else {
            setFullCourseSelect(false);
            let _price =
                dateCourseSelect[index] === 2 || dateCourseSelect[index] === 3
                    ? parseFloat(courseSelected.half_day_price)
                    : parseFloat(courseSelected.single_day_price);
            if (_dateSelected[index]) setTotalPrice(totalPrice - _price);
            else setTotalPrice(totalPrice + _price);
        }
        _dateSelected[index] = !_dateSelected[index];
        setDateSelect(_dateSelected);
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
                    getOptionLabel={(option) => option.ms_name}
                    getOptionValue={(option) => option.ms_id}
                    styles={CommonStyle.select2}
                    onChange={(option) => {
                        setLstHoliday([]);
                        setCourseSelected(null);
                        setSiteSelected(option);
                        setCompanyId(option.pa_companyId);
                        dispatch({
                            type: siteActionType.GET_LIST_COURSE,
                            company_id: option.pa_companyId,
                            course_type: 'event',
                        });
                    }}
                />
                <label className="input-error">{siteError}</label>
            </div>
            <div className="wSelect2">
                <label>Chosen holiday camp</label>
                <Select
                    value={courseSelected}
                    options={lstHoliday}
                    isSearchable={false}
                    isMulti={false}
                    getOptionLabel={(option) => option.course_title}
                    getOptionValue={(option) => option.course_id}
                    styles={CommonStyle.select2}
                    onChange={(option) => {
                        setCourseSelected(option);
                        dispatch({
                            type: siteActionType.EVENT_DATE,
                            course_id: option.course_id,
                        });
                    }}
                />
                <label className="input-error">{courseError}</label>
            </div>
            <div style={{ backgroundColor: 'white', padding: '2rem' }}>
                <div className="wSelect2">
                    <label>LOCATION: </label>
                    <br />
                    <p>{siteSelected.ms_address}</p>
                </div>
                {courseSelected && (
                    <div>
                        {eventDate.length > 0 && (
                            <div
                                className="classRow"
                                style={{
                                    backgroundColor: '#F7F8F7',
                                }}>
                                <div className="classInfo">
                                    <Checkbox
                                        checked={fullCourseSelect}
                                        onChange={() => {
                                            if (fullCourseSelect) {
                                                setTotalPrice(0);
                                                setDateSelect(
                                                    dateSelect.map(() => false),
                                                );
                                            } else {
                                                setTotalPrice(
                                                    parseFloat(
                                                        courseSelected.course_price,
                                                    ),
                                                );
                                                setDateSelect(
                                                    dateSelect.map(() => true),
                                                );
                                            }
                                            setFullCourseSelect(
                                                !fullCourseSelect,
                                            );
                                        }}
                                    />
                                    <label>
                                        Full Course (
                                        {courseSelected.course_title})
                                    </label>
                                </div>
                                <b>£{courseSelected.course_price}</b>
                            </div>
                        )}
                        {eventDate.map((item, index) => (
                            <div
                                className="classRow"
                                key={index}
                                style={{
                                    backgroundColor: `${
                                        index % 2 === 1 ? '#F7F8F7' : 'white'
                                    }`,
                                }}>
                                <div className="classInfo">
                                    <Checkbox
                                        checked={dateSelect[index]}
                                        onChange={() => changeCourse(index)}
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
                                            options={[options, ...item.time]}
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
                                                let _dateCourse = [
                                                    ...dateCourseSelect,
                                                ];
                                                _dateCourse[index] = option.id;
                                                setDateCourseSelect(
                                                    _dateCourse,
                                                );
                                            }}
                                        />
                                    </div>
                                </div>
                                <p>
                                    £
                                    {dateCourseSelect[index] == 2 ||
                                    dateCourseSelect[index] == 3
                                        ? courseSelected.half_day_price +
                                          ' per half day'
                                        : courseSelected.single_day_price +
                                          ' per full day'}
                                </p>
                            </div>
                        ))}
                        <hr />
                        <p
                            style={{
                                textAlign: 'right',
                                fontWeight: 'bold',
                                marginRight: '1rem',
                            }}>
                            Total: &nbsp; £{totalPrice}
                        </p>
                    </div>
                )}
            </div>
            <div style={{ marginTop: '4rem', marginBottom: '4rem' }}>
                <div className="wSelect2">
                    <label>Your Email</label>
                    <input
                        type="text"
                        className="inputText"
                        placeholder="example@mail.com"
                        onChange={(event) => setEmail(event.target.value)}
                    />
                    <label className="input-error">{emailError}</label>
                </div>
                <div className="wSelect2">
                    <label>Your first name</label>
                    <input
                        type="text"
                        className="inputText"
                        placeholder="Example name"
                        onChange={(event) => setFirstName(event.target.value)}
                    />
                    <label className="input-error">{firstNameError}</label>
                </div>
                <div className="wSelect2">
                    <label>Your last name</label>
                    <input
                        type="text"
                        className="inputText"
                        placeholder="Example name"
                        onChange={(event) => setLastName(event.target.value)}
                    />
                    <label className="input-error">{lastNameError}</label>
                </div>
                <div className="wSelect2">
                    <label className="label" style={{ display: 'block' }}>
                        Child&apos;s date of birth *
                    </label>
                    <DatePicker
                        className="input-text"
                        selected={date}
                        onChange={(date) => {
                            setDate(date);
                        }}
                    />
                    <label className="input-error">{dateError}</label>
                </div>
                <div className="wSelect2">
                    <label>Your phone number</label>
                    <input
                        type="text"
                        className="inputText"
                        placeholder="+44 UK"
                        onChange={(event) => setPhone(event.target.value)}
                    />
                    <label className="input-error">{phoneError}</label>
                </div>
                <BorderButton
                    title="Next step of booking"
                    onClick={() => {
                        if (validateData()) {
                            let _dates = [];
                            let _lstDate = [];
                            let _lstPrice = [];
                            dateSelect.map((item, index) => {
                                if (item) {
                                    if (dateCourseSelect[index] === 0) {
                                        _lstDate.push(
                                            eventDate[index].date +
                                                ' - Full day',
                                        );
                                        _lstPrice.push(
                                            courseSelected.single_day_price,
                                        );
                                        eventDate[index].time.map((it, idx) =>
                                            _dates.push(it.id),
                                        );
                                    } else {
                                        _lstDate.push(
                                            eventDate[index].date +
                                                ' - Half day',
                                        );
                                        _lstPrice.push(
                                            courseSelected.half_day_price,
                                        );
                                        _dates.push(dateCourseSelect[index]);
                                    }
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
                                date_of_birth: moment(date).format(
                                    'yyyy-MM-DD',
                                ),
                                company_id: companyId,
                                lstDate: _lstDate,
                                lstPrice: _lstPrice,
                                totalPrice,
                            };
                            // console.log(dataObject);
                            props.onNext(dataObject);
                        }
                    }}
                />
            </div>
            <div>
                <p>
                    For more information about our privacy practices, please
                    read our <a href="/#">Privacy Policy.</a>
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
