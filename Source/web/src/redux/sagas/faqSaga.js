import { put, takeLatest } from 'redux-saga/effects';
import API from 'src/requests/API';
import { APIConfig } from 'src/requests/ApiConfig';
import type from '../actions/actionTypes';
import service from 'src/services/httpMethod';

function* searchFAQ({ param }) {
    try {
        const response = yield service.searchArticle({ param });
        // console.log(response);
        if (response && response.status === 200) {
            yield put({
                type: type.SEARCH_FAQ_SUCCESS,
                data: response.data,
            });
        } else {
            yield put({
                type: type.SEARCH_FAQ_FAILED,
                message: response ? response.message : '',
            });
        }
    } catch (error) {
        yield put({
            type: type.SEARCH_FAQ_SUCCESS,
            message: error,
        });
    }
}

function* getListFAQ({ cate }) {
    let response = yield API.requestGetAPI(APIConfig.GET_LIST_FAQ, {
        cate,
    });

    if (response && response.status === 200) {
        yield put({
            type: type.GET_LIST_FAQ_SUCCESS,
            data: response.data,
        });
    } else {
        // show message
        yield put({
            type: type.GET_LIST_FAQ_FAILED,
            message: response ? response.message : '',
        });
    }
}

export default function* watcherFAQSaga() {
    yield takeLatest(type.SEARCH_FAQ, searchFAQ);
    yield takeLatest(type.GET_LIST_FAQ, getListFAQ);
}
