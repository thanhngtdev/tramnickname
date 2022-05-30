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

    const currentLocation = process.browser ? window.location.href : null;
    const url = process.env.NEXT_PUBLIC_NEXTJS_SITE_URL
        ? process.env.NEXT_PUBLIC_NEXTJS_SITE_URL
        : currentLocation;

    //! Function

    //! Render
    return (
        <>
            <Header />

            <Script
                id="google-analytics"
                src="https://www.googletagmanager.com/gtag/js?id=GTM-PMMW2QG"
                onLoad={() => {
                    (function (w, d, s, l, i) {
                        w[l] = w[l] || [];
                        w[l].push({
                            'gtm.start': new Date().getTime(),
                            event: 'gtm.js',
                        });
                        var f = d.getElementsByTagName(s)[0],
                            j = d.createElement(s),
                            dl = l != 'dataLayer' ? '&l=' + l : '';
                        j.async = true;
                        j.src =
                            'https://www.googletagmanager.com/gtm.js?id=' +
                            i +
                            dl;
                        f.parentNode.insertBefore(j, f);
                    })(window, document, 'script', 'dataLayer', 'GTM-PMMW2QG');
                }}
            />
            <Script
                id="fb-pixel"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                        !function(f,b,e,v,n,t,s)
                        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                        n.queue=[];t=b.createElement(e);t.async=!0;
                        t.src=v;s=b.getElementsByTagName(e)[0];
                        s.parentNode.insertBefore(t,s)}(window, document,'script',
                        'https://connect.facebook.net/en_US/fbevents.js');
                        fbq('init', '4981326851954035');
                        fbq('track', 'PageView');`,
                }}
            />

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
