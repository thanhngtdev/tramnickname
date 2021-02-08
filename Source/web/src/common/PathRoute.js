let PathRoute = {
    Home: '/',
    Contact: '/contact-us',
    HolidayCamp: '/holiday-camps-home',
    OneTraining: '/1-on-1-training',
    BirthdayParty: '/birthday-parties',
    WeeklyTraining: '/weekly-training',
    Franchise: '/franchise/:alias-:id([0-9]+)',
    AboutUs: '/about-us',
    Location: '/location',
    ListQNA: '/qna',
    DetailQNA: '/qna/:cateAlias',
    HomeNews: '/news',
    ListNews: '/news/:cateAlias',
    DetailNews: '/news/:alias-:id([0-9]+)',
    BookTrialTraining: '/book-trial-training',
    BookTrialCamp: '/book-trial-camp',
    ThankYou: '/thank-you',
    AcademyNews: '/:alias/news',
    Policy: '/policies',
    Sub_policy: [
        '/child-welfare-policy',
        '/anti-bullying-make-footballers',
        '/equality-and-diversity',
        '/privacy-policy',
    ],
};

export default PathRoute;
