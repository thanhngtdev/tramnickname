import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import isEmpty from 'lodash/isEmpty';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ModelManager from 'src/common/ModelManager';
import Utils from 'src/common/Utils';
import { siteActionType } from 'src/redux/actions/actionTypes';
import SearchBoxLocation from 'src/components/SearchBoxLocation';
import { sendGet } from 'src/services/httpMethodPA';

// const newTimer = new Timer();

function AutocompleteInput(props) {
    const history = useRouter();
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [userInput, setUserInput] = useState('');
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);

    const [activeSuggestion, setActiveSuggestion] = useState(0);
    const [defaultLocation, setDefaultLocation] = useState({});

    const siteReducer = useSelector((state) => state.siteReducer);

    useEffect(() => {
        setDefaultLocation(ModelManager.getLocation());
    }, []);

    useEffect(() => {
        if (!isEmpty(filteredSuggestions)) {
            setShowSuggestions(true);
        }
    }, [filteredSuggestions]);

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

    const setCurrentLocation = () => {
        let options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
        };

        const success = async (pos) => {
            // setLocation('Loading');
            let { latitude, longitude } = pos.coords;

            const getApi = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;

            await sendGet(getApi)
                .then((res) => {
                    // console.log(res, 'res');

                    if (res.status === 200) {
                        setUserInput(
                            res.data?.locality +
                                ' ' +
                                res.data?.city +
                                ' ' +
                                res.data?.countryName,
                        );
                    }
                })
                .catch((err) => {
                    console.log(err);
                    // setListCourse([]);
                });
        };

        function error(err) {
            alert('Allow this site to access your location', err);
        }

        navigator.geolocation.getCurrentPosition(success, error, options);
    };

    // Event fired when the user clicks on a suggestion
    function onClick(e, data) {
        Utils.onClickLocation(data);
    }

    // Event fired when the user presses a key down
    function onKeyDown(e) {
        // User pressed the enter key, update the input and close the
        // suggestions
        // Update: click for find button

        // if (e.keyCode === 13 || e.type === 'click') {
        //     // console.log(activeSuggestion, 'index');
        //     if (filteredSuggestions.length > 0) {
        //         setActiveSuggestion(0);
        //         setShowSuggestions(false);
        //         setUserInput(
        //             filteredSuggestions.length > activeSuggestion
        //                 ? filteredSuggestions[activeSuggestion].ms_name
        //                 : '',
        //         );
        //         props.selectAcademy(filteredSuggestions[activeSuggestion]);
        //         dispatch({
        //             type: siteActionType.SELECTED_MARKER,
        //             data: filteredSuggestions[activeSuggestion],
        //         });
        //     }
        // }
        // User pressed the up arrow, decrement the index
        if (e.keyCode === 38) {
            if (activeSuggestion === 0) {
                return;
            }

            // console.log('aaaa');
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
    if (showSuggestions) {
        if (!isEmpty(filteredSuggestions)) {
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
                                                        ? Utils.showDistance(
                                                              suggestion?.distance,
                                                          ) + ' kilometers'
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
                        <SearchBoxLocation
                            setFilteredSuggestions={setFilteredSuggestions}
                            listSite={props.suggestions}
                            setShowSuggestions={setShowSuggestions}
                            userInput={userInput}
                            setUserInput={setUserInput}
                            setCurrentLocation={setCurrentLocation}
                        />
                    </div>
                </div>

                {suggestionsListComponent}
            </div>
        </Fragment>
    );
}

export default AutocompleteInput;
