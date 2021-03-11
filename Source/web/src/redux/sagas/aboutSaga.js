import actionTypes from 'redux/actions/actionTypes';
import { put, takeLatest } from 'redux-saga/effects';
import siteService from 'services/siteService';
import { APIConfig } from 'requests/ApiConfig';
import API from 'requests/API';

function* getAbout() {
    const response = yield API.requestGetAPI(APIConfig.GET_ABOUT);
    if (response && response.status === 200) {
        yield put({
            type: actionTypes.GET_ABOUT_SUCCESS,
            data: response.data,
        });
    } else {
        // show message
        yield put({
            type: actionTypes.GET_ABOUT_FAILED,
            message: response ? response.message : '',
        });
    }
}

export default function* watcherAbout() {
    yield takeLatest(actionTypes.GET_ABOUT, getAbout);
}
