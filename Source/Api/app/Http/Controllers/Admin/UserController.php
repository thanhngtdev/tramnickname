<?php
/**
 * Created by PhpStorm.
 * User: QuanVH
 * Date: 17/02/2017
 * Time: 21:45 CH
 */

namespace App\Http\Controllers\Admin;


use App\Helper\_ApiCode;
use App\Http\Business\Admin\BzUser;
use App\Http\Controllers\Controller;
use App\Http\DAL\DAL_Config;
use App\Http\Requests\ChangePasswordRequest;
use App\Http\Requests\UserAddRequest;
use App\Http\Requests\UserLoginRequest;
use App\Http\Requests\UserRegisterRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    protected $bzUser;
    public function __construct()
    {
        $this->bzUser = new BzUser();
        parent::__construct();
    }

    public function getLogin(){
        if(Auth::check()){
            return redirect()->route('admin.dashboard');
        }
        else
            return view('admin.login');
    }

    public function postLogin(UserLoginRequest $request){
        $login = [
            'user_name' => $request->username,
            'password' => $request->password,
            'user_status'=>DAL_Config::USER_STATUS_PUBLIC
        ];

        if(Auth::attempt($login) && $this->bzUser->postLogin($request)){
            return redirect()->intended('/');
        }
        else{
            Auth::logout();
            return redirect()->back()->with(['error_message' => 'Invalid username/password']);
        }
    }

    public function getLogout(){
        Auth::logout();
        return redirect()->route('admin.login');
    }

    public function getChangePass(){
        return view('admin.user.change_password');
    }

    public function postChangePass(ChangePasswordRequest $request){
        if($this->bzUser->postChangePass($request))
            return redirect()->back()->with(['success_message' => 'Change password successful']);
        else
            return redirect()->back()->with(['error_message' => 'Change password failed']);
    }

    public function getDeleteUser($userId){
        if($this->bzUser->getDeleteUser($userId))
            return redirect()->back()->with(['success_message' => 'Xóa người dùng thành công']);
        else
            return redirect()->back()->with(['error_message' => 'Xóa người dùng không thành công']);
    }

    public function getListUser(){
        return view('admin.user.list_user');
    }

    public function getListSubAdmin(){
        return view('admin.user.list_sub_admin');
    }

    public function getListFrAdmin(){
        return view('admin.user.list_franchise_admin');
    }

    public function getLockUser($userId){
        $errorCode = $this->bzUser->getLockUser($userId);
        if($errorCode == _ApiCode::SUCCESS)
            return redirect()->back()->with(['success_message' => 'Khóa tài khoản thành công']);
        else
            return redirect()->back()->with(['error_message' => 'Khóa tài khoản không thành công']);
    }

    public function getUnLockUser($userId){
        $errorCode = $this->bzUser->getUnLockUser($userId);
        if($errorCode == _ApiCode::SUCCESS)
            return redirect()->back()->with(['success_message' => 'Mở khóa tài khoản thành công']);
        else
            return redirect()->back()->with(['error_message' => 'Mở khóa tài khoản không thành công']);
    }

    public function getListUserData(){
        return $this->bzUser->getListUserData();
    }

    public function getAddSubAdmin(){
        return view('admin.user.add_sub_admin');
    }

    public function postAddSubAdmin(Request $request){
        if($this->bzUser->postAddUser($request, 'Sub Admin'))
            return redirect()->back()->with(['success_message' => 'Add sub admin successful']);
        else
            return redirect()->back()->with(['error_message' => 'Add sub admin failed']);
    }

    public function getAddFrAdmin(){
        return view('admin.user.add_fr_admin');
    }

    public function postAddFrAdmin(UserAddRequest $request){
        $this->bzUser->postAddUser($request, 'Franchise Admin');
//        if($this->bzUser->postAddUser($request, 'Franchise Admin'))
//            return redirect()->back()->with(['success_message' => 'Add franchise admin successful']);
//        else
//            return redirect()->back()->with(['error_message' => 'Add franchise admin failed']);
    }

    public function postAddUser(Request $request){
//        $this->bzUser->postAddUser($request);
        if($this->bzUser->postAddUser($request,'mod'))
            return redirect()->back()->with(['success_message' => 'Thêm mới người dùng thành công']);
        else
            return redirect()->back()->with(['error_message' => 'Thêm mới người dùng không thành công']);
    }

    public function getEditUser($userId){
        $user = $this->bzUser->getEditUser($userId);
        return view('admin.user.edit_user',compact('user'));
    }

    public function postEditUser(Request $request){
        $errorCode = $this->bzUser->postEditUser($request);
        if($errorCode == _ApiCode::SUCCESS)
            return redirect()->back()->with(['success_message' => 'Update info successful']);
        else
            return redirect()->back()->with(['error_message' => 'Failed! Update info not success.']);
    }

    public function getSearchUser(){
        return $this->bzUser->getSearchUser();
    }

    public function getDetailUser($userid){
        return $this->bzUser->getEditUser($userid);
    }
}
