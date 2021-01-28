<?php
/**
 * Created by PhpStorm.
 * User: QuanVH
 * Date: 17/02/2017
 * Time: 21:45 CH
 */

namespace App\Http\DAL;


use App\Models\Feedback;
use App\Models\MicroSite;
use App\Models\SiteData;
use Illuminate\Support\Facades\DB;

class DAL_Site
{
    public function createMicroSite($data = array())
    {
        return MicroSite::create($data);
    }

    public function getListSitePublic(){
        return MicroSite::where('ms_status',1)->get();
    }

    public function getDetailSite($siteId)
    {
        return MicroSite::where('ms_id', $siteId)->orWhere('ms_alias',$siteId)->with('sub_page')->first();
    }

    public function getDefaultSiteInfo($key)
    {
        $retVal = [];
        switch ($key) {
            case "Social link":
                $retVal = [
                    ["name" => "Facebook", "link" => ""],
                    ["name" => "Instagram", "link" => ""],
                    ["name" => "Twitter", "link" => ""],
                    ["name" => "Linkin", "link" => ""],
                ];
                break;
            case "About us":
                $retVal = ["text" => ""];
                break;
            case "Coach info":
                $retVal = [
                    "name" => "",
                    "avatar" => "",
                    "description" => "",
                    "detail" => "",
                    "skill" => [
                        "Form" => "",
                        "Experience" => "",
                        "Speed" => "",
                        "Goals" => "",
                        "Attack" => "",
                        "Defence" => ""
                    ],
                    "staff" => []
                ];
                break;
            case "1on1 Coaching":
                $retVal = [
                    "address" => [
                        "text" => "",
                        "locationId" => "",
                        "latitude" => "",
                        "longitude" => "",
                        "link embed" => ""
                    ],
                    "head" => "",
                    "data" => "",
                ];
                break;
            case "Testimonials":
                $retVal = [];
                break;
            case "Weekly training":
                $retVal = [
                    "address" => [
                        "text" => "",
                        "locationId" => "",
                        "latitude" => "",
                        "longitude" => "",
                        "link embed" => ""
                    ],
                    "price" => [
                        "amount" => "",
                        "unit" => "",
                        "price" => "",
                        "currency" => ""
                    ],
                    "class" => []
                ];
                break;
            case "Session cost":
                $retVal = [
                    "one" => "",
                    "block" => "",
                ];
                break;
            case "Holiday camp":
                $retVal = [
                    "date" => [],
                    "calendar" => []
                ];
                break;
            case "Sub page":
                $retVal = [];
                break;
            default:
                break;
        }
        return $retVal;
    }

    public function getSiteInfo($siteId, $key)
    {
        $siteInfo = SiteData::where('dt_site', $siteId)->where('dt_name', $key)->first();
        if ($siteInfo && $siteInfo->dt_id) {
            return $siteInfo->dt_value;
        }
        return $this->getDefaultSiteInfo($key);
    }

    public function setSiteInfo($siteId, $key, $value)
    {
        $siteInfo = SiteData::where('dt_site', $siteId)->where('dt_name', $key)->first();
        if ($siteInfo && $siteInfo->dt_id) {
            $siteInfo->dt_value = $value;
            $siteInfo->save();
            return $siteInfo;
        } else {
            return SiteData::create([
                'dt_site' => $siteId,
                'dt_name' => $key,
                'dt_value' => $value
            ]);
        }
    }

    public function getListTestimonial($siteId = 0, $num = 0)
    {
        $query = Feedback::orderBy('created_at', 'desc');
        if ($siteId != 0) {
            $query = $query->where('fb_site', $siteId);
        }
        if ($num != 0) {
            $query = $query->take($num);
        }
        return $query->get();
    }

    public function getFbParent()
    {
        return Feedback::orderBy("created_at",'desc')->first();
        return Feedback::where(DB::raw('LOWER(fb_role)'), 'like', '%parent%')
            ->orderBy('created_at', 'desc')
            ->first();
    }

    public function createNewTestimonial($array)
    {
        return Feedback::create($array);
    }

    public function getDetailTestimonial($id)
    {
        return Feedback::find($id);
    }

    public function deleteTestimonial($id)
    {
        return Feedback::where('fb_id', $id)->delete();
    }
}
