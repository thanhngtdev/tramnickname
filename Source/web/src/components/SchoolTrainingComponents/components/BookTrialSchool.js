import isEmpty from 'lodash/isEmpty';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
// import { propTypes } from "react-bootstrap/esm/Image";
import 'react-datepicker/dist/react-datepicker.css';
import PhoneInput from 'react-phone-number-input';
import flags from 'react-phone-number-input/flags';
// import "react-phone-number-input/style.css";
import { useDispatch, useSelector } from 'react-redux';
import PathRoute from 'src/common/PathRoute';
import Utils from 'src/common/Utils';
import Captcha from 'src/components/Captcha';
import TrustPilotText from 'src/components/TrustPilotText';
import { siteActionType } from 'src/redux/actions/actionTypes';
import siteService from 'src/services/siteService';

// BookTrialSchool.propTypes = {
//   parentFb: propTypes.object,
// };

function BookTrialSchool(props) {
    const { listSite } = props;
    const siteReducer = useSelector((state) => state.siteReducer);
    const wrapperRef = useRef(null);
    const history = useRouter();
    const dispatch = useDispatch();

    const [showSelect, setShowSelect] = useState(false);
    const [location, setLocation] = useState('');
    const [locationId, setLocationId] = useState('');
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
        const defaultAcademy = JSON.parse(
            localStorage.getItem('defaultAcademy'),
        );
        setLocation(defaultAcademy ? defaultAcademy.ms_name : '');
        setLocationId(defaultAcademy ? defaultAcademy.ms_email : '');

        document.addEventListener('click', handleClick);
        return () => {
            // dispatch({ type: actionTypes.CLEAR_SEND_EMAIL });
            document.removeEventListener('click', handleClick);
        };
    }, []);

    useEffect(() => {
        if (siteReducer.type) {
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

    function handleClick(event) {
        const { target } = event;
        if (!wrapperRef.current.contains(target)) {
            setShowSelect(false);
        }
    }

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
        if (isEmpty(location)) {
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

    async function sendEmail(param) {
        try {
            const res = await siteService.sendEmail(param);

            if (res.data.status === 200) {
                history.push(PathRoute.ThankYou);
            } else {
                toast.error(res.data.error, {
                    position: toast.POSITION.BOTTOM_LEFT,
                    autoClose: 3000,
                });
                // setStepActive(1);
            }
        } catch (err) {
            console.log(err, 'err');
            // setStepActive(1);
            // toast.error(err, {
            //   position: toast.POSITION.BOTTOM_LEFT,
            //   autoClose: 3000,
            // });
        }
    }

    function onSendData() {
        let _totalData = {
            type: 'schooltraining',
            academyEmail: locationId,
            name: name,
            location: location,
            phone: phone,
            email: email,
            comment: medical,
        };
        // console.log(_totalData);
        sendEmail({ param: _totalData });
    }

    // console.log(listSite, 'listSite');

    return (
        <div className="book_your_child_free_session" id="booking">
            <div className="container">
                <h2 className="heading">
                    Enquire about our professional school training
                </h2>
                <div className="text-sub">
                    It only takes three minutes to enquire about our school
                    training.
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
                                                number: 4,
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
                                    }}>
                                    <span>Use </span>current location
                                </a>
                            </label>
                            <div className="custom-select" ref={wrapperRef}>
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
                                    {listSite &&
                                        listSite.map((item) => (
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
                                placeholder="Enter your name"
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
                        </li>
                        <li>
                            <label className="label">Your Email *</label>
                            <input
                                placeholder="Example@gmail.com"
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
                                    loading="lazy"
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

export default BookTrialSchool;
