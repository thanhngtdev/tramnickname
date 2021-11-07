import { NextSeo } from 'next-seo';
import dynamic from 'next/dynamic';
import Script from 'next/script';
import React, { useEffect } from 'react';
import { geolocated } from 'react-geolocated';
import { useDispatch } from 'react-redux';
import usePermissionLocation from 'src/hooks/usePermissionLocation';
import useTruspilot from 'src/hooks/useTruspilot';

const Footer = dynamic(() => import('./Footer'), { ssr: true });
const Header = dynamic(() => import('./Header'), { ssr: true });

const LocationModal = dynamic(
    () => import('src/components/include/LocationModal'),
    { ssr: true },
);

const DEFAULT_LAT = 51.5285582;
const DEFAULT_LOG = -0.2416794;

const DefaultLayout = (props) => {
    //! State
    const { seo, children } = props;
    const dispatch = useDispatch();
    const locationStatus = usePermissionLocation();
    //! useEffect
    // useTruspilot();

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

    //! Function
    // console.log(seo, 'seo');
    //! Render
    return (
        <>
            <Header />
            <NextSeo
                title={
                    seo?.title ||
                    `Professional Football Coaching-Ages 4-12 | We Make
                    Footballers`
                }
                description={
                    seo?.content ||
                    `We Make Footballers is a UK wide football coaching company for kids aged 4 to 12 of all abilties. We offer professional and fun training to help children develop their football skills.`
                }
                canonical={seo?.canonical || url || ''}
                noindex={seo?.noindex === 1}
            />
            {children}
            <Footer />
            <LocationModal />
            {/* <TrustPilot /> */}
        </>
    );
};

export default geolocated({
    mpositionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: null,
})(DefaultLayout);
