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
import parse from 'html-react-parser';
import { useDispatch, useSelector } from 'react-redux';
import Constants from 'src/common/Constants';
import PathRoute from 'src/common/PathRoute';
import Utils from 'src/common/Utils';
import Spinner from 'src/components/Spinner';
import {
    headerActionType,
    siteActionType,
} from 'src/redux/actions/actionTypes';
import WeeklyTrainingItem from './WeeklyTrainingItem';
import useGetWidth from 'src/hooks/useGetWidth';

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
    const siteReducer = useSelector((state) => state.siteReducer);
    const history = useRouter();
    const dispatch = useDispatch();
    const chooseAcademyModal = useRef(null);
    const [lstAcademy, setLstAcademy] = useState(props.listAcademy || []);
    const [highlightAcademy, setHighlightAcademy] = useState(0);
    const [noResult, setNoReSult] = useState(false);
    const [weeklyCourse, setWeeklyCourse] = useState([]);
    const isMobile = useGetWidth() <= 768;

    //! useEffect
    useEffect(() => {
        setLstAcademy(props.listAcademy);
        setNoReSult(isEmpty(props.listAcademy));
    }, [props.listAcademy]);

    useEffect(() => {
        // if (!isEmpty(lstAcademy[highlightAcademy])) {
        //     dispatch({
        //         type: siteActionType.GET_LIST_COURSE,
        //         company_id: lstAcademy[highlightAcademy].pa_companyId,
        //         location_id: lstAcademy[highlightAcademy].pa_locationId,
        //         course_type: 'course',
        //     });
        // }

        if (!isEmpty(lstAcademy[highlightAcademy])) {
            const listId = lstAcademy[highlightAcademy].ms_addresses
                .map((item) => item.pa_locationId)
                .join(',');

            dispatch({
                type: siteActionType.GET_LIST_COURSE,
                company_id: lstAcademy[highlightAcademy].pa_companyId,
                location_id: listId,
                course_type: 'course',
            });
        }
        // }
    }, [highlightAcademy]);

    useEffect(() => {
        if (siteReducer?.type === siteActionType.GET_LIST_COURSE_SUCCESS) {
            if (siteReducer.courseType === 'course') {
                setWeeklyCourse(
                    Utils.convertLocation(
                        lstAcademy[highlightAcademy].ms_addresses,
                        siteReducer.dataCourse,
                    ),
                    // console.log('weekly',weeklyCourse)
                );
            }
        }
    }, [siteReducer]);
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

    const renderAddress = () => (
        <>
            <div className="wrap-contact">
                <a
                    // href="/#"
                    onClick={(e) => {
                        e.preventDefault();
                        props.onClickLocation(lstAcademy[highlightAcademy]);
                    }}>
                    <span>Set as default location</span>
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
                <a href={`tel:${lstAcademy[highlightAcademy].ms_phone}`}>
                    <FontAwesomeIcon icon={faPhoneAlt} />
                    Call
                </a>
            </div>
            {lstAcademy.length > highlightAcademy && (
                <div className="more-info">
                    <a
                        onClick={(e) => {
                            e.preventDefault();
                            props.onClickLocation(lstAcademy[highlightAcademy]);
                        }}>
                        More infomation
                    </a>
                </div>
            )}
        </>
    );

    // const addressLenght = lstAcademy[highlightAcademy].ms_addresses.length;
    // const newAddress = lstAcademy[highlightAcademy].ms_addresses;
    return (
        <div
            ref={chooseAcademyModal}
            style={{ paddingBottom: '5rem', marginTop: isMobile ? 0 : '5rem' }}>
            {lstAcademy.length > highlightAcademy && (
                <div className="map-view">
                    <div className="main-info wrap-row">
                        <div className="wrap-address">
                            <h3 style={{ marginTop: 0 }}>
                                {parse(
                                    Utils.checkSubname(
                                        lstAcademy[highlightAcademy],
                                    ),
                                )}
                            </h3>

                            {!isMobile && renderAddress()}
                        </div>
                    </div>
                    <div className="service">
                        <div className="weekly-training">
                            <h3>Weekly training schedule:</h3>
                            {weeklyCourse &&
                                Object.entries(weeklyCourse).map(
                                    (item, index) => (
                                        <WeeklyTrainingItem
                                            title={item[0]}
                                            item={item[1]}
                                            key={index}
                                            index={index}
                                            site={lstAcademy[highlightAcademy]}
                                        />
                                    ),
                                )}
                        </div>
                        {isMobile && renderAddress()}
                    </div>
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
                            highlight={lstAcademy[highlightAcademy]}
                        />
                    </div>
                    <div className="service">
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
