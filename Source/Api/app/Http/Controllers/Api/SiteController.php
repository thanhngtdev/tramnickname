<?php
/**
 * Created by PhpStorm.
 * User: QuanVH
 * Date: 17/02/2017
 * Time: 21:45 CH
 */

namespace App\Http\Controllers\Api;


use App\Helper\Common;
use App\Http\Business\API\BzSite;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class SiteController extends Controller
{
    protected $bzSite;

    public function __construct()
    {
        parent::__construct();
        $this->bzSite = new BzSite();
    }

    public function getListSite(){
        return response()->json(
            Common::buildApiResponse($this->bzSite->getListSite())
        );
    }

    public function getListSiteHasCamp(){
//        return $this->bzSite->getListSiteHasCamp();
        return response()->json(
            Common::buildApiResponse($this->bzSite->getListSiteHasCamp())
        );
    }

    public function getDetailSite(){
        return response()->json(
            Common::buildApiResponse($this->bzSite->getDetailSite())
        );
    }

    public function bookTraining(Request $request){
        return response()->json(
            Common::buildApiResponse([],$this->bzSite->bookTraining($request))
        );
    }

    public function postSearchNearby(Request $request){
        return response()->json(
            Common::buildApiResponse($this->bzSite->postSearchNearby($request))
        );
    }

    public function findNearAcademy(Request $request){
        return response()->json(
            Common::buildApiResponse($this->bzSite->findNearAcademy($request->latitude, $request->longitude))
        );
    }

    public function findNearByAcademy(Request $request){
        return response()->json(
            Common::buildApiResponse($this->bzSite->findNearbyAcademy($request->latitude, $request->longitude))
        );
    }

    public function sendEmail(Request $request){
        return response()->json(
            Common::buildApiResponse($this->bzSite->sendEmail($request))
        );
    }
}
