 import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { CommonStyle } from '../../common/Styles';
import BorderButton from '../include/BorderButton';
import { siteActionType } from '../../actions/actionTypes';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Radiobox from '../include/Radiobox/Radiobox';
import moment from 'moment';
import PropTypes from 'prop-types';
import Utils from '../../common/Utils';

BookTrialTraining1.propTypes = {
    onNext: PropTypes.func,
};

const FREE_MESSAGE = 'Book your child’s free training session within 3 minutes';
const TRIAL_MESSAGE = 'Try a no obligation, one off trial session';

function BookTrialTraining1(props) {
    const dispatch = useDispatch();

    const [message, setMessage] = useState(FREE_MESSAGE);
    const [lstSite, setLstSite] = useState([]);
    const [date, setDate] = useState(
        global.bookTraining && global.bookTraining.date
            ? moment(global.bookTraining.date, 'MM/DD/YYYY').toDate()
            : new Date(),
    );
    const [lstStartDate, setLstStartDate] = useState([]);
    const [companyId, setCompanyId] = useState(0);
    const [startDate, setStartDate] = useState('');
    const [email, setEmail] = useState(
        global.bookTraining ? global.bookTraining.email : '',
    );
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [lstCourse, setLstCourse] = useState([]);
    const [courseSatisfied, setCourseSatisfied] = useState([]);
    const [courseSelected, setCourseSelected] = useState({});
    const [siteSelected, setSiteSelected] = useState({});
    const [siteError, setSiteError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [dateError, setDateError] = useState('');
    const [trialDateError, setTrialDateError] = useState('');
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [ageStudent,setAgeStudent] = useState(0);

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch({ type: siteActionType.GET_LIST_SITE });
    }, [dispatch]);
    
    useEffect(() => {
        let defaultAcademy = JSON.parse(localStorage.getItem("defaultAcademy"));
        if(defaultAcademy){
        setSiteSelected(defaultAcademy);
        }
    }, []);

    useEffect(() => {
        const newLstCourse = lstCourse.filter(course => course.min_age<= ageStudent && ageStudent <= course.max_age)
        setCourseSatisfied(newLstCourse);
    },[ageStudent,siteSelected]);
    
    const siteReducer = useSelector((state) => state.siteReducer);
 
    useEffect(() => {
        console.log(siteReducer.type )
        if (siteReducer.type) {
            if (siteReducer.type === siteActionType.GET_LIST_SITE_SUCCESS) {
                setLstSite(siteReducer.data.lstSite);
                if (global.bookTraining) {
                    let _currentSite = siteReducer.data.lstSite.filter(
                        function (site) {
                            return (
                                site.ms_id ===
                                parseInt(global.bookTraining.siteId)
                            );
                        },
                    );
                    if (_currentSite.length > 0) {
                        setSiteSelected(_currentSite[0]);
                        setCompanyId(_currentSite[0].pa_companyId);
                        dispatch({
                            type: siteActionType.GET_LIST_COURSE,
                            company_id: _currentSite[0].pa_companyId,
                            location_id: _currentSite[0].pa_locationId,
                            course_type: 'course',
                        });
                    }
                }
            }
            if (siteReducer.type === siteActionType.PICK_DEFAULT_ACADEMY) {
                setSiteSelected(
                    JSON.parse(localStorage.getItem('defaultAcademy')),
                );
            }
            if (siteReducer.type === siteActionType.SELECT_ACADEMY) {
                setSiteSelected(siteReducer.data);
            }
            if (siteReducer.type === siteActionType.GET_LIST_COURSE_SUCCESS) {
                setLstCourse(siteReducer.data);
            }
            if (siteReducer.type === siteActionType.COURSE_START_DATE_SUCCESS) {
                setLstStartDate(siteReducer.data);
            }
        }
    }, [siteReducer]);

    function getClassTime(birth){
        const age = ~~((Date.now() - birth) / (31557600000));
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
                        setCompanyId(option.pa_companyId);
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
            <div className="wSelect2">
                <label className="label">Your Email</label>
                <input
                    value={email || ''}
                    type="text"
                    placeholder="example@mail.com"
                    className="input-text"
                    onChange={(event) => setEmail(event.target.value)}
                />
                <label className="input-error">{emailError}</label>
            </div>
            <div className="wSelect2">
                <label className="label" style={{ display: 'block' }}>
                    Child&apos;s date of birth *
                </label>
                <DatePicker
                    className="input-text"
                    selected={date}
                    onChange={(date) => {
                        getClassTime(new Date(date));
                        setDate(date);
                        if(siteSelected){
                            dispatch({
                                type: siteActionType.GET_LIST_COURSE,
                                company_id: siteSelected.pa_companyId,
                                location_id: siteSelected.pa_locationId,
                                course_type: 'course',
                            })
                        }
                    }}
                />
                <label className="input-error">{dateError}</label>
            </div>
            {siteSelected && (
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
                                        index % 2 === 0 ? '#F7F8F7' : 'white'
                                    }`,
                                }}>
                                <Radiobox
                                    onChange={() => {
                                        dispatch({
                                            type:
                                                siteActionType.COURSE_START_DATE,
                                            course_id: item.course_id,
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
                                    Total: &nbsp; £{courseSelected.course_price}
                                </p>
                            </>
                        )}
                    </div>
                </div>
            )}
            <div style={{ marginTop: '4rem', marginBottom: '4rem' }}>
                <div className="wSelect2">
                    <label>Trial Date</label>
                    <Select
                        defaultValue={0}
                        options={lstStartDate}
                        isSearchable={false}
                        isMulti={false}
                        getOptionLabel={(option) =>
                            option.date_show + ' ' + new Date().getFullYear()
                        }
                        getOptionValue={(option) => option.date}
                        styles={CommonStyle.select2}
                        onChange={(option) => {
                            setStartDate(option.date);
                        }}
                    />
                    <label className="input-error">{trialDateError}</label>
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
                            let dataObject = {
                                siteSelected,
                                courseSelected,
                                parent_first_name: firstName,
                                parent_last_name: lastName,
                                date_of_birth: moment(date).format(
                                    'yyyy-MM-DD',
                                ),
                                email: email,
                                phone_number: phone,
                                company_id: companyId,
                                course_id: courseSelected.course_id,
                                start_date: moment(startDate).format(
                                    'yyyy-MM-DD',
                                ),
                            };
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

export default BookTrialTraining1;
