import LocationModal from 'src/components/include/LocationModal';
import usePermissionLocation from 'src/hooks/usePermissionLocation';
import useTruspilot from 'src/hooks/useTruspilot';
import React, { Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Footer from './Footer';
import Header from './Header';
import TrustPilot from 'src/components/TrustPilot';
import { geolocated } from 'react-geolocated';
import { NextSeo } from 'next-seo';

const DEFAULT_LAT = 51.5285582;
const DEFAULT_LOG = -0.2416794;

const DefaultLayout = (props) => {
    //! State
    const { seo, children } = props;
    const dispatch = useDispatch();
    const locationStatus = usePermissionLocation();
    //! useEffect
    useTruspilot();

    // useEffect(() => {
    //     if (locationStatus == 'granted') {
    //         dispatch({
    //             type: siteActionType.ALLOW_LOCATION,
    //             data: true,
    //         });
    //     }
    //     if (locationStatus == 'denied') {
    //         dispatch({
    //             type: siteActionType.ALLOW_LOCATION,
    //             data: false,
    //         });
    //     }
    // }, [locationStatus]);

    useEffect(() => {
        if (!props.isGeolocationAvailable || !props.isGeolocationEnabled) {
            // console.log('geo location not available');
            localStorage.setItem('latitude', DEFAULT_LAT);
            localStorage.setItem('longitude', DEFAULT_LOG);
        }

        if (props.coords) {
            localStorage.setItem('latitude', props.coords.latitude);
            localStorage.setItem('longitude', props.coords.longitude);
        }
    }, [props]);

    const currentLocation = process.browser ? window.location.origin : null;
    const url = process.env.NEXT_PUBLIC_NEXTJS_SITE_URL
        ? process.env.NEXT_PUBLIC_NEXTJS_SITE_URL
        : currentLocation;

    // console.log(url, 'url');
    //! Function

    //! Render
    return (
        <Fragment>
            <Header />
            <NextSeo
                title={
                    seo?.title ||
                    `Professional Football Coaching-Ages 4-12 | We Make
                    Footballers`
                }
                description={`We Make Footballers is a UK wide football coaching company for kids aged 4 to 12 of all abilties. We offer professional and fun training to help children develop their football skills.`}
                canonical={url}
            />
            {children}
            <Footer />
            <LocationModal />
            <TrustPilot />
        </Fragment>
    );
};

export default geolocated({
    mpositionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})(DefaultLayout);
