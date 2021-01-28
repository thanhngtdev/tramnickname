<?php
/**
 * Created by PhpStorm.
 * User: QuanVH
 * Date: 17/02/2017
 * Time: 21:45 CH
 */

namespace App\Http\DAL;

use App\Models\Config;
use Illuminate\Support\Facades\App;

class DAL_Config
{

    const TYPE_USER_SYSTEM = 1;
    const TYPE_USER_REGISTER = 2;
    const TYPE_USER_REGADMIN = 3;

    const ROLE_USER_SP_ADMIN = 1;
    const ROLE_USER_ADMIN = 2;
    const ROLE_USER_MOD = 3;
    const ROLE_USER_NORMAL = 11;

    const STATUS_DELETED = -1;

    const PRODUCT_STATUS_PUBLIC = 1;
    const PRODUCT_STATUS_PENDING = 2;

    const ARTICLE_STATUS_PUBLIC = 1;
    const ARTICLE_STATUS_PENDING = 2;

    const USER_STATUS_PUBLIC = 1;
    const USER_STATUS_PENDING = 2;
    const USER_STATUS_LOCKED = 3;

    const IMAGE_ALIAS_ARTICLE = 'article';
    const IMAGE_ALIAS_USER = 'user';
    const IMAGE_ALIAS_SITE = 'microsite';

    const NUM_PER_PAGE_SITE = 12;
    const NUM_PER_PAGE_USER = 12;
    const NUM_PER_PAGE_ARTICLE = 12;


    public static function getConfig($configId){
        return Config::find($configId);
    }

    public static function getConfigByLocale($configId,$locale = null){
        if(!$locale) $locale = App::getLocale();
        $config = self::getConfig($configId);
        return unserialize($config->cfg_value)[$locale];
    }

    public static function getConfigValueById($configId,$valueId){
        $config = self::getConfigByLocale($configId);
        foreach ($config as $key => $value) {
            if ($value['id'] == $valueId) return $value['name'];
        }
        return 'Không xác định';
    }

    public static function updateConfigByLocale($configId,$newData, $locale=null){
        if(!$locale) $locale = App::getLocale();
        $config = self::getConfig($configId);
        $cfgValue = unserialize($config->cfg_value);
        $cfgValue[$locale] = $newData;
        $config->cfg_value = serialize($cfgValue);
        $config->save();
    }
}