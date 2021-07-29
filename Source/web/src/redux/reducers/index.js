import { combineReducers } from 'redux';
import homeReducer from './homeReducer';
import listSiteReducer from './listSiteReducer';
import siteReducer from './siteReducer';
import detailSiteReducer from './detailSiteReducer';
import aboutReducer from './aboutReducer';
import headerReducer from './headerReducer';
import franchiseReducer from './franchiseReducer';
import articleReducer from './articleReducer';
import faqReducer from './faqReducer';
import sendFormReducer from './sendFormReducer';
import policyReducer from './policyReducer';
import trustpilotReducer from './trustpilotReducer';

const allReducers = combineReducers({
    homeReducer,
    listSiteReducer,
    siteReducer,
    detailSiteReducer,
    aboutReducer,
    headerReducer,
    franchiseReducer,
    articleReducer,
    faqReducer,
    sendFormReducer,
    policyReducer,
    trustpilotReducer,
});

export default allReducers;
