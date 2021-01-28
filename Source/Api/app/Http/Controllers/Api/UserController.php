<?php
/**
 * Created by PhpStorm.
 * User: QuanVH
 * Date: 17/02/2017
 * Time: 21:45 CH
 */

namespace App\Http\Controllers\Api;


use App\Helper\_ApiCode;
use App\Helper\_ApiMessage;
use App\Helper\Common;
use App\Http\Business\API\BzUser;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class UserController extends Controller
{
    protected $bzUser;

    public function __construct()
    {
        parent::__construct();
        $this->bzUser = new BzUser();
    }

    public function sendVerifyCode(Request $request){
        return response()->json(Common::buildApiResponse([],$this->bzUser->sendVerifyCode($request->email)));
    }

    public function postForgetPass(Request $request){
        return response()->json(Common::buildApiResponse([],$this->bzUser->postForgetPass($request)));
    }

    public function sendRegisterCode(){
        return response()->json(Common::buildApiResponse([],$this->bzUser->sendRegisterCode()));
    }
    public function checkRegisterCode(Request $request){
        return response()->json(Common::buildApiResponse([],$this->bzUser->checkRegisterCode($request)));
    }

    public function register(Request $request){
        return response()->json(Common::buildApiResponse([],$this->bzUser->register($request)));
    }

    public function login(Request $request){
        return $this->bzUser->login($request);
    }

    public function loginSocial(Request $request){
        return $this->bzUser->loginSocial($request);
    }

    public function logout(Request $request) {
        return $this->bzUser->logout($request);
    }

    public function postChangePass(Request $request){
        return response()->json(Common::buildApiResponse([],$this->bzUser->postChangePass($request)));
    }

    public function getUserInfo(Request $request){
        return response()->json(
            Common::buildApiResponse(["info" => $this->bzUser->getUserInfo($request)])
        );
    }

    public function postEditInfo(Request $request){
        return response()->json(
            Common::buildApiResponse([],$this->bzUser->postEditInfo($request))
        );
    }

    public function getListCountry(){
        return response()->json(
            Common::buildApiResponse([
                'country' => $this->bzUser->getListCountry(),
            ])
        );
    }

    public function getListCity($ctyId){
        return response()->json(
            Common::buildApiResponse([
                'city' => $this->bzUser->getListCity($ctyId),
            ])
        );
    }

    public function getListDistrict($cityId){
        return response()->json(
            Common::buildApiResponse([
                'district' => $this->bzUser->getListDistrict($cityId),
            ])
        );
    }

}