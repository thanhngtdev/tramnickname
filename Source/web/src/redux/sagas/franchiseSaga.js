import actionTypes from '../actions/actionTypes';
import { put, takeLatest } from 'redux-saga/effects';
import siteService from 'src/services/siteService';

function* getFranchiseDetail(data) {
    const { lstSite, title } = data;
    try {
        // const resOfListSite = yield siteService.getListSite();

        // const lstSite = resOfListSite?.data?.data?.lstSite || [];
        const siteFound = lstSite.find((el) => el.ms_alias === title);
        // console.log(siteFound, 'aa');
        // return;
        if (siteFound) {
            const resDetailSite = yield siteService.getFranchiseDetail({
                id: siteFound.ms_id,
            });
            const dataDetailSite = resDetailSite?.data?.data || {};
            yield put({
                type: actionTypes.GET_FRANCHISE_DETAIL_SUCCESS,
                data: { ...siteFound, ...dataDetailSite },
            });
        } else {
            yield put({
                type: actionTypes.GET_FRANCHISE_DETAIL_FAILED,
                error: true,
            });
        }
    } catch (error) {
        yield put({
            type: actionTypes.GET_FRANCHISE_DETAIL_FAILED,
            error,
        });
    }
}

export default function* watcherFranchiseSaga() {
    yield takeLatest(
        actionTypes.GET_FRANCHISE_DETAIL_REQUEST,
        getFranchiseDetail,
    );
}
