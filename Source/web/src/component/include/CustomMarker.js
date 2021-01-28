import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Marker } from 'react-google-maps';
import { siteActionType } from '../../actions/actionTypes';

function CustomMarker(props) {
    const DEFAULT_ICON = require('../../images/marker.png');
    const [defaultIcon, setDefaultIcon] = useState(DEFAULT_ICON);

    const dispatch = useDispatch();
    const { item } = props;

    const siteReducer = useSelector((state) => state.siteReducer);

    useEffect(() => {
        if (siteReducer.type) {
            if (siteReducer.type === siteActionType.SELECTED_MARKER) {
                if (siteReducer.data && siteReducer.data.ms_id === item.ms_id) {
                    setDefaultIcon(require('../../images/marker-selected.png'));
                } else {
                    setDefaultIcon(DEFAULT_ICON);
                }
            }
        }
    }, [siteReducer, DEFAULT_ICON, item]);

    return (
        <Marker
            // animation={window.google.maps.Animation.DROP}
            onClick={() => {
                props.selectAcademy(item);
                dispatch({
                    type: siteActionType.SELECTED_MARKER,
                    data: item,
                });
            }}
            icon={defaultIcon}
            position={{
                lat: parseFloat(item.ms_latitude),
                lng: parseFloat(item.ms_longitude),
            }}
        />
    );
}

export default CustomMarker;
