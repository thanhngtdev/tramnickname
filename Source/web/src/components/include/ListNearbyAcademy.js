import {
    faChevronDown,
    faEnvelope,
    faPhoneAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import avatar from "images/gallery4.jpg";
import isEmpty from 'lodash/isEmpty';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import {
    GoogleMap,
    Marker,
    withGoogleMap,
    withScriptjs,
} from 'react-google-maps';
import { useDispatch } from 'react-redux';
import Constants from 'src/common/Constants';
import PathRoute from 'src/common/PathRoute';
import Utils from 'src/common/Utils';
import Spinner from 'src/components/Spinner';
import { headerActionType } from 'src/redux/actions/actionTypes';
import WeeklyTrainingItem from './WeeklyTrainingItem';

const MapWithAMarker = withScriptjs(
    withGoogleMap((props) => {
        return (
            <GoogleMap
                defaultZoom={12}
                center={{
                    lat: parseFloat(props?.highlight?.ms_latitude) || 51,
                    lng: parseFloat(props?.highlight?.ms_longitude) || 51,
                }}>
                <Marker
                    // key={index}
                    icon={'/static-file/images/marker.png'}
                    position={{
                        lat: parseFloat(props?.highlight?.ms_latitude) || 51,
                        lng: parseFloat(props?.highlight?.ms_longitude) || 0,
                    }}
                />
            </GoogleMap>
        );
    }),
);

function ListNearbyAcademy(props) {
    const history = useRouter();
    const dispatch = useDispatch();
    const chooseAcademyModal = useRef(null);
    const [lstAcademy, setLstAcademy] = useState(props.listAcademy || []);
    const [highlightAcademy, setHighlightAcademy] = useState(0);
    const [noResult, setNoReSult] = useState(false);

    //! useEffect
    useEffect(() => {
        setLstAcademy(props.listAcademy);
        setNoReSult(isEmpty(props.listAcademy));
    }, [props.listAcademy]);

    //! Functions

    //! render
    if (isEmpty(lstAcademy) && !noResult) {
        return <Spinner />;
    } else if (isEmpty(lstAcademy) && noResult) {
        return (
            <div className="wrap-row" style={{ paddingBottom: '40px' }}>
                <b>
                    {' '}
                    There's no academy nearby your search{' '}
                    <span style={{ color: 'red' }}>
                        {` "` + props.textResult + `"`}
                    </span>{' '}
                </b>
            </div>
        );
    }
    // console.log(lstAcademy);
    return (
        <div ref={chooseAcademyModal} style={{ paddingBottom: '5rem' }}>
            {lstAcademy.length > highlightAcademy && (
                <div className="main-info wrap-row">
                    <div className="wrap-address">
                        <h3 style={{ marginTop: 0 }}>
                            {lstAcademy[highlightAcademy].ms_name}
                        </h3>
                        <label>
                            {'~'}
                            {Utils.showDistance(
                                lstAcademy[highlightAcademy].distance,
                            )}
                            {` kilometers away`}
                        </label>
                        <p>{lstAcademy[highlightAcademy].ms_address}</p>
                    </div>
                    <div className="wrap-info">
                        <img
                            loading="lazy"
                            alt=""
                            src={
                                lstAcademy[highlightAcademy].ms_avatar &&
                                lstAcademy[highlightAcademy].ms_avatar !== ''
                                    ? Utils.getThumb(
                                          lstAcademy[highlightAcademy]
                                              .ms_avatar,
                                          'c1',
                                      )
                                    : '/static-file/images/gallery4.jpg'
                            }
                        />
                    </div>
                    <div className="wrap-contact">
                        <a
                            // href="/#"
                            onClick={(e) => {
                                e.preventDefault();
                                props.onClickLocation(
                                    lstAcademy[highlightAcademy],
                                );
                            }}>
                            Set as default location
                        </a>
                        <a
                            onClick={() => {
                                dispatch({
                                    type: headerActionType.CLOSE_LOCATION,
                                    param: lstAcademy[highlightAcademy],
                                });
                                history.push(PathRoute.Contact);
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
                    <a
                        onClick={(e) => {
                            e.preventDefault();
                            // console.log(lstAcademy[highlightAcademy]);
                            props.onClickLocation(lstAcademy[highlightAcademy]);
                            // dispatch({
                            //     type: headerActionType.CLOSE_LOCATION,
                            //     param: lstAcademy[highlightAcademy],
                            // });
                        }}
                        // href={'/' + lstAcademy[highlightAcademy].ms_alias}
                    >
                        More infomation
                    </a>
                </div>
            )}
            {lstAcademy.length > 0 && (
                <div className="map-view">
                    <div className="map">
                        <MapWithAMarker
                            googleMapURL={Constants.GOOGLE_MAP_URL}
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
                            // marker={lstAcademy.slice(0, 1)}
                            highlight={lstAcademy[highlightAcademy]}
                        />
                    </div>
                    <div className="service">
                        <div className="weekly-training">
                            <h3>Weekly training schedule:</h3>
                            {lstAcademy[highlightAcademy].weeklyTraining?.class
                                .length > 0 &&
                                lstAcademy[
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
                            <h3>Services offered:</h3>
                            <ul>
                                <li>Weekly training</li>
                                <li>Holiday Camps</li>
                                <li>Birthday Parties</li>
                                <li>1-on-1 training</li>
                                <li>School Training</li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}
            {lstAcademy.length > 0 && (
                <div className="list-academy">
                    <h2>
                        Other Locations Near{' '}
                        <span style={{ color: '#ff7531' }}>
                            {props.textResult}
                        </span>{' '}
                    </h2>
                    {lstAcademy.map((item, index) => {
                        if (index !== highlightAcademy)
                            return (
                                <div
                                    key={index}
                                    onClick={() => {
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
                                            <h3>{item.ms_name}</h3>
                                            <label>
                                                {'~'}{' '}
                                                {Utils.showDistance(
                                                    lstAcademy[index].distance,
                                                )}
                                                {` kilometers away`}
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
