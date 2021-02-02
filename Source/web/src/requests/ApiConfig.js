const BASE_URL = 'http://admin-wmf.muscien.com/';
// const BASE_URL = 'http://local.wmf.com/';
export const BASE_API = `${BASE_URL}api/`;
// export const PARENT_API = 'https://parentarea.co/api/v2/';
export const PARENT_API = 'http://parentarea.twentyci.asia/api/v2/';

export const STORAGE_URL = `${BASE_URL}storage/`;

export const APIConfig = {
    URL_GET_HOME: 'home',
    GET_ABOUT: 'about-us',
    URL_GET_LIST_SITE: 'site/list-site',
    GET_DETAIL_SITE: 'site/detail-site',
    GET_SITE_HAS_CAMP: 'site/list-site-has-camp',
    URL_BOOK_TRAINING: 'site/book-training',
    URL_SEARCH_NEARBY: 'site/search-nearby',
    URL_FIND_NEARBY: 'site/near-academy',
    GET_LIST_NEWS: 'article/list-article',
    GET_LIST_FAQ: 'article/list-qna',
    DETAIL_ARTICLE: 'article/detail-article',
    FIND_NEARBY_ACADEMY: 'site/find-nearby',
    SEND_EMAIL: 'site/send-email',
    GET_FOOTER_CONFIG: 'static/footer',

    GET_LIST_COURSE: 'list-courses',
    COURSE_START_DATE: 'list-course-start-date',
    BOOK_TRIAL_SIGNUP: 'booking-trial-signup',
    BOOK_COURSE_SIGNUP: 'booking-course-signup',
    BOOK_EVENT_SIGNUP: 'booking-event-signup',
    BOOK_COURSE: 'booking-course',
    ADD_WAITING: 'add-to-waiting-list',
    GET_BOOKING: 'get-booking',
    EVENT_DATE: 'list-event-dates',
};
