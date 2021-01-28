<?php
/**
 * Created by PhpStorm.
 * User: QuanVH
 * Date: 17/02/2017
 * Time: 21:45 CH
 */

namespace App\Http\Controllers\Api;


use App\Helper\Common;
use App\Http\Business\API\BzArticle;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    protected $bzArticle;

    public function __construct()
    {
        parent::__construct();
        $this->bzArticle = new BzArticle();
    }

    public function getStaticPage(Request $request){
        return response()->json(
            Common::buildApiResponse($this->bzArticle->getStaticPage($request->alias))
        );
    }

    public function postAddQNA(Request $request){
        return response()->json(
            Common::buildApiResponse($this->bzArticle->postAddQNA($request))
        );
    }

    public function getListArticle(){
        return response()->json(
            Common::buildApiResponse($this->bzArticle->getListArticle())
        );
    }

    public function getListQNA(){
        return response()->json(
            Common::buildApiResponse($this->bzArticle->getListQNA())
        );
    }
    public function getDetailArticle(){
        return response()->json(
            Common::buildApiResponse($this->bzArticle->getDetailArticle())
        );
    }
}