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
use App\Helper\ImageCrop;
use App\Http\Business\Helper;
use App\Http\DAL\DAL_Article;
use App\Http\DAL\DAL_Config;
use App\Http\DAL\DAL_Site;
use App\Http\DAL\DAL_User;
use App\Models\Config;
use App\Models\Tag;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Storage;
use TomLingham\Searchy\Facades\Searchy;

class BzAdmin
{
    protected $dal_user;
    protected $dal_article;
    protected $imageCrop;
    protected $dal_site;

    public function __construct()
    {
        $this->dal_user = new DAL_User();
        $this->dal_article = new DAL_Article();
        $this->imageCrop = new ImageCrop();
        $this->dal_site = new DAL_Site();
    }

    public function postUploadImage($destination = 'images'){
        $imageInfo = getimagesize( $_FILES['upload']['tmp_name'] );
        if ( $imageInfo['mime'] == ( "image/png" ) ||
            $imageInfo['mime'] == ( "image/jpeg" ) ||
            $imageInfo['mime'] == ( "image/gif" ) ||
            $imageInfo['mime'] == ( "image/jpg" ) ||
            $imageInfo['mime'] == ( "image/bmp" ) ) {

            $file = Input::file('upload');
            $alias = $this->CommonUpload($destination, $file);
            if($alias && $alias != ''){
                return response()->json(
                    array(
                        "uploaded" => 1,
                        "fileName" => "Ảnh bài viết",
                        "url" => Common::GetThumb($alias)
                    )
                );
            }
            else{
                return response()->json(
                    array(
                        "uploaded" => 0,
                        "fileName" => "Ảnh mẫu",
                        "url" => "",
                        "error" => array(
                            "message" => "upload ảnh không thành công"
                        )
                    )
                );
            }
        }
    }

    public function CommonUpload($path, $file, $name = ''){
        if($file) {
            $destination = $path;
            $extension = $file->getClientOriginalExtension();
            if ($name == '') {
                $extension_pos = strrpos($file->getClientOriginalName(), '.');
                $fileName = substr($file->getClientOriginalName(), 0, $extension_pos);
                $fileName = Common::createSlug($fileName);
            } else
                $fileName = Common::createSlug($name);
            $alias = $destination. '/' .$fileName . '.' . $extension;
            if (Storage::exists($alias)) {
                $fileName = $fileName . "_" . $this->randomCode(9);
            }
            if (!Storage::exists($destination))
                Storage::makeDirectory($destination);
            $storagePath = Storage::putFileAs(
                $destination, $file, $fileName . '.' . $extension
            );
            return $storagePath;
        }
        return '';
    }

    public function randomCode($num){
        $hour = date('H');
        $minute = date('i');
        $second = date('s');
        $miliSecond = round(microtime(true) * 1000);
        $strName = $this->rand_string(3) .$hour. $this->rand_string(3) .$minute. $this->rand_string(3) .$second.
            $this->rand_string(3) .$miliSecond;
        return substr($strName,-1*$num);
    }

    function rand_string( $length ) {
        $chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        $str = '';
        $size = strlen( $chars );
        for( $i = 0; $i < $length; $i++ ) {
            $str .= $chars[ rand( 0, $size - 1 ) ];
        }
        return $str;
    }

    public function getBaseNameFromAlias($alias){
        $arr = explode('/',$alias);
        return $arr[count($arr) - 1 ];
    }

    public function GetImageFromContent($html = null){
        $pattern = '#<img\s+[^>]*src="([^"]*)"[^>]*>#isu';
        preg_match($pattern, $html, $matches);
        if (isset($matches) && isset($matches[1]) && !empty($matches[1])) {
            return $matches[1];
        }
        return '';
    }

    public function getAllTag(){
        $result = array();
        if(isset($_GET['q'])) {
            $search = trim(mb_strtolower($_GET['q']));
            $lstTag = Searchy::search('tag')->fields('tag_normalized')->query($search)->get();
        }
        else
            $lstTag = Tag::all();
        foreach ($lstTag as $tag){
            array_push($result,['id'=>$tag->tag_name,'text'=>$tag->tag_name]);
        }
        return $result;
    }

    public function getListTagData(){
        $columns = array(
            0 => 'tag_id',
            1 => 'tag_name',
            2 => 'tag_id',
            3 => 'tag_id',
        );
        $number = $_GET['length'];
        $start = $_GET['start'];
        $search = $_GET['search']['value'];
        $page = round($start/$number)+1;
        Common::SetCurrentPage($page);
        if($search != ''){
            $lstTag = Searchy::search('tag')->fields('tag_name')
                ->query($search)->get();
            foreach ($lstTag as $tag){
                $tag->articles = Tag::find($tag->tag_id)->articles;
            }
            return [
                'data' => $lstTag,
                'total' => 10
            ];

        }
        else{
            return Tag::orderBy('created_at', 'desc')->with('articles')->paginate($number);
        }
    }

    public function postAddTag($request) {
        try {
            Tag::createTag($request->txtTag);
            $file = Input::file('tagfile');
            if ($file) {
                $strTag = file_get_contents($file);
                Tag::createTag($strTag);
            }
            return _ApiCode::SUCCESS;
        } catch (\Exception $e) {
            //log exception
            \Log::error($e->getMessage(),$e->getTrace());
            return _ApiCode::ERROR_UNKNOWN;
        }
    }

    public function getListCity($ctyId){
        $lstCity = $this->dal_user->getListCity($ctyId);
        $result = array();
        foreach ($lstCity as $city){
            array_push($result,['id'=>$city->city_id,'text'=>$city->city_name]);
        }
        return $result;
    }

    public function getListDistrict($cityId){
        $lstDistrict = $this->dal_user->getListDistrict($cityId);
        $result = array();
        foreach ($lstDistrict as $district){
            array_push($result,['id'=>$district->dt_id,'text'=>$district->dt_name]);
        }
        return $result;
    }

    public function getDetailConfig($cfgId){
        return DAL_Config::getConfig($cfgId);
    }

    public function postEditStaticPage($request){
        try {
            $cfgId  = $request->lbId;
            $cfgValue = DAL_Config::getConfigByLocale($cfgId);
            $cfgValueLocale = array_shift($cfgValue);
            $cfgValueLocale['name'] = $request->txtContent;
            DAL_Config::updateConfigByLocale($cfgId,[$cfgValueLocale]);

            return _ApiCode::SUCCESS;
        } catch (\Exception $e) {
            return _ApiCode::ERROR_UNKNOWN;
        }
    }

    public function postEditConfig($request){
        try {
            $cfgId = $request->lbId;
            $config = DAL_Config::getConfig($cfgId);
            $config->cfg_title = $request->txtTitle;
            $config->cfg_des = $request->txtDes;
            $config->cfg_content = $request->txtContent;

            $configValue = [];
            foreach ($config->cfg_value as $key => $value) {
                if (isset($request['txtTitle' . $key])) {
                    $newConfigValue = [
                        'title' => $request['txtTitle' . $key],
                        'des' => $request['txtDes' . $key],
                        'content' => $request['txtContent' . $key],
                        'icon' => $value['icon'],
                        'image' => $value['image']
                    ];
                    $fileIcon = Input::file('icon' . $key);
                    if ($fileIcon) {
                        $alias = $this->CommonUpload(DAL_Config::IMAGE_ALIAS_ARTICLE . '/static', $fileIcon);
                        if ($alias) {
                            $this->imageCrop->MakeIconConfigThumb($alias);
                            $newConfigValue['icon'] = $alias;
                        }
                    }
                    $fileImage = Input::file('image' . $key);
                    if ($fileImage) {
                        $alias = $this->CommonUpload(DAL_Config::IMAGE_ALIAS_ARTICLE . '/static', $fileImage);
                        if ($alias) {
                            $this->imageCrop->MakeConfigThumb($alias);
                            $newConfigValue['image'] = $alias;
                        }
                    }
                    array_push($configValue, $newConfigValue);
                }
            }
            if(count($configValue) > 0) $config->cfg_value = $configValue;

            $config->save();
            return _ApiCode::SUCCESS;
        } catch (\Exception $e) {
            //log exception
            \Log::error($e->getMessage(),$e->getTrace());
            return _ApiCode::ERROR_UNKNOWN;
        }
    }

    public function postUpdateImageGallery($request){
        $cfgId = $request->lbId;
        $config = DAL_Config::getConfig($cfgId);
        $configValue = $config->cfg_value;
        $newValue = [];
        foreach ($request->lstImage as $image){
            foreach ($configValue as $imageItem){
                if ($imageItem['image'] == $image){
                    array_push($newValue, $imageItem);
                }
            }
        }
        $config->cfg_value = $newValue;
        $config->save();
        return _ApiCode::SUCCESS;
    }

    public function postAddConfigItem($request){
        try {
            $cfgId = $request->lbId;
            $config = DAL_Config::getConfig($cfgId);
            $newItem = [
                'title' => $request->txtTitle,
                'des' => $request->txtDes,
                'content' => '',
                'icon' => '',
                'image' => $request->title,
            ];

            $fileIcon = Input::file('imgFeature');
            if ($fileIcon) {
                $alias = $this->CommonUpload(DAL_Config::IMAGE_ALIAS_ARTICLE . '/static', $fileIcon);
                if ($alias) {
                    $this->imageCrop->MakeGalleryThumb($alias);
                    $newItem['image'] = $alias;
                }
            }
            $configValue = $config->cfg_value;
            array_push($configValue, $newItem);
            $config->cfg_value = $configValue;
            $config->save();
            return _ApiCode::SUCCESS;
        } catch (\Exception $e) {
            //log exception
            \Log::error($e->getMessage(),$e->getTrace());
            return _ApiCode::ERROR_UNKNOWN;
        }
    }

    public function postDeleteConfigItem($request){
        try {
            $cfgId = $request->lbId;
            $config = DAL_Config::getConfig($cfgId);

            $newValue = [];
            foreach ($config->cfg_value as $cfgItem) {
                if ($cfgItem['image'] != $request->image)
                    array_push($newValue, $cfgItem);
            }
            $config->cfg_value = $newValue;
            $config->save();
            return _ApiCode::SUCCESS;
        } catch (\Exception $e) {
            //log exception
            \Log::error($e->getMessage(),$e->getTrace());
            return _ApiCode::ERROR_UNKNOWN;
        }
    }

    public function sendFCMMessage($data){
        return Helper::sendFCMMessage($data);
    }
}
