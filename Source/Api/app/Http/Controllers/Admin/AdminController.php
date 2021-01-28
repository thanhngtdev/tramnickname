<?php
/**
 * Created by PhpStorm.
 * User: QuanVH
 * Date: 08/12/2016
 * Time: 11:20 SA
 */

namespace App\Http\Controllers\Admin;


use App\Helper\_ApiCode;
use App\Http\Business\Admin\BzAdmin;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;

class AdminController extends Controller
{
    protected $_bzAdmin;
    public function __construct()
    {
        parent::__construct();
        $this->_bzAdmin = new BzAdmin();
    }

    public function dashboard(){
        return view('admin.dashboard');
    }

    public function getAllTag(){
        return $this->_bzAdmin->getAllTag();
    }

    public function getListTag(){
        return view('admin.tag.list_tag');
    }

    public function getListTagData(){
        return $this->_bzAdmin->getListTagData();
    }

    public function getAddTag(){
        return view('admin.tag.add_tag');
    }

    public function postAddTag(Request $request){
        $errorCode = $this->_bzAdmin->postAddTag($request);
        if($errorCode == _ApiCode::SUCCESS)
            return redirect()->back()->with(['success_message' => 'Thêm mới từ khóa thành công']);
        else
            return redirect()->back()->with(['error_message' => 'Thêm mới từ khóa không thành công']);
    }

    public function getListCity($ctyId){
        return $this->_bzAdmin->getListCity($ctyId);
    }

    public function getListDistrict($cityId){
        return $this->_bzAdmin->getListDistrict($cityId);
    }

    public function getEditStaticPage($cfgId){
        $config = $this->_bzAdmin->getDetailConfig($cfgId);
        if ($config && $config->cfg_id)
            return view('admin.config.edit_static_page', compact('config'));
        return redirect()->route('admin.dashboard');
    }

    public function postEditStaticPage(Request $request){
        $errorCode = $this->_bzAdmin->postEditStaticPage($request);
        if($errorCode == _ApiCode::SUCCESS)
            return redirect()->back()->with(['success_message' => 'Chỉnh sửa trang tĩnh thành công']);
        else
            return redirect()->back()->with(['error_message' => 'Chỉnh sửa trang tĩnh không thành công']);
    }

    public function getListConfig(){
        return view('admin.config.list_config');
    }

    public function getEditConfig($cfgId){
        $config = $this->_bzAdmin->getDetailConfig($cfgId);
        if($cfgId == 105 || $cfgId == 109)
            return view('admin.config.edit_config_image',compact('config'));
        return view('admin.config.edit_config_all',compact('config'));
    }

    public function postEditConfig(Request $request){
        $errorCode = $this->_bzAdmin->postEditConfig($request);
        if($errorCode == _ApiCode::SUCCESS)
            return redirect()->back()->with(['success_message' => 'Edit config success']);
        else
            return redirect()->back()->with(['error_message' => 'Edit config failed']);
    }

    public function postUpdateImageGallery(Request $request){
        $errorCode = $this->_bzAdmin->postUpdateImageGallery($request);
        return $errorCode;
    }

    public function getEditConfigLocale($cfgId){
        $config = $this->_bzAdmin->getDetailConfig($cfgId);
        if ($config && $config->cfg_id)
            return view('admin.config.edit_config_locale', compact('config'));
        return redirect()->route('admin.dashboard');
    }

    public function postDeleteConfigItem(Request $request){
        return $this->_bzAdmin->postDeleteConfigItem($request);
    }

    public function postAddConfigItem(Request $request){
        $errorCode = $this->_bzAdmin->postAddConfigItem($request);
        if($errorCode == _ApiCode::SUCCESS)
            return redirect()->back()->with(['success_message' => 'Add Image success']);
        else
            return redirect()->back()->with(['error_message' => 'Add image failed']);
    }

}