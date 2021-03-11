import { useEffect, useState } from 'react';
import Constants from 'common/Constants';
import usePermissionLocation from './usePermissionLocation';

export default () => {
    const dispatch = useDispatch();
    const locationStatus = usePermissionLocation();
    useEffect(() => {
        if (locationStatus == 'granted') {
            dispatch({
                type: siteActionType.ALLOW_LOCATION,
                data: true,
            });
        }
        if (locationStatus == 'denied') {
            dispatch({
                type: siteActionType.ALLOW_LOCATION,
                data: false,
            });
        }
    }, [locationStatus]);
    useEffect(() => {
        const defaultAcademy = JSON.parse(
            localStorage.getItem('defaultAcademy'),
        );
        if (props.isGeolocationAvailable || props.isGeolocationEnabled) {
        } else
            dispatch({
                type: siteActionType.FIND_NEARBY,
                lat: props.coords.latitude,
                lng: props.coords.longitude,
            });
    }, [dispatch]);
    return getLocation;
};
