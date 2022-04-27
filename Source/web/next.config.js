const withCss = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');
const withImages = require('next-images');
const withFonts = require('next-fonts');
const withOptimizedImages = require('next-optimized-images');
const withPlugins = require('next-compose-plugins');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});
const { i18n } = require('./next-i18next.config');

// module.exports = withFonts(
//     withCss(
//         withSass(
//             withImages({
//                 webpack: function (config) {
//                     config.module.rules.push({
//                         test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
//                         use: {
//                             loader: 'file-loader',
//                             options: {
//                                 limit: 100000,
//                                 name: '[name].[ext]',
//                             },
//                         },
//                     });

//                     return config;
//                 },
//                 // webpack5: false,
//                 productionBrowserSourceMaps: true,
//             }),
//         ),
//     ),
// );

module.exports = {
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        config.optimization.splitChunks.cacheGroups = {};
        config.optimization.minimize = true;
        return config;
    },
};

module.exports = withPlugins([
    [
        withOptimizedImages,
        {
            // optimizeImagesInDev: false,
        },
    ],
    [
        withFonts(
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

                            // if (config.optimization.splitChunks) {
                            //     config.optimization.splitChunks.cacheGroups.shared.enforce = true;
                            // }

                            // config.IgnorePlugin(/^\.\/locale$/, /moment$/);

                            return config;
                        },
                        // // webpack5: false,
                        productionBrowserSourceMaps: true,
                    }),
                ),
            ),
        ),
    ],
    // [withBundleAnalyzer],
    [
        'postcss-flexbugs-fixes',
        [
            'postcss-preset-env',
            {
                autoprefixer: {
                    flexbox: 'no-2009',
                },
                stage: 3,
                features: {
                    'custom-properties': false,
                },
            },
        ],
        [
            '@fullhuman/postcss-purgecss',
            {
                content: [
                    './pages/**/*.{js,jsx,ts,tsx}',
                    './components/**/*.{js,jsx,ts,tsx}',
                ],
                defaultExtractor: (content) =>
                    content.match(/[\w-/:]+(?<!:)/g) || [],
                safelist: ['html', 'body'],
            },
        ],
    ],
    {
        webpack5: false,
    },
    // {
    //     i18n,
    // },
]);
