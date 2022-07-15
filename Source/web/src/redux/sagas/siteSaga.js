import _ from 'lodash';
import { put, takeEvery, takeLatest } from 'redux-saga/effects';
import API from 'src/requests/API';
import { APIConfig } from 'src/requests/ApiConfig';
import type, { siteActionType } from '../actions/actionTypes';

function* getListSite() {
    const response = yield API.requestGetAPI(APIConfig.URL_GET_LIST_SITE);
    if (response && response.status === 200) {
        yield put({
            type: type.GET_LIST_SITE_SUCCESS,
            data: response.data,
        });
    } else {
        yield put({
            type: type.GET_LIST_SITE_FAILED,
            message: response ? response.message : '',
        });
    }
}

function* getListSiteHasCamp() {
    const response = yield API.getParentAPI3(APIConfig.GET_SITE_HAS_CAMP2);

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

function* bookTraining({ param }) {
    const response = yield API.requestPostAPI(
        APIConfig.URL_BOOK_TRAINING,
        param,
    );
    if (response && response.status === 200) {
        yield put({
            type: type.GET_LIST_SITE_SUCCESS,
            data: response.data,
        });
    } else {
        yield put({
            type: type.GET_LIST_SITE_FAILED,
            message: response ? response.message : '',
        });
    }
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

function* searchNearby({ search, lat, lng }) {
    let param = {
        search: search,
        lat: lat,
        long: lng,
    };

    let response = yield API.requestPostAPI(APIConfig.URL_SEARCH_NEARBY, param);

    if (
        response &&
        response.status === 200 &&
        !lat &&
        !lng &&
        !_.isEmpty(response.data.data)
    ) {
        const { ms_alias, ms_latitude, ms_longitude } = response.data.data[0];
        param.search = ms_alias;
        param.lat = Number(ms_latitude);
        param.long = Number(ms_longitude);
        // console.log('function*searchNearby -> param', param);
        response = yield API.requestPostAPI(APIConfig.URL_SEARCH_NEARBY, param);
        // console.log('function*searchNearby -> response', response);
    }

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

function* getCurrentAcademy({ lat, long, number }) {
    let param = {
        latitude: lat,
        longitude: long,
    };
    const response = yield API.requestPostAPI(
        APIConfig.URL_GET_CURRENT_ACADEMY,
        param,
    );
    if (response && response.status === 200) {
        yield put({
            type: siteActionType.GET_CURRENT_ACADEMY_SUCCESS,
            data: response.data,
            number: number,
        });
    } else {
        yield put({
            type: siteActionType.GET_CURRENT_ACADEMY_FAILED,
            message: response ? response.message : '',
        });
    }
}

export function* watchGetCurrentAcademy() {
    yield takeEvery(siteActionType.GET_CURRENT_ACADEMY, getCurrentAcademy);
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

function* getListCourse({ company_id, location_id, course_type }) {
    // console.log(company_id, location_id, 'djhsdkfhs');
    const response = yield API.getParentAPI(APIConfig.GET_LIST_COURSE, {
        company_id,
        location_id,
        type: course_type,
    });
    if (response && response.status === 200) {
        let dataCourse = response.data;
        let dataEvent = [];

        if (course_type === 'event') {
            dataEvent = response.data;
        }

        yield put({
            type: siteActionType.GET_LIST_COURSE_SUCCESS,
            data: response.data,
            dataCourse,
            dataEvent,
            courseType: course_type,
        });
    } else {
        yield put({
            type: siteActionType.GET_LIST_COURSE_FAILED,
            message: response ? response.message : '',
        });
    }
}
function* getListCourseNearlyHasCamp({ company_id, course_type }) {
    const response = yield API.getParentAPI(APIConfig.GET_LIST_COURSE_NEARLY, {
        company_id,
        type: course_type,
    });
    if (response && response.status === 200) {
        let dataCourse = response.data;
        let dataEvent = [];

        if (course_type === 'event') {
            dataEvent = response.data;
        }

        yield put({
            type: siteActionType.GET_LIST_COURSE_NEARLY_SUCCESS,
            data: response.data,
            dataCourse,
            dataEvent,
            courseType: course_type,
        });
    } else {
        yield put({
            type: siteActionType.GET_LIST_COURSE_NEARLY_FAILED,
            message: response ? response.message : '',
        });
    }
}

// function* getListCourse({ company_id, location_id, course_type }) {
//     const response = yield API.getParentAPI(APIConfig.GET_LIST_COURSE, {
//         company_id,
//         location_id,
//         type: course_type,
//     });
//     // console.log(response, 'aaaaaa');
//     if (response && response.status === 200) {
//         let dataCourse = response.data;
//         let dataEvent = [];

//         if (course_type === 'event') {
//             dataEvent = response.data;
//         }

//         yield put({
//             type: siteActionType.GET_LIST_COURSE_SUCCESS,
//             data: response.data,
//             dataCourse,
//             dataEvent,
//             courseType: course_type,
//         });
//     } else {
//         yield put({
//             type: siteActionType.GET_LIST_COURSE_FAILED,
//             message: response ? response.message : '',
//         });
//     }
// }

// function* getListCourseAvailable({ child_id, location_id }) {
//     const response = yield API.getParentAPI(
//         APIConfig.GET_LIST_COURSE_AVAILABLE,
//         {
//             child_id,
//             location_id,
//             type: course_type,
//         },
//     );
//     // console.log(response, 'aaaaaa');
//     if (response && response.status === 200) {
//         let dataCourse = response.data;
//         let dataEvent = [];

//         if (course_type === 'event') {
//             dataEvent = response.data;
//         }

//         yield put({
//             type: siteActionType.g,
//             data: response.data,
//             dataCourse,
//             dataEvent,
//             courseType: course_type,
//         });
//     } else {
//         yield put({
//             type: siteActionType.GET_LIST_COURSE_FAILED,
//             message: response ? response.message : '',
//         });
//     }
// }

function* bookEventSignup({ totalData }) {
    const response = yield API.postParentAPI(
        APIConfig.BOOK_EVENT_SIGNUP,
        totalData,
    );

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

function* checkEmail({ data }) {
    const { email } = data;

    // console.log(email, 'email');

    const response = yield API.postParentAPI(
        APIConfig.CHECK_MAIL_AVAILABLE,
        data,
    );

    if (response) {
        yield put({
            type: type.CHECK_MAIL_SUCCESS,
            data: response,
        });
    } else {
        yield put({
            type: type.CHECK_MAIL_FAILED,
            message: response ? response.message : '',
        });
    }
}

function* addWaiting({ course_id, child_id, message, token }) {
    const response = yield API.postParentAPI(APIConfig.ADD_WAITING, {
        course_id,
        child_id,
        message,
        token,
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

function* refreshAcademyData({ siteId, cate = '' }) {
    // console.log(params);
    const response = yield API.requestGetAPI(APIConfig.GET_DETAIL_SITE, {
        siteId,
        cate,
    });
    // console.log(response);
    if (response && response.status === 200) {
        // console.log(response.data, 'response');
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

export default function* watcherSiteSaga() {
    yield takeLatest(siteActionType.REFRESH_DEFAULT_DATA, refreshAcademyData);
    yield takeLatest(siteActionType.SEND_EMAIL, sendEmail);

    yield takeLatest(siteActionType.EVENT_DATE, eventDate);
    yield takeLatest(siteActionType.GET_BOOKING, getBooking);
    yield takeLatest(siteActionType.ADD_WAITING, addWaiting);
    yield takeLatest(siteActionType.BOOK_EVENT_SIGNUP, bookEventSignup);
    yield takeEvery(siteActionType.GET_LIST_COURSE, getListCourse);
    yield takeEvery(siteActionType.GET_LIST_COURSE, getListCourseNearlyHasCamp);
    yield takeLatest(siteActionType.FIND_NEARBY_ACADEMY, findNearbyAcademy);
    yield takeLatest(siteActionType.FIND_NEARBY, findNearby);
    yield takeLatest(siteActionType.GET_CURRENT_ACADEMY, getCurrentAcademy);
    yield takeLatest(siteActionType.SEARCH_NEARBY, searchNearby);
    // yield takeLatest(siteActionType.GET_POLICY, getPolicy);
    // yield takeLatest(siteActionType.GET_FOOTER_CONFIG, getFooterConfig);
    yield takeLatest(type.GET_LIST_SITE, getListSite);
    yield takeLatest(siteActionType.GET_SITE_HAS_CAMP, getListSiteHasCamp);
    yield takeLatest(siteActionType.BOOK_TRAINING, bookTraining);
    yield takeLatest(type.CHECK_MAIL, checkEmail);
    // yield takeLatest(
    //     siteActionType.GET_LIST_COURSE_AVAILABLE,
    //     getListCourseAvailable,
    // );
}
