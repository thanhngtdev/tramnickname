import React, { useState, useEffect } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';
import AutocompleteInput from './AutocompleteInput';
import { siteActionType } from '../../actions/actionTypes';
import { useDispatch, useSelector } from 'react-redux';
import Constants from '../../common/Constants';
import CustomMarker from './CustomMarker';
import _ from 'lodash';

function AcademyMap() {
    const dispatch = useDispatch();
    const headerReducer = useSelector((state) => state.headerReducer);

    const [defaultCenter, setDefaultCenter] = useState({
        lat:
            parseFloat(localStorage.getItem('latitude')) ||
            Constants.DEFAULT_LOCATION.lat,
        lng:
            parseFloat(localStorage.getItem('longitude')) ||
            Constants.DEFAULT_LOCATION.lng,
    });
    const [lstSite, setLstSite] = useState([]);

    const siteReducer = useSelector((state) => state.siteReducer);

    useEffect(() => {
        if (siteReducer.type) {
            if (siteReducer.type === siteActionType.GET_LIST_SITE_SUCCESS) {
                // console.log(siteReducer.data);
                setLstSite(siteReducer.data.lstSite);
            }
        }
    }, [siteReducer]);

    useEffect(() => {
        if (!_.isEmpty(headerReducer.param)) {
            setDefaultCenter({
                lat: parseFloat(headerReducer.param.ms_latitude),
                lng: parseFloat(headerReducer.param.ms_longitude),
            });
            // console.log(headerReducer, 'header');
            dispatch({
                type: siteActionType.SELECTED_MARKER,
                data: headerReducer.param,
            });
        }
    }, [headerReducer]);

    function setFocusMarker(data) {
        if (data && data.ms_latitude && data.ms_longitude) {
            setDefaultCenter({
                lat: parseFloat(data.ms_latitude),
                lng: parseFloat(data.ms_longitude),
            });
        }
    }

    // console.log(defaultCenter, 'default ');
    return (
        <GoogleMap defaultZoom={12} center={defaultCenter}>
            <div className="search-text">
                <AutocompleteInput
                    selectAcademy={setFocusMarker}
                    suggestions={lstSite}
                />
            </div>
            {lstSite.map((item, index) => {
                if (item.ms_latitude && item.ms_longitude)
                    return (
                        <CustomMarker
                            key={index}
                            item={item}
                            selectAcademy={setFocusMarker}
                        />
                    );
                return null;
            })}
        </GoogleMap>
    );
}

export default withScriptjs(withGoogleMap(AcademyMap));
