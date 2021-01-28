/* eslint-disable import/prefer-default-export */
import { put, takeEvery } from 'redux-saga/effects';
import { loginActionType, homeActionType } from '../actions/actionTypes';
import API from '../requests/API';
import { APIConfig } from '../requests/ApiConfig';

function* getHome() {
    const response = yield API.requestGetAPI(APIConfig.URL_GET_HOME);
    // console.log(response);
    if (response && response.status === 200) {
        yield put({
            type: homeActionType.GET_HOME_SUCCESS,
            data: response.data,
        });
    } else {
        // show message
        yield put({
            type: homeActionType.GET_HOME_FAILED,
            message: response ? response.message : '',
        });
    }
}

export function* watchGetHome() {
    yield takeEvery(homeActionType.GET_HOME, getHome);
}

function* getAbout() {
    const response = yield API.requestGetAPI(APIConfig.GET_ABOUT);
    // console.log(response);
    if (response && response.status === 200) {
        yield put({
            type: homeActionType.GET_ABOUT_SUCCESS,
            data: response.data,
        });
    } else {
        // show message
        yield put({
            type: homeActionType.GET_ABOUT_FAILED,
            message: response ? response.message : '',
        });
    }
}

export function* watchGetAbout() {
    yield takeEvery(homeActionType.GET_ABOUT, getAbout);
}
