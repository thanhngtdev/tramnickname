import { put, takeEvery } from 'redux-saga/effects';
import { siteActionType } from '../actions/actionTypes';
import API from '../requests/API';
import { APIConfig } from '../requests/ApiConfig';

function* getListSite() {
    const response = yield API.requestGetAPI(APIConfig.URL_GET_LIST_SITE);
    if (response && response.status === 200) {
        yield put({
            type: siteActionType.GET_LIST_SITE_SUCCESS,
            data: response.data,
        });
    } else {
        yield put({
            type: siteActionType.GET_LIST_SITE_FAILED,
            message: response ? response.message : '',
        });
    }
}

export function* watchGetListSite() {
    yield takeEvery(siteActionType.GET_LIST_SITE, getListSite);
}

function* getListSiteHasCamp() {
    const response = yield API.requestGetAPI(APIConfig.GET_SITE_HAS_CAMP);
    if (response && response.status === 200) {
        yield put({
            type: siteActionType.GET_SITE_HAS_CAMP_SUCCESS,
            data: response.data,
        });
    } else {
        yield put({
            type: siteActionType.GET_SITE_HAS_CAMP_FAILED,
            message: response ? response.message : '',
        });
    }
}

export function* watchGetListSiteHasCamp() {
    yield takeEvery(siteActionType.GET_SITE_HAS_CAMP, getListSiteHasCamp);
}

function* getDetailSite({ siteId, cate = '' }) {
    const response = yield API.requestGetAPI(APIConfig.GET_DETAIL_SITE, {
        siteId,
        cate,
    });
    // console.log(response);
    if (response && response.status === 200) {
        yield put({
            type: siteActionType.GET_DETAIL_SITE_SUCCESS,
            data: response.data,
        });
    } else {
        yield put({
            type: siteActionType.GET_DETAIL_SITE_FAILED,
            message: response ? response.message : '',
        });
    }
}

export function* watchGetDetailSite() {
    yield takeEvery(siteActionType.GET_DETAIL_SITE, getDetailSite);
}

function* bookTraining({ param }) {
    const response = yield API.requestPostAPI(
        APIConfig.URL_BOOK_TRAINING,
        param,
    );
    if (response && response.status === 200) {
        yield put({
            type: siteActionType.GET_LIST_SITE_SUCCESS,
            data: response.data,
        });
    } else {
        yield put({
            type: siteActionType.GET_LIST_SITE_FAILED,
            message: response ? response.message : '',
        });
    }
}

export function* watchBookTraining() {
    yield takeEvery(siteActionType.BOOK_TRAINING, bookTraining);
}

function* getFooterConfig() {
    const response = yield API.requestGetAPI(APIConfig.GET_FOOTER_CONFIG);
    if (response && response.status === 200) {
        yield put({
            type: siteActionType.GET_FOOTER_CONFIG_SUCCESS,
            data: response.data,
        });
    } else {
        yield put({
            type: siteActionType.GET_FOOTER_CONFIG_FAILED,
            message: response ? response.message : '',
        });
    }
}

export function* watchGetFooter() {
    yield takeEvery(siteActionType.GET_FOOTER_CONFIG, getFooterConfig);
}

function* getPolicy() {
    const response = yield API.requestGetAPI(APIConfig.GET_POLICY);
    if (response && response.status === 200) {
        yield put({
            type: siteActionType.GET_POLICY_SUCCESS,
            data: response.data,
        });
    } else {
        yield put({
            type: siteActionType.GET_POLICY_FAILED,
            message: response ? response.message : '',
        });
    }
}

export function* watchGetPolicy() {
    yield takeEvery(siteActionType.GET_POLICY, getPolicy);
}

function* searchNearby({ search, lat, long }) {
    let param = {
        search: search,
        lat: lat,
        long: long,
    };
    const response = yield API.requestPostAPI(
        APIConfig.URL_SEARCH_NEARBY,
        param,
    );
    if (response && response.status === 200) {
        yield put({
            type: siteActionType.SEARCH_NEARBY_SUCCESS,
            data: response.data,
        });
    } else {
        yield put({
            type: siteActionType.SEARCH_NEARBY_FAILED,
            message: response ? response.message : '',
        });
    }
}

export function* watchSearchNearby() {
    yield takeEvery(siteActionType.SEARCH_NEARBY, searchNearby);
}

function* findNearby({ lat, long }) {
    let param = {
        latitude: lat,
        longitude: long,
    };
    const response = yield API.requestPostAPI(APIConfig.URL_FIND_NEARBY, param);
    if (response && response.status === 200) {
        yield put({
            type: siteActionType.FIND_NEARBY_SUCESS,
            data: response.data,
        });
    } else {
        yield put({
            type: siteActionType.FIND_NEARBY_FAILED,
            message: response ? response.message : '',
        });
    }
}

export function* watchFindNearby() {
    yield takeEvery(siteActionType.FIND_NEARBY, findNearby);
}

function* findNearbyAcademy({ lat, long }) {
    let param = {
        latitude: lat,
        longitude: long,
    };
    const response = yield API.requestPostAPI(
        APIConfig.FIND_NEARBY_ACADEMY,
        param,
    );
    if (response && response.status === 200) {
        yield put({
            type: siteActionType.FIND_NEARBY_ACADEMY_SUCCESS,
            data: response.data,
        });
    } else {
        yield put({
            type: siteActionType.FIND_NEARBY_ACADEMY_FAILED,
            message: response ? response.message : '',
        });
    }
}

export function* watchFindNearbyAcademy() {
    yield takeEvery(siteActionType.FIND_NEARBY_ACADEMY, findNearbyAcademy);
}

function* getListCourse({ company_id, location_id, course_type }) {
    const response = yield API.getParentAPI(APIConfig.GET_LIST_COURSE, {
        company_id,
        location_id,
        type: course_type,
    });
    // console.log(response);
    if (response && response.status === 200) {
        yield put({
            type: siteActionType.GET_LIST_COURSE_SUCCESS,
            data: response.data,
            courseType: course_type,
        });
    } else {
        yield put({
            type: siteActionType.GET_LIST_COURSE_FAILED,
            message: response ? response.message : '',
        });
    }
}

export function* watchGetListCourse() {
    yield takeEvery(siteActionType.GET_LIST_COURSE, getListCourse);
}

function* getCourseStartDate({ course_id }) {
    const response = yield API.getParentAPI(APIConfig.COURSE_START_DATE, {
        course_id,
    });
    // console.log(response);
    if (response && response.status === 200) {
        yield put({
            type: siteActionType.COURSE_START_DATE_SUCCESS,
            data: response.data,
        });
    } else {
        yield put({
            type: siteActionType.COURSE_START_DATE_FAILED,
            message: response ? response.message : '',
        });
    }
}

export function* watchGetStartDate() {
    yield takeEvery(siteActionType.COURSE_START_DATE, getCourseStartDate);
}

function* bookCourse({ course_id, start_date, child_id }) {
    const response = yield API.postParentAPI(APIConfig.BOOK_COURSE, {
        course_id,
        start_date,
        child_id,
    });
    // console.log(response);
    if (response && response.status === 200) {
        yield put({
            type: siteActionType.BOOK_COURSE_SUCCESS,
            data: response,
        });
    } else {
        yield put({
            type: siteActionType.BOOK_COURSE_FAILED,
            message: response ? response.message : '',
        });
    }
}

export function* watchBookCourse() {
    yield takeEvery(siteActionType.BOOK_COURSE, bookCourse);
}

function* bookCourseSignup({ totalData }) {
    let apiUrl =
        totalData.siteSelected.ms_trial === 1
            ? APIConfig.BOOK_COURSE_SIGNUP
            : APIConfig.BOOK_TRIAL_SIGNUP;
    const response = yield API.postParentAPI(apiUrl, totalData);
    // const response = {
    //     access_token: 'niAlTPReWBrpFe2rl9PUO35i4UtEjA7YsNPs90UO',
    //     booking_id: 43727,
    //     child_id: 34876,
    //     expires_in: 604800,
    //     message: 'Success',
    //     status: 200,
    //     token_type: 'Bearer',
    // };

    // console.log(response);
    if (response) {
        yield put({
            type: siteActionType.BOOK_COURSE_SIGNUP_SUCCESS,
            data: response,
        });
    } else {
        yield put({
            type: siteActionType.BOOK_COURSE_SIGNUP_FAILED,
            message: response ? response.message : '',
        });
    }
}

export function* watchBookCourseSignup() {
    yield takeEvery(siteActionType.BOOK_COURSE_SIGNUP, bookCourseSignup);
}

function* bookEventSignup({ totalData }) {
    const response = yield API.postParentAPI(
        APIConfig.BOOK_EVENT_SIGNUP,
        totalData,
    );
    // const response = {
    //     status: 200,
    //     message: 'Success',
    //     data: {
    //         access_token: 'mt6a9223vLsi7HxN0yCyBxUwEIUtsmt5AR0hODPJ',
    //         booking_id: 41361,
    //         child_id: 31823,
    //         expires_in: 604800,
    //         payment_url:
    //             'https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token=EC-450673325Y308233J',
    //         token_type: 'Bearer',
    //         total_price: 138,
    //     },
    // };
    console.log(response);
    if (response) {
        yield put({
            type: siteActionType.BOOK_EVENT_SIGNUP_SUCCESS,
            data: response,
        });
    } else {
        yield put({
            type: siteActionType.BOOK_EVENT_SIGNUP_FAILED,
            message: response ? response.message : '',
        });
    }
}

export function* watchBookEventSignup() {
    yield takeEvery(siteActionType.BOOK_EVENT_SIGNUP, bookEventSignup);
}

function* addWaiting({ course_id, child_id, message }) {
    const response = yield API.getParentAPI(APIConfig.ADD_WAITING, {
        course_id,
        child_id,
        message,
    });
    // console.log(response);
    if (response && response.status === 200) {
        yield put({
            type: siteActionType.ADD_WAITING_SUCCESS,
            data: response,
        });
    } else {
        yield put({
            type: siteActionType.ADD_WAITING_FAILED,
            message: response ? response.message : '',
        });
    }
}

export function* watchAddWaiting() {
    yield takeEvery(siteActionType.ADD_WAITING, addWaiting);
}

function* getBooking({ booking_id, token }) {
    // console.log(booking_id, token);
    const response = yield API.getParentAPI(APIConfig.GET_BOOKING, {
        booking_id,
        token,
    });
    // console.log(booking_id, token, response);
    if (response && response.status === 200) {
        yield put({
            type: siteActionType.GET_BOOKING_SUCCESS,
            data: response,
        });
    } else {
        yield put({
            type: siteActionType.GET_BOOKING_SUCCESS,
            message: response ? response.message : '',
        });
    }
}

export function* watchGetBooking() {
    yield takeEvery(siteActionType.GET_BOOKING, getBooking);
}

function* eventDate({ course_id }) {
    const response = yield API.getParentAPI(APIConfig.EVENT_DATE, {
        course_id,
    });
    // console.log(response);
    if (response && response.status === 200) {
        yield put({
            type: siteActionType.EVENT_DATE_SUCCESS,
            data: response.data,
        });
    } else {
        yield put({
            type: siteActionType.EVENT_DATE_FAILED,
            message: response ? response.message : '',
        });
    }
}

export function* watchEventDate() {
    yield takeEvery(siteActionType.EVENT_DATE, eventDate);
}

function* sendEmail({ params }) {
    // console.log(params);
    const response = yield API.requestPostAPI(APIConfig.SEND_EMAIL, params);
    // console.log(response);
    if (response && response.status === 200) {
        yield put({
            type: siteActionType.SEND_EMAIL_SUCCESS,
            data: response.data,
        });
    } else {
        yield put({
            type: siteActionType.SEND_EMAIL_FAILED,
            message: response ? response.message : '',
        });
    }
}

export function* watchSendEmail() {
    yield takeEvery(siteActionType.SEND_EMAIL, sendEmail);
}

function* refreshAcademyData({ siteId, cate = '' }) {
    // console.log(params);
    const response = yield API.requestGetAPI(APIConfig.GET_DETAIL_SITE, {
        siteId,
        cate,
    });
    // console.log(response);
    if (response && response.status === 200) {
        yield put({
            type: siteActionType.REFRESH_DEFAULT_DATA_SUCCESS,
            data: response.data,
        });
    } else {
        yield put({
            type: siteActionType.REFRESH_DEFAULT_DATA_FAILED,
            message: response ? response.message : '',
        });
    }
}

export function* refreshDefaultData() {
    yield takeEvery(siteActionType.REFRESH_DEFAULT_DATA, refreshAcademyData);
}
