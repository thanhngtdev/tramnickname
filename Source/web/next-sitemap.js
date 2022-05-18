const Constants = dynamic(() => import('src/common/Constants'));

module.exports = {
    siteUrl: Constants.BaseURL,
    generateRobotsTxt: true, // (optional)
    exclude: ['/sitemap.xml'], // <= exclude here
    robotsTxtOptions: {
        policies: [{ userAgent: '*', allow: '' }],
        additionalSitemaps: [
            'https://wemakefootballers.com/sitemap.xml', // <==== Add here
        ],
    },
};
