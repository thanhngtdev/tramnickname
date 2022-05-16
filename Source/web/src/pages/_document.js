import Document, { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';

export default class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <meta charSet="utf-8" />

                    <link rel="icon" href="/static-file/images/favicon.ico" />
                    <link
                        rel="stylesheet"
                        href="/static-file/css/font.css"
                        as="style"
                    />

                    {/* <script
                        type="text/javascript"
                        src="//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js"
                        async></script> */}
                        {/* <!-- Google Tag Manager --> */}

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
                        {/* <!-- End Google Tag Manager --> */}
                </Head>
                <body>
                    <Main />
                    <NextScript />
                    {/* <!-- Google Tag Manager (noscript) --> */}
                    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PMMW2QG"
                    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
                    {/* <!-- End Google Tag Manager (noscript) --> */}
                </body>
            </Html>
        );
    }
}
