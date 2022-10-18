import { all, put, takeLatest } from "redux-saga/effects";
import { IAction } from "src/data/interfaces/common";
import { IPostInfoUser } from "src/data/interfaces/request/user/IPostInfoUser";
import { IPostLoginRequest } from "src/data/interfaces/request/user/IPostLoginRequest";
import ResponseModel from "src/data/models/common/responseModel";
import { UserModel } from "src/data/models/UserModel";
import { UserRepository } from "src/data/repositories/tutorialScreen/user";
import { loginEmailActionTypes, logOutActionTypes, logoutUserFailed, logoutUserSuccess, postInfoUserActionTypes, postInfoUserFailed, postInfoUserSuccess, postLoginFailed, postLoginSuccess } from "src/modules/redux/actions/tutorialAction/user";

function* postLoginEmail(action: IAction<IPostLoginRequest>) {
    const { payload, callBacks } = action;
    try {
        const response: ResponseModel<UserModel> = yield UserRepository.login(payload!);
        if (response.statusCode === 200 && response.data) {
            yield put(postLoginSuccess(response.data, { request: payload }));
            callBacks && callBacks?.onSuccess && callBacks?.onSuccess();
        } else {
            yield put(postLoginFailed(response.message));
            callBacks && callBacks?.onFailed && callBacks?.onFailed();
        }
    } catch (error) {
        yield put(postLoginFailed(error));
        callBacks && callBacks?.onFailed && callBacks?.onFailed();
    }
}

function* logOut(action: IAction<any>) {
    const { payload, callBacks } = action;
    try {
        const response: ResponseModel<UserModel> = yield UserRepository.logout();
        if (response.statusCode === 200 && response.data) {
            yield put(logoutUserSuccess());
            callBacks && callBacks?.onSuccess && callBacks?.onSuccess();
        }
    } catch (error) {
        yield put(logoutUserFailed(error));
        callBacks && callBacks?.onFailed && callBacks?.onFailed();
    }
}

function* postUserInfo (action: IAction<IPostInfoUser>) {
    const { payload, callBacks } = action;
    try {
        const response: ResponseModel<any> = yield UserRepository.postUserInfoRepo(payload!);
        if (response.statusCode === 200 && response.data) {
            yield put(postInfoUserSuccess(response.data, { request: payload }));
            callBacks && callBacks?.onSuccess && callBacks?.onSuccess(response.data);
        } else {
            yield put(postInfoUserFailed(response.message));
            callBacks && callBacks?.onFailed && callBacks?.onFailed();
        }
    } catch (error) {
        yield put(postInfoUserFailed(error));
        callBacks && callBacks?.onFailed && callBacks?.onFailed();
    }
}

export const userSaga = function* () {
    yield all([
        takeLatest(loginEmailActionTypes.start, postLoginEmail),
        takeLatest(logOutActionTypes.start, logOut),
        takeLatest(postInfoUserActionTypes.start, postUserInfo),
    ]);
}