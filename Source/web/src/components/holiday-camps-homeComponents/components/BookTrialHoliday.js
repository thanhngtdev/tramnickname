import isEmpty from 'lodash/isEmpty';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { Fragment, useEffect, useState } from 'react';
import Flatpickr from 'react-flatpickr';
import PhoneInput from 'react-phone-number-input';
import flags from 'react-phone-number-input/flags';
// import "react-phone-number-input/style.css";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import PathRoute from 'src/common/PathRoute';
import Utils from 'src/common/Utils';
import Button from 'src/components/Button';
import BorderButton from 'src/components/include/BorderButton';
import Dot from 'src/components/include/Dot';
import TrustPilotText from 'src/components/TrustPilotText';
import useComponentVisible from 'src/hooks/useComponentVisible';
import getLocalStorage from 'src/hooks/useGetLocalStorage';
import { siteActionType } from 'src/redux/actions/actionTypes';
import siteService from 'src/services/siteService';
const Captcha = dynamic(() => import('src/components/Captcha'));

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
                    placeholder="Enter your child's name"
                    className="input-text"
                    onChange={(event) => {
                        setName(event.target.value);
                        setNameError('');
                    }}
                />
                <label className="input-error">{nameError}</label>
            </li>
            <li>
                <label className="label">Child's date of birth</label>
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
                        // getClassTime(new Date(date));
                        setDate(date[0]);
                    }}
                />
                <label className="input-error">{dateError}</label>
            </li>
            <li>
                <label className="label">Any medical Infomation that</label>
                <input
                    type="text"
                    placeholder="Enter any medical information"
                    className="input-text"
                    onChange={(event) => {
                        setMedical(event.target.value);
                        setMedicalError('');
                    }}
                />
                <label className="input-error">{medicalError}</label>
            </li>
            <li style={{ marginBottom: '10px' }}>
                <Captcha id="step-2" />
                <label className="input-error">{captcha}</label>
            </li>
            <li style={{ textAlign: 'center', marginBottom: ' 15px' }}>
                <Dot fill="none" stroke="rgb(255, 113, 0)" />
                <Dot
                    style={{ marginLeft: 10 }}
                    fill="rgb(255, 113, 0)"
                    stroke="rgb(255, 113, 0)"
                />
            </li>
            <li>
                <Button
                    style={{ width: '215px' }}
                    onClick={() => {
                        let _data = {
                            childName: name,
                            childBirth: date,
                            medicalInfo: medical,
                        };
                        if (validateInput() && props.onSendData)
                            props.onSendData(_data);
                    }}
                    title={`Enquire Now`}
                />
            </li>
        </Fragment>
    );
}

export default function BookTrialHoliday(props) {
    const { listSite } = useSelector((state) => state.listSiteReducer);
    const siteReducer = useSelector((state) => state.siteReducer);
    const dispatch = useDispatch();
    const history = useRouter();

    const [showSelect, setShowSelect] = useState(false);
    const [location, setLocation] = useState(props?.site || '');
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [locationError, setLocationError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [stepActive, setStepActive] = useState(1);
    const { parentFb } = props;

    const { ref, isComponentVisible, setIsComponentVisible } =
        useComponentVisible(true);

    useEffect(() => {
        if (!isComponentVisible && showSelect) {
            setShowSelect(!showSelect);
        }
    }, [isComponentVisible]);

    useEffect(() => {
        if (siteReducer.type) {
            if (
                siteReducer.type ===
                    siteActionType.GET_CURRENT_ACADEMY_SUCCESS &&
                siteReducer.number === 3
            ) {
                setLocation(siteReducer.data);
            }
        }
    }, [siteReducer]);

    function onClickLocation(data) {
        console.log(data, 'data');
        setShowSelect(false);
        setLocation(data);
    }

    function validateInput() {
        // let response = window.grecaptcha.getResponse();
        // if (response && response.length > 0) {
        let checkInput = true;
        if (isEmpty(location)) {
            checkInput = false;
            setLocationError('Field is required.');
        }
        if (email === '' || !Utils.checkEmail(email)) {
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
        return checkInput;
    }

    async function sendEmail(param) {
        try {
            const res = await siteService.sendEmail(param);
            if (res.data.status === 200) {
                history.push(PathRoute.ThankYou, undefined, { scroll: true });
            } else {
                toast.error(res.data.error, {
                    position: toast.POSITION.BOTTOM_LEFT,
                    autoClose: 3000,
                });
                setStepActive(1);
            }
        } catch (err) {
            setStepActive(1);
        }
    }

    function onSendData(step2Data) {
        let _totalData = {
            type: 'camp',
            academyEmail: location.ms_email,
            name: name,
            location: location.ms_name,
            phone: phone,
            email: email,
            childName: step2Data.childName,
            childBirth: step2Data.childBirth,
            medicalInfo: step2Data.medicalInfo,
        };
        // console.log(_totalData);
        // dispatch({ type: siteActionType.SEND_EMAIL, params: _totalData });
        sendEmail({ param: _totalData });
    }

    return (
        <div className="book_your_child_free_session" id="booking">
            <div className="container">
                <h2 className="heading">
                    <p>
                        Enquire about our{' '}
                        <span style={{ whiteSpace: 'pre' }}>holiday camps</span>
                    </p>
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
                                                setShowSelect(false);
                                                let options = {
                                                    enableHighAccuracy: true,
                                                    timeout: 5000,
                                                    maximumAge: 0,
                                                };

                                                const success = (pos) => {
                                                    // setLocation('Loading');
                                                    let crd = pos.coords;

                                                    dispatch({
                                                        type: siteActionType.GET_CURRENT_ACADEMY,
                                                        lat: crd.latitude,
                                                        long: crd.longitude,
                                                        number: 3,
                                                    });
                                                };

                                                function error(err) {
                                                    alert(
                                                        'Allow this site to access your location',
                                                        err,
                                                    );
                                                }
                                                navigator.geolocation.getCurrentPosition(
                                                    success,
                                                    error,
                                                    options,
                                                );
                                            }}
                                            className="location">
                                            <span>Use </span>current location
                                        </a>
                                    </label>
                                    <div ref={ref} className="custom-select">
                                        <div
                                            className={`select-selected ${
                                                showSelect && 'active'
                                            }`}
                                            onClick={() => {
                                                setIsComponentVisible(true);
                                                setShowSelect(!showSelect);
                                                setLocationError('');
                                            }}>
                                            {isEmpty(location)
                                                ? 'Select Academy'
                                                : location.ms_name}
                                        </div>
                                        <div
                                            className={`select-items ${
                                                showSelect ? '' : 'select-hide'
                                            }`}>
                                            {listSite &&
                                                listSite.map((item) => (
                                                    <div
                                                        key={item.ms_id}
                                                        onClick={() => {
                                                            onClickLocation(
                                                                item,
                                                            );
                                                        }}>
                                                        {Utils.renderItem(item)}
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
                                        placeholder="Enter your name"
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
                                <li style={{ marginBottom: '10px' }}>
                                    <label className="label">Your Email</label>
                                    <input
                                        placeholder="Example@gmail.com"
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
                                <li
                                    style={{
                                        textAlign: 'center',
                                        marginBottom: '15px',
                                    }}>
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
                                    <BorderButton
                                        className="btn-button-s"
                                        style={{ backgroundColor: 'none' }}
                                        onClick={() => {
                                            // console.log(phone, 'phoneee');
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
                        <p className="text-policy">
                            For more information about our privacy practices,
                            please read our{' '}
                            <a
                                className="link"
                                href={PathRoute.Policy + '/privacy'}>
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
                                    <TrustPilotText />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
