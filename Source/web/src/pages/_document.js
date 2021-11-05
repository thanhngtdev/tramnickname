import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

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
                        src="https://www.google.com/recaptcha/api.js"
                        async
                        defer></script>

                    <script
                        type="text/javascript"
                        src="//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js"
                        // defer
                        async></script> */}
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
