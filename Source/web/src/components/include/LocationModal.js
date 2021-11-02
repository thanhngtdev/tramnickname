/* eslint-disable react/button-has-type */
import { faMapMarkerAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchBox from 'src/components/SearchBox';
import {
    headerActionType,
    siteActionType,
} from 'src/redux/actions/actionTypes';
import { sendGet } from 'src/services/httpMethodPA';
import siteService from 'src/services/siteService';
import ListAcademy from './ListAcademy';
import ListNearbyAcademy from './ListNearbyAcademy';

const inititalValue = {
    searched: false,
    showListAcademy: true,
    listAcademy: [],
    inputSearch: '',
    textResult: '',
};

function LocationModal() {
    const dispatch = useDispatch();
    const headerReducer = useSelector((state) => state.headerReducer);
    const siteReducer = useSelector((state) => state.siteReducer);
    const { listSite } = useSelector((state) => state.listSiteReducer);
    const [visible, setVisible] = useState(false);
    const [searched, setSearched] = useState(inititalValue.searched);
    const [showListAcademy, setShowListAcademy] = useState(
        inititalValue.showListAcademy,
    );
    const [query, setQuery] = useState('');
    const [listAcademy, setListAcademy] = useState(inititalValue.listAcademy);
    const [inputSearch, setInputSearch] = useState(inititalValue.inputSearch);
    const [textResult, setTextResult] = useState(inititalValue.textResult);

    useEffect(() => {
        if (headerReducer.type) {
            if (headerReducer.type === headerActionType.CHANGE_LOCATION) {
                console.log('headerReducer', headerReducer.data);

                if (headerReducer.data) {
                    setTextResult(headerReducer.data.textSearch);
                    setInputSearch(headerReducer.data.textSearch);
                    setListAcademy(headerReducer.data.result);
                    setShowListAcademy(false);
                    setSearched(true);
                }
                setVisible(true);
            }
            if (headerReducer.type === headerActionType.CLOSE_LOCATION) {
                setVisible(false);

                setSearched(inititalValue.searched);
                setShowListAcademy(inititalValue.showListAcademy);
                setListAcademy(inititalValue.listAcademy);
                setInputSearch(inititalValue.inputSearch);
                setTextResult(inititalValue.textResult);
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
                setInputSearch(
                    siteReducer.data.ms_address || siteReducer.data.ms_name,
                );
            }
        }
    }, [siteReducer]);

    const onClickLocation = async (item) => {
        // e.preventDefault();
        try {
            const res = await siteService.getDetailSite({ id: item.ms_id });
            if (res.data.status == 200) {
                const item = res.data?.data?.site || {};
                localStorage.setItem('defaultAcademy', JSON.stringify(item));
                window.location.href = `${'/' + item.ms_alias}`;
            }
        } catch (error) {
            console.log(error);
        }
    };

    let headText =
        'Enter Your Postcode, Address, Town or Current Location to Find Your Nearest Class';
    if (searched) headText = 'Select Your Local Class';

    const setCurrentLocation = () => {
        // setQuery('Loading...');
        // console.log('aaaa');
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
                        setInputSearch(
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
            alert('Allow this site to access your site', err);
        }

        navigator.geolocation.getCurrentPosition(success, error, options);
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
                                style={{ cursor: 'pointer' }}
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
                                isSearch={true}
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
                        onClickLocation={onClickLocation}
                    />
                ) : (
                    <ListAcademy
                        listSite={listSite}
                        onClickLocation={onClickLocation}
                    />
                )}
            </div>
        </div>
    );
}

export default LocationModal;
