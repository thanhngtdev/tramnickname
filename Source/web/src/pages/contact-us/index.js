import { CommonStyle } from 'src/common/Styles';
import Captcha from 'src/components/Captcha';
import ContactMap from 'src/components/include/ContactMap';
import useGetLocalStorage from 'src/hooks/useGetLocalStorage';
import DefaultLayout from 'src/layout/DefaultLayout';
import _ from 'lodash';
import React, { useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import flags from 'react-phone-number-input/flags';
// import "react-phone-number-input/style.css";
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import PathRoute from 'src/common/PathRoute';
import Utils from 'src/common/Utils';
import { siteActionType } from 'src/redux/actions/actionTypes';
import saveList from 'src/hooks/useSaveList';
import siteService from 'src/services/siteService';
import Constants from 'src/common/Constants';

const OPTION = [
    { value: 'Weekly Training', label: 'Weekly Training' },
    { value: 'Holiday Camps', label: 'Holiday Camps' },
    { value: '121 sessions', label: '121 sessions' },
    { value: 'School Training', label: 'School Training' },
    { value: 'Birthday Parties', label: 'Birthday Parties' },
    { value: 'Franchise Opportunities', label: 'Franchise Opportunities' },
    { value: 'Media and PR requests', label: 'Media and PR requests' },
    { value: 'Other', label: 'Other' },
];
function Contact({ listSite }) {
    const { footerConfig } = useSelector((state) => state.siteReducer);
    const headerReducer = useSelector((state) => state.headerReducer);
    const dispatch = useDispatch();
    const [nature, setNature] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    // const [academy, setAcademy] = useState(
    //   JSON.parse(localStorage.getItem("defaultAcademy")) || {}
    // );

    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [natureError, setNatureError] = useState('');
    const [messageError, setMessageError] = useState('');
    const academy = useGetLocalStorage();

    //! useEffect
    saveList(listSite);

    // useEffect(() => {
    //   if (!_.isEmpty(headerReducer.param)) {
    //     setAcademy(headerReducer.param);
    //     dispatch({ type: headerActionType.CLOSE_LOCATION });
    //   }
    // }, [headerReducer]);

    //! function
    function validation() {
        let checkInput = true;

        if (!name) {
            checkInput = false;
            setNameError('Field is required.');
        }

        if (email === '' || !Utils.checkEmail(email)) {
            checkInput = false;
            setEmailError('Field is required.');
        }

        if (!phone) {
            checkInput = false;
            setPhoneError('Field is required.');
        }

        if (!nature) {
            checkInput = false;
            setNatureError('Field is required.');
        }

        if (!message) {
            checkInput = false;
            setMessageError('Field is required.');
        }

        return checkInput;
    }

    //! return
    // if (_.isEmpty(footerConfig) && _.isEmpty(academy)) {
    //   return <Spinner />;
    // }

    return (
        <DefaultLayout>
            <div className="contactpage" style={{ position: 'relative' }}>
                <div className="contact">
                    <div
                        className="col-6"
                        style={{
                            height: 1700,
                            backgroundColor: '#F2F2F2',
                        }}></div>
                    <div className="col-6" style={{ paddingLeft: 0 }}>
                        <div className="mobilemap" style={{ height: 1700 }}>
                            <ContactMap
                                footerConfig={footerConfig.cfg_value || []}
                                googleMapURL={Constants.GOOGLE_MAP_URL}
                                loadingElement={
                                    <div style={{ height: `100%` }} />
                                }
                                containerElement={
                                    <div style={{ height: `100%` }} />
                                }
                                mapElement={<div style={{ height: `100%` }} />}
                                academy={academy}
                            />
                        </div>
                    </div>
                </div>
                <div
                    style={{
                        position: 'absolute',
                        top: 50,
                        width: '100%',
                    }}>
                    <div className="container">
                        <h1 className="contact-header">
                            Get in touch with the{' '}
                            {!_.isEmpty(academy)
                                ? academy?.ms_name + ' '
                                : ' WMF'}{' '}
                            Academy
                        </h1>
                        <div className="get-in-touch" action="">
                            <ul className="list-form">
                                <li>
                                    <label className="label">FULL NAME</label>
                                    <input
                                        placeholder="Enter your full name"
                                        type="text"
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
                                    <label className="label">YOUR EMAIL</label>
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
                                <li>
                                    <label className="label">
                                        TELEPHONE NUMBER
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
                                    <label className="label">
                                        THE NATURE OF YOUR ENQUIRY
                                    </label>
                                    <Select
                                        options={OPTION}
                                        isSearchable={false}
                                        isMulti={false}
                                        styles={CommonStyle.select2}
                                        onChange={(option) => {
                                            setNature(option.value);
                                            setNatureError('');
                                        }}
                                    />
                                    <label className="input-error">
                                        {natureError}
                                    </label>
                                </li>
                                <li>
                                    <label className="label">MESSAGE</label>
                                    <textarea
                                        className="input-text"
                                        rows={4}
                                        style={{
                                            height: 'auto',
                                            resize: 'none',
                                        }}
                                        onChange={(event) => {
                                            setMessage(event.target.value);
                                            setMessageError('');
                                        }}></textarea>
                                    <label className="input-error">
                                        {messageError}
                                    </label>
                                </li>
                                <li>
                                    <Captcha />
                                </li>
                                <li>
                                    <button
                                        className="btn-button-s"
                                        onClick={() => {
                                            let response =
                                                window.grecaptcha.getResponse();
                                            if (
                                                validation() &&
                                                response &&
                                                response.length > 0
                                            ) {
                                                const defaultAcademy =
                                                    academy || {};
                                                let _totalData = {
                                                    type: 'contact',
                                                    academyEmail:
                                                        defaultAcademy.ms_email,
                                                    academyPhone:
                                                        defaultAcademy.ms_phone,
                                                    academyName:
                                                        defaultAcademy.ms_name,
                                                    name: name,
                                                    phone: phone,
                                                    email: email,
                                                    message: message,
                                                    nature: nature,
                                                };
                                                // console.log(_totalData);
                                                // return;
                                                dispatch({
                                                    type: siteActionType.SEND_EMAIL,
                                                    params: _totalData,
                                                });
                                            }
                                        }}>
                                        SEND ENQUIRY
                                    </button>
                                </li>
                                <p
                                    className="text-policy"
                                    // style={{ fontSize: 14, color: '#1A1919' }}
                                >
                                    For more information about our privacy
                                    practices, please read our
                                    <a
                                        style={{
                                            color: '#FF7531',
                                            textDecoration: 'underline',
                                        }}
                                        href={PathRoute.Policy + '/privacy'}>
                                        {' '}
                                        Privacy Policy
                                    </a>
                                    . By clicking above, you agree that we may
                                    process your information in accordance with
                                    these terms.
                                </p>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
}

export async function getStaticProps() {
    const listRes = await siteService.getListSite();
    const listSite = listRes.data.data.lstSite;

    return { props: { listSite } };
}

export default Contact;
