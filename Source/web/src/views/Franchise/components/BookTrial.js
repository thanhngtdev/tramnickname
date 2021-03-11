import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import type, { siteActionType } from 'redux/actions/actionTypes';
import Utils from 'common/Utils';
import useGetWidth from 'hooks/useGetWidth';

function BookTrial() {
    const dispatch = useDispatch();
    const [showSelect, setShowSelect] = useState(false);
    const [lstSite, setLstSite] = useState([]);
    const [location, setLocation] = useState('');
    const [locationId, setLocationId] = useState(0);
    const [date, setDate] = useState(new Date());
    const [email, setEmail] = useState('');
    const [locationError, setLocationError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [dateError, setDateError] = useState('');
    const [parentFb, setParentFb] = useState(null);
    const siteReducer = useSelector((state) => state.siteReducer);
    const homeReducer = useSelector((state) => state.homeReducer);

    useEffect(() => {
        if (siteReducer.type) {
            if (siteReducer.type === siteActionType.GET_LIST_SITE_SUCCESS) {
                setLstSite(siteReducer.data.lstSite);
            }
        }
    }, [siteReducer]);

    useEffect(() => {
        if (homeReducer.type) {
            if (homeReducer.type === type.GET_HOME_SUCCESS) {
                setParentFb(homeReducer.data.parentFb);
            }
        }
    }, [homeReducer]);

    function onClickLocation(event) {
        setShowSelect(false);
        setLocation(event.target.textContent);
        setLocationId(event.target.getAttribute('data-target'));
    }

    function validateInput() {
        let checkInput = true;
        if (location === '') {
            checkInput = false;
            setLocationError('Field is required.');
        }
        if (email === '') {
            checkInput = false;
            setEmailError('Field is required.');
        }
        if (date === '') {
            checkInput = false;
            setDateError('Field is required.');
        }
        return checkInput;
    }

    return (
        <div
            className="book_your_child_free_session"
            id="booking"
            style={{ marginTop: 0 }}>
            <div className="container">
                <h2 className="heading">
                    Book your child's free <br /> training session today
                </h2>
                <div className="text-sub">
                    It only takes three minutes to get your free trial.
                </div>
                <div className="full-width">
                    <ul className="list-form">
                        <li>
                            <label className="label">
                                Select Academy
                                <a href="/#" className="location">
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
                            <label className="label">
                                Child's date of birth *
                            </label>
                            <DatePicker
                                className="input-text"
                                selected={date}
                                onChange={(date) => setDate(date)}
                            />
                            <label className="input-error">{dateError}</label>
                        </li>
                        <li>
                            <button
                                className="btn-button-s"
                                onClick={() => {
                                    if (validateInput()) {
                                        const param = {
                                            siteId: locationId,
                                            siteName: location,
                                            email: email,
                                            date: moment(date).format('M/D/Y'),
                                        };
                                        dispatch({
                                            type: siteActionType.BOOK_TRAINING,
                                            param,
                                        });
                                    }
                                }}>
                                Book a free training session
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
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookTrial;
