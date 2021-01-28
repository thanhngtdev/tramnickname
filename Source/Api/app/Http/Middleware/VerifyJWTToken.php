<?php

namespace App\Http\Middleware;

use App\Helper\Common;
use App\Helper\_ApiCode;
use App\Helper\_ApiMessage;
use Closure;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenBlacklistedException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Facades\JWTAuth;

class VerifyJWTToken
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        try {

//            $user = JWTAuth::toUser($request->input('token'));
            $user = JWTAuth::parseToken()->authenticate();
        }
        catch (TokenExpiredException $e) {
            try {
                $newToken = JWTAuth::parseToken()->refresh();
                return response()->json(
                    Common::buildApiResponse($newToken,_ApiCode::RESET_TOKEN, _ApiMessage::RESET_TOKEN)
                );
            }
            catch (TokenBlacklistedException $e) {
                return response()->json(
                    Common::buildApiResponse([],_ApiCode::RESET_LOGIN, _ApiMessage::RESET_LOGIN)
                );
            }
        } catch (TokenInvalidException $e) {
            return response()->json(
                Common::buildApiResponse([],_ApiCode::TOKEN_ERROR, _ApiMessage::TOKEN_ERROR)
            );
        } catch (JWTException $e) {

            return response()->json(
                Common::buildApiResponse([],_ApiCode::NON_AUTH, _ApiMessage::NON_AUTH)
            );
        }
        return $next($request);
    }
}
