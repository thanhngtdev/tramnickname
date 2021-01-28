import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import homeReducer from './homeReducer';
import articleReducer from './articleReducer';
import siteReducer from './siteReducer';
import headerReducer from './headerReducer';

const allReducers = combineReducers({
    loginReducer,
    homeReducer,
    siteReducer,
    articleReducer,
    headerReducer
});

export default allReducers;