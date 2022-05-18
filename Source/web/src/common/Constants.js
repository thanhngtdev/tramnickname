import ColorCode from './ColorCode';

const Constants = {
    StorageKey: {
        KEY_TOKEN: 'SAVED_TOKEN_KEY',
        KEY_USER_INFO: 'USER_INFO',
        KEY_FIRST_USE: 'KEY_FIRST_USE',
    },
    MARGIN_HOZ: 24,
    TABBAR_HEIGHT: 80,
    BORDER_RADIUS: 24,
    FONT_HEAVY: 'FranklinGothicURW-Hea',
    FONT_BOOK: 'FranklinGothicURW-Boo',
    FONT_DEMI: 'FranklinGothicURW-Dem',
    TEXT_COLOR: ColorCode.White,
    SPINNER_COLOR: ColorCode.White,

    DEFAULT_LOCATION: {
        lat: 52.2,
        lng: -1.8,
    },

    STATUS_PERMISSION_LOCATION: {
        PROMPT: 'prompt',
        GRANTED: 'granted',
        DENIED: 'denied',
    },
    REVALIDATE: 86400,
    GOOGLE_MAP_URL:
        'https://maps.googleapis.com/maps/api/js?key=AIzaSyCkHEoNpHbkdGlYwWFA8JaIOF_o-Y9B4d4&v=3.exp&libraries=geometry,drawing,places',

    BaseURL: 'https:/staging.wemakefootballers.com',
    ROUTES: [
        '/about-us',
        '/1-on-1-training',
        '/birthday-parties',
        '/book-trial-camp',
        '/book-trial-training',
        '/join-us/coaching',
        '/contact-us',
        '/faqs',
        '/holiday-camps',
        '/join-us',
        '/location',
        '/news',
        '/join-us/parent-host',
        '/policies',
        '/school-training',
        '/weekly-football-training',
    ],
    MICRO_ROUTES: [
        '/1-on-1-training',
        '/birthday-parties',
        '/holiday-camps',
        '/join-us',
        '/news',
        '/weekly-football-training',
    ],
};

export default Constants;
