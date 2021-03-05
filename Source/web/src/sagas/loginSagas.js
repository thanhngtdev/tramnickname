import { loginActionType } from '../actions/actionTypes';
import { put, takeEvery } from 'redux-saga/effects';
import API from '../requests/API';
import ModelManager from '../common/ModelManager';

function* loginSubmit({ email, password }) {
    let response = yield API.requestAuthen({ email, password });
    if (response && response.status === 200) {
        localStorage.setItem('login', JSON.stringify(true));
        global.tokenLogin = response.data.token;
        ModelManager.setToken(response.data.token).then(
            ModelManager.setUserInfo(response.data.info).then(
                yield put({
                    type: loginActionType.LOGIN_SUCCESS,
                    data: response.data,
                }),
            ),
        );
    } else {
        // show message
        yield put({
            type: loginActionType.LOGIN_FAILED,
            message: response ? response.message : '',
        });
    }
}

export function* watchLoginSubmit() {
    yield takeEvery(loginActionType.LOGIN_SUBMIT, loginSubmit);
}
