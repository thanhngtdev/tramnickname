import actionTypes from 'redux/actions/actionTypes';
import { put, takeLatest } from 'redux-saga/effects';
import siteService from 'services/siteService';

function* getFranchiseDetail(data) {
    const { title } = data;
    try {
        const resOfListSite = yield siteService.getListSite();

        const lstSite = resOfListSite?.data?.data?.lstSite || [];
        const siteFound = lstSite.find((el) => el.ms_alias === title);

        if (siteFound) {
            const resDetailSite = yield siteService.getFranchiseDetail({
                id: siteFound.ms_id,
            });
            const dataDetailSite = resDetailSite?.data?.data || {};
            yield put({
                type: actionTypes.GET_FRANCHISE_DETAIL_SUCCESS,
                data: { ...siteFound, ...dataDetailSite },
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
