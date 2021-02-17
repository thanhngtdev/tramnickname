<?php
/**
 * Created by PhpStorm.
 * Project: Alium_main
 * User: quanvu
 * Date: 13/07/2019
 */


namespace App\Http\Business\API;


use App\Helper\Common;
use App\Helper\ImageCrop;
use App\Http\DAL\DAL_Article;
use App\Http\DAL\DAL_Config;
use App\Http\DAL\DAL_Order;
use App\Http\DAL\DAL_Product;
use App\Http\DAL\DAL_Site;
use App\Http\DAL\DAL_User;
use Illuminate\Support\Facades\Storage;
use TomLingham\Searchy\Facades\Searchy;

class BzApi
{
    protected $dal_site;
    protected $dal_article;
    public function __construct()
    {
        $this->dal_site = new DAL_Site();
        $this->dal_article = new DAL_Article();
    }

    public function getHome(){
        $instaFeed = DAL_Config::getConfig(109);
        $instaValue = $instaFeed->cfg_value;
        if (count($instaValue) > 12){
            array_splice($instaValue, 12);
        }
        $instaFeed->cfg_value = $instaValue;

        return [
            'bannerTop' => DAL_Config::getConfig(100),
            'homeIntro' => DAL_Config::getConfig(101),
            'whatWeDo' => DAL_Config::getConfig(102),
            'gallery' => DAL_Config::getConfig(105),
            'testimonial' => $this->dal_site->getListTestimonial(0,8),
            'parentFb' => $this->dal_site->getFbParent(),
            'reason' => DAL_Config::getConfig(106),
            'footballBegining' => DAL_Config::getConfig(107),
            'footballFun' => DAL_Config::getConfig(108),
            'instaFeed' => $instaFeed,
        ];
    }

    public function getAboutUs(){
        return [
            'about' => DAL_Config::getConfig(125),
            'about2' => DAL_Config::getConfig(126),
            'about3' => DAL_Config::getConfig(127),
            'about4' => DAL_Config::getConfig(128),
            'about5' => DAL_Config::getConfig(129),
        ];
    }

    public  function getPolicy(){
        return DAL_Config::getConfig(132);
    }

    public function getFooter(){
        return DAL_Config::getConfig(131);
    }

}
