import React, { useState, useEffect } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';
import AutocompleteInput from 'src/components/include/AutocompleteInput';
import { siteActionType } from 'src/redux/actions/actionTypes';
import { useDispatch, useSelector } from 'react-redux';
import Constants from 'src/common/Constants';
import CustomMarker from 'src/components/include/CustomMarker';
import _ from 'lodash';

function AcademyMap() {
    const dispatch = useDispatch();
    const headerReducer = useSelector((state) => state.headerReducer);
    const { lstSite } = useSelector((state) => state.listSiteReducer);
    const [defaultCenter, setDefaultCenter] = useState({
        lat:
            parseFloat(localStorage.getItem('latitude')) ||
            Constants.DEFAULT_LOCATION.lat,
        lng:
            parseFloat(localStorage.getItem('longitude')) ||
            Constants.DEFAULT_LOCATION.lng,
    });

    useEffect(() => {
        if (!_.isEmpty(headerReducer.param)) {
            setDefaultCenter({
                lat: parseFloat(headerReducer.param.ms_latitude),
                lng: parseFloat(headerReducer.param.ms_longitude),
            });
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

    return (
        <GoogleMap defaultZoom={12} center={defaultCenter}>
            <div className="search-text">
                <AutocompleteInput
                    selectAcademy={setFocusMarker}
                    suggestions={lstSite || []}
                />
            </div>
            {lstSite &&
                lstSite.map((item, index) => {
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
