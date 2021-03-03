import React, { useState, useEffect, Fragment } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch, useSelector } from 'react-redux';
import { siteActionType } from '../../actions/actionTypes';
import Utils from '../../common/Utils';
import PropTypes from 'prop-types';
import BorderButton from '../include/BorderButton';
import Dot from '../include/Dot';
import PathRoute from '../../common/PathRoute';
import { useHistory } from 'react-router-dom';
import Captcha from '../Captcha';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import flags from 'react-phone-number-input/flags';

BookTrialHoliday.propTypes = {
    parentFb: PropTypes.object,
};

Step2.propTypes = {
    onSendData: PropTypes.func,
};

function Step2(props) {
    const [date, setDate] = useState(new Date());
    const [name, setName] = useState('');
    const [medical, setMedical] = useState('');

    const [nameError, setNameError] = useState('');
    const [dateError, setDateError] = useState('');
    const [medicalError, setMedicalError] = useState('');
    const [captcha, setCaptcha] = useState('');

    function validateInput() {
        let checkInput = true;
        if (name === '') {
            checkInput = false;
            setNameError('Field is required.');
        }
        if (date === '') {
            checkInput = false;
            setDateError('Field is required.');
        }
        if (medical === '') {
            checkInput = false;
            setMedicalError('Field is required.');
        }

        let response = window.grecaptcha.getResponse();
        if (response.length === 0) {
            checkInput = false;
            setCaptcha('Check captcha.');
        }

        return checkInput;
    }

    return (
        <Fragment>
            <li>
                <label className="label">Child&apos;s name</label>
                <input
                    type="text"
                    // placeholder="Abc"
                    className="input-text"
                    onChange={(event) => {
                        setName(event.target.value);
                        setNameError('');
                    }}
                />
                <label className="input-error">{nameError}</label>
            </li>
            <li>
                <label className="label">Child's date of birth *</label>
                <DatePicker
                    className="input-text"
                    selected={date}
                    onChange={(date) => setDate(date)}
                />
                <label className="input-error">{dateError}</label>
            </li>
            <li>
                <label className="label">Any medical Infomation that</label>
                <input
                    type="text"
                    // placeholder="Abc"
                    className="input-text"
                    onChange={(event) => {
                        setMedical(event.target.value);
                        setMedicalError('');
                    }}
                />
                <label className="input-error">{medicalError}</label>
            </li>
            <li>
                <Captcha id="step-2" />
                <label className="input-error">{captcha}</label>
            </li>
            <li style={{ textAlign: 'center' }}>
                <Dot fill="none" stroke="rgb(255, 113, 0)" />
                <Dot
                    style={{ marginLeft: 10 }}
                    fill="rgb(255, 113, 0)"
                    stroke="rgb(255, 113, 0)"
                />
            </li>
            <li>
                <button
                    className="btn-button-s"
                    onClick={() => {
                        let _data = {
                            childName: name,
                            childBirth: date,
                            medicalInfo: medical,
                        };
                        if (validateInput() && props.onSendData)
                            props.onSendData(_data);
                    }}>
                    Enquire Now
                </button>
            </li>
        </Fragment>
    );
}

export default function BookTrialHoliday(props) {
    const dispatch = useDispatch();
    const history = useHistory();
    const defaultAcademy = JSON.parse(localStorage.getItem('defaultAcademy'));
    const [showSelect, setShowSelect] = useState(false);
    const [lstSite, setLstSite] = useState([]);
    const [location, setLocation] = useState(
        defaultAcademy ? defaultAcademy.ms_name : '',
    );
    const [locationId, setLocationId] = useState(0);
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [locationError, setLocationError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [stepActive, setStepActive] = useState(1);
    const { parentFb } = props;
    const [captcha, setCaptcha] = useState('');
    const siteReducer = useSelector((state) => state.siteReducer);

    useEffect(() => {
        if (siteReducer.type) {
            if (siteReducer.type === siteActionType.GET_LIST_SITE_SUCCESS) {
                setLstSite(siteReducer.data.lstSite);
            }
            if (siteReducer.type === siteActionType.SEND_EMAIL_SUCCESS) {
                history.push(PathRoute.ThankYou);
            }
        }
    }, [siteReducer]);

    function onClickLocation(event) {
        setShowSelect(false);
        setLocation(event.target.textContent);
        setLocationId(event.target.getAttribute('data-target'));
    }

    function onSendData(step2Data) {
        let _totalData = {
            type: 'camp',
            academyEmail: locationId,
            name: name,
            location: location,
            phone: phone,
            email: email,
            childName: step2Data.childName,
            childBirth: step2Data.childBirth,
            medicalInfo: step2Data.medicalInfo,
        };
        // console.log(_totalData);
        dispatch({ type: siteActionType.SEND_EMAIL, params: _totalData });
    }

    function validateInput() {
        // let response = window.grecaptcha.getResponse();
        // if (response && response.length > 0) {
        let checkInput = true;
        if (location === '') {
            checkInput = false;
            setLocationError('Field is required.');
        }
        if (email === '') {
            checkInput = false;
            setEmailError('Field is required.');
        }
        if (!phone) {
            checkInput = false;
            setPhoneError('Field is required.');
        }
        if (name === '') {
            checkInput = false;
            setNameError('Field is required.');
        }

        let response = window.grecaptcha.getResponse();
        if (response.length === 0) {
            checkInput = false;
            setCaptcha('Check captcha.');
        }

        return checkInput;
        // }
        // return false;
    }

    return (
        <div className="book_your_child_free_session" id="booking">
            <div className="container">
                <h2 className="heading">
                    Enquire more about our holiday camps
                </h2>
                <div className="text-sub">
                    Want to learn more about our Holiday camps? Get in touch via
                    the form below and we will respond within 24 hours.
                </div>
                <div className="full-width">
                    <ul className="list-form">
                        {stepActive === 1 && (
                            <Fragment>
                                <li>
                                    <label className="label">
                                        Select Academy
                                        <a
                                            href="/#"
                                            onClick={(evt) => {
                                                evt.preventDefault();
                                                setLocation(
                                                    defaultAcademy
                                                        ? defaultAcademy.ms_name
                                                        : '',
                                                );
                                                setLocationId(
                                                    defaultAcademy
                                                        ? defaultAcademy.ms_id
                                                        : '',
                                                );
                                                setShowSelect(false);
                                            }}
                                            className="location">
                                            <span>Use </span>current location
                                        </a>
                                    </label>
                                    <div className="custom-select">
                                        <div
                                            className="select-selected"
                                            onClick={() => {
                                                setShowSelect(!showSelect);
                                                setLocationError('');
                                                return false;
                                            }}>
                                            {location === ''
                                                ? 'Select Academy'
                                                : location}
                                        </div>
                                        <div
                                            className={`select-items ${
                                                showSelect ? '' : 'select-hide'
                                            }`}>
                                            {lstSite.map((item) => (
                                                <div
                                                    key={item.ms_id}
                                                    data-target={item.ms_email}
                                                    onClick={onClickLocation}>
                                                    {item.ms_name}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <label className="input-error">
                                        {locationError}
                                    </label>
                                </li>
                                <li>
                                    <label className="label">Your name</label>
                                    <input
                                        type="text"
                                        placeholder=""
                                        className="input-text"
                                        onChange={(event) => {
                                            setName(event.target.value);
                                            setNameError('');
                                        }}
                                    />
                                    <label className="input-error">
                                        {nameError}
                                    </label>
                                </li>
                                <li>
                                    <label className="label">
                                        Your phone number
                                    </label>
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

                                    <label className="input-error">
                                        {phoneError}
                                    </label>
                                </li>
                                <li>
                                    <label className="label">Your Email</label>
                                    <input
                                        placeholder=""
                                        type="text"
                                        className="input-text"
                                        onChange={(event) => {
                                            setEmail(event.target.value);
                                            setEmailError('');
                                        }}
                                    />
                                    <label className="input-error">
                                        {emailError}
                                    </label>
                                </li>
                                <li style={{ textAlign: 'center' }}>
                                    <Dot
                                        style={{ marginRight: 10 }}
                                        fill="rgb(255, 113, 0)"
                                        stroke="rgb(255, 113, 0)"
                                    />
                                    <Dot
                                        fill="none"
                                        stroke="rgb(255, 113, 0)"
                                    />
                                </li>
                                <li>
                                    <Captcha id="step-1" />
                                    <label className="input-error">
                                        {captcha}
                                    </label>
                                </li>
                                <li>
                                    <BorderButton
                                        className="btn-button-s"
                                        onClick={() => {
                                            console.log(phone, 'phoneee');
                                            if (validateInput()) {
                                                setStepActive(2);
                                            }
                                        }}
                                        title="Next"
                                    />
                                </li>
                            </Fragment>
                        )}
                        {stepActive == 2 && (
                            <Step2 onSendData={(data) => onSendData(data)} />
                        )}
                        <p>
                            For more information about our privacy practices,
                            please read our{' '}
                            <a className="link" href={PathRoute.Policy}>
                                Privacy Policy
                            </a>
                            . By clicking above, you agree that we may process
                            your information in accordance with these terms.
                        </p>
                    </ul>

                    <div className="col-right">
                        {parentFb && (
                            <div className="box-acc-review">
                                <img
                                    src={Utils.getThumb(
                                        parentFb.fb_image,
                                        'c1',
                                    )}
                                    className="avatar"
                                    alt=""
                                />
                                <div className="info">
                                    <p className="description">
                                        {parentFb.fb_content}
                                    </p>
                                    <h3 className="name">
                                        {parentFb.fb_name}, {parentFb.fb_role}
                                    </h3>
                                    <a href="/#" className="alink">
                                        {' '}
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
