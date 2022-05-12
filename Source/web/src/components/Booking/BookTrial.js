import dayjs from 'dayjs';
import isEmpty from 'lodash/isEmpty';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import Flatpickr from 'react-flatpickr';
import { useDispatch, useSelector } from 'react-redux';
import PathRoute from 'src/common/PathRoute';
import Utils from 'src/common/Utils';
import TrustPilotText from 'src/components/TrustPilotText';
import useComponentVisible from 'src/hooks/useComponentVisible';
import { siteActionType } from 'src/redux/actions/actionTypes';
import Button from '../Button';

BookTrial.propTypes = {
    parentFb: PropTypes.object,
};

function BookTrial(props) {
    const { parentFb } = props;
    const siteReducer = useSelector((state) => state.siteReducer);
    const { listSite } = useSelector((state) => state.listSiteReducer);
    const dispatch = useDispatch();
    const history = useRouter();

    const [showSelect, setShowSelect] = useState(false);
    const [location, setLocation] = useState(props.site || '');
    const [trialText, setTrialText] = useState(
        props.site?.ms_trial === 1 ? 'session' : 'free session',
    );
    const [date, setDate] = useState({});
    const [email, setEmail] = useState('');
    const [locationError, setLocationError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [dateError, setDateError] = useState('');
    const { ref, isComponentVisible, setIsComponentVisible } =
        useComponentVisible(true);

    useEffect(() => {
        // console.log(props, 'props');
        if (!isEmpty(props.site)) {
            setLocation(props.site);
        }
    }, [props.site]);

    useEffect(() => {
        if (siteReducer.type) {
            if (
                siteReducer.type ===
                    siteActionType.GET_CURRENT_ACADEMY_SUCCESS &&
                siteReducer.number === 2
            ) {
                setLocation(siteReducer.data);
                setTrialText(
                    siteReducer.data && siteReducer.data.ms_trial === 1
                        ? 'session'
                        : 'free',
                );
            }
        }
    }, [siteReducer]);
    useEffect(() => {
        if (!isComponentVisible && showSelect) {
            setShowSelect(!showSelect);
        }
    }, [isComponentVisible]);

    function handleOnClick(data) {
        // console.log(data, 'data');
        setLocation(data);
        setShowSelect(false);
        setTrialText(data.ms_trial === 1 ? 'session' : 'free session');
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
        if (date === '') {
            checkInput = false;
            setDateError('Field is required.');
        }
        return checkInput;
    }

    return (
        <div className="book_your_child_free_session" id="booking">
            <div className="container">
                <h2 className="heading">
                    Book your child&apos;s free <br /> training session today
                </h2>
                <div className="text-sub">
                    It only takes three minutes to get your {trialText}.
                </div>
                <div className="full-width">
                    <ul className="list-form">
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
                                            setLocation('Loading');
                                            let crd = pos.coords;

                                            dispatch({
                                                type: siteActionType.GET_CURRENT_ACADEMY,
                                                lat: crd.latitude,
                                                long: crd.longitude,
                                                number: 2,
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
                            <div ref={ref} className="custom-select">
                                <div
                                    className={`select-selected ${
                                        showSelect ? 'active' : ''
                                    }`}
                                    onClick={() => {
                                        setIsComponentVisible(true);
                                        setShowSelect(!showSelect);
                                        setLocationError('');
                                        return false;
                                    }}>
                                    {isEmpty(location)
                                        ? 'Select Academy'
                                        : location.ms_name}
                                </div>

                                <div
                                    className={`select-items ${
                                        showSelect ? '' : 'select-hide'
                                    }`}>
                                    {!isEmpty(listSite)
                                        ? listSite.map((item) => (
                                              <div
                                                  key={item.ms_id}
                                                  onClick={() => {
                                                      handleOnClick(item);
                                                  }}>
                                                  {Utils.renderItem(item)}
                                              </div>
                                          ))
                                        : null}
                                </div>
                            </div>
                            <label className="input-error">
                                {locationError}
                            </label>
                        </li>
                        <li>
                            <label className="label">
                                Your Email <span className="required">*</span>
                            </label>
                            <input
                                type="text"
                                className="input-text"
                                placeholder="Example@gmail.com"
                                onChange={(event) => {
                                    setEmail(event.target.value);
                                    setEmailError('');
                                }}
                            />
                            <label className="input-error">{emailError}</label>
                        </li>
                        <li>
                            <label className="label">
                                Child's date of birth{' '}
                                <span className="required">*</span>
                            </label>
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
                            <Button
                                onClick={() => {
                                    if (validateInput()) {
                                        global.bookTraining = {
                                            siteSelected: location,
                                            email: email,
                                            date: dayjs(date).format(
                                                'MM/DD/YYYY',
                                            ),
                                        };

                                        history.push(
                                            PathRoute.BookTrialTraining,
                                        );
                                    }
                                }}
                                title={`Book a ${trialText.replace(
                                    'session',
                                    '',
                                )} training session`}
                            />
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

export default BookTrial;
