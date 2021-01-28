import React, { useState } from 'react';
import ContactMap from './include/ContactMap';
import '../css/contact.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { siteActionType } from '../actions/actionTypes';
import Select from 'react-select';
import { CommonStyle } from '../common/Styles';

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
function Contact() {
    const dispatch = useDispatch();
    const [nature, setNature] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [footerConfig, setFooterConfig] = useState([]);
    const [defaultAcademy, setDefaultAcademy] = useState(
        JSON.parse(localStorage.getItem('defaultAcademy')) || {},
    );

    const siteReducer = useSelector((state) => state.siteReducer);
    useEffect(() => {
        if (siteReducer.type) {
            if (siteReducer.type === siteActionType.GET_FOOTER_CONFIG_SUCCESS) {
                // console.log(siteReducer.data);
                setFooterConfig(siteReducer.data.cfg_value);
            }
        }
    }, [siteReducer]);
    return (
        <div className="" style={{ position: 'relative' }}>
            <div className="">
                <div
                    className="col-6"
                    style={{
                        height: 1500,
                        backgroundColor: '#F2F2F2',
                    }}></div>
                <div className="col-6" style={{ paddingLeft: 0 }}>
                    <div style={{ height: 1500 }}>
                        <ContactMap
                            footerConfig={footerConfig}
                            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyClAeE9K0S0LZQ3DiTg0-j_w8HvVuMYgoc&v=3.exp&libraries=geometry,drawing,places"
                            loadingElement={<div style={{ height: `100%` }} />}
                            containerElement={
                                <div style={{ height: `100%` }} />
                            }
                            mapElement={<div style={{ height: `100%` }} />}
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
                        {defaultAcademy ? defaultAcademy.ms_name : 'WMF'}{' '}
                        Academy
                    </h1>
                    <div className="get-in-touch" action="">
                        <ul className="list-form">
                            <li>
                                <label className="label">FULL NAME</label>
                                <input
                                    type="text"
                                    className="input-text"
                                    onChange={(event) =>
                                        setName(event.target.value)
                                    }
                                />
                                <label className="input-error"></label>
                            </li>
                            <li>
                                <label className="label">YOUR EMAIL</label>
                                <input
                                    type="text"
                                    className="input-text"
                                    placeholder=""
                                    onChange={(event) =>
                                        setEmail(event.target.value)
                                    }
                                />
                                <label className="input-error"></label>
                            </li>
                            <li>
                                <label className="label">
                                    TELEPHONE NUMBER
                                </label>
                                <input
                                    type="text"
                                    className="input-text"
                                    onChange={(event) =>
                                        setPhone(event.target.value)
                                    }
                                />
                                <label className="input-error"></label>
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
                                    }}
                                />
                                <label className="input-error"></label>
                            </li>
                            <li>
                                <label className="label">MESSAGE</label>
                                <textarea
                                    className="input-text"
                                    rows={4}
                                    style={{ height: 'auto' }}
                                    onChange={(event) =>
                                        setMessage(event.target.value)
                                    }></textarea>
                                <label className="input-error"></label>
                            </li>
                            <li>
                                <div
                                    className="g-recaptcha"
                                    data-sitekey="6Le-VPwUAAAAAA8Ob_fIKNaXUCp1eR5_n58uY0DU"></div>
                            </li>
                            <li>
                                <button
                                    className="btn-button-s"
                                    onClick={() => {
                                        let response = window.grecaptcha.getResponse();
                                        if (response && response.length > 0) {
                                            const defaultAcademy =
                                                JSON.parse(
                                                    localStorage.getItem(
                                                        'defaultAcademy',
                                                    ),
                                                ) || {};
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
                                            dispatch({
                                                type: siteActionType.SEND_EMAIL,
                                                params: _totalData,
                                            });
                                        }
                                    }}>
                                    SEND ENQUIRY
                                </button>
                            </li>
                            <li>
                                <p style={{ fontSize: 14, color: '#1A1919' }}>
                                    For more information about our privacy
                                    practices, please read our
                                    <a
                                        style={{
                                            color: '#FF7531',
                                            textDecoration: 'underline',
                                        }}
                                        href="/#">
                                        {' '}
                                        Privacy Policy
                                    </a>
                                    . By clicking above, you agree that we may
                                    process your information in accordance with
                                    these terms.
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;
