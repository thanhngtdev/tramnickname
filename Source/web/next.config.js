const withCss = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');
const withImages = require('next-images');
const withFonts = require('next-fonts');

// module.exports = {
//     images: {
//         domains: ['staging-admin.wemakefootballers.com'],
//     },
//     eslint: {
//         // Warning: Dangerously allow production builds to successfully complete even if
//         // your project has ESLint errors.
//         ignoreDuringBuilds: true,
//     },
// };

// module.exports = {
//     webpack5: false,
//     images: {
//         domains: ['https://staging-admin.wemakefootballers.com'],
//     },
// };

module.exports = withFonts(
    withCss(
        withSass(
            withImages({
                webpack: function (config) {
                    config.module.rules.push({
                        test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
                        use: {
                            loader: 'file-loader',
                            options: {
                                limit: 100000,
                                name: '[name].[ext]',
                            },
                        },
                    });

                    // console.log(config.module.rules);
                    return config;
                },
                // webpack5: false,
                productionBrowserSourceMaps: true,
            }),
        ),
    ),
);
