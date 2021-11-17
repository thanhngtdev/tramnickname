import isEmpty from 'lodash/isEmpty';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import Flatpickr from 'react-flatpickr';
import PhoneInput from 'react-phone-number-input';
import flags from 'react-phone-number-input/flags';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import PathRoute from 'src/common/PathRoute';
import Utils from 'src/common/Utils';
import Captcha from 'src/components/Captcha';
import BorderButton from 'src/components/include/BorderButton';
import Dot from 'src/components/include/Dot';
import TrustPilotText from 'src/components/TrustPilotText';
import useComponentVisible from 'src/hooks/useComponentVisible';
import { siteActionType } from 'src/redux/actions/actionTypes';
import siteService from 'src/services/siteService';

Step2.propTypes = {
    onSendData: PropTypes.func,
};

function Step2(props) {
    const [date, setDate] = useState(new Date());
    const [name, setName] = useState(
        props.preferedPackage ? props.preferedPackage : '',
    );
    const [medical, setMedical] = useState('');

    const [showSelect, setShowSelect] = useState(false);
    const [packageList, setPackageList] = useState(
        props.package.cfg_value && props.package.cfg_value.length
            ? props.package.cfg_value
            : [],
    );

    const [nameError, setNameError] = useState('');
    const [dateError, setDateError] = useState('');
    const [medicalError, setMedicalError] = useState('');
    const [captcha, setCaptcha] = useState('');

    useEffect(() => {
        setName(props.preferedPackage);
    }, [props.preferedPackage]);

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
        } else {
            setCaptcha('');
        }

        return checkInput;
    }

    function onClickPackage(event) {
        setShowSelect(false);
        setName(event.target.textContent);
    }

    return (
        <Fragment>
            <li>
                <label className="label">Prefered package</label>

                <div className="custom-select">
                    <div
                        className={`select-selected ${showSelect && 'active'}`}
                        onClick={() => {
                            setShowSelect(!showSelect);
                            return false;
                        }}>
                        {name}
                    </div>
                    <div
                        className={`select-items ${
                            showSelect ? '' : 'select-hide'
                        }`}>
                        {packageList.map((item, index) => (
                            <div
                                key={index}
                                // data-target={item.ms_email}
                                onClick={onClickPackage}>
                                {item.title}
                            </div>
                        ))}
                    </div>
                </div>

                <label className="input-error">{nameError}</label>
            </li>
            <li>
                <label className="label">Date</label>
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
                <label className="label">Comments</label>
                <input
                    type="text"
                    placeholder="comments"
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
            <li style={{ textAlign: 'center', marginBottom: '15px' }}>
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
                            package: name,
                            date: date,
                            comment: medical,
                        };

                        // console.log(_data, 'call enquire');
                        if (validateInput() && props.onSendData)
                            props.onSendData(_data);
                    }}>
                    Enquire Now
                </button>
            </li>
        </Fragment>
    );
}

const BookTrialParty = React.forwardRef((props, ref) => {
    const { listSite } = props;
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
    const [captcha, setCaptcha] = useState('');
    const [stepActive, setStepActive] = useState(1);
    const { parentFb } = props;
    const {
        ref: _ref,
        isComponentVisible,
        setIsComponentVisible,
    } = useComponentVisible(true);

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
                siteReducer.number === 5
            ) {
                setLocation(siteReducer.data);
            }
        }
    }, [siteReducer]);

    function onClickLocation(data) {
        setShowSelect(false);
        setLocation(data);
        // setLocationId(event.target.getAttribute('data-target'));
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

    function onSendData(step2Data) {
        let _totalData = {
            type: 'party',
            academyEmail: location.ms_email,
            name: name,
            location: location.ms_name,
            phone: phone,
            email: email,
            date: step2Data.date,
            package: step2Data.package,
            comment: step2Data.comment,
        };
        // console.log(_totalData);
        sendEmail({ param: _totalData });
    }

    function validateInput() {
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

        return checkInput;
    }

    //combine ref in inner component
    function useCombinedRefs(...refs) {
        const targetRef = useRef();

        useEffect(() => {
            refs.forEach((ref) => {
                if (!ref) return;

                if (typeof ref === 'function') {
                    ref(targetRef.current);
                } else {
                    ref.current = targetRef.current;
                }
            });
        }, [refs]);

        return targetRef;
    }

    const innerRef = React.useRef(null);
    const combinedRef = useCombinedRefs(ref, innerRef);

    return (
        <div
            ref={props.__ref}
            className="book_your_child_free_session"
            id="booking">
            <div className="container">
                <h2 className="heading">Enquire about our birthday parties</h2>
                <div className="text-sub">
                    Enquire about our Birthday Parties in 2 minutes.
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
                                                        number: 5,
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
                                    <div ref={_ref} className="custom-select">
                                        <div
                                            className={`select-selected ${
                                                showSelect && 'active'
                                            }`}
                                            onClick={() => {
                                                setIsComponentVisible(true);
                                                setShowSelect(!showSelect);
                                                setLocationError('');
                                                // return false;
                                            }}>
                                            {!location
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
                                                        data-target={
                                                            item.ms_email
                                                        }
                                                        onClick={() => {
                                                            onClickLocation(
                                                                item,
                                                            );
                                                        }}>
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
                                    <label className="input-error">
                                        {nameError}
                                    </label>
                                </li>
                                <li>
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
                                <li style={{ marginBottom: '10px' }}>
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
                                        style={{ backgroundColor: 'none' }}
                                        className="btn-button-s"
                                        onClick={() => {
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
                            <Step2
                                package={props.package}
                                onSendData={(data) => onSendData(data)}
                                preferedPackage={props.preferedPackage}
                            />
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
});

BookTrialParty.propTypes = {
    parentFb: PropTypes.object,
};

export default BookTrialParty;
