import React from 'react';
import { Marker } from 'react-google-maps';
import { useDispatch, useSelector } from 'react-redux';
import { siteActionType } from 'src/redux/actions/actionTypes';

const DEFAULT_ICON = 'static-file/images/marker.png';
const SELECTED_ICON = 'static-file/images/marker-selected.png';
function CustomMarker(props) {
    const dispatch = useDispatch();
    const { item } = props;
    const siteReducer = useSelector((state) => state.siteReducer);
    const defaultIcon =
        siteReducer.marker.ms_id === item.ms_id ? SELECTED_ICON : DEFAULT_ICON;

    return (
        <Marker
            // animation={window.google.maps.Animation.DROP}
            onClick={() => {
                // console.log(item, 'selected');
                if (item.ms_id) {
                    props.selectAcademy(item);
                    dispatch({
                        type: siteActionType.SELECTED_MARKER,
                        data: item,
                    });
                }
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
