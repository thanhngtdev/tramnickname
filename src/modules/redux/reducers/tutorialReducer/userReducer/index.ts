import { combineReducers } from "redux";
import loginReducer from './loginReducer';
import postInfoUserReducer from './postInfoUserReducer'

export const userReducer = combineReducers({
    postInfoUserReducer: postInfoUserReducer.reducer,
});