import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { siteActionType } from '../../actions/actionTypes';
import Utils from '../../common/Utils';
import PropTypes from 'prop-types';
import PathRoute from '../../common/PathRoute';
import Captcha from '../Captcha';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import flags from 'react-phone-number-input/flags';

BookTrialOne.propTypes = {
    parentFb: PropTypes.object,
};

function BookTrialOne(props) {
    const siteReducer = useSelector((state) => state.siteReducer);
    const history = useHistory();
    const dispatch = useDispatch();
    const defaultAcademy = JSON.parse(localStorage.getItem('defaultAcademy'));
    const [showSelect, setShowSelect] = useState(false);
    const [lstSite, setLstSite] = useState(siteReducer.lstSite);
    const [location, setLocation] = useState(
        defaultAcademy ? defaultAcademy.ms_name : '',
    );
    const [locationId, setLocationId] = useState(
        defaultAcademy ? defaultAcademy.ms_id : 0,
    );
    const [email, setEmail] = useState('');
    const [locationError, setLocationError] = useState('');
    const [emailError, setEmailError] = useState('');
    const { parentFb } = props;
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [medical, setMedical] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [nameError, setNameError] = useState('');
    const [medicalError, setMedicalError] = useState('');
    const [captcha, setCaptcha] = useState('');

    useEffect(() => {
        if (siteReducer.type) {
            // if (siteReducer.type === siteActionType.GET_LIST_SITE_SUCCESS) {
            //     setLstSite(siteReducer.data.lstSite);
            // }
            if (siteReducer.type === siteActionType.SEND_EMAIL_SUCCESS) {
                history.push(PathRoute.ThankYou);
            }
            if (
                siteReducer.type ===
                    siteActionType.GET_CURRENT_ACADEMY_SUCCESS &&
                siteReducer.number === 4
            ) {
                setLocation(siteReducer.data.ms_name);
                setLocationId(siteReducer.data ? siteReducer.data.ms_id : '');
            }
        }
    }, [siteReducer]);

    function onClickLocation(event) {
        setShowSelect(false);
        setLocation(event.target.textContent);
        setLocationId(event.target.getAttribute('data-target'));
        parseInt(event.target.getAttribute('data-trial'));
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
        if (phone === '') {
            checkInput = false;
            setPhoneError('Field is required.');
        }
        if (name === '') {
            checkInput = false;
            setNameError('Field is required.');
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
        // }
        // return false;
    }

    function onSendData() {
        let _totalData = {
            type: 'onetraining',
            academyEmail: locationId,
            name: name,
            location: location,
            phone: phone,
            email: email,
            comment: medical,
        };
        // console.log(_totalData);
        dispatch({ type: siteActionType.SEND_EMAIL, params: _totalData });
    }

    return (
        <div className="book_your_child_free_session" id="booking">
            <div className="container">
                <h2 className="heading">Enquire about our 1-to-1 Training</h2>
                <div className="text-sub">
                    It only takes three minutes to get your 1-on-1 Training.
                </div>
                <div className="full-width">
                    <ul className="list-form" ref={props._ref}>
                        <li>
                            <label className="label">
                                Select Academy
                                <a
                                    href="/#"
                                    className="location"
                                    onClick={(evt) => {
                                        evt.preventDefault();
                                        setShowSelect(false);
                                        setLocation('Loading...');
                                        Utils.getCurrentAcademy(dispatch, 4);
                                    }}>
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
                                            data-target={item.ms_id}
                                            data-trial={item.ms_trial || 0}
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
                            <label className="input-error">{nameError}</label>
                        </li>
                        <li>
                            <label className="label">Your phone number</label>
                            {/* <input
                                type="text"
                                placeholder=""
                                className="input-text"
                                onChange={(event) => {
                                    setPhone(event.target.value);
                                    setPhoneError('');
                                }}
                            /> */}

                            <PhoneInput
                                flag={flags}
                                defaultCountry="US"
                                international
                                value={phone}
                                onChange={(event) => {
                                    // console.log(event);
                                    setPhone(event);
                                    setPhoneError('');
                                }}
                            />

                            <label className="input-error">{phoneError}</label>
                        </li>
                        <li>
                            <label className="label">Your Email *</label>
                            <input
                                type="text"
                                className="input-text"
                                onChange={(event) => {
                                    setEmail(event.target.value);
                                    setEmailError('');
                                }}
                            />
                            <label className="input-error">{emailError}</label>
                        </li>
                        <li>
                            <label className="label">Comments</label>
                            <input
                                type="text"
                                // placeholder="Abc"
                                className="input-text"
                                onChange={(event) => {
                                    setMedical(event.target.value);
                                    setMedicalError('');
                                }}
                            />
                            <label className="input-error">
                                {medicalError}
                            </label>
                        </li>
                        <li>
                            <Captcha />
                            <label className="input-error">{captcha}</label>
                        </li>
                        <li>
                            <button
                                className="btn-button-s"
                                onClick={() => {
                                    if (validateInput()) {
                                        onSendData();
                                    }
                                }}>
                                Enquire Now
                            </button>
                        </li>
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
                        <div
                            style={{ marginTop: 30, float: 'right', height: 0 }}
                            className="trustpilot-widget"
                            data-locale="en-GB"
                            data-template-id="5418015fb0d04a0c9cf721f2"
                            data-businessunit-id="5630b23d0000ff000584db47"
                            data-style-height="300px"
                            data-style-width="100%"
                            data-theme="light"
                            data-stars="4,5"
                            data-review-languages="en">
                            <a
                                className="alink"
                                href="https://uk.trustpilot.com/review/wemakefootballers.com"
                                target="_blank"
                                rel="noopener">
                                See more Reviews
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookTrialOne;
