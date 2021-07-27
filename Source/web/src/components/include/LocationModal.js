/* eslint-disable react/button-has-type */
import { faMapMarkerAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Utils from 'src/common/Utils';
import React, { useEffect, useState } from 'react';
// import SearchBox from 'react-google-maps/lib/components/places/SearchBox';
import { useDispatch, useSelector } from 'react-redux';
import {
    headerActionType,
    siteActionType,
} from 'src/redux/actions/actionTypes';
import ListAcademy from './ListAcademy';
import ListNearbyAcademy from './ListNearbyAcademy';
import SearchBox from 'src/components/SearchBox';

function LocationModal() {
    const dispatch = useDispatch();
    const headerReducer = useSelector((state) => state.headerReducer);
    const siteReducer = useSelector((state) => state.siteReducer);
    const { listSite } = useSelector((state) => state.listSiteReducer);
    const [visible, setVisible] = useState(false);
    const [searched, setSearched] = useState(false);
    const [showListAcademy, setShowListAcademy] = useState(true);
    const [query, setQuery] = useState('');
    const [listAcademy, setListAcademy] = useState([]);
    const [inputSearch, setInputSearch] = useState('');
    const [textResult, setTextResult] = useState('');

    useEffect(() => {
        if (headerReducer.type) {
            if (headerReducer.type === headerActionType.CHANGE_LOCATION) {
                if (headerReducer.data) {
                    setInputSearch(headerReducer.data);
                    setShowListAcademy(false);
                    setSearched(true);
                    // dispatch({
                    //     type: siteActionType.SEARCH_NEARBY,
                    //     search: headerReducer.data,
                    //     lat: 51,
                    //     lng: 0,
                    // });
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
            if (
                siteReducer.type ===
                    siteActionType.GET_CURRENT_ACADEMY_FAILED &&
                siteReducer.number === 1
            ) {
                setQuery('Get current location error');
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
                            <SearchBox
                                listSite={listSite}
                                searched={searched}
                                inputSearch={inputSearch}
                                setShowListAcademy={setShowListAcademy}
                                setSearched={setSearched}
                                setListAcademy={setListAcademy}
                                setInputSearch={setInputSearch}
                                setTextResult={setTextResult}
                            />
                        </div>
                    </div>
                </div>
                {!showListAcademy ? (
                    <ListNearbyAcademy
                        listAcademy={listAcademy}
                        textResult={textResult}
                    />
                ) : (
                    <ListAcademy listSite={listSite} />
                )}
            </div>
        </div>
    );
}

export default LocationModal;
