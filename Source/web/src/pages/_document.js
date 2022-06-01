import Document, { Head, Html, Main, NextScript } from 'next/document';
import Script from 'next/script';
import React from 'react';

export default class MyDocument extends Document {
    render() {
        // const HOTJAR_ID = process.env.HOTJAR_ID;
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

                   
                </Head>
                <body>
                    {/* <noscript
                        dangerouslySetInnerHTML={{
                            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PMMW2QG"
            height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
                        }}></noscript> */}
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
