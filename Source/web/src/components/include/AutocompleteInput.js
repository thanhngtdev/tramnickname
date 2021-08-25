import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Utils from 'src/common/Utils';
import _, { isEmpty } from 'lodash';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Link, useHistory } from "react-router-dom";
import { siteActionType } from 'src/redux/actions/actionTypes';
import ModelManager from 'src/common/ModelManager';

// const newTimer = new Timer();

function AutocompleteInput(props) {
    const history = useRouter();
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [userInput, setUserInput] = useState('');
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [predict, setPredict] = useState([]);
    const [activeSuggestion, setActiveSuggestion] = useState(0);
    const [defaultLocation, setDefaultLocation] = useState({});
    const dispatch = useDispatch();

    const siteReducer = useSelector((state) => state.siteReducer);

    useEffect(() => {
        setDefaultLocation(ModelManager.getLocation());
    }, []);

    useEffect(() => {
        if (siteReducer.type) {
            if (
                siteReducer.type === siteActionType.SELECTED_MARKER &&
                siteReducer.data
            ) {
                setFilteredSuggestions([siteReducer.data]);
                setUserInput(siteReducer.data.ms_name);
                setShowSuggestions(true);
            }
        }
    }, [siteReducer]);

    // Event fired when the input value is changed
    function onChange(e) {
        const { suggestions } = props;
        // console.log(suggestions);
        const userInput = e.currentTarget.value;

        // console.log(userInput);

        // dispatch({ type: siteActionType.KEY_CODE });
        // Filter our suggestions that don't contain the user's input by name, address, postcode
        let filteredSuggestions = suggestions.filter(
            (suggestion) =>
                suggestion.ms_name
                    .toLowerCase()
                    .indexOf(userInput.toLowerCase()) > -1 ||
                (suggestion.ms_address &&
                    suggestion.ms_address
                        .toLowerCase()
                        .includes(userInput.toLowerCase())) ||
                (suggestion.ms_postal &&
                    suggestion.ms_postal
                        .toLowerCase()
                        .includes(userInput.toLowerCase())),
        );

        //calculate distance
        filteredSuggestions.map((item) => {
            item.distance = Utils.getAcademyDistance(
                item,
                defaultLocation,
                'mile',
            );
            return true;
        });

        //sort by distance
        filteredSuggestions.sort(function (a, b) {
            return a.distance - b.distance;
        });

        // Update the user input and filtered suggestions, reset the active
        // suggestion and make sure the suggestions are shown
        setActiveSuggestion(0);
        setFilteredSuggestions(filteredSuggestions);
        setShowSuggestions(true);
        setUserInput(e.currentTarget.value);
        // setDefaultLocation({});
    }

    // Event fired when the user clicks on a suggestion
    function onClick(e, data) {
        const name = data.ms_alias;
        history.push('/' + name);
    }

    // Event fired when the user presses a key down
    function onKeyDown(e) {
        // User pressed the enter key, update the input and close the
        // suggestions
        // Update: click for find button

        if (e.keyCode === 13 || e.type === 'click') {
            // console.log(activeSuggestion, 'index');
            if (filteredSuggestions.length > 0 && !_.isEmpty(userInput)) {
                setActiveSuggestion(0);
                setShowSuggestions(false);
                setUserInput(
                    filteredSuggestions.length > activeSuggestion
                        ? filteredSuggestions[activeSuggestion].ms_name
                        : '',
                );
                props.selectAcademy(filteredSuggestions[activeSuggestion]);
                dispatch({
                    type: siteActionType.SELECTED_MARKER,
                    data: filteredSuggestions[activeSuggestion],
                });
            }
        }
        // User pressed the up arrow, decrement the index
        else if (e.keyCode === 38) {
            if (activeSuggestion === 0) {
                return;
            }
            setActiveSuggestion(activeSuggestion - 1);
        }
        // User pressed the down arrow, increment the index
        else if (e.keyCode === 40) {
            if (activeSuggestion - 1 === filteredSuggestions.length) {
                return;
            }
            setActiveSuggestion(activeSuggestion + 1);
        }
    }

    let suggestionsListComponent;
    if (showSuggestions && userInput) {
        if (filteredSuggestions.length || predict.length) {
            suggestionsListComponent = (
                <ul className="suggestions">
                    {filteredSuggestions.map((suggestion, index) => {
                        let className = 'suggest-item';

                        // Flag the active suggestion with a class
                        if (index === activeSuggestion) {
                            className = 'suggestion-active';
                        }

                        return (
                            <li
                                key={suggestion.ms_id}
                                onClick={(e) => onClick(e, suggestion)}>
                                <div className={className}>
                                    <div className="suggest-title">
                                        <label className="title-text">
                                            {suggestion.ms_name}
                                        </label>
                                        <div>
                                            <label className="distance-text">
                                                {`${
                                                    suggestion?.distance
                                                        ? Math.round(
                                                              suggestion?.distance,
                                                          ) + ' miles'
                                                        : ''
                                                } `}
                                            </label>

                                            <Link
                                                href={'/' + suggestion.ms_alias}
                                                passHref>
                                                <a>
                                                    <FontAwesomeIcon
                                                        icon={faChevronRight}
                                                        style={{
                                                            color: '#EE7925',
                                                            margin: '0 0.8rem',
                                                            fontSize: '25px',
                                                        }}
                                                    />
                                                </a>
                                            </Link>
                                        </div>
                                    </div>
                                    <label className="sub-title">
                                        {suggestion.ms_address || ''}
                                    </label>
                                </div>
                            </li>
                        );
                    })}
                    {predict.map((item) => {
                        return (
                            <li
                                key={item.id}
                                onClick={(e) => {
                                    const proxyurl =
                                        'https://cors-anywhere.herokuapp.com/';
                                    let detailPlaceUrl =
                                        'https://maps.googleapis.com/maps/api/place/details/json?place_id=' +
                                        item.place_id +
                                        '&key=AIzaSyClAeE9K0S0LZQ3DiTg0-j_w8HvVuMYgoc';
                                    fetch(proxyurl + detailPlaceUrl)
                                        .then((response) => response.json())
                                        .then((data) => {
                                            if (data.status === 'OK') {
                                                let placeLocation =
                                                    data.result.geometry
                                                        .location;
                                                props.selectAcademy({
                                                    ms_latitude:
                                                        placeLocation.lat,
                                                    ms_longitude:
                                                        placeLocation.lng,
                                                });
                                                setFilteredSuggestions(
                                                    props.suggestions,
                                                );
                                                setPredict([]);
                                                setDefaultLocation({
                                                    lat: placeLocation.lat,
                                                    lng: placeLocation.lng,
                                                });
                                            }
                                        })
                                        .catch((error) => {
                                            console.log(error);
                                        });
                                }}>
                                <div className="suggest-item">
                                    <div className="suggest-title">
                                        <label className="title-text">
                                            {
                                                item.structured_formatting
                                                    .main_text
                                            }
                                        </label>
                                    </div>
                                    <label className="sub-title">
                                        {item.description}
                                    </label>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            );
        } else {
            suggestionsListComponent = (
                <div className="no-suggestions">
                    {/* <em>
                        No suggestions,<a style={{ color: 'red' }}>asfasf</a>{' '}
                        you're on your own!
                    </em> */}
                    <em>
                        There aren't any academies related to your search. Could
                        you setup a{' '}
                        <a
                            style={{ color: 'red' }}
                            href="https://franchisewmf.com/">
                            WMF franchise
                        </a>{' '}
                        at this location?
                    </em>
                </div>
            );
        }
    }

    return (
        <Fragment>
            <div className="auto-complete">
                <div className="wrap-input">
                    <label>Search map</label>
                    <div className="form-input">
                        <div className="text-input">
                            <input
                                type="text"
                                placeholder="Enter name"
                                className="suggestion-input"
                                onChange={onChange}
                                onKeyDown={onKeyDown}
                                value={userInput}
                            />
                            <svg
                                onClick={() => {
                                    props.selectAcademy({
                                        ms_latitude:
                                            localStorage.getItem('latitude'),
                                        ms_longitude:
                                            localStorage.getItem('longitude'),
                                    });
                                }}
                                width="18px"
                                height="20px"
                                viewBox="0 0 18 20"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg">
                                <g
                                    id="Page-1"
                                    stroke="none"
                                    strokeWidth="1"
                                    fill="none"
                                    fillRule="evenodd">
                                    <g
                                        id=""
                                        transform="translate(-534.000000, -294.000000)"
                                        fill="#000000"
                                        fillRule="nonzero">
                                        <g
                                            id="search"
                                            transform="translate(165.000000, 221.000000)">
                                            <g
                                                id="map-pin-alt"
                                                transform="translate(369.000000, 73.000000)">
                                                <path
                                                    d="M8,9.9 L8,15 C8,15.5522847 8.44771525,16 9,16 C9.55228475,16 10,15.5522847 10,15 L10,9.9 C12.5149632,9.38663528 14.2326695,7.05230129 13.9746808,4.4984757 C13.716692,1.94465012 11.5668236,0.00102051443 9,0.00102051443 C6.43317641,0.00102051443 4.28330801,1.94465012 4.02531923,4.4984757 C3.76733046,7.05230129 5.48503678,9.38663528 8,9.9 Z M9,2 C10.6568542,2 12,3.34314575 12,5 C12,6.65685425 10.6568542,8 9,8 C7.34314575,8 6,6.65685425 6,5 C6,3.34314575 7.34314575,2 9,2 Z M13.21,12.42 C12.8527344,12.3449742 12.4825816,12.4662465 12.2389746,12.7381346 C11.9953675,13.0100228 11.915316,13.3912207 12.0289746,13.7381347 C12.1426331,14.0850486 12.4327344,14.3449742 12.79,14.42 C15.06,14.87 16,15.68 16,16 C16,16.58 13.55,18 9,18 C4.45,18 2,16.58 2,16 C2,15.68 2.94,14.87 5.21,14.38 C5.56726559,14.3049742 5.85736685,14.0450486 5.97102542,13.6981347 C6.08468399,13.3512207 6.00463244,12.9700228 5.76102542,12.6981347 C5.51741839,12.4262465 5.14726559,12.3049742 4.79,12.38 C1.75,13.08 0,14.39 0,16 C0,18.63 4.53,20 9,20 C13.47,20 18,18.63 18,16 C18,14.39 16.25,13.08 13.21,12.42 Z"
                                                    id="Shape"></path>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </svg>
                        </div>

                        <button onClick={onKeyDown}>FIND</button>
                    </div>
                </div>

                {suggestionsListComponent}
            </div>
        </Fragment>
    );
}

export default AutocompleteInput;
