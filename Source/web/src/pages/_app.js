import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import Router from 'next/router';
import Head from 'next/head';
import NProgress from 'nprogress';
import '../../public/static-file/scss/nprogress.scss';
import store from 'src/redux/store';
import { appWithTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import * as fbq from '../lib/fpixel';

import '../../public/static-file/css/style.css';
import '../../public/static-file/css/about.css';
import '../../public/static-file/css/holiday-camp.css';
import '../../public/static-file/css/contact.css';
import '../../public/static-file/css/custom.css';
import '../../public/static-file/css/article.css';
import '../../public/static-file/css/hover.css';
import '../../public/static-file/css/button.css';
import '../../public/static-file/css/slick-theme.css';
import '../../public/static-file/css/spinner.css';
import '../../public/static-file/css/qna.css';
import '../../public/static-file/css/franchise.css';
import '../../public/static-file/css/book-trial.css';
import '../../public/static-file/css/autocomplete-input.css';
import '../../public/static-file/css/join-us.css';
import '../../public/static-file/css/policies.css';
import '../../public/static-file/css/homepage.css';
import '../../public/static-file/css/weekly-training.css';
import '../../public/static-file/css/holidaypage.css';
import '../../public/static-file/css/onetraining.css';
import '../../public/static-file/css/birthday.css';
import '../../public/static-file/css/aboutus.css';
import '../../public/static-file/css/contact.css';
import 'react-phone-number-input/style.css';
import 'slick-carousel/slick/slick.css';
import '../../public/static-file/css/school-training.css';
import 'flatpickr/dist/themes/airbnb.css';
import '../../public/static-file/css/modal.css';
import Script from 'next/script';

Router.events.on('routeChangeStart', (url) => {
    NProgress.start();
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }) {
    const router = useRouter();

    // useEffect(() => {
    //     const fb_id = process.env.FB_ID;

    //     import('react-facebook-pixel')
    //         .then((x) => x.default)
    //         .then((ReactPixel) => {
    //             ReactPixel.init(fb_id); // facebookPixelId
    //             ReactPixel.pageView();

    //             router.events.on('routeChangeComplete', () => {
    //                 ReactPixel.pageView();
    //             });
    //         });
    // }, [router.events]);

    useEffect(() => {
        // This pageview only triggers the first time (it's important for Pixel to have real information)
        fbq.pageview();
        const handleRouteChange = () => {
            fbq.pageview();
        };

        router.events.on('routeChangeComplete', handleRouteChange);
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, [router.events]);

    return (
        <Provider store={store}>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
            </Head>
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

            <Component {...pageProps} />
        </Provider>
    );
}

export default appWithTranslation(MyApp);
