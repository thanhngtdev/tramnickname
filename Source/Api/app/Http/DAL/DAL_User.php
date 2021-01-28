<?php
/**
 * Created by PhpStorm.
 * User: QuanVH
 * Date: 17/02/2017
 * Time: 21:45 CH
 */

namespace App\Http\DAL;


use App\Models\User;
use App\Models\User_detail;
use Carbon\Carbon;

class DAL_User
{
    public function getListUser($status, $order = 'created_at',$desc = 'desc',$num = DAL_Config::NUM_PER_PAGE_USER){
        return User::whereIn('user_status',$status)
            ->orderBy($order, $desc)
            ->paginate($num);
    }

    public function getListUserRegister($startDate, $endDate, $city){
        if($city > 0)
            return User::where('user_type',[DAL_Config::TYPE_USER_REGISTER, DAL_Config::TYPE_USER_REGADMIN])
                ->where('user_role',DAL_Config::ROLE_USER_NORMAL)
                ->whereIn('user_status',[DAL_Config::USER_STATUS_PENDING,DAL_Config::USER_STATUS_PUBLIC])
                ->where('user_city',$city)
                ->whereDate('created_at','>=',Carbon::make($startDate)->toDateString())
                ->whereDate('created_at','<=',Carbon::make($endDate)->toDateString())
                ->with('city')->paginate(DAL_Config::NUM_PER_PAGE_USER);
        else
            return User::whereIn('user_type',[DAL_Config::TYPE_USER_REGISTER, DAL_Config::TYPE_USER_REGADMIN])
                ->where('user_role',DAL_Config::ROLE_USER_NORMAL)
                ->whereIn('user_status',[DAL_Config::USER_STATUS_PENDING,DAL_Config::USER_STATUS_PUBLIC])
                ->whereDate('created_at','>=',Carbon::make($startDate)->toDateString())
                ->whereDate('created_at','<=',Carbon::make($endDate)->toDateString())
                ->with('city')->paginate(DAL_Config::NUM_PER_PAGE_USER);
    }

    public function getListUserManage($number){
        return User::whereIn('user_status',[DAL_Config::USER_STATUS_PUBLIC])
            ->whereIn('user_role',[DAL_Config::ROLE_USER_ADMIN, DAL_Config::ROLE_USER_MOD])
            ->orderBy('created_at','desc')->paginate($number);
    }

    public function getListRoleById($roleId){
        return Role_user::where('role_id', '>',$roleId)
            ->where('role_status', 1)->get();
    }

    public function getDetailRole($roleId){
        return Role_user::find($roleId);
    }

    public function getDetailUserById($userId){
        return User::where('user_id',$userId)->with(['academy'])->first();
    }

    public function getDetailUser($userName = ''){
        return User::where('user_name',$userName)
            ->orWhere('user_email',$userName)
            ->orWhere('user_phone',$userName)
            ->where('user_status','!=',DAL_Config::USER_STATUS_LOCKED)
            ->first();
    }

    public function createUser($array){
        return User::create($array);
    }

    public function createSupplier($array){
        return Supplier::create($array);
    }

    public function updateUser($userId, $data = array()){
        return User::where('user_id',$userId)->update($data);
    }

    public function getListCountry(){
        return Country::where('cty_status',1)->get();
    }

    public function getListCity($ctyId){
        return City::where('city_country',$ctyId)
            ->where('city_status',1)->orderBy('city_order','asc')->get();
    }

    public function getListDistrict($cityId){
        return District::where('dt_status',1)
            ->where('dt_city',$cityId)->orderBy('dt_order','asc')->get();
    }

    public function getDetailCity($cityId){
        return City::find($cityId);
    }

    public function deleteUserAcademy($userId){
        User_detail::where('dt_user',$userId)->where('dt_name','academy')->delete();
    }

}
