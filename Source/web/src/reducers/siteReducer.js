import { siteActionType } from '../actions/actionTypes';

const initialState = {
    message: '',
};

const siteReducer = (state = initialState, action) => {
    switch (action.type) {
        case siteActionType.GET_LIST_SITE_SUCCESS:
            return {
                type: siteActionType.GET_LIST_SITE_SUCCESS,
                data: action.data,
            };
        case siteActionType.GET_LIST_SITE_FAILED:
            return {
                type: siteActionType.GET_LIST_SITE_FAILED,
                message: action.message,
            };
        case siteActionType.GET_SITE_HAS_CAMP_SUCCESS:
            return {
                type: siteActionType.GET_SITE_HAS_CAMP_SUCCESS,
                data: action.data,
            };
        case siteActionType.GET_SITE_HAS_CAMP_FAILED:
            return {
                type: siteActionType.GET_SITE_HAS_CAMP_FAILED,
                message: action.message,
            };
        case siteActionType.GET_DETAIL_SITE_SUCCESS:
            return {
                type: siteActionType.GET_DETAIL_SITE_SUCCESS,
                data: action.data,
            };
        case siteActionType.GET_DETAIL_SITE_FAILED:
            return {
                type: siteActionType.GET_DETAIL_SITE_FAILED,
                message: action.message,
            };
        case siteActionType.BOOK_TRAINING_SUCCESS:
            return {
                type: siteActionType.BOOK_TRAINING_SUCCESS,
                data: action.data,
            };
        case siteActionType.BOOK_TRAINING_FAILED:
            return {
                type: siteActionType.BOOK_TRAINING_FAILED,
                message: action.message,
            };
        case siteActionType.SELECT_ACADEMY:
                return {
                    type: siteActionType.SELECT_ACADEMY,
                    data: action.data,
            };
        case siteActionType.SEARCH_NEARBY_SUCCESS:
            return {
                type: siteActionType.SEARCH_NEARBY_SUCCESS,
                data: action.data,
            };
        case siteActionType.SEARCH_NEARBY_FAILED:
            return {
                type: siteActionType.SEARCH_NEARBY_FAILED,
                message: action.message,
            };
        case siteActionType.FIND_NEARBY_SUCESS:
            return {
                type: siteActionType.FIND_NEARBY_SUCESS,
                data: action.data,
            };
        case siteActionType.FIND_NEARBY_FAILED:
            return {
                type: siteActionType.FIND_NEARBY_FAILED,
                message: action.message,
            };
        case siteActionType.FIND_NEARBY_ACADEMY_SUCCESS:
            return {
                type: siteActionType.FIND_NEARBY_ACADEMY_SUCCESS,
                data: action.data,
            };
        case siteActionType.FIND_NEARBY_ACADEMY_FAILED:
            return {
                type: siteActionType.FIND_NEARBY_ACADEMY_FAILED,
                message: action.message,
            };
        case siteActionType.GET_LIST_COURSE_SUCCESS:
            return {
                type: siteActionType.GET_LIST_COURSE_SUCCESS,
                data: action.data,
                courseType: action.courseType,
            };
        case siteActionType.GET_LIST_COURSE_FAILED:
            return {
                type: siteActionType.GET_LIST_COURSE_FAILED,
                message: action.message,
            };
        case siteActionType.COURSE_START_DATE_SUCCESS:
            return {
                type: siteActionType.COURSE_START_DATE_SUCCESS,
                data: action.data,
            };
        case siteActionType.COURSE_START_DATE_FAILED:
            return {
                type: siteActionType.COURSE_START_DATE_FAILED,
                message: action.message,
            };
        case siteActionType.BOOK_COURSE_SUCCESS:
            return {
                type: siteActionType.BOOK_COURSE_SUCCESS,
                data: action.data,
            };
        case siteActionType.BOOK_COURSE_FAILED:
            return {
                type: siteActionType.BOOK_COURSE_FAILED,
                message: action.message,
            };
        case siteActionType.BOOK_COURSE_SIGNUP_SUCCESS:
            return {
                type: siteActionType.BOOK_COURSE_SIGNUP_SUCCESS,
                data: action.data,
            };
        case siteActionType.BOOK_COURSE_SIGNUP_FAILED:
            return {
                type: siteActionType.BOOK_COURSE_SIGNUP_FAILED,
                message: action.message,
            };
        case siteActionType.BOOK_EVENT_SIGNUP_SUCCESS:
            return {
                type: siteActionType.BOOK_EVENT_SIGNUP_SUCCESS,
                data: action.data,
            };
        case siteActionType.BOOK_EVENT_SIGNUP_FAILED:
            return {
                type: siteActionType.BOOK_EVENT_SIGNUP_FAILED,
                message: action.message,
            };
        case siteActionType.ADD_WAITING_SUCCESS:
            return {
                type: siteActionType.ADD_WAITING_SUCCESS,
                data: action.data,
            };
        case siteActionType.ADD_WAITING_FAILED:
            return {
                type: siteActionType.ADD_WAITING_FAILED,
                message: action.message,
            };
        case siteActionType.GET_BOOKING_SUCCESS:
            return {
                type: siteActionType.GET_BOOKING_SUCCESS,
                data: action.data,
            };
        case siteActionType.GET_BOOKING_FAILED:
            return {
                type: siteActionType.GET_BOOKING_FAILED,
                message: action.message,
            };
        case siteActionType.EVENT_DATE_SUCCESS:
            return {
                type: siteActionType.EVENT_DATE_SUCCESS,
                data: action.data,
            };
        case siteActionType.EVENT_DATE_FAILED:
            return {
                type: siteActionType.EVENT_DATE_FAILED,
                message: action.message,
            };
        case siteActionType.SEND_EMAIL_SUCCESS:
            return {
                type: siteActionType.SEND_EMAIL_SUCCESS,
                data: action.data,
            };
        case siteActionType.SEND_EMAIL_FAILED:
            return {
                type: siteActionType.SEND_EMAIL_FAILED,
                message: action.message,
            };
        case siteActionType.GET_FOOTER_CONFIG_SUCCESS:
            return {
                type: siteActionType.GET_FOOTER_CONFIG_SUCCESS,
                data: action.data,
            };
        case siteActionType.GET_FOOTER_CONFIG_FAILED:
            return {
                type: siteActionType.GET_FOOTER_CONFIG_FAILED,
                message: action.message,
            };
        case siteActionType.GET_POLICY_SUCCESS:
            return {
                type: siteActionType.GET_POLICY_SUCCESS,
                data: action.data,
            };
        case siteActionType.GET_POLICY_FAILED:
            return {
                type: siteActionType.GET_POLICY_FAILED,
                message: action.message,
            };
        case siteActionType.REFRESH_DEFAULT_DATA_SUCCESS:
            return {
                type: siteActionType.REFRESH_DEFAULT_DATA_SUCCESS,
                data: action.data,
            };
        case siteActionType.REFRESH_DEFAULT_DATA_FAILED:
            return {
                type: siteActionType.REFRESH_DEFAULT_DATA_FAILED,
                message: action.message,
            };

        case siteActionType.PICK_DEFAULT_ACADEMY:
            return { type: siteActionType.PICK_DEFAULT_ACADEMY };
        case siteActionType.SELECTED_MARKER:
            return { type: siteActionType.SELECTED_MARKER, data: action.data };
        case siteActionType.KEY_CODE:
            return { type: siteActionType.KEY_CODE };
        default:
            return state;
    }
};

export default siteReducer;
