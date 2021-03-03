import { all } from 'redux-saga/effects';
import { watchGetHome, watchGetAbout } from './homeSaga';
import {
    watchGetListSite,
    watchBookTraining,
    watchSearchNearby,
    watchFindNearby,
    watchGetListCourse,
    watchGetDetailSite,
    watchGetStartDate,
    watchBookCourseSignup,
    watchAddWaiting,
    watchFindNearbyAcademy,
    watchGetBooking,
    watchEventDate,
    watchBookEventSignup,
    watchSendEmail,
    watchBookCourse,
    watchGetFooter,
    watchGetListSiteHasCamp,
    refreshDefaultData,
    watchGetPolicy,
    watchGetCurrentAcademy,
} from './siteSaga';
import {
    watchGetListArticle,
    watchGetDetailArticle,
    watchGetListFAQ,
} from './articleSaga';

export default function* rootSaga() {
    yield all([
        watchGetHome(),
        watchGetListSite(),
        watchBookTraining(),
        watchSearchNearby(),
        watchFindNearby(),
        watchGetListArticle(),
        watchGetDetailArticle(),
        watchGetListFAQ(),
        watchGetListCourse(),
        watchGetDetailSite(),
        watchGetStartDate(),
        watchBookCourseSignup(),
        watchGetAbout(),
        watchAddWaiting(),
        watchFindNearbyAcademy(),
        watchGetBooking(),
        watchEventDate(),
        watchBookEventSignup(),
        watchSendEmail(),
        watchBookCourse(),
        watchGetFooter(),
        watchGetListSiteHasCamp(),
        refreshDefaultData(),
        watchGetPolicy(),
        watchGetCurrentAcademy(),
    ]);
}
