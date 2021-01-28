<?php
/**
 * Created by PhpStorm.
 * User: quanvu
 * Date: 2019-04-24
 * Time: 09:12
 */

namespace App\Helper;

class _ApiMessage {
    //login message
    const SUCCESS = 'Successful';
    const RESET_TOKEN = 'Refresh token';
    const RESET_LOGIN = 'Need to login again';
    const NON_AUTH = 'Token is required';
    const TOKEN_ERROR = 'Token invalid';
    const CREATE_TOKEN_FAILED = 'Failed to create token';
    const LOGIN_INFO_ERROR = 'Invalid email or password';
    const LOGOUT_FAILED = 'Failed to logout, please try again';
    const WRONG_PASS = 'Mật khẩu không phù hợp, vui lòng kiểm tra lại';
    const LOGIN_FAIL = 'Tài khoản không phù hợp, vui lòng kiểm tra lại';

    //user message
    const VERIFYCODE_NOT_FOUND = 'Verify code not exist';
    const USER_ACTIVATED = 'User activated before';
    const USER_EMAIL_EXIST = 'Email belong to another account';
    const USER_PHONE_EXIST = 'Phone number belong to another account';

    const LACK_INFO = 'Not enough infomation';
    const RESET_CONTENT = 'Erase all content of user';
    const ERROR_INFO = 'Infomation error';
    const ERROR_UNKNOWN = 'Unknown error';

}