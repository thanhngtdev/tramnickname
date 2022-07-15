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
import '../../public/static-file/css/trainingservice.css'
import Script from 'next/script';

Router.events.on('routeChangeStart', (url) => {
    NProgress.start();
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

    function MyApp({ Component, pageProps }) {
        return (
            <Provider store={store}>
                <Head>
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1"
                    />
                    
                </Head>
                <Component {...pageProps} />
            </Provider>
        );
    }
    export default appWithTranslation(MyApp);