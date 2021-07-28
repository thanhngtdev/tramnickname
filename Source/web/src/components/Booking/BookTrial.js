import { isEmpty } from 'lodash';
import moment from 'moment';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import Flatpickr from 'react-flatpickr';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useDispatch, useSelector } from 'react-redux';
import PathRoute from 'src/common/PathRoute';
import Utils from 'src/common/Utils';
import TrustPilotText from 'src/components/TrustPilotText';
import useComponentVisible from 'src/hooks/useComponentVisible';
import { siteActionType } from 'src/redux/actions/actionTypes';

BookTrial.propTypes = {
    parentFb: PropTypes.object,
};

function BookTrial(props) {
    const siteReducer = useSelector((state) => state.siteReducer);
    const { listSite } = useSelector((state) => state.listSiteReducer);
    const dispatch = useDispatch();
    const history = useRouter();
    // const defaultAcademy = useGetLocalStorage();
    const [showSelect, setShowSelect] = useState(false);
    const [location, setLocation] = useState(props.site?.ms_name || '');
    const [locationId, setLocationId] = useState(props.site?.ms_id || 0);
    const [trialText, setTrialText] = useState(
        props.site?.ms_trial === 1 ? 'trial' : 'free trial',
    );
    const [date, setDate] = useState({});
    const [email, setEmail] = useState('');
    const [locationError, setLocationError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [dateError, setDateError] = useState('');
    const { parentFb } = props;
    const { ref, isComponentVisible, setIsComponentVisible } =
        useComponentVisible(true);

    useEffect(() => {
        if (siteReducer.type) {
            if (
                siteReducer.type ===
                    siteActionType.GET_CURRENT_ACADEMY_SUCCESS &&
                siteReducer.number === 2
            ) {
                setLocation(siteReducer.data.ms_name);
                setTrialText(
                    siteReducer.data && siteReducer.data.ms_trial === 1
                        ? 'trial'
                        : 'free',
                );

                setLocationId(siteReducer.data ? siteReducer.data.ms_id : '');
            }
        }
    }, [siteReducer]);

    useEffect(() => {
        if (!isComponentVisible && showSelect) {
            setShowSelect(!showSelect);
        }
    }, [isComponentVisible]);

    function onClickLocation(event) {
        setShowSelect(false);
        setLocation(event.target.textContent);
        setLocationId(event.target.getAttribute('data-target'));
        parseInt(event.target.getAttribute('data-trial'));
        setTrialText(
            parseInt(event.target.getAttribute('data-trial')) === 1
                ? 'trial'
                : 'free trial',
        );
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
                                        setLocation('Loading...');
                                        Utils.getCurrentAcademy(dispatch, 2);
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
                                        : location}
                                </div>

                                <div
                                    className={`select-items ${
                                        showSelect ? '' : 'select-hide'
                                    }`}>
                                    {!isEmpty(listSite)
                                        ? listSite.map((item) => (
                                              <div
                                                  key={item.ms_id}
                                                  data-target={item.ms_id}
                                                  data-trial={
                                                      item.ms_trial || 0
                                                  }
                                                  onClick={onClickLocation}>
                                                  {item.ms_name}
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
                            <button
                                className="btn-button-s"
                                onClick={() => {
                                    if (validateInput()) {
                                        global.bookTraining = {
                                            siteId: locationId,
                                            siteName: location,
                                            email: email,
                                            date: moment(date).format('M/D/Y'),
                                        };
                                        history.push(
                                            PathRoute.BookTrialTraining,
                                        );
                                        // dispatch({
                                        //     type: siteActionType.BOOK_TRAINING,
                                        //     param,
                                        // });
                                    }
                                }}>
                                Book a {trialText} training session
                            </button>
                        </li>
                    </ul>
                    <div className="col-right">
                        {parentFb && (
                            <div className="box-acc-review">
                                <LazyLoadImage
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
