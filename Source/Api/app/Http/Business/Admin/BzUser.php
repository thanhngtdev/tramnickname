<?php
/**
 * Created by PhpStorm.
 * User: QuanVH
 * Date: 17/02/2017
 * Time: 21:54 CH
 */

namespace App\Http\Business\Admin;


use App\Helper\_ApiCode;
use App\Helper\Common;
use App\Http\DAL\DAL_Config;
use App\Jobs\ActivationEmail;
use App\Models\User;
use App\Models\User_detail;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Mail;
use TomLingham\Searchy\Facades\Searchy;

class BzUser extends BzAdmin
{
    public function postLogin($request){
        $user = $this->dal_user->getDetailUser($request->username);
        if(isset($user) && $user->user_status != DAL_Config::STATUS_DELETED)
            return true;
        return false;
    }

    public function postChangePass($request){
        return $this->dal_user->updateUser(Auth::user()->user_id,[
            'password' => bcrypt($request->txtPassword)
        ]);
    }

    public function getDetailUser($userId){
        return $this->dal_user->getDetailUser($userId);
    }

    public function getDeleteUser($userId){
        $user = $this->dal_user->getDetailUserById($userId);
        if ($user && $user->user_id){
            $user->user_status = DAL_Config::STATUS_DELETED;
            $user->syncPermissions([]);
            $user->save();
            return _ApiCode::SUCCESS;
        }
        return _ApiCode::ERROR_UNKNOWN;
    }

    public function getListUserData(){
        $number = $_GET['length'];
        $search = trim($_GET['search']['value']);
        $start = $_GET['start'];
        $page = round($start/$number)+1;
        Common::SetCurrentPage($page);

        $query = User::whereIn('user_status',[DAL_Config::USER_STATUS_PUBLIC])->where('user_id','>',1);

        if($search != ''){
            $lstUser = Searchy::search('user')->fields('user_name','user_email','user_phone')
                ->query($search)->getQuery()->get()->pluck('user_id')->toArray();
            $query = $query->whereIn('user_id',$lstUser);
        }
        if(isset($_GET['role'])){
            $query = $query->role($_GET['role']);
        }

        return $query->orderBy('created_at','desc')
            ->paginate(DAL_Config::NUM_PER_PAGE_USER);
    }

    public function postAddUser($request, $role){
        $array = [
            'user_name' => $request->txtName,
            'password' => bcrypt($request->txtPassword),
            'user_email' => strtolower($request->txtEmail),
            'user_phone' => $request->txtPhone,
            'user_address' => $request->txtAddress1,
            'user_type' => DAL_Config::TYPE_USER_SYSTEM,
            'user_showName' => $request->txtShowName,
            'user_alias' => Common::CreateSlug($request->txtName),
        ];

        if($newUser = $this->dal_user->createUser($array)) {
            $newUser->assignRole($role);
            if($request->sltAcademy && is_array($request->sltAcademy)){
                foreach ($request->sltAcademy as $academyId){
                    User_detail::create([
                        'dt_user' => $newUser->user_id,
                        'dt_name' => 'academy',
                        'dt_value' => $academyId,
                    ]);
                }
            }
            return true;
        }
        return false;
    }

    public function getEditUser($userId){
        return $this->dal_user->getDetailUserById($userId);
    }

    public function postEditUser($request){
        $userId = $request->get('lbId');
        $user = $this->dal_user->getDetailUserById($userId);
        if($user && $user->user_id) {
            $array = [
                'user_email' => strtolower($request->txtEmail),
                'user_phone' => $request->txtPhone,
                'user_address' => $request->txtAddress,
                'user_showName' => $request->txtShowName,
            ];
            if ($this->dal_user->updateUser($userId, $array)) {
                // set permission
                $user->syncPermissions($request->sltPermission);
                if($request->sltAcademy && is_array($request->sltAcademy)){
                    $this->dal_user->deleteUserAcademy($userId);
                    foreach ($request->sltAcademy as $academyId){
                        User_detail::create([
                            'dt_user' => $user->user_id,
                            'dt_name' => 'academy',
                            'dt_value' => $academyId,
                        ]);
                    }
                }
                return _ApiCode::SUCCESS;
            }
        }
        return _ApiCode::ERROR_UNKNOWN;
    }

    public function getSearchUser(){
        $result = array();
        if(isset($_GET['q'])) {
            $search = trim(mb_strtolower($_GET['q']));
            $lstUser = Searchy::search('user')->fields('user_id','user_showName','user_phone','user_email')
                ->query($search)->getQuery()
                ->whereIn('user_status',[DAL_Config::USER_STATUS_PUBLIC])
                ->where('user_role',DAL_Config::ROLE_USER_NORMAL)->get();
        }
        else
            $lstUser = User::whereIn('user_status',[DAL_Config::USER_STATUS_PUBLIC])
            ->where('user_role',DAL_Config::ROLE_USER_NORMAL)->get();
        foreach ($lstUser as $user){
            array_push($result,['id'=>$user->user_id,'text'=>$user->user_id. ' - ' .$user->user_showName]);
        }
        return $result;
    }
}
