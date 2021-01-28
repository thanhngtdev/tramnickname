import { articleActionType } from '../actions/actionTypes';
import { put, takeEvery } from 'redux-saga/effects';
import API from '../requests/API';
import { APIConfig } from '../requests/ApiConfig';

function* getListArticle({ cate, page, alias }) {
    let response = yield API.requestGetAPI(APIConfig.GET_LIST_NEWS, {
        cate,
        page,
        alias,
    });
    // console.log(response);
    if (response && response.status === 200) {
        yield put({
            type: articleActionType.GET_LIST_NEWS_SUCCESS,
            data: response.data,
        });
    } else {
        // show message
        yield put({
            type: articleActionType.GET_LIST_NEWS_FAILED,
            message: response ? response.message : '',
        });
    }
}

export function* watchGetListArticle() {
    yield takeEvery(articleActionType.GET_LIST_NEWS, getListArticle);
}

function* getListFAQ({ cate }) {
    let response = yield API.requestGetAPI(APIConfig.GET_LIST_FAQ, {
        cate,
    });
    // console.log(response);
    if (response && response.status === 200) {
        yield put({
            type: articleActionType.GET_LIST_FAQ_SUCCESS,
            data: response.data,
        });
    } else {
        // show message
        yield put({
            type: articleActionType.GET_LIST_FAQ_FAILED,
            message: response ? response.message : '',
        });
    }
}

export function* watchGetListFAQ() {
    yield takeEvery(articleActionType.GET_LIST_FAQ, getListFAQ);
}

function* getDetailArticle({ atcId }) {
    let response = yield API.requestGetAPI(APIConfig.DETAIL_ARTICLE, {
        atcId,
    });
    // console.log(response);
    if (response && response.status === 200) {
        yield put({
            type: articleActionType.DETAIL_ARTICLE_SUCCESS,
            data: response.data,
        });
    } else {
        // show message
        yield put({
            type: articleActionType.DETAIL_ARTICLE_FAILED,
            message: response ? response.message : '',
        });
    }
}

export function* watchGetDetailArticle() {
    yield takeEvery(articleActionType.DETAIL_ARTICLE, getDetailArticle);
}
