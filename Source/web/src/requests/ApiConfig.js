const BASE_URL = process.env.BASE_URL_API;

// const BASE_URL = 'http://local.wmf.com/';
export const BASE_API = process.env.NEXT_PUBLIC_BASE_URL_API;
export const PARENT_API = process.env.NEXT_PUBLIC_PARENT_URL_API;
export const STORAGE_URL = process.env.NEXT_PUBLIC_STORAGE_URL_API;

export const APIConfig = {
    URL_GET_HOME: 'home',
    GET_ABOUT: 'about-us',
    URL_GET_LIST_SITE: 'site/list-site',
    GET_DETAIL_SITE: 'site/detail-site',
    GET_SITE_HAS_CAMP: 'site/list-site-has-camp',
    GET_SITE_HAS_CAMP2: 'list-company-has-camp',
    URL_BOOK_TRAINING: 'site/book-training',
    URL_SEARCH_NEARBY: 'site/search-nearby',
    URL_FIND_NEARBY: 'site/near-academy',
    URL_GET_CURRENT_ACADEMY: 'site/near-academy',
    GET_LIST_NEWS: 'article/list-article',
    GET_LIST_FAQ: 'article/list-qna',
    DETAIL_ARTICLE: 'article/detail-article',
    FIND_NEARBY_ACADEMY: 'site/find-nearby',
    SEND_EMAIL: 'site/send-email',
    SEND_FORM: 'site/enquire-coaching',
    GET_FOOTER_CONFIG: 'static/footer',
    GET_POLICY: 'policy',
    GET_LIST_COMPANY_HAS_CAMP: 'list-company-has-camp',
    GET_LIST_ALL_NEWS: 'article/search-news',

    GET_LIST_COURSE: 'list-courses',
    GET_LIST_COURSE_NEARLY: 'list-courses',
    GET_LIST_COURSE_AVAILABLE: 'get-available-course',
    COURSE_START_DATE: 'list-course-start-date',
    BOOK_TRIAL_SIGNUP: 'booking-trial-signup',
    BOOK_COURSE_SIGNUP: 'booking-course-signup',
    BOOK_EVENT_SIGNUP: 'booking-event-signup',
    BOOK_COURSE: 'booking-course',
    BOOK_FREE_COURSE: 'booking-free-trial',
    ADD_WAITING: 'add-to-waiting-list',
    GET_BOOKING: 'get-booking',
    EVENT_DATE: 'list-event-dates',
    CHECK_MAIL_AVAILABLE: 'email-check',
    TRUST_PILOT: 'configuration',
    URL_SEARCH: 'search',
    GET_STATUS_PAYMENT: 'booking/paypal-confirm/',
    RESEND_EMAIL: 'resend-booking-email/',
    RESEND_EMAIL_ID: (id) => `resend-booking-email/${id}`,
};
