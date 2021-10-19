const withCss = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');
const withImages = require('next-images');
const withFonts = require('next-fonts');
const withOptimizedImages = require('next-optimized-images');
const withPlugins = require('next-compose-plugins');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});

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

module.exports = withPlugins([
    [
        withOptimizedImages,
        {
            optimizeImagesInDev: true,
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
    [withBundleAnalyzer],
]);
