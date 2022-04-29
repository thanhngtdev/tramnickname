import { put, takeEvery, takeLatest } from 'redux-saga/effects';
import type from '../actions/actionTypes';
import siteService from 'src/services/siteService';

function* getListArticle({ cate = '', page, alias = '' }) {
    try {
        const response = yield siteService.getListNews({ cate, page, alias });

        if (response && response.status === 200) {
            yield put({
                type: type.GET_LIST_NEWS_SUCCESS,
                data: response.data.data,
            });
        } else {
            // show message
            yield put({
                type: type.GET_LIST_NEWS_FAILED,
                message: response ? response.message : '',
            });
        }
    } catch (error) {
        yield put({
            type: type.GET_LIST_NEWS_FAILED,
            message: error,
        });
    }
}

function* getDetailArticle(data) {
    const { id } = data;
    try {
        const response = yield siteService.getDetailNews({ id });

        if (response && response.status === 200) {
            yield put({
                type: type.DETAIL_ARTICLE_SUCCESS,
                data: response.data.data,
            });
        } else {
            // show message
            yield put({
                type: type.DETAIL_ARTICLE_FAILED,
                message: response ? response.message : '',
            });
        }
    } catch (error) {
        yield put({
            type: type.DETAIL_ARTICLE_FAILED,
            message: error || '',
        });
    }
}

function* getAllListArticle(data) {
    try {
        const response = yield siteService.getAllListNews({ data });

        if (response && response.status === 200) {
            yield put({
                type: type.GET_LIST_ALL_NEW_SUCCESS,
                data: response.data,
            });
        } else {
            // show message
            yield put({
                type: type.GET_LIST_ALL_NEW_FAILED,
                message: response ? response.message : '',
            });
        }
    } catch (error) {
        yield put({
            type: type.GET_LIST_ALL_NEW_FAILED,
            message: error,
        });
    }
}

export default function* watcherArticleSaga() {
    yield takeLatest(type.DETAIL_ARTICLE, getDetailArticle);
    yield takeLatest(type.GET_LIST_NEWS, getListArticle);
    yield takeEvery(type.GET_LIST_ALL_NEW, getAllListArticle);
}
