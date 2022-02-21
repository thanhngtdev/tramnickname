import isEmpty from 'lodash/isEmpty';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import flags from 'react-phone-number-input/flags';
import Select from 'react-select';
import { toast } from 'react-toastify';
import Constants from 'src/common/Constants';
import ModelManager from 'src/common/ModelManager';
import PathRoute from 'src/common/PathRoute';
import { CommonStyle } from 'src/common/Styles';
import Utils from 'src/common/Utils';
import saveList from 'src/hooks/useSaveList';
const DefaultLayout = dynamic(() => import('src/layout/DefaultLayout'));
import siteService from 'src/services/siteService';
const Button = dynamic(() => import('src/components/Button'));
const Captcha = dynamic(() => import('src/components/Captcha'));
const ContactMap = dynamic(() => import('src/components/include/ContactMap'));

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
function Contact({ listSite, config }) {
    const isFirstRun = useRef(true);
    const history = useRouter();
    const [nature, setNature] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');

    const [defaultAcademy, setDefaultAcademy] = useState({});
    const [footerConfig, setFooterConfig] = useState(config);

    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [natureError, setNatureError] = useState('');
    const [messageError, setMessageError] = useState('');

    const [nameError, setNameError] = useState('');

    //! useEffect
    saveList(listSite);

    useEffect(() => {
        setDefaultAcademy(ModelManager.getLocation() || {});
    }, []);

    useEffect(() => {
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }

        if (!isEmpty(defaultAcademy)) {
            const config = [
                { title: 'Address', des: defaultAcademy?.ms_address },
                { title: 'Phone', des: defaultAcademy?.ms_phone },
            ];

            defaultAcademy?.socialLink.map((item) => {
                config.push({ title: item?.name || '', des: item?.link || '' });
            }),
                setFooterConfig(config);
        }
    }, [defaultAcademy]);

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
        } catch (err) {}
    }

    //! return

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
                                footerConfig={footerConfig || []}
                                googleMapURL={Constants.GOOGLE_MAP_URL}
                                loadingElement={
                                    <div style={{ height: `100%` }} />
                                }
                                containerElement={
                                    <div style={{ height: `100%` }} />
                                }
                                mapElement={<div style={{ height: `100%` }} />}
                                // academy={academy}
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
                            Get in touch with{' '}
                            {!isEmpty(defaultAcademy)
                                ? defaultAcademy?.ms_name + ' '
                                : 'the We Make Footballers'}
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
                                    <Button
                                        style={{ width: 390 }}
                                        title={`SEND ENQUIRY`}
                                        onClick={() => {
                                            let response =
                                                window.grecaptcha.getResponse();
                                            if (
                                                validation() &&
                                                response &&
                                                response.length > 0
                                            ) {
                                                // const defaultAcademy =
                                                //     academy || {};
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

                                                sendEmail({
                                                    param: _totalData,
                                                });

                                                // dispatch({
                                                //     type: siteActionType.SEND_EMAIL,
                                                //     params: _totalData,
                                                // });
                                            }
                                        }}
                                    />
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

export async function getServerSideProps() {
    return await Promise.all([
        siteService.getListSite(),
        siteService.getFooterConfig(),
    ]).then((values) => {
        return {
            props: {
                listSite: values[0].data.data.lstSite,
                config: values[1].data.data.cfg_value,
            },
            // revalidate: Constants.REVALIDATE,
        };
    });
}

export default Contact;
