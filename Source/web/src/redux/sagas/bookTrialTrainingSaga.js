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

function* bookCourse({
    course_id,
    start_date,
    child_id,
    token = '',
    totalData,
}) {
    const url =
        totalData.siteSelected.ms_trial === 1
            ? APIConfig.BOOK_COURSE
            : APIConfig.BOOK_FREE_COURSE;

    const response = yield API.postParentAPI(url, {
        course_id,
        start_date,
        child_id,
        token,
    });

    if (response) {
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
