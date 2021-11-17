import React, { useEffect, useState } from 'react';
import IconVerify from 'src/components/include/Checkbox/IconVerify';
import IconUnVerify from 'src/components/include/Checkbox/IconUnVerify';
import BorderButton from 'src/components/include/BorderButton';
import Utils from 'src/common/Utils';
import PropTypes from 'prop-types';
// import "react-phone-number-input/style.css";
import PhoneInput from 'react-phone-number-input';
import flags from 'react-phone-number-input/flags';
import EyeIcon from 'src/components/Booking/EyeIcon';

const GENDER = ['Male', 'Female', 'Unspecified'];

BookTrialCamp2.propTypes = {
    onNext: PropTypes.func,
    showLogin: PropTypes.bool,
    dataStep1: PropTypes.object,
};

function BookTrialCamp2(props) {
    const [gender, setGender] = useState(0);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [medicalInfo, setMedicalInfo] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
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

    useEffect(() => {
        if (props.showLogin) {
            window.scrollTo(0, 0);
        }
    }, [props.showLogin]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    function validateData() {
        // return true;
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
            <h2>Please provide us some information about your child</h2>
            <label style={{ paddingBottom: '4rem' }}>
                (You can add more children later if you need to)
            </label>
            {props.showLogin && (
                <p>
                    <span style={{ color: 'red' }}>
                        Have an account already?
                    </span>
                    <a
                        className="alink"
                        href="https://www.parentarea.co/parent/login"
                        target="_blank"
                        rel="noreferrer">
                        Log in here.
                    </a>
                </p>
            )}
            <div style={{ marginTop: '3rem' }}>
                <div className="wSelect2">
                    <label>Child’s First Name</label>
                    <input
                        type="text"
                        className="inputText"
                        placeholder="Example name"
                        onChange={(event) => setFirstName(event.target.value)}
                    />
                    <label className="input-error">{firstNameError}</label>
                </div>
                <div className="wSelect2">
                    <label>Child’s Last Name</label>
                    <input
                        type="text"
                        className="inputText"
                        placeholder="Example name"
                        onChange={(event) => setLastName(event.target.value)}
                    />
                    <label className="input-error">{lastNameError}</label>
                </div>
                <div className="wSelect2">
                    <label>Any Medical Information</label>
                    <input
                        type="text"
                        className="inputText"
                        onChange={(event) => setMedicalInfo(event.target.value)}
                    />
                </div>
                <div className="wSelect2">
                    <label>The Child Gender</label>
                    <div className="training-gender">
                        {[0, 1, 2].map((item) => (
                            <div
                                key={item}
                                onClick={() => setGender(item)}
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
                    <label>Emergency contact name</label>
                    <input
                        type="text"
                        className="inputText"
                        placeholder="Example name"
                        onChange={(event) => setName(event.target.value)}
                    />
                    <label className="input-error">{nameError}</label>
                </div>
                <div className="wSelect2">
                    <label>Emergency contact telephone</label>
                    {/* <input
                        type="text"
                        className="inputText"
                        placeholder="+44 U.K."
                        onChange={(event) => setPhone(event.target.value)}
                    /> */}

                    <PhoneInput
                        flag={flags}
                        defaultCountry="GB"
                        international
                        value={phone}
                        onChange={(event) => {
                            // console.log(event);
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
            <p style={{ fontSize: 24 }}>
                By clicking below we will setup your account in our booking
                software, Parent Area.
            </p>
            <BorderButton
                title="Continue to camp payment"
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

export default BookTrialCamp2;
