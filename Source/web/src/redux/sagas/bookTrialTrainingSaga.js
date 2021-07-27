import { put, takeLatest } from 'redux-saga/effects';
import actionTypes from '../actions/actionTypes';
import API from 'src/requests/API';
import { APIConfig } from 'src/requests/ApiConfig';

function* getCourseStartDate({ course_id }) {
    const response = yield API.getParentAPI(APIConfig.COURSE_START_DATE, {
        course_id,
    });
    // console.log(response);
    if (response && response.status === 200) {
        yield put({
            type: actionTypes.COURSE_START_DATE_SUCCESS,
            data: response.data,
        });
    } else {
        yield put({
            type: actionTypes.COURSE_START_DATE_FAILED,
            message: response ? response.message : '',
        });
    }
}

function* bookCourse({ course_id, start_date, child_id, token }) {
    const response = yield API.postParentAPI(APIConfig.BOOK_COURSE, {
        course_id,
        start_date,
        child_id,
        token,
    });
    // console.log(response);
    if (response && response.status === 200) {
        yield put({
            type: actionTypes.BOOK_COURSE_SUCCESS,
            data: response,
        });
    } else {
        yield put({
            type: actionTypes.BOOK_COURSE_FAILED,
            message: response ? response.message : '',
        });
    }
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
            type: actionTypes.BOOK_COURSE_SIGNUP_SUCCESS,
            data: response,
        });
    } else {
        yield put({
            type: actionTypes.BOOK_COURSE_SIGNUP_FAILED,
            message: response ? response.message : '',
        });
    }
}

export default function* watcherBookTrialTraining() {
    yield takeLatest(actionTypes.BOOK_COURSE_SIGNUP, bookCourseSignup);
    yield takeLatest(actionTypes.BOOK_COURSE, bookCourse);
    yield takeLatest(actionTypes.COURSE_START_DATE, getCourseStartDate);
}
