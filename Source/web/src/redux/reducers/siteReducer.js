import type, { siteActionType } from '../actions/actionTypes';

const initialState = {
    message: '',
    lstSiteCamp: [],
    marker: {},
    footerConfig: [],
    emailData: {},
    // dataCourse: [],
    // dataEvent: [],
};

const siteReducer = (state = initialState, action) => {
    switch (action.type) {
        case siteActionType.ALLOW_LOCATION:
            return {
                ...state,
                type: siteActionType.ALLOW_LOCATION,
                data: action.data,
            };
        case siteActionType.GET_SITE_HAS_CAMP_SUCCESS:
            return {
                ...state,
                type: siteActionType.GET_SITE_HAS_CAMP_SUCCESS,
                data: action.data,
                lstSiteCamp: action.data.lstSite,
            };
        case siteActionType.GET_SITE_HAS_CAMP_FAILED:
            return {
                ...state,
                type: siteActionType.GET_SITE_HAS_CAMP_FAILED,
                message: action.message,
            };
        case siteActionType.BOOK_TRAINING_SUCCESS:
            return {
                ...state,
                type: siteActionType.BOOK_TRAINING_SUCCESS,
                data: action.data,
            };
        case siteActionType.BOOK_TRAINING_FAILED:
            return {
                ...state,
                type: siteActionType.BOOK_TRAINING_FAILED,
                message: action.message,
            };
        case siteActionType.SELECT_ACADEMY:
            return {
                ...state,
                type: siteActionType.SELECT_ACADEMY,
                data: action.data,
            };
        case siteActionType.SEARCH_NEARBY_SUCCESS:
            return {
                ...state,
                type: siteActionType.SEARCH_NEARBY_SUCCESS,
                data: action.data,
            };
        case siteActionType.SEARCH_NEARBY_FAILED:
            return {
                ...state,
                type: siteActionType.SEARCH_NEARBY_FAILED,
                message: action.message,
            };
        case siteActionType.GET_CURRENT_ACADEMY_SUCCESS:
            return {
                ...state,
                type: siteActionType.GET_CURRENT_ACADEMY_SUCCESS,
                data: action.data,
                number: action.number,
            };
        case siteActionType.GET_CURRENT_ACADEMY_FAILED:
            return {
                ...state,
                type: siteActionType.GET_CURRENT_ACADEMY_FAILED,
                number: action.number,
            };
        case siteActionType.FIND_NEARBY_SUCESS:
            return {
                ...state,
                type: siteActionType.FIND_NEARBY_SUCESS,
                data: action.data,
            };
        case siteActionType.FIND_NEARBY_FAILED:
            return {
                ...state,
                type: siteActionType.FIND_NEARBY_FAILED,
                message: action.message,
            };
        case siteActionType.FIND_NEARBY_ACADEMY_SUCCESS:
            return {
                ...state,
                type: siteActionType.FIND_NEARBY_ACADEMY_SUCCESS,
                data: action.data,
            };
        case siteActionType.FIND_NEARBY_ACADEMY_FAILED:
            return {
                ...state,
                type: siteActionType.FIND_NEARBY_ACADEMY_FAILED,
                message: action.message,
            };
        case siteActionType.GET_LIST_COURSE_SUCCESS:
            return {
                ...state,
                type: siteActionType.GET_LIST_COURSE_SUCCESS,
                data: action.data,
                dataCourse: action.dataCourse,
                dataEvent: action.dataEvent,
                courseType: action.courseType,
            };
        case siteActionType.GET_LIST_COURSE_FAILED:
            return {
                ...state,
                type: siteActionType.GET_LIST_COURSE_FAILED,
                message: action.message,
            };
        case siteActionType.COURSE_START_DATE_SUCCESS:
            return {
                ...state,
                type: siteActionType.COURSE_START_DATE_SUCCESS,
                data: action.data,
            };
        case siteActionType.COURSE_START_DATE_FAILED:
            return {
                ...state,
                type: siteActionType.COURSE_START_DATE_FAILED,
                message: action.message,
            };
        case siteActionType.BOOK_COURSE_SUCCESS:
            return {
                ...state,
                type: siteActionType.BOOK_COURSE_SUCCESS,
                data: action.data,
            };
        case siteActionType.BOOK_COURSE_FAILED:
            return {
                ...state,
                type: siteActionType.BOOK_COURSE_FAILED,
                message: action.message,
            };
        case siteActionType.BOOK_COURSE_SIGNUP_SUCCESS:
            return {
                ...state,
                type: siteActionType.BOOK_COURSE_SIGNUP_SUCCESS,
                data: action.data,
            };
        case siteActionType.BOOK_COURSE_SIGNUP_FAILED:
            return {
                ...state,
                type: siteActionType.BOOK_COURSE_SIGNUP_FAILED,
                message: action.message,
            };
        case siteActionType.BOOK_EVENT_SIGNUP_SUCCESS:
            return {
                ...state,
                type: siteActionType.BOOK_EVENT_SIGNUP_SUCCESS,
                data: action.data,
            };
        case siteActionType.BOOK_EVENT_SIGNUP_FAILED:
            return {
                ...state,
                type: siteActionType.BOOK_EVENT_SIGNUP_FAILED,
                message: action.message,
            };
        case siteActionType.ADD_WAITING_SUCCESS:
            return {
                ...state,
                type: siteActionType.ADD_WAITING_SUCCESS,
                data: action.data,
            };
        case siteActionType.ADD_WAITING_FAILED:
            return {
                ...state,
                type: siteActionType.ADD_WAITING_FAILED,
                message: action.message,
            };
        case siteActionType.GET_BOOKING_SUCCESS:
            return {
                ...state,
                type: siteActionType.GET_BOOKING_SUCCESS,
                data: action.data,
            };
        case siteActionType.GET_BOOKING_FAILED:
            return {
                ...state,
                type: siteActionType.GET_BOOKING_FAILED,
                message: action.message,
            };
        case siteActionType.EVENT_DATE_SUCCESS:
            return {
                ...state,
                type: siteActionType.EVENT_DATE_SUCCESS,
                data: action.data,
            };
        case siteActionType.EVENT_DATE_FAILED:
            return {
                ...state,
                type: siteActionType.EVENT_DATE_FAILED,
                message: action.message,
            };
        case siteActionType.SEND_EMAIL_SUCCESS:
            return {
                ...state,
                type: siteActionType.SEND_EMAIL_SUCCESS,
                data: action.data,
            };
        case siteActionType.SEND_EMAIL_FAILED:
            return {
                ...state,
                type: siteActionType.SEND_EMAIL_FAILED,
                message: action.message,
            };

        case type.CLEAR_SEND_EMAIL:
            return {
                ...state,
                type: type.CLEAR_SEND_EMAIL,
            };

        case siteActionType.GET_FOOTER_CONFIG:
            return {
                ...state,
                footerConfig: action.data,
            };
        case siteActionType.GET_FOOTER_CONFIG_FAILED:
            return {
                ...state,
                type: siteActionType.GET_FOOTER_CONFIG_FAILED,
                message: action.message,
            };
        case siteActionType.GET_POLICY_INDEX:
            return {
                ...state,
                type: siteActionType.GET_POLICY_INDEX,
                index: action.index,
            };
        case siteActionType.REFRESH_DEFAULT_DATA_SUCCESS:
            return {
                ...state,
                type: siteActionType.REFRESH_DEFAULT_DATA_SUCCESS,
                data: action.data,
            };
        case siteActionType.REFRESH_DEFAULT_DATA_FAILED:
            return {
                ...state,
                type: siteActionType.REFRESH_DEFAULT_DATA_FAILED,
                message: action.message,
            };

        case siteActionType.PICK_DEFAULT_ACADEMY:
            return { ...state, type: siteActionType.PICK_DEFAULT_ACADEMY };

        case siteActionType.SELECTED_MARKER:
            return {
                ...state,
                type: siteActionType.SELECTED_MARKER,
                data: action.data,
                marker: action.data,
            };

        case type.CHECK_MAIL_SUCCESS:
            return {
                ...state,
                type: type.CHECK_MAIL_SUCCESS,
                emailData: action.data,
            };

        case type.CHECK_MAIL_FAILED:
            return {
                ...state,
                message: action.message,
            };

        default:
            return state;
    }
};

export default siteReducer;
