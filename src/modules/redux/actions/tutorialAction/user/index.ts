import { IAction, IActionCallBacks, IActionParams } from "src/data/interfaces/common";
import { IPostInfoUser } from "src/data/interfaces/request/user/IPostInfoUser";
import { IPostLoginRequest } from "src/data/interfaces/request/user/IPostLoginRequest";
import { UserModel } from "src/data/models/UserModel";
import { LOGOUT_USER, POST_LOGIN, POST_USER } from "../../actionTypes";
import { createActionNormalTypes } from "../../helper";

/// LOGIN
export const loginEmailTypes = POST_LOGIN;
export const loginEmailActionTypes = createActionNormalTypes(loginEmailTypes);

export const postLoginRequest = (
    payload: IPostLoginRequest,
    callBacks?: IActionCallBacks
): IAction<IPostLoginRequest> => ({
    type: loginEmailActionTypes.start,
    payload: payload,
    callBacks,
})

export const postLoginSuccess = (
    payload: UserModel,
    params: IActionParams<IPostLoginRequest>,
    callBacks?: IActionCallBacks
): IAction<UserModel> => ({
    type: loginEmailActionTypes.success,
    payload,
    params,
    callBacks,
})

export const postLoginFailed = (
    payload: any,
    callBacks?: IActionCallBacks
): IAction<any> => ({
    type: loginEmailActionTypes.failed,
    payload,
    callBacks,
})

/// LOGOUT
export const logOutTypes = LOGOUT_USER;
export const logOutActionTypes = createActionNormalTypes(logOutTypes);

export const logoutUser = (): IAction<any> => ({
    type: logOutActionTypes.start
})

export const logoutUserSuccess = (payload?: any): IAction<any> => ({
    type: logOutActionTypes.success,
    payload
})

export const logoutUserFailed = (payload: any): IAction<any> => ({
    type: logOutActionTypes.failed,
    payload
})

// posst usser


export const postInfoUserTypes = POST_USER;
export const postInfoUserActionTypes = createActionNormalTypes(postInfoUserTypes);

export const postInfoUserRequest = (
    payload: IPostInfoUser,
    callBacks?: IActionCallBacks
): IAction<IPostInfoUser> => ({
    type: postInfoUserActionTypes.start,
    payload: payload,
    callBacks,
})

export const postInfoUserSuccess = (
    payload: UserModel,
    params: IActionParams<IPostInfoUser>,
    callBacks?: IActionCallBacks
): IAction<any> => ({
    type: postInfoUserActionTypes.success,
    payload,
    params,
    callBacks,
})

export const postInfoUserFailed = (
    payload: any,
    callBacks?: IActionCallBacks
): IAction<any> => ({
    type: postInfoUserActionTypes.failed,
    payload,
    callBacks,
})