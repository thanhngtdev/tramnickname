import Captcha from 'src/components/Captcha';
import TrustPilotText from 'src/components/TrustPilotText';
import useComponentVisible from 'src/hooks/useComponentVisible';
import { isEmpty } from 'lodash';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
// import "react-phone-number-input/style.css";
import PhoneInput from 'react-phone-number-input';
import flags from 'react-phone-number-input/flags';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import siteService from 'src/services/siteService';
import PathRoute from 'src/common/PathRoute';
import Utils from 'src/common/Utils';
import { siteActionType } from 'src/redux/actions/actionTypes';

BookTrialOne.propTypes = {
    parentFb: PropTypes.object,
};

function BookTrialOne(props) {
    const { listSite } = useSelector((state) => state.listSiteReducer);
    const siteReducer = useSelector((state) => state.siteReducer);
    const history = useRouter();
    const dispatch = useDispatch();

    const [showSelect, setShowSelect] = useState(false);
    const [location, setLocation] = useState(props.site?.ms_name || '');
    const [locationId, setLocationId] = useState(props.site?.ms_id || 0);
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
    const ref = useRef(null);

    //! useEffect
    useComponentVisible(ref, setShowSelect);

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

    //! function
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
        if (email === '' || !Utils.checkEmail(email)) {
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
            }
        } catch (err) {
            // toast.error(err, {
            //   position: toast.POSITION.BOTTOM_LEFT,
            //   autoClose: 3000,
            // });
        }
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
        // console.log(_totalData);s
        sendEmail({ param: _totalData });
    }

    // console.log(listSite, 'listSite');

    return (
        <div className="book_your_child_free_session" id="booking">
            <div className="container">
                <h2 className="heading">Enquire about our 1-to-1 Training</h2>
                <div className="text-sub">
                    It only takes two minutes to get your 1-on-1 Training.
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
                                        // console.log('run');
                                        evt.preventDefault();
                                        setShowSelect(false);
                                        setLocation('Loading...');
                                        Utils.getCurrentAcademy(dispatch, 4);
                                    }}>
                                    <span>Use </span>current location
                                </a>
                            </label>
                            <div ref={ref} className="custom-select">
                                <div
                                    className="select-selected"
                                    onClick={() => {
                                        setShowSelect(!showSelect);
                                        setLocationError('');
                                        return false;
                                    }}>
                                    {!location ? 'Select Academy' : location}
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
                                type="text"
                                placeholder="Example@gmail.com"
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
                                placeholder="Comment"
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
                            <Captcha id="121" />
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

export default BookTrialOne;