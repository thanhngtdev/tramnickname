<?php
/**
 * Created by PhpStorm.
 * Project: Alium_main
 * User: quanvu
 * Date: 13/07/2019
 */


namespace App\Http\Business\API;


use App\Helper\_ApiCode;
use App\Helper\_ObjectType;
use App\Http\DAL\DAL_Config;
use App\Jobs\EnquiryCamp;
use App\Jobs\EnquiryParty;
use App\Jobs\EnquiryContact;
use App\Jobs\NotifyCamp;
use App\Jobs\NotifyParty;
use App\Jobs\NotifyContact;
use App\Models\Article;
use App\Models\Booking;
use App\Models\MicroSite;
use Carbon\Carbon;
use TomLingham\Searchy\Facades\Searchy;

class BzSite extends BzApi
{
    public function getListSite()
    {
        $lstSite = MicroSite::where('ms_status', 1)->orderBy('ms_name', 'asc')->with('sub_page')->get();
        foreach ($lstSite as $academy) {
            $academy->social = $this->dal_site->getSiteInfo($academy->ms_id, _ObjectType::KEY_SOCIAL_LINK);
            $lstAssocialted = explode(',', $academy->ms_associated);
            $academy->associalted = MicroSite::whereIn('ms_id', $lstAssocialted)->get();
        }
        return [
            'lstSite' => $lstSite
        ];
    }


    public function getListSiteHasCamp(){
        $client = new \GuzzleHttp\Client();
        $response = $client->request('GET', 'https://www.parentarea.co//api/v2/list-locations-has-camps');
        $campData = [];
        $myJSON = json_decode($response->getBody());
        if($myJSON->status == 200){
            $campData = (array)$myJSON->data;
        }

        $retVal = [];
        $lstSite = MicroSite::where('ms_status', 1)->orderBy('ms_name', 'asc')->with('sub_page')->get();
        foreach ($lstSite as $academy) {
            foreach ($campData as $camp){
                if($camp->location_id == $academy->pa_locationId){
                    $academy->social = $this->dal_site->getSiteInfo($academy->ms_id, _ObjectType::KEY_SOCIAL_LINK);
                    $lstAssocialted = explode(',', $academy->ms_associated);
                    $academy->associalted = MicroSite::whereIn('ms_id', $lstAssocialted)->get();

                    array_push($retVal,$academy);
                }
            }
        }
        return [
            'lstSite' => $retVal
        ];
    }

    public function getDetailSite()
    {
        $siteId = 0;
        $cate = 0;
        $retVal = [];
        if (isset($_GET['siteId'])) $siteId = $_GET['siteId'];
        if (isset($_GET['cate'])) $cate = $_GET['cate'];
        if ($siteId > 0) {
            $instaFeed = DAL_Config::getConfig(109);
            $instaValue = $instaFeed->cfg_value;
            if (count($instaValue) > 12) {
                array_splice($instaValue, 12);
            }
            $instaFeed->cfg_value = $instaValue;

            $retVal['site'] = $this->dal_site->getDetailSite($siteId);
            $retVal['eachWeek'] = DAL_Config::getConfig(111);

            $_lstTesti = $this->dal_site->getListTestimonial($siteId, 4);
//            if(count($_lstTesti->toArray()) < 1 ) $_lstTesti = $this->dal_site->getListTestimonial(0, 4);
            $retVal['testimonial'] = $_lstTesti;

            $retVal['skillGain'] = DAL_Config::getConfig(112);
            $retVal['whyWMF'] = DAL_Config::getConfig(113);
            $retVal['parentFb'] = $this->dal_site->getFbParent();
            $retVal['faq'] = $this->dal_article->getQNAByCate($cate);

            switch ($cate) {
                case 6:
                    //weekly training
                    $instaFeed->cfg_title = 'Weekly Training Insafeed';
                    $retVal['about'] = DAL_Config::getConfig(114);
                    $retVal['academyIntro'] = DAL_Config::getConfig(110);
                    break;
                case 9:
                    //holiday camp
                    $instaFeed->cfg_title = 'Holiday Camp Instafeed';
                    $retVal['about'] = DAL_Config::getConfig(115);
                    $retVal['dayCamp'] = DAL_Config::getConfig(116);
                    break;
                case 14:
                    //1 on 1 training
                    $retVal['trainingIntro'] = DAL_Config::getConfig(118);
                    $retVal['about'] = DAL_Config::getConfig(117);
                case 15:
                    //Birthday party
                    $retVal['about'] = DAL_Config::getConfig(119);
                    $retVal['about2'] = DAL_Config::getConfig(120);
                    $retVal['keyElement'] = DAL_Config::getConfig(121);
                    $retVal['package'] = DAL_Config::getConfig(122);
                    $retVal['gallery'] = DAL_Config::getConfig(105);
                    $retVal['partyInclude'] = DAL_Config::getConfig(123);
                    $retVal['partyOptional'] = DAL_Config::getConfig(124);
                    break;
                default:
                    //location landing page
                    $retVal['faq'] = $this->dal_article->getQNAByCate(16);
                    $retVal['homeIntro'] = DAL_Config::getConfig(101);
                    $retVal['reason'] = DAL_Config::getConfig(106);
                    $retVal['footballBegining'] = DAL_Config::getConfig(107);
                    $retVal['article'] = Article::orderBy('created_at','desc')->first();
                    $retVal['service'] = DAL_Config::getConfig(130);

                    $_site = $retVal['site'];
                    $retVal['coach'] = $this->dal_site->getSiteInfo($_site->ms_id, _ObjectType::KEY_COACH_INFO);
                    $lstAssocialted = explode(',', $_site->ms_associated, 2);
                    $_site->associalted = MicroSite::whereIn('ms_id', $lstAssocialted)->get();

                    foreach ($_site->associalted as $academy) {
                        if ($_site->ms_latitude && $_site->ms_longitude && $academy->ms_latitude && $academy->ms_longitude)
                            $academy->distance = $this->getDistance($_site->ms_latitude, $_site->ms_longitude, $academy->ms_latitude, $academy->ms_longitude);
                        else $academy->distance = 0;
                        $_site->social = $this->dal_site->getSiteInfo($_site->ms_id, _ObjectType::KEY_SOCIAL_LINK);
                    }
                    $retVal['site'] = $_site;
                    break;
            }

            $retVal['instaFeed'] = $instaFeed;

        }
        return $retVal;
    }

    public function bookTraining($request)
    {
        $newBooking = [
            'bk_site' => $request->siteId,
            'bk_siteName' => $request->siteName,
            'bk_email' => $request->email,
            'bk_date' => Carbon::parse($request->date)->format('Y-m-d')
        ];
        if (Booking::create($newBooking)) {
            return _ApiCode::SUCCESS;
        }
        return _ApiCode::ERROR_UNKNOWN;
    }

    public function postSearchNearby($request)
    {
        $textSearch = $request->search;
        $lstAcademy = Searchy::search('micro_site')->fields('ms_name', 'ms_address')
            ->query($textSearch)->get();
        foreach ($lstAcademy as $academy) {
            $academy->distance = $this->getDistance($request->lat, $request->long, $academy->ms_latitude, $academy->ms_longitude);
            $academy->social = $this->dal_site->getSiteInfo($academy->ms_id, _ObjectType::KEY_SOCIAL_LINK);
            $academy->weeklyTraining = $this->dal_site->getSiteInfo($academy->ms_id, _ObjectType::KEY_WEEKLY_TRAINING);;
        }
        return [
            'query' => $textSearch,
            'data' => $lstAcademy
        ];
    }

    protected function getDistance($lat1, $lon1, $lat2, $lon2, $unit = "M")
    {
        if (($lat1 == $lat2) && ($lon1 == $lon2)) {
            return 0;
        } else {
            $theta = $lon1 - $lon2;
            $dist = sin(deg2rad($lat1)) * sin(deg2rad($lat2)) + cos(deg2rad($lat1)) * cos(deg2rad($lat2)) * cos(deg2rad($theta));
            $dist = acos($dist);
            $dist = rad2deg($dist);
            $miles = $dist * 60 * 1.1515;
            $unit = strtoupper($unit);

            if ($unit == "K") {
                return ($miles * 1.609344);
            } else if ($unit == "N") {
                return ($miles * 0.8684);
            } else {
                return $miles;
            }
        }
    }

    public function findNearAcademy($lat, $long)
    {
        $lstAcademy = MicroSite::all();
        $nearAcademy = $lstAcademy[0];
        foreach ($lstAcademy as $academy) {
            if ($academy->ms_latitude && $academy->ms_longitude) {
                $academy->distance = $this->getDistance($lat, $long, $academy->ms_latitude, $academy->ms_longitude);
                if (!$nearAcademy->distance || $nearAcademy->distance > $academy->distance) {
                    $academy->social = $this->dal_site->getSiteInfo($academy->ms_id, _ObjectType::KEY_SOCIAL_LINK);
                    $lstAssocialted = explode(',', $academy->ms_associated);
                    $academy->associalted = MicroSite::whereIn('ms_id', $lstAssocialted)->get();
                    $nearAcademy = $academy;
                }
            }
        }
        return $nearAcademy;
    }

    public function findNearbyAcademy($lat, $long)
    {
        $lstAcademy = MicroSite::take(10)->get();

        foreach ($lstAcademy as $academy) {
            if ($academy->ms_latitude && $academy->ms_longitude) {
                $academy->distance = $this->getDistance($lat, $long, $academy->ms_latitude, $academy->ms_longitude);
            }
        }
        return $lstAcademy;
    }

    public function sendEmail($request)
    {
//        try {
            switch ($request->type) {
                case "camp":
                    dispatch(new EnquiryCamp(['name' => $request->name, 'email' => $request->email]));
                    dispatch(new NotifyCamp([
                        'email' => $request->academyEmail,
                        'name' => $request->name,
                        'location' => $request->location,
                        'phone' => $request->phone,
                        'parentEmail' => $request->email,
                        'childName' => $request->childName,
                        'childBirth' => $request->childBirth,
                        'medicalInfo' => $request->medicalInfo,
                    ]));
                    break;
                case "party":
                    dispatch(new EnquiryParty(['name' => $request->name, 'email' => $request->email]));
                    dispatch(new NotifyParty([
                        'email' => $request->academyEmail,
                        'name' => $request->name,
                        'location' => $request->location,
                        'phone' => $request->phone,
                        'parentEmail' => $request->email,
                        'package' => $request->package,
                        'date' => $request->date,
                        'comment' => $request->comment,
                    ]));
                    break;
                case "contact":
//                    dispatch(new EnquiryContact(['name' => $request->name, 'email' => $request->email,"academyPhone"=>$request->academyPhone,"academyName"=>$request->academyName]));
                    dispatch(new NotifyContact([
                        'academyName' => $request->academyName,
                        'email' => $request->academyEmail,
                        'customerEmail' => $request->email,
                        'name' => $request->name,
                        'phone' => $request->phone,
                        'customerMessage' => $request->message,
                        'nature' => $request->nature,
                    ]));
                    break;
                default:
                    break;
            }
            return "success";
//        } catch (\Exception $e) {
//            return "success";
//        }
    }

}
