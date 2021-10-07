import Utils from 'src/common/Utils';
import EyeIcon from 'src/components/Booking/EyeIcon';
import BorderButton from 'src/components/include/BorderButton';
import IconUnVerify from 'src/components/include/Checkbox/IconUnVerify';
import IconVerify from 'src/components/include/Checkbox/IconVerify';
// import IconVerify from 'component/include/Checkbox/IconVerify';
// import IconUnVerify from 'component/include/Checkbox/IconUnVerify';
// import BorderButton from 'component/include/BorderButton';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import flags from 'react-phone-number-input/flags';
// import EyeIcon from './EyeIcon';
// import Utils from "src/common/Utils";
import 'react-phone-number-input/style.css';

BookTrialTraining2.propTypes = {
    onNext: PropTypes.func,
    showLogin: PropTypes.bool,
    dataStep1: PropTypes.object,
};

const GENDER = ['Male', 'Female', 'Unspecified'];

function BookTrialTraining2(props) {
    console.log(props, 'props');
    const [gender, setGender] = useState(
        global.bookTraining && global.bookTraining.gender
            ? global.bookTraining.gender
            : 0,
    );
    const [firstName, setFirstName] = useState(
        global.bookTraining && global.bookTraining.child_first_name
            ? global.bookTraining.child_first_name
            : '',
    );
    const [lastName, setLastName] = useState(
        global.bookTraining && global.bookTraining.child_last_name
            ? global.bookTraining.child_last_name
            : '',
    );
    const [medicalInfo, setMedicalInfo] = useState(
        global.bookTraining && global.bookTraining.medical_info
            ? global.bookTraining.medical_info
            : '',
    );
    const [name, setName] = useState(
        global.bookTraining && global.bookTraining.person_emergency
            ? global.bookTraining.person_emergency
            : '',
    );
    const [phone, setPhone] = useState(
        global.bookTraining && global.bookTraining.phone_emergency
            ? global.bookTraining.phone_emergency
            : '',
    );
    const [password, setPassword] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [verifyPass1, setVerifyPass1] = useState(false);
    const [verifyPass2, setVerifyPass2] = useState(false);
    const [verifyPass3, setVerifyPass3] = useState(false);
    const [verifyPass4, setVerifyPass4] = useState(false);
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [nameError, setNameError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [passError, setPassError] = useState('');
    // console.log(props.dataStep1);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    function validateData() {
        let _validate = true;
        if (name === '' || name.length > 50 || name.length < 1) {
            _validate = false;
            setNameError('Please fill contact name, 1-50 characters');
        } else setNameError('');
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
        if (!verifyPass1 || !verifyPass2 || !verifyPass3 || !verifyPass4) {
            _validate = false;
            setPassError('Please choose your password');
        } else setPassError('');
        return _validate;
    }
    return (
        <div className="tab-2">
            <h2>
                Just a few more details about your child before we get them
                booked
            </h2>
            <label style={{ paddingBottom: '4rem' }}>
                (You can add more children later if you need to)
            </label>
            <div style={{ marginTop: '3rem' }}>
                <div className="wSelect2">
                    <label>Child’s First Name</label>
                    <input
                        value={firstName}
                        type="text"
                        className="inputText"
                        placeholder="Example name"
                        onChange={(event) => {
                            global.bookTraining.child_first_name =
                                event.target.value;
                            setFirstName(event.target.value);
                        }}
                    />
                    <label className="input-error">{firstNameError}</label>
                </div>
                <div className="wSelect2">
                    <label>Child’s Last Name</label>
                    <input
                        value={lastName}
                        type="text"
                        className="inputText"
                        placeholder="Example name"
                        onChange={(event) => {
                            global.bookTraining.child_last_name =
                                event.target.value;
                            setLastName(event.target.value);
                        }}
                    />
                    <label className="input-error">{lastNameError}</label>
                </div>
                <div className="wSelect2">
                    <label>Any Medical Information</label>
                    <input
                        value={medicalInfo}
                        type="text"
                        className="inputText"
                        onChange={(event) => {
                            global.bookTraining.medical_info =
                                event.target.value;
                            setMedicalInfo(event.target.value);
                        }}
                    />
                </div>
                <div className="wSelect2">
                    <label>The Childs Gender</label>
                    <div className="training-gender">
                        {[0, 1, 2].map((item) => (
                            <div
                                key={item}
                                onClick={() => {
                                    setGender(item);
                                    global.bookTraining.gender = item;
                                }}
                                style={
                                    gender === item
                                        ? {
                                              backgroundColor: '#FF7100',
                                              color: 'white',
                                          }
                                        : {}
                                }>
                                {GENDER[item]}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="wSelect2">
                    <label>Emergancy contact name</label>
                    <input
                        value={name}
                        type="text"
                        className="inputText"
                        placeholder="Example name"
                        onChange={(event) => {
                            global.bookTraining.person_emergency =
                                event.target.value;
                            setName(event.target.value);
                        }}
                    />
                    <label className="input-error">{nameError}</label>
                </div>
                <div className="wSelect2">
                    <label>Emergancy contact telephone</label>

                    <PhoneInput
                        flag={flags}
                        defaultCountry="GB"
                        international
                        value={phone}
                        onChange={(event) => {
                            global.bookTraining.phone_emergency = event;
                            setPhone(event);
                        }}
                    />
                    <label className="input-error">{phoneError}</label>
                </div>
            </div>

            <h2>Please create your password</h2>
            <div className="wSelect2">
                <label>password</label>
                <div style={{ position: 'relative' }}>
                    <input
                        type={showPass ? 'text' : 'password'}
                        className="inputText"
                        onChange={(event) => {
                            let text = event.target.value;
                            setVerifyPass1(text.length >= 8);
                            setVerifyPass2(/[a-z]/.test(text));
                            setVerifyPass3(/[A-Z]/.test(text));
                            setVerifyPass4(
                                /[0-9]|[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/.test(
                                    text,
                                ),
                            );
                            setPassword(text);
                        }}
                    />
                    <div
                        style={{
                            position: 'absolute',
                            right: 15,
                            top: 25,
                            cursor: 'pointer',
                        }}
                        onMouseDown={() => setShowPass(true)}
                        onMouseUp={() => setShowPass(false)}>
                        <EyeIcon />
                    </div>
                </div>
                <label className="input-error">{passError}</label>

                <div style={{ paddingTop: '1rem' }}>
                    {verifyPass1 ? <IconVerify /> : <IconUnVerify />} At least 8
                    characters long
                </div>
                <div style={{ paddingTop: '1rem' }}>
                    {verifyPass2 ? <IconVerify /> : <IconUnVerify />} One
                    lowercase character
                </div>
                <div style={{ paddingTop: '1rem' }}>
                    {verifyPass3 ? <IconVerify /> : <IconUnVerify />} One
                    uppercase character
                </div>
                <div style={{ paddingTop: '1rem' }}>
                    {verifyPass4 ? <IconVerify /> : <IconUnVerify />} One
                    number, symbol, or whitespace character
                </div>
            </div>

            {props.dataStep1.siteSelected &&
                props.dataStep1.siteSelected.ms_trial === 1 && (
                    <div style={{ backgroundColor: 'white', padding: '2rem' }}>
                        <div className="wSelect2">
                            <b>Summary of your booking:</b>
                            <p>{props.dataStep1.courseSelected.course_title}</p>
                        </div>
                        <div className="wSelect2">
                            <b>LOCATION: </b>
                            <br />
                            <p>{props.dataStep1.siteSelected.ms_address}</p>
                        </div>
                        <div className="wSelect2">
                            <hr />
                            <p
                                style={{
                                    textAlign: 'right',
                                    fontWeight: 'bold',
                                    marginRight: '1rem',
                                }}>
                                Total: &nbsp; £
                                {Math.round(
                                    (10 *
                                        props.dataStep1.courseSelected
                                            .course_price) /
                                        props.dataStep1.courseSelected
                                            .course_length,
                                ) / 10}
                            </p>
                        </div>
                    </div>
                )}

            <p style={{ fontSize: 24 }}>
                By clicking below we will setup your account in our booking
                software, Parent Area.
            </p>
            {props.showLogin && (
                <div style={{ padding: 20 }}>
                    Have an account already?{' '}
                    <a
                        href="https://www.parentarea.co/parent/login"
                        target="_blank"
                        rel="noreferrer">
                        Log in here
                    </a>
                </div>
            )}
            <BorderButton
                id="btn-submit-step"
                title="Book a free training Session"
                title={`Book a ${
                    props.dataStep1.siteSelected.ms_trial === 1
                        ? 'trial'
                        : 'free'
                } training Session`}
                onClick={() => {
                    if (validateData()) {
                        let dataObject = {
                            child_first_name: firstName,
                            child_last_name: lastName,
                            gender: gender,
                            medical_info: medicalInfo,
                            person_emergency: name,
                            phone_emergency: phone,
                            password: password,
                        };
                        props.onNext(dataObject);
                    }
                }}
            />
        </div>
    );
}

export default BookTrialTraining2;
