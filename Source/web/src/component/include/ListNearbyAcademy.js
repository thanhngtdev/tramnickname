import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
} from 'react-google-maps';
import Utils from '../../common/Utils';
import avatar from '../../images/gallery4.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEnvelope,
    faPhoneAlt,
    faChevronDown,
} from '@fortawesome/free-solid-svg-icons';
import { headerActionType, siteActionType } from '../../actions/actionTypes';
import WeeklyTrainingItem from './WeeklyTrainingItem';
import { useHistory } from 'react-router-dom';

const MapWithAMarker = withScriptjs(
    withGoogleMap((props) => (
        <GoogleMap
            defaultZoom={12}
            center={{
                lat:
                    props.marker.length > 0
                        ? parseFloat(props.marker[props.highlight].ms_latitude)
                        : 51,
                lng:
                    props.marker.length > 0
                        ? parseFloat(props.marker[props.highlight].ms_longitude)
                        : 0,
            }}>
            {props.marker.map((item, index) => {
                return (
                    <Marker
                        key={index}
                        icon={require('../../images/marker.png')}
                        position={{
                            lat: parseFloat(item.ms_latitude) || 51,
                            lng: parseFloat(item.ms_longitude) || 0,
                        }}
                    />
                );
            })}
        </GoogleMap>
    )),
);

function ListNearbyAcademy() {
    const history = useHistory();
    const dispatch = useDispatch();
    const chooseAcademyModal = useRef(null);
    const [lstAcademy, setLstAcademy] = useState([]);
    const [highlightAcademy, setHighlightAcademy] = useState(0);
    const [lstNearBy,setLstNearBy] = useState([]);

    const siteReducer = useSelector((state) => state.siteReducer);

    useEffect(() => {
        if (siteReducer.type) {
            if (siteReducer.type === siteActionType.SEARCH_NEARBY_SUCCESS) {
                setLstAcademy(siteReducer.data.data);
                console.log(siteReducer.data);
            }
        }
        if (
            siteReducer.type === siteActionType.FIND_NEARBY_ACADEMY_SUCCESS
        ) {
            setLstNearBy(siteReducer.data);
        }
    }, [siteReducer]);

      useEffect(() => {
        const defaultAcademy = JSON.parse(localStorage.getItem('defaultAcademy'));
        const lstNearest = [...lstNearBy].sort((a,b) => a.distance-b.distance);

        if(!defaultAcademy && !!lstNearest[0]){
            localStorage.setItem(
                'defaultAcademy',
                JSON.stringify(
                    lstNearest[0],
                ),
            );
            dispatch({
                type: siteActionType.PICK_DEFAULT_ACADEMY,
            });
        };


    }, [lstNearBy]);

    return (
        <div ref={chooseAcademyModal} style={{ paddingBottom: '5rem' }}>
            {lstAcademy.length > highlightAcademy && (
                <div className="main-info wrap-row">
                    <div className="wrap-address">
                        <b>{lstAcademy[highlightAcademy].ms_name}</b>
                        <label>
                            {Utils.showDistance(
                                lstAcademy[highlightAcademy].distance,
                            )}
                            {` miles away`}
                        </label>
                        <p>{lstAcademy[highlightAcademy].ms_address}</p>
                    </div>
                    <div className="wrap-info">
                        <img
                            alt=""
                            src={
                                lstAcademy[highlightAcademy].ms_avatar &&
                                lstAcademy[highlightAcademy].ms_avatar !== ''
                                    ? Utils.getThumb(
                                          lstAcademy[highlightAcademy]
                                              .ms_avatar,
                                          'c1',
                                      )
                                    : avatar
                            }
                        />
                    </div>
                    <div className="wrap-contact">
                        <a
                            href="/#"
                            onClick={() => {
                                localStorage.setItem(
                                    'defaultAcademy',
                                    JSON.stringify(
                                        lstAcademy[highlightAcademy],
                                    ),
                                );
                                dispatch({
                                    type: siteActionType.PICK_DEFAULT_ACADEMY,
                                });
                            }}>
                            Set as default location
                        </a>
                        <a
                            onClick={() => {
                                dispatch({
                                    type: headerActionType.CLOSE_LOCATION,
                                });
                                history.push(
                                    '/franchise/' +
                                        lstAcademy[highlightAcademy].ms_alias +
                                        '-' +
                                        lstAcademy[highlightAcademy].ms_id,
                                );
                            }}>
                            <FontAwesomeIcon icon={faEnvelope} />
                            Enquiry form
                        </a>
                        <a
                            href={`tel:${lstAcademy[highlightAcademy].ms_phone}`}>
                            <FontAwesomeIcon icon={faPhoneAlt} />
                            Call
                        </a>
                    </div>
                </div>
            )}
            <div style={{ clear: 'both' }} />
            {lstAcademy.length > highlightAcademy && (
                <div className="more-info">
                    <button
                        onClick={() => {
                            dispatch({ type: headerActionType.CLOSE_LOCATION });
                            history.push(
                                '/franchise/' +
                                    lstAcademy[highlightAcademy].ms_alias +
                                    '-' +
                                    lstAcademy[highlightAcademy].ms_id,
                            );
                        }}>
                        More infomation
                    </button>
                </div>
            )}
            <div className="map-view">
                {lstAcademy.length > 0 && (
                    <div className="map">
                        <MapWithAMarker
                            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyClAeE9K0S0LZQ3DiTg0-j_w8HvVuMYgoc&v=3.exp&libraries=geometry,drawing,places"
                            loadingElement={<div style={{ height: `100%` }} />}
                            containerElement={
                                <div style={{ height: `100%` }} />
                            }
                            mapElement={
                                <div
                                    style={{
                                        height: `100%`,
                                        minHeight: 200,
                                    }}
                                />
                            }
                            marker={lstAcademy}
                            highlight={highlightAcademy}
                        />
                    </div>
                )}

                {lstAcademy.length > 0 && (
                    <div className="service">
                        <div className="weekly-training">
                            <p>Weekly traning schedule:</p>
                            {lstAcademy[
                                highlightAcademy
                            ].weeklyTraining.class.map((item, index) => (
                                <WeeklyTrainingItem
                                    data={item}
                                    key={index}
                                    index={index}
                                />
                            ))}
                        </div>
                        <div className="service-offered">
                            <p>Services offered:</p>
                            <ul>
                                <li>Weekly training</li>
                                <li>Holiday Camps</li>
                                <li>Birthday Parties</li>
                                <li>1-on-1 training</li>
                                <li>School Training</li>
                            </ul>
                        </div>
                    </div>
                )}
            </div>
            {lstAcademy.length > 0 && (
                <div className="list-academy">
                    <h2>Other Locations Near You</h2>
                    {lstAcademy.map((item, index) => {
                        if (index !== highlightAcademy)
                            return (
                                <div
                                    key={index}
                                    onClick={() => {
                                        console.log('11111');
                                        // chooseAcademyModal.current.scrollTo({
                                        //     top: 0,
                                        //     behavior: 'smooth',
                                        // });
                                        chooseAcademyModal.current.scrollIntoView(
                                            {
                                                behavior: 'smooth',
                                            },
                                        );
                                        setHighlightAcademy(index);
                                    }}>
                                    <hr />
                                    <div className="wrap-row other-location">
                                        <div>
                                            <b>{item.ms_name}</b>
                                            <label>
                                                {Utils.showDistance(
                                                    lstAcademy[index].distance,
                                                )}
                                                {` miles away`}
                                            </label>
                                        </div>
                                        <FontAwesomeIcon
                                            icon={faChevronDown}
                                            style={{ color: '#EE7925' }}
                                        />
                                    </div>
                                </div>
                            );
                        return null;
                    })}
                    <hr />
                </div>
            )}
        </div>
    );
}

export default ListNearbyAcademy;
