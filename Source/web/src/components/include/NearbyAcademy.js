import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import isEmpty from 'lodash/isEmpty';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { headerActionType } from 'src/redux/actions/actionTypes';

function NearbyAcademy({ defaultAcademyProps,isHeader }) {
    const dispatch = useDispatch();
    const wrapperRef = useRef(null);
    const [defaultAcademy, setDefaultAcademy] = useState();
    const [showSelect, setShowSelect] = useState(false);

    useEffect(() => {
        setDefaultAcademy(
            JSON.parse(localStorage.getItem('defaultAcademy')) || {},
        );
    }, []);

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
                {!isHeader && 
                (!isEmpty(defaultAcademy)
                    ? `${defaultAcademy?.location_name?.text}`
                    : 'Find your nearest academy')}
                {isHeader && <span className='underlineOrange'>{!isEmpty(defaultAcademy)
                    ? `${defaultAcademy?.location_name?.text}`
                    : 'Find an academy'}</span>}
            </div>
            <div className={`tooltip ${showSelect ? '' : 'select-hide'}`}>
                <div className="wrap">
                    <div className="wraphead">
                        {defaultAcademy ? (
                            <h3>
                                Based on your location, your selected academy is
                                <span className="name">
                                    {'  '}
                                    {defaultAcademy?.location_name?.text}
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
