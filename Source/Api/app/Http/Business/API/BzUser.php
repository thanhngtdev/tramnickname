<?php
/**
 * Created by PhpStorm.
 * Project: Alium_main
 * User: quanvu
 * Date: 13/07/2019
 */


namespace App\Http\Business\API;


use App\Helper\_ApiCode;
use App\Helper\_ApiMessage;
use App\Helper\Common;
use App\Http\DAL\DAL_Config;
use App\Jobs\ActivationEmail;
use App\Models\City;
use App\Models\Country;
use App\Models\Device_token;
use App\Models\District;
use App\Models\Password_reset;
use App\Models\Social_account;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Hashing\BcryptHasher;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Hash;

class BzUser extends BzApi
{
    public function register(Request $request){
        $email = strtolower($request->email);
        $data = [
            'user_email' => $email,
            'user_phone' => $request->phone,
            'password' => bcrypt($request->password),
            'user_showName' => $request->name,
            'user_city' => 0,
            'user_type' => DAL_Config::TYPE_USER_REGISTER,
            'user_role' => DAL_Config::ROLE_USER_NORMAL,
            'user_status' => DAL_Config::USER_STATUS_PENDING,
            'user_verify' => 0,
            'user_alias' => Common::CreateSlug($request->name),
            'user_verifyCode' => Common::getUserVerifyCode()
        ];
        if($user = User::where('user_email', $email)
            ->where('user_status','!=',DAL_Config::STATUS_DELETED)->first())
            return _ApiCode::USER_EMAIL_EXIST;
        if($user = User::where('user_phone', $request->phone)
            ->where('user_status','!=',DAL_Config::STATUS_DELETED)->first())
            return _ApiCode::USER_PHONE_EXIST;
        if($newUser = $this->dal_user->createUser($data)) {
            dispatch(new ActivationEmail($newUser));
            return _ApiCode::SUCCESS;
        }
        return _ApiCode::ERROR_UNKNOWN;
    }

    public function sendVerifyCode($email){
        $email = strtolower($email);
        if(!$email || $email == '')
            return _ApiCode::LACK_INFO;
        if (!$user = User::where('user_email',$email)
            ->where('user_status','!=',DAL_Config::STATUS_DELETED)->first())
            return _ApiCode::USER_EMAIL_NOT_EXIST;
        else {
            $code = Common::getUserVerifyCode();
            Password_reset::where('email',$email)->delete();
            Password_reset::create([
                'email' => $email,
                'token' => bcrypt($code),
                'created_at' => \Carbon\Carbon::now()
            ]);
            Mail::send([], [], function ($message) use ($email, $code) {
                $message->from('noreply@alium.vn', 'Alium.vn');
                $message->to($email)->subject('Quên mật khẩu Alium.vn')
                    ->setBody('Mã xác nhận khôi phục mật khẩu của bạn là:' . $code, 'text/html');
            });
            return _ApiCode::SUCCESS;
        }
    }

    public function sendRegisterCode(){
        $email = strtolower($_GET['email']);
        if(!$email || $email == '')
            return _ApiCode::LACK_INFO;

        $code = Common::getUserVerifyCode();
        Password_reset::where('email',$email)->delete();
        Password_reset::create([
            'email' => $email,
            'token' => bcrypt($code),
            'created_at' => \Carbon\Carbon::now()
        ]);
        Mail::send([], [], function ($message) use ($email, $code) {
            $message->from('noreply@alium.vn', 'Alium.vn');
            $message->to($email)->subject('Đăng ký tài khoản Alium.vn')
                ->setBody('Mã xác nhận đăng ký tài khoản của bạn là:' . $code, 'text/html');

        });
        return _ApiCode::SUCCESS;
    }

    public function checkRegisterCode($request){
        try {
            $registerRequest = Password_reset::where('email', strtolower($request->email))
                ->orderBy('created_at', 'desc')->first();
            if ($registerRequest && $registerRequest->token) {
                $bcrypt = new BcryptHasher();
                $tokenCheck = $bcrypt->check($request->token, $registerRequest->token);
                if ($tokenCheck) return _ApiCode::SUCCESS;
            }
            return _ApiCode::VERIFYCODE_NOT_FOUND;
        } catch (\Exception $e) {
            //log exception
            activity()->performedOn(User::getModel())
                ->causedBy(Auth::user())
                ->withProperties(['action' => 'postAddUserRegister'])
                ->log("line ".$e->getLine()." file ".$e->getFile() ."\n".$e->getMessage());
            \Log::error($e->getMessage(),$e->getTrace());
            return _ApiCode::ERROR_UNKNOWN;
        }
    }

    public function postForgetPass($request)
    {
        $email = strtolower($request->email);
        $resetRequest = Password_reset::where('email',$email)
            ->orderBy('created_at','desc')->first();
        $bcrypt = new BcryptHasher();
        $tokenCheck = $bcrypt->check($request->token,$resetRequest->token);
        if ($tokenCheck) {
            $passwordReset = Password_reset::where('token', $resetRequest->token)->firstOrFail();
            if (\Illuminate\Support\Carbon::parse($passwordReset->updated_at)->addMinutes(720)->isPast()) {
                $passwordReset->delete();
                return _ApiCode::VERIFYCODE_NOT_FOUND;
            }
            $user = $this->dal_user->getDetailUser($email);
            $user->password = bcrypt($request->password);
            $user->save();
            return _ApiCode::SUCCESS;
        }
        else{
            //not exits request reset pass with email and code provided
            return _ApiCode::VERIFYCODE_NOT_FOUND;
        }
    }

    public function login(Request $request){
        $credentialMail = [
            'user_email' => $request->get('email'),
            'password' => $request->get('password')
        ];
        $credentialPhone = [
            'user_phone' => $request->get('email'),
            'password' => $request->get('password')
        ];

        $token = null;
        $user = null;
        try {
            $token = JWTAuth::attempt($credentialPhone) ? JWTAuth::attempt($credentialPhone) :
                JWTAuth::attempt($credentialMail);
            if (!$token) {
                return response()->json(
                    Common::buildApiResponse([],_ApiCode::ERROR_INFO, _ApiMessage::LOGIN_INFO_ERROR)
                );
            }
            else {
                if(isset($request->fcmToken) && $request->fcmToken != '') {
                    $this->saveToken($request->fcmToken);
                }
                $user = auth()->user();
                $user->countNotify = count($user->unreadNotifications);
                $user->city = City::find($user->user_city);
            }
        } catch (JWTException $e) {
            return response()->json(
                Common::buildApiResponse([],
                    _ApiCode::CREATE_TOKEN_FAILED,
                    _ApiMessage::CREATE_TOKEN_FAILED)
            );
        }
        return response()->json(Common::buildApiResponse(['token'=> $token,'info'=>$user]));
    }

    public static function createSocialAccount($data)
    {
        try {
            $account = Social_account::where('acc_provider', $data->provider)
                ->where('acc_providerId', $data->userId)
                ->first();
            if ($account) {
                return $account->user;
            } else {
                $email = strtolower($data->email) ?? $data->name;
                $account = new Social_account([
                    'acc_providerId' => $data->userId,
                    'acc_provider' => $data->provider,
                    'acc_token'=>$data->token
                ]);
                $user = User::where('user_email', $email)->first();

                if (!$user) {
                    $user = User::create([
                        'user_email' => $email,
                        'user_showName' => $data->name,
                        'password' => $data->name,
                        'user_phone' => '',
                        'user_type' => DAL_Config::TYPE_USER_REGISTER,
                        'user_role' => DAL_Config::ROLE_USER_NORMAL,
                        'user_status' => DAL_Config::USER_STATUS_PUBLIC,
                        'user_verify' => 1,
                        'user_alias' => Common::CreateSlug($data->name),
                        'user_avatar' => $data->avatar
                    ]);
                } else {
                    // email exist
                    // update avatar if need
                }

                $account->user()->associate($user);
                $account->save();

                return $user;
            }
        } catch (\Exception $e) {
            return false;
        }
    }

    public function loginSocial(Request $request){
        $loginUser = $this->createSocialAccount($request);
        if($loginUser){
            Auth::login($loginUser, true);
            if(isset($request->fcmToken) && $request->fcmToken != '') {
                $this->saveToken($request->fcmToken);
            }
            $token = JWTAuth::fromUser($loginUser);
            $user = auth()->user();
            $user->countNotify = count($user->unreadNotifications);
            $user->city = City::find($user->user_city);
            return response()->json(Common::buildApiResponse(['token'=> $token,'info'=>$user]));
        }
        return response()->json([],_ApiCode::ERROR_UNKNOWN);
    }

    public function logout($request) {
        try {
        JWTAuth::parseToken()->invalidate(true);
        return response()->json(
                Common::buildApiResponse([],_ApiCode::SUCCESS, _ApiMessage::SUCCESS)
            );
        } catch (JWTException $e) {
            return response()->json(Common::buildApiResponse([],
                _ApiCode::LOGOUT_FAILED, _ApiCode::LOGOUT_FAILED));
        }
    }

    public function postChangePass($request){
        $user = auth()->user();
        if($this->dal_user->updateUser($user->user_id,[
            'password' => bcrypt($request->password)
        ])){
            auth()->logoutOtherDevices($request->password);
            return _ApiCode::SUCCESS;
        }
        return _ApiCode::ERROR_UNKNOWN;
    }

    public function saveToken($token){
        if ($token && $token != '') {
            Device_token::create([
                'token_user' => auth()->user()->user_id,
                'token_device' => 'app',
                'token_value' => $token,
                'token_push' => '',
                'token_expire' => '',
                'token_lastLogin' => Carbon::now(),
            ]);
            return _ApiCode::SUCCESS;
        }
    }

    public function getUserInfo(Request $request){
        $user = JWTAuth::toUser($request->token);
        $user->countNotify = count($user->unreadNotifications);
        $user->city = City::find($user->user_city);
        return $user;
    }

    public function postEditInfo($request){
        $user = JWTAuth::toUser($request->token);
        switch ($request->name){
            case 'birthday':
                $dt = Carbon::parse($request->value)->toDateString();
                $user->user_birthday = $dt;
                break;
            case 'address':
                $user->user_address = $request->value;
                break;
            case 'gender':
                $user->user_gender = $request->value;
                break;
            case 'city':
                $user->user_city = $request->value;
                break;
            case 'password':
                $user->password = bcrypt($request->value);
                break;
            default: break;
        }
        $user->save();
        return _ApiCode::SUCCESS;
    }

    public function getListCountry(){
        return Country::where('cty_status',1)
            ->orderBy('cty_order','asc')
            ->get(['cty_id','cty_name']);
    }

    public function getListCity($ctyId){
        if (!$ctyId || $ctyId == 0){
            return [];
        }
        return City::where('city_status','!=',DAL_Config::STATUS_DELETED)
            ->where('city_country',$ctyId)
            ->orderBy('city_order','asc')
            ->get(['city_id','city_name']);
    }

    public function getListDistrict($cityId){
        return District::where('dt_status','!=',DAL_Config::STATUS_DELETED)
            ->where('dt_city',$cityId)
            ->orderBy('dt_order','asc')
            ->get(['dt_id','dt_name']);
    }
}