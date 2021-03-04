import React, { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { siteActionType, headerActionType } from '../../actions/actionTypes';

function NearbyAcademy() {
    const dispatch = useDispatch();
    const wrapperRef = useRef(null);
    const [allowLocation, setAllowLocation] = useState(false);
    const [nearbyAcademy, setNearbyAcademy] = useState(
        JSON.parse(localStorage.getItem('defaultAcademy')) || {},
    );
    const [defaultAcademy, setDefaultAcademy] = useState(
        JSON.parse(localStorage.getItem('defaultAcademy')) || {},
    );
    const [showSelect, setShowSelect] = useState(false);

    const siteReducer = useSelector((state) => state.siteReducer);

    useEffect(() => {
        if (siteReducer.type) {
            if (siteReducer.type === siteActionType.FIND_NEARBY_SUCESS && !defaultAcademy?.ms_name) {
                setNearbyAcademy(siteReducer.data);
                localStorage.setItem(
                    'defaultAcademy',
                    JSON.stringify(siteReducer.data),
                );
                dispatch({
                    type: siteActionType.PICK_DEFAULT_ACADEMY,
                });
            }
            if (siteReducer.type === siteActionType.PICK_DEFAULT_ACADEMY) {
                setDefaultAcademy(
                    JSON.parse(localStorage.getItem('defaultAcademy')),
                );
            }
            if (siteReducer.type === siteActionType.ALLOW_LOCATION) {
                setAllowLocation(siteReducer.data);
            }
        }
    }, [siteReducer]);

    useEffect(() => {
        document.addEventListener('click', handleClick);
        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, []);

    function handleClick(event) {
        const { target } = event;
        if (!wrapperRef.current.contains(target)) {
            setShowSelect(false);
        }
    }

    function onChooseLocation() {
        setShowSelect(false);
    }

    // Render
    const renderNearbyAcademy = () => {
        if (defaultAcademy && defaultAcademy.ms_id) {
            return defaultAcademy.ms_name;
        }

        if (nearbyAcademy && nearbyAcademy.ms_id) {
            return nearbyAcademy.ms_name;
        }

        if (allowLocation) {
            return 'Loading ...';
        }

        return 'Find your closet academy';
    };

    return (
        <div className="custom-select" ref={wrapperRef}>
            <div
                className="select-selected"
                onClick={() => {
                    if (nearbyAcademy && nearbyAcademy.ms_id)
                        setShowSelect(!showSelect);
                    else {
                        setShowSelect(false);
                        dispatch({
                            type: headerActionType.CHANGE_LOCATION,
                        });
                    }
                }}>
                {renderNearbyAcademy()}
                {/* {nearbyAcademy && nearbyAcademy.ms_id
                    ? nearbyAcademy.ms_name
                    : 'Find your closet academy'} */}
            </div>
            <div className={`tooltip ${showSelect ? '' : 'select-hide'}`}>
                <div className="wrap">
                    <div className="wraphead">
                        <h3>
                            Based on your location, your selected academy is
                            <span className="name">
                                {' '}
                                {nearbyAcademy.ms_name}
                            </span>
                        </h3>
                        <a
                            href="/#"
                            onClick={(e) => {
                                e.preventDefault();
                                onChooseLocation();
                            }}>
                            <FontAwesomeIcon
                                icon={faTimes}
                                style={{
                                    color: 'grey',
                                }}
                            />
                        </a>
                    </div>
                    <div className="wrapcontent">
                        <button onClick={onChooseLocation}>Yes</button>
                        <button
                            onClick={() => {
                                setShowSelect(false);
                                dispatch({
                                    type: headerActionType.CHANGE_LOCATION,
                                });
                                // this.props.onChangeLocation();
                            }}>
                            Another location
                        </button>
                    </div>
                    <p>
                        If you wish to change this please choose &apos;Another
                        Location&apos;
                    </p>
                </div>
            </div>
        </div>
    );
}

export default NearbyAcademy;
