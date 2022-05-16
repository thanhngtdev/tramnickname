import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import isEmpty from 'lodash/isEmpty';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { headerActionType } from 'src/redux/actions/actionTypes';

function NearbyAcademy({ defaultAcademyProps }) {
    const dispatch = useDispatch();
    const wrapperRef = useRef(null);
    const siteReducer = useSelector((state) => state.siteReducer);
    // const { allowLocation } = siteReducer;

    // const [nearbyAcademy, setNearbyAcademy] = useState();s
    // JSON.parse(localStorage.getItem("defaultAcademy")) || {}
    const [defaultAcademy, setDefaultAcademy] = useState();
    console.log(defaultAcademy, 'defaultAcademy');
    // JSON.parse(localStorage.getItem("defaultAcademy")) || {}
    const [showSelect, setShowSelect] = useState(false);

    useEffect(() => {
        setDefaultAcademy(
            JSON.parse(localStorage.getItem('defaultAcademy')) || {},
        );
        // setDefaultAcademy(JSON.parse(localStorage.getItem("defaultAcademy")) || {});
    }, []);

    // useEffect(() => {
    //   if (siteReducer.type) {
    //     if (
    //       siteReducer.type === siteActionType.FIND_NEARBY_SUCESS &&
    //       !defaultAcademy?.ms_name
    //     ) {
    //       setNearbyAcademy(siteReducer.data);
    //       localStorage.setItem(
    //         "defaultAcademy",
    //         JSON.stringify(siteReducer.data)
    //       );
    //       dispatch({
    //         type: siteActionType.PICK_DEFAULT_ACADEMY,
    //       });
    //     }
    //     if (siteReducer.type === siteActionType.PICK_DEFAULT_ACADEMY) {
    //       setDefaultAcademy(JSON.parse(localStorage.getItem("defaultAcademy")));
    //     }
    //   }
    // }, [siteReducer]);

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
    // const renderNearbyAcademy = () => {
    //   if (defaultAcademy && defaultAcademy.ms_id) {
    //     return "C";
    //   }

    //   // if (nearbyAcademy && nearbyAcademy.ms_id) {
    //   //   return nearbyAcademy.ms_name;
    //   // }

    //   // if (allowLocation) {
    //   //   return "Loading ...";
    //   // }

    //   return "Find your closest academy";
    // };

    return (
        <div className="custom-select" ref={wrapperRef}>
            <div
                className="select-selected"
                onClick={() => {
                    if (defaultAcademy && defaultAcademy.ms_id)
                        setShowSelect(!showSelect);
                    else {
                        setShowSelect(false);
                        dispatch({
                            type: headerActionType.CHANGE_LOCATION,
                        });
                    }
                }}>
                {!isEmpty(defaultAcademy)
                    ? `${defaultAcademy?.location_name?.text}`
                    : 'Find your nearest academy'}
                {/* {defaultAcademyProps
                    ? defaultAcademyProps.ms_name
                    : !isEmpty(defaultAcademy)
                    ? `${defaultAcademy?.location_name?.text}`
                    : 'Find your nearest academy'} */}
            </div>
            <div className={`tooltip ${showSelect ? '' : 'select-hide'}`}>
                <div className="wrap">
                    <div className="wraphead">
                        {defaultAcademy ? (
                            <h3>
                                Based on your location, your selected academy is
                                <span className="name">
                                    {'  '}
                                    {defaultAcademy
                                        ? defaultAcademy.location_name
                                        : defaultAcademy?.location_name?.text}
                                </span>
                            </h3>
                        ) : (
                            <h3>You need choose a location</h3>
                        )}

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
                            }}>
                            Another location
                        </button>
                    </div>
                    <p>
                        If you wish to change this please choose &apos;Another
                        Location&apos;
                    </p>
                    <div className="wraphead">
                        <span>
                            Want to start over?{' '}
                            <h3
                                className="name"
                                style={{ cursor: 'pointer', display: 'inline' }}
                                onClick={() => {
                                    localStorage.removeItem('defaultAcademy');
                                    localStorage.removeItem('longitude');
                                    localStorage.removeItem('latitude');
                                    window.location.href = '/';
                                }}>
                                Clear location
                            </h3>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NearbyAcademy;
