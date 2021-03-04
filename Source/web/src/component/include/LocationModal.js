/* eslint-disable react/button-has-type */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { headerActionType, siteActionType } from '../../actions/actionTypes';
import ListAcademy from './ListAcademy';
import ListNearbyAcademy from './ListNearbyAcademy';
import '../../css/modal.css';
import Utils from '../../common/Utils';

function LocationModal() {
    const [visible, setVisible] = useState(false);
    const [searched, setSearched] = useState(false);
    const [showListAcademy, setShowListAcademy] = useState(true);
    const [query, setQuery] = useState('');

    const dispatch = useDispatch();
    const headerReducer = useSelector((state) => state.headerReducer);
    const siteReducer = useSelector((state) => state.siteReducer);
    useEffect(() => {
        if (headerReducer.type) {
            if (headerReducer.type === headerActionType.CHANGE_LOCATION) {
                if (headerReducer.data && query === '') {
                    setQuery(headerReducer.data);
                    setShowListAcademy(false);
                    setSearched(true);
                    dispatch({
                        type: siteActionType.SEARCH_NEARBY,
                        search: headerReducer.data,
                        lat: 51,
                        lng: 0,
                    });
                }
                setVisible(true);
            }
            if (headerReducer.type === headerActionType.CLOSE_LOCATION) {
                setVisible(false);
            }
        }
    }, [headerReducer]);

    useEffect(() => {
        if (siteReducer.type) {
            if (
                siteReducer.type ===
                    siteActionType.GET_CURRENT_ACADEMY_SUCCESS &&
                siteReducer.number === 1
            ) {
                setQuery(siteReducer.data.ms_name);
            }
        }
    }, [siteReducer]);

    let headText =
        'Enter Your Postcode, Address, Town or Current Location to Find Your Nearest Class';
    if (searched) headText = 'Select Your Local Class';

    function setCurrentLocation() {
        setQuery('Loading...');
        Utils.getCurrentAcademy(dispatch, 1);
    }

    const searchNearby = () => {
        setShowListAcademy(false);
        setSearched(true);
        Utils.getMyLocation()
            .then((res) => {
                console.log('LocationModal -> res', res);
                const { latitude, longitude } = res.coords;
                const param = {
                    type: siteActionType.SEARCH_NEARBY,
                    search: query,
                    lat: latitude,
                    lng: longitude,
                };
                dispatch(param);
            })
            .catch((error) => {
                console.log('searchNearby -> error', error);
                const param = {
                    type: siteActionType.SEARCH_NEARBY,
                    search: query,
                };
                dispatch(param);
            });
    };

    return (
        <div
            className="location-modal"
            style={{ display: visible ? 'block' : 'none' }}
            onClick={() => dispatch({ type: headerActionType.CLOSE_LOCATION })}>
            <div
                className="modal-content"
                onClick={(e) => {
                    e.stopPropagation();
                }}>
                <a
                    href="/#"
                    className="close"
                    onClick={(evt) => {
                        evt.preventDefault();
                        dispatch({ type: headerActionType.CLOSE_LOCATION });
                    }}>
                    <FontAwesomeIcon
                        icon={faTimes}
                        style={{ color: '#EE7925', fontSize: '0.7em' }}
                    />
                </a>
                <div>
                    <div className="wrap-row">
                        <h2>{headText}</h2>
                    </div>
                    {!searched && (
                        <div className="wrap-row">
                            <button
                                className="current-location"
                                onClick={() => {
                                    setCurrentLocation();
                                }}>
                                <FontAwesomeIcon
                                    icon={faMapMarkerAlt}
                                    style={{
                                        color: '#EE7925',
                                        marginRight: 10,
                                    }}
                                />
                                Use current location
                            </button>
                        </div>
                    )}
                    <div className="wrap-row">
                        {searched && (
                            <label className="label-find">
                                Find your nearest class
                            </label>
                        )}
                        <div className="form-input">
                            <input
                                type="text"
                                placeholder="Or type to enter your address, town or postcode"
                                defaultValue={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        searchNearby();
                                    }
                                }}
                            />
                            <button
                                onClick={() => {
                                    searchNearby();
                                }}>
                                {searched ? 'FIND' : 'GO'}
                            </button>
                        </div>
                    </div>
                </div>
                <ListNearbyAcademy />
                {showListAcademy && <ListAcademy />}
            </div>
        </div>
    );
}

export default LocationModal;
