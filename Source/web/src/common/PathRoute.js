let PathRoute = {
    Home: '/',
    Contact: '/contact-us',
    HolidayCamp: '/holiday-camps-home',
    OneTraining: '/1-on-1-training',
    BirthdayParty: '/birthday-parties',
    WeeklyTraining: '/weekly-training',
    // Franchise: '/franchise/:alias-:id([0-9]+)',
    Franchise: '/:title',
    AboutUs: '/about-us',
    Location: '/location',
    ListQNA: '/faqs',
    DetailQNA: '/faqs/:cateAlias',
    HomeNews: '/news',
    ListNews: '/news/:cateAlias',
    DetailNews: '/news/:alias-:id([0-9]+)',
    BookTrialTraining: '/book-trial-training',
    BookTrialCamp: '/book-trial-camp',
    ThankYou: '/thank-you',
    AcademyNews: '/:alias/news',
    Policy: '/policies',
    PolicyWithParam: '/policies/:title',
    Sub_policy: [
        '/child-welfare-policy',
        '/anti-bullying-make-footballers',
        '/equality-and-diversity',
        '/privacy-policy',
    ],
    SchoolTraining: '/school-training',
    Error: '/error',
    JoinUs: '/join-us',
    Coaching: '/coaching',
};

export default PathRoute;
