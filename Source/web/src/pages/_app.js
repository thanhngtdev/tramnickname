import React from 'react';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import Router from 'next/router';
import Head from 'next/head';
import i18n from 'i18n';
// import store from 'redux/store';
import NProgress from 'nprogress';

import store from 'src/redux/store';

import '../../public/static/css/style.css';
import '../../public/static/css/about.css';
import '../../public/static/css/holiday-camp.css';
import '../../public/static/css/contact.css';
import '../../public/static/css/custom.css';
import '../../public/static/css/article.css';
import '../../public/static/css/hover.css';
import '../../public/static/css/button.css';
import '../../public/static/css/slick-theme.css';
import '../../public/static/css/spinner.css';
import '../../public/static/css/qna.css';
import '../../public/static/css/franchise.css';
import '../../public/static/css/book-trial.css';
import '../../public/static/css/autocomplete-input.css';
import '../../public/static/css/join-us.css';
import '../../public/static/css/policies.css';
import '../../public/static/css/homepage.css';
import '../../public/static/css/weekly-training.css';
import '../../public/static/css/holidaypage.css';
import '../../public/static/css/onetraining.css';
import '../../public/static/css/birthday.css';
import '../../public/static/css/aboutus.css';
import '../../public/static/css/contact.css';
import 'react-phone-number-input/style.css';
import 'slick-carousel/slick/slick.css';
import '../../public/static/css/school-training.css';
import 'flatpickr/dist/themes/airbnb.css';
import '../../public/static/css/modal.css';

Router.events.on('routeChangeStart', (url) => {
    console.log(`Loading: ${url}`);
    NProgress.start();
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export default function MyApp({ Component, pageProps }) {
    return (
        <I18nextProvider i18n={i18n}>
            <Provider store={store}>
                <Head>
                    <title key="title">
                        Professional Football Coaching-Ages 4-12 | We Make
                        Footballers
                    </title>
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1"
                    />
                    <link rel="stylesheet" href="/static/css/font.css" />
                    <link rel="stylesheet" href="/static/css/spinner.css" />
                </Head>
                <Component {...pageProps} />
            </Provider>
        </I18nextProvider>
    );
}