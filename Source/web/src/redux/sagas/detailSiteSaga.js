import actionTypes from 'redux/actions/actionTypes';
import siteService from 'services/siteService';
import { put, takeLatest } from 'redux-saga/effects';
import { APIConfig } from 'requests/ApiConfig';
import API from 'requests/API';

function* weeklyTraining(data) {
    const { currentAcademyId, cate } = data;

    try {
        const resOfListSite = yield siteService.getListSite();
        const lstSite = resOfListSite?.data?.data?.lstSite || [];
        const siteId = currentAcademyId || lstSite[0].ms_id;

        if (siteId) {
            const response = yield API.requestGetAPI(
                APIConfig.GET_DETAIL_SITE,
                {
                    siteId,
                    cate,
                },
            );
            // const response = yield siteService.getWeekly({ siteId, cate });
            console.log(response.data, 'daaaaaaaa');
            if (response && response.status === 200) {
                yield put({
                    type: actionTypes.GET_DETAIL_SITE_SUCCESS,
                    data: response.data,
                    lstSite: lstSite,
                });
            } else {
                yield put({
                    type: actionTypes.GET_DETAIL_SITE_FAILED,
                    message: response ? response.message : '',
                });
            }
        }
    } catch (error) {
        yield put({
            type: actionTypes.GET_DETAIL_SITE_FAILED,
            message: error,
        });
    }
}

export default function* watcherDetailSite() {
    yield takeLatest(actionTypes.GET_DETAIL_SITE, weeklyTraining);
}
