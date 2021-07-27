import { CommonStyle } from 'src/common/Styles';
import Timer from 'src/common/Timer';
import Utils from 'src/common/Utils';
import BorderButton from 'src/components/include/BorderButton';
import Radiobox from 'src/components/include/Radiobox/Radiobox';
import 'flatpickr/dist/themes/material_orange.css';
import _, { isEmpty } from 'lodash';
import moment from 'moment';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { Fragment, useEffect, useState } from 'react';
import Flatpickr from 'react-flatpickr';
import PhoneInput from 'react-phone-number-input';
import flags from 'react-phone-number-input/flags';
// import "react-phone-number-input/style.css";
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { siteActionType } from 'src/redux/actions/actionTypes';
import { courseStartDate } from 'src/redux/actions/bookTrialTrainingAction';
import { checkEmail, getListCourse } from 'src/redux/actions/siteAction';

BookTrialTraining1.propTypes = {
    onNext: PropTypes.func,
};

const FREE_MESSAGE = 'Book your child’s free training session within 3 minutes';
const TRIAL_MESSAGE = 'Try a no obligation, one off trial session';
let timer = new Timer();
function BookTrialTraining1(props) {
    const siteReducer = useSelector((state) => state.siteReducer);
    const { emailData } = siteReducer;
    const { lstSite } = useSelector((state) => state.listSiteReducer);
    const dispatch = useDispatch();
    const history = useRouter();
    const [message, setMessage] = useState(FREE_MESSAGE);
    const [date, setDate] = useState(
        (global.bookTraining?.date_of_birth &&
            moment(global.bookTraining.date_of_birth).toDate()) ||
            (global.bookTraining?.date &&
                moment(global.bookTraining.date).toDate()) ||
            '',
    );
    const [lstStartDate, setLstStartDate] = useState([]);
    const [companyId, setCompanyId] = useState(0);
    const [startDate, setStartDate] = useState('');
    const [email, setEmail] = useState(
        global.bookTraining ? global.bookTraining.email : '',
    );
    const [firstName, setFirstName] = useState(
        global.bookTraining && global.bookTraining.parent_first_name
            ? global.bookTraining.parent_first_name
            : '',
    );
    const [lastName, setLastName] = useState(
        global.bookTraining && global.bookTraining.parent_last_name
            ? global.bookTraining.parent_last_name
            : '',
    );
    const [phone, setPhone] = useState(
        global.bookTraining && global.bookTraining.phone_number
            ? global.bookTraining.phone_number
            : '',
    );
    const [lstCourse, setLstCourse] = useState([]);
    const [courseSatisfied, setCourseSatisfied] = useState([]);
    const [courseSelected, setCourseSelected] = useState(
        global.bookTraining && global.bookTraining.preDefined
            ? global.bookTraining.preDefined.item
            : {},
    );
    const [siteSelected, setSiteSelected] = useState(
        (global.bookTraining && global.bookTraining.siteSelected) || {},
    );

    const [siteError, setSiteError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [dateError, setDateError] = useState('');
    const [trialDateError, setTrialDateError] = useState('');
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [ageStudent, setAgeStudent] = useState(0);
    const [defaultTrial, setDefaultTrial] = useState(0);
    const [notAvailable, setNotAvailable] = useState('');
    const [availableEmail, setAvailableEmail] = useState(false);

    //! useEffect
    useEffect(() => {
        if (isEmpty(siteSelected)) {
            setSiteSelected(JSON.parse(localStorage.getItem('defaultAcademy')));
        }
    }, []);

    useEffect(() => {
        if (siteSelected?.pa_companyId) {
            setCompanyId(siteSelected?.pa_companyId);
            dispatch(
                getListCourse({
                    company_id: siteSelected.pa_companyId,
                    location_id: siteSelected.pa_locationId,
                    course_type: 'course',
                }),
            );
        }
    }, [siteSelected]);

    useEffect(() => {
        const newLstCourse = lstCourse.filter(
            (course) =>
                course.min_age <= ageStudent && ageStudent <= course.max_age,
        );
        setCourseSatisfied(newLstCourse);
    }, [ageStudent, lstCourse]);

    useEffect(() => {
        if (courseSatisfied.length === 0 && !!date) {
            setNotAvailable('There is no class available');
        }
    }, [courseSatisfied]);

    useEffect(() => {
        // console.log(emailData, 'asdfasf');
        if (!_.isEmpty(emailData)) {
            const { code } = emailData;
            if (code === 704) {
                setAvailableEmail(true);
                setEmailError('This email is already registered. Want to ');
            }

            if (code === 200) {
                setAvailableEmail(false);
            }
        }

        if (siteReducer.type) {
            if (siteReducer.type === siteActionType.PICK_DEFAULT_ACADEMY) {
                setSiteSelected(
                    JSON.parse(localStorage.getItem('defaultAcademy')),
                );
            }

            if (siteReducer.type === siteActionType.GET_LIST_COURSE_SUCCESS) {
                // console.log('list');
                setLstCourse(siteReducer.data);

                if (global.bookTraining && global.bookTraining.date_of_birth) {
                    getClassTime(new Date(date));
                    dispatch(
                        courseStartDate({
                            course_id:
                                global.bookTraining.courseSelected.course_id,
                        }),
                    );
                    setCourseSelected(global.bookTraining.courseSelected);
                }
            }

            if (siteReducer.type === siteActionType.COURSE_START_DATE_SUCCESS) {
                setLstStartDate(siteReducer.data);

                if (global.bookTraining && global.bookTraining.start_date) {
                    const selectedDate = lstStartDate.find(
                        (data) => data.date === global.bookTraining.start_date,
                    );

                    setDefaultTrial(selectedDate);
                    setStartDate(selectedDate?.date || '');
                }
            }

            if (siteReducer.type === siteActionType.SELECT_ACADEMY) {
                setSiteSelected(siteReducer.data);
                setCompanyId(siteReducer.data.pa_companyId);
            }
        }
    }, [siteReducer]);

    //! function
    function getClassTime(birth) {
        const age = ~~((Date.now() - birth) / 31557600000);
        setAgeStudent(age);
    }

    function validateData() {
        let _validate = true;
        if (Utils.isEmpty(siteSelected)) {
            _validate = false;
            setSiteError('Please select a academy');
        } else setSiteError('');
        if (email === '' || !Utils.checkEmail(email)) {
            _validate = false;
            setEmailError('Please fill Email');
        } else setEmailError('');
        if (availableEmail && Utils.checkEmail(email)) {
            _validate = false;
            setEmailError('This email is already registered. Want to ');
        }
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
        if (startDate === '') {
            _validate = false;
            setTrialDateError('Please choose trial date');
        } else setTrialDateError('');
        if (date === '') {
            _validate = false;
            setDateError('Please choose child&apos;s date of birth');
        } else setDateError('');
        return _validate;
    }

    return (
        <div className="tab-1">
            <h2>{message}</h2>
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
                        setMessage(
                            option.ms_trial === 1
                                ? TRIAL_MESSAGE
                                : FREE_MESSAGE,
                        );

                        setSiteSelected(option);
                    }}
                />
                <label className="input-error">{siteError}</label>
            </div>
            <div className="wSelect2">
                <label className="label">Your Email</label>
                <input
                    value={email || ''}
                    type="text"
                    placeholder="example@mail.com"
                    className="input-text"
                    onChange={(event) => {
                        setEmail(event.target.value);
                        setEmailError('');

                        if (
                            !_.isEmpty(event.target.value) &&
                            Utils.checkEmail(event.target.value)
                        ) {
                            timer.debounce(
                                dispatch(
                                    checkEmail({ email: event.target.value }),
                                ),
                                1000,
                            );
                        }
                    }}
                />
                <label className="input-error">
                    {emailError}
                    {emailError && availableEmail && (
                        <Fragment>
                            <a
                                target="_blank"
                                style={{
                                    color: 'black',
                                }}
                                href={'https://www.parentarea.co/parent/login'}>
                                Login
                            </a>{' '}
                            {'or'}{' '}
                            <a
                                target="_blank"
                                style={{
                                    color: 'black',
                                }}
                                href={
                                    'https://www.parentarea.co/parent/reset-password'
                                }>
                                recover your password
                            </a>
                        </Fragment>
                    )}
                </label>
            </div>
            <div className="wSelect2">
                <label className="label" style={{ display: 'block' }}>
                    Child's date of birth *
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
                    }}
                    placeholder="Select date..."
                    onChange={(date) => {
                        getClassTime(new Date(date));
                        setDate(date[0]);
                        if (!_.isEmpty(siteSelected)) {
                            dispatch(
                                getListCourse({
                                    company_id: siteSelected.pa_companyId,
                                    location_id: siteSelected.pa_locationId,
                                    course_type: 'course',
                                }),
                            );
                        }
                    }}
                />
                <label className="input-error">{dateError}</label>
            </div>
            {courseSatisfied.length > 0 && siteSelected ? (
                <Fragment>
                    <div style={{ backgroundColor: 'white', padding: '2rem' }}>
                        <div className="wSelect2">
                            <b>
                                Choose your class time{' '}
                                <span style={{ color: '#FF7100' }}>
                                    @{siteSelected.ms_name}
                                </span>{' '}
                                Academy
                            </b>
                        </div>
                        <div>
                            {courseSatisfied.map((item, index) => (
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
                                            dispatch(
                                                courseStartDate({
                                                    course_id: item.course_id,
                                                }),
                                            );
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
                                        {item.min_age}-{item.max_age} year olds
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
                    <div style={{ marginTop: '4rem', marginBottom: '4rem' }}>
                        <div className="wSelect2">
                            <label>Trial Date</label>
                            <Select
                                value={defaultTrial}
                                // defaultValue={0}
                                options={lstStartDate}
                                isSearchable={false}
                                isMulti={false}
                                getOptionLabel={(option) =>
                                    option.date_show +
                                    ' ' +
                                    new Date().getFullYear()
                                }
                                getOptionValue={(option) => option.date}
                                styles={CommonStyle.select2}
                                onChange={(option) => {
                                    setStartDate(option.date);
                                    setDefaultTrial(option);
                                }}
                            />
                            <label className="input-error">
                                {trialDateError}
                            </label>
                        </div>
                        <div className="wSelect2">
                            <label>Your first name</label>
                            <input
                                value={firstName}
                                type="text"
                                className="inputText"
                                placeholder="Example name"
                                onChange={(event) => {
                                    setFirstName(event.target.value);
                                }}
                            />
                            <label className="input-error">
                                {firstNameError}
                            </label>
                        </div>
                        <div className="wSelect2">
                            <label>Your last name</label>
                            <input
                                value={lastName}
                                type="text"
                                className="inputText"
                                placeholder="Example name"
                                onChange={(event) => {
                                    setLastName(event.target.value);
                                }}
                            />
                            <label className="input-error">
                                {lastNameError}
                            </label>
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
                            id="btn-submit-step"
                            title="Next step of booking"
                            onClick={() => {
                                if (validateData()) {
                                    let dataObject = {
                                        siteSelected,
                                        courseSelected,
                                        parent_first_name: firstName,
                                        parent_last_name: lastName,
                                        date_of_birth:
                                            moment(date).format('yyyy-MM-DD'),
                                        email: email,
                                        phone_number: phone,
                                        company_id: companyId,
                                        course_id: courseSelected.course_id,
                                        start_date:
                                            moment(startDate).format(
                                                'yyyy-MM-DD',
                                            ),
                                    };

                                    props.onNext(dataObject);
                                }
                            }}
                        />
                    </div>
                </Fragment>
            ) : (
                <div>
                    <p style={{ color: 'red', fontSize: '30px' }}>
                        {notAvailable}
                    </p>
                </div>
            )}
            <div>
                <p>
                    For more information about our privacy practices, please
                    read our{' '}
                    <a onClick={() => history.push('/policies/privacy')}>
                        Privacy Policy.
                    </a>
                </p>
                <p>
                    By clicking above, you agree that we may process your
                    information in accordance with these terms.
                </p>
            </div>
        </div>
    );
}

export default BookTrialTraining1;
