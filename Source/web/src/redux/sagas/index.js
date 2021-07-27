import { all } from "redux-saga/effects";
import watcherHomeSage from "./homeSaga";
import watcherSiteSaga from "./siteSaga";
import watcherDetailSite from "./detailSiteSaga";
import watcherAbout from "./aboutSaga";
import watcherFranchiseSaga from "./franchiseSaga";
import watcherArticleSaga from "./articleSaga";
import watcherFAQSaga from "./faqSaga";
import watcherSendFormSaga from "./sendFormSaga";
import watcherPolicySaga from "./policySaga";
import watcherBookTrialTraining from "./bookTrialTrainingSaga";

export default function* rootSaga() {
  yield all([
    watcherHomeSage(),
    watcherSiteSaga(),
    watcherDetailSite(),
    watcherAbout(),
    watcherFranchiseSaga(),
    watcherArticleSaga(),
    watcherFAQSaga(),
    watcherSendFormSaga(),
    watcherPolicySaga(),
    watcherBookTrialTraining(),
  ]);
}
