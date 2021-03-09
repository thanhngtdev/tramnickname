import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { siteActionType } from '../actions/actionTypes';
import AcademyMap from './include/AcademyMap';

function Location() {
    const [lstSite, setLstSite] = useState([]);
    const siteReducer = useSelector((state) => state.siteReducer);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: siteActionType.GET_LIST_SITE });
    }, []);

    useEffect(() => {
        if (siteReducer.type) {
            if (siteReducer.type === siteActionType.GET_LIST_SITE_SUCCESS) {
                setLstSite(siteReducer.data.lstSite);
            }
        }
    }, [siteReducer]);

    return (
        <div style={{ marginTop: '115px' }}>
            <div className="map-frame">
                <AcademyMap
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyClAeE9K0S0LZQ3DiTg0-j_w8HvVuMYgoc&v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `100%` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                />
            </div>

            <div className="container map-page">
                <h2>Find your academy</h2>
                <div className="academy">
                    <div className="acade-left">
                        <h3>London</h3>
                        {lstSite.map((item) => {
                            if (item.ms_region === 'London')
                                return (
                                    <a
                                        href={
                                            '/franchise/' +
                                            item.ms_alias +
                                            '-' +
                                            item.ms_id
                                        }
                                        key={item.ms_id}>
                                        {item.ms_name}
                                    </a>
                                );
                            return null;
                        })}
                    </div>
                    <div className="acade-right">
                        <div>
                            <h3>North West England</h3>
                            {lstSite.map((item) => {
                                if (item.ms_region === 'North West England')
                                    return (
                                        <a
                                            href={
                                                'franchise/' +
                                                item.ms_alias +
                                                '-' +
                                                item.ms_id
                                            }
                                            key={item.ms_id}>
                                            {item.ms_name}
                                        </a>
                                    );
                                return null;
                            })}
                        </div>
                        <div>
                            <h3>South England</h3>
                            {lstSite.map((item) => {
                                if (item.ms_region === 'South England')
                                    return (
                                        <a
                                            href={
                                                'franchise/' +
                                                item.ms_alias +
                                                '-' +
                                                item.ms_id
                                            }
                                            key={item.ms_id}>
                                            {item.ms_name}
                                        </a>
                                    );
                                return null;
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Location;
