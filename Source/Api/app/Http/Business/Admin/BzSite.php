<?php
/**
 * Created by PhpStorm.
 * User: QuanVH
 * Date: 26/10/2016
 * Time: 21:49 CH
 */

namespace App\Http\Business\Admin;


use App\Helper\_ApiCode;
use App\Helper\_ObjectType;
use App\Helper\Common;
use App\Http\DAL\DAL_Config;
use App\Models\MicroSite;
use App\Models\SubPage;
use App\Models\User_detail;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Str;
use TomLingham\Searchy\Facades\Searchy;

class BzSite extends BzAdmin
{
    public function getListMicroData()
    {
        $number = $_GET['length'];
        $search = trim($_GET['search']['value']);
        $start = $_GET['start'];
        $page = round($start / $number) + 1;
        Common::SetCurrentPage($page);

        $query = MicroSite::whereIn('ms_status', [DAL_Config::USER_STATUS_PUBLIC]);

        if ($search != '') {
            $lstUser = Searchy::search('micro_site')->fields('ms_name', 'ms_email', 'ms_phone')
                ->query($search)->getQuery()->get()->pluck('ms_id')->toArray();
            $query = $query->whereIn('ms_id', $lstUser);
        }

        return $query->orderBy('created_at', 'desc')
            ->paginate(DAL_Config::NUM_PER_PAGE_SITE);
    }

    public function getListMicroFr(){
        $lstId = User_detail::where('dt_user',Auth::user()->user_id)->pluck('dt_value');
        return MicroSite::whereIn('ms_id',$lstId)->where('ms_status',1)->get();
    }

    public function getEditSiteInfo($siteId)
    {
        return [
            'site' => $this->dal_site->getDetailSite($siteId),
            'Social link' => $this->dal_site->getSiteInfo($siteId, _ObjectType::KEY_SOCIAL_LINK),
            'About us' => $this->dal_site->getSiteInfo($siteId, _ObjectType::KEY_ABOUT_US),
            'Coach info' => $this->dal_site->getSiteInfo($siteId, _ObjectType::KEY_COACH_INFO),
            'Weekly training' => $this->dal_site->getSiteInfo($siteId, _ObjectType::KEY_WEEKLY_TRAINING),
            'Session cost' => $this->dal_site->getSiteInfo($siteId, _ObjectType::KEY_SESSION_COST),
            '1on1 Coaching' => $this->dal_site->getSiteInfo($siteId, _ObjectType::KEY_1ON1_COACHING),
            'Holiday camp' => $this->dal_site->getSiteInfo($siteId, _ObjectType::KEY_HOLIDAY_CAMP),
        ];
    }

    public function postUpdateAddress($request)
    {
        $siteId = $request->siteId;
        $site = $this->dal_site->getDetailSite($siteId);
        $site->ms_address = $request->address;
        $site->ms_latitude = $request->lat;
        $site->ms_longitude = $request->lng;
        $site->ms_locationId = $request->place_id;
//        $site->ms_postal = $request->postalCode;
        if ($site->save()) {
            return _ApiCode::SUCCESS;
        }
        return _ApiCode::ERROR_UNKNOWN;
    }

    public function getListTestimonial($siteId)
    {
        return [
            'site' => $this->dal_site->getDetailSite($siteId),
            'lstTesti' => $this->dal_site->getListTestimonial($siteId)
        ];
    }

    public function getDetailTesti($testiId)
    {
        return $this->dal_site->getDetailTestimonial($testiId);
    }

    public function postEditTesti($request)
    {
//        try {
        $testiId = $request->lbId;
        $testimonial = $this->dal_site->getDetailTestimonial($testiId);
        $file = Input::file('imgFeature');
        if ($file) {
            $alias = $this->CommonUpload(DAL_Config::IMAGE_ALIAS_SITE, $file);
            if ($alias) {
                $this->imageCrop->MakeUserThumb($alias);
                $testimonial->fb_image = $alias;
            }
        }
        $testimonial->fb_name = $request->txtName;
        $testimonial->fb_role = $request->txtRole;
        $testimonial->fb_content = $request->txtContent;
        $testimonial->save();

        return _ApiCode::SUCCESS;


//        } catch (\Exception $e) {
//            //log excetion
//            \Log::error($e->getMessage(),$e->getTrace());
//            return _ApiCode::ERROR_UNKNOWN;
//        }
    }

    public function getDeleteTesti($testiId)
    {
        $this->dal_site->deleteTestimonial($testiId);
        return _ApiCode::SUCCESS;
    }

    public function postAddTesti($request)
    {
//        try {
        $siteId = $request->lbId;
        $file = Input::file('imgFeature');

        $image = 'img/no-image.jpg';
        if ($file) {
            $alias = $this->CommonUpload(DAL_Config::IMAGE_ALIAS_SITE, $file);
            if ($alias) {
                $this->imageCrop->MakeUserThumb($alias);
                $image = $alias;
            }
        }
        $newTesti = [
            'fb_site' => $siteId,
            'fb_image' => $image,
            'fb_name' => $request->txtName,
            'fb_role' => $request->txtRole,
            'fb_content' => $request->txtContent,
        ];


        $this->dal_site->createNewTestimonial($newTesti);
        return _ApiCode::SUCCESS;

//        } catch (\Exception $e) {
//            //log excetion
//            \Log::error($e->getMessage(),$e->getTrace());
//            return _ApiCode::ERROR_UNKNOWN;
//        }
    }

    public function postAddStaff($request)
    {
        try {
            $CoachInfo = $this->dal_site->getSiteInfo($request->siteId, _ObjectType::KEY_COACH_INFO);
            if (array_key_exists("staff", $CoachInfo))
                $staff = $CoachInfo['staff'];
            else $staff = [];
            $file = Input::file('file');
            if ($file) {
                $alias = $this->CommonUpload(DAL_Config::IMAGE_ALIAS_USER, $file);
                if ($alias) {
                    $this->imageCrop->MakeUserThumb($alias);
                    array_push($staff, [
                        'name' => $request->name,
                        'position' => $request->position,
                        'image' => $alias,
                        'id' => count($staff) + 1
                    ]);
                }
            }
            $CoachInfo['staff'] = $staff;
            $this->dal_site->setSiteInfo($request->siteId, _ObjectType::KEY_COACH_INFO, $CoachInfo);
            return _ApiCode::SUCCESS;
        } catch (\Exception $e) {
        }
    }

    public function postEditStaff($request)
    {
        try {
            $CoachInfo = $this->dal_site->getSiteInfo($request->siteId, _ObjectType::KEY_COACH_INFO);
            $staff = [];
            $file = Input::file('file');
            foreach ($CoachInfo['staff'] as $staffItem) {
                if ($staffItem['id'] == $request->id) {
                    if ($file) {
                        $alias = $this->CommonUpload(DAL_Config::IMAGE_ALIAS_USER, $file);
                        if ($alias) {
                            $this->imageCrop->MakeUserThumb($alias);
                            $staffItem['image'] = $alias;
                        }
                    }
                    $staffItem['name'] = $request->name;
                    $staffItem['position'] = $request->position;
                }
                array_push($staff, $staffItem);
            }
            $CoachInfo['staff'] = $staff;
            $this->dal_site->setSiteInfo($request->siteId, _ObjectType::KEY_COACH_INFO, $CoachInfo);
            return _ApiCode::SUCCESS;
        } catch (\Exception $e) {
        }
    }

    public function getListNews($siteId)
    {
        return [
            'site' => $this->dal_site->getDetailSite($siteId),
            'lstArticle' => $this->dal_article->getListSiteArticle($siteId)
        ];
    }

    public function getListFaq($siteId)
    {
        return [
            'site' => $this->dal_site->getDetailSite($siteId),
            'lstFaq' => $this->dal_article->getListQNA($siteId)
        ];
    }

    public function getDeleteSite($siteId)
    {
        $site = $this->dal_site->getDetailSite($siteId);
        $site->ms_status = -1;
        return $site->save();
    }

    public function postAddSite($request)
    {
        try {
            $siteData = [];
            $siteData['ms_name'] = $request->txtName;
            if($request->txtAlias != '') $siteData['ms_alias'] = Common::createSlug($request->txtAlias);
            else $siteData['ms_alias'] = Common::createSlug($request->txtName);
            $siteData['ms_email'] = $request->txtEmail;
            $siteData['ms_phone'] = $request->txtPhone;

            $siteData['ms_address'] = $request->txtAddress;
            $siteData['ms_latitude'] = $request->txtLat;
            $siteData['ms_longitude'] = $request->txtLng;
            $siteData['ms_locationId'] = $request->txtPlaceId;
            $siteData['ms_postal'] = $request->txtPostal;

            $siteData['ms_region'] = $request->sltRegion;
            $siteData['pa_locationId'] = $request->txtLocationId;
            $siteData['pa_companyId'] = $request->txtCompanyId;
            $siteData['ms_associated'] = $request->txtAssociatedId;
            $siteData['ms_trial'] = $request->sltTrial;
            $siteData['ms_postal'] = $request->txtPostal;

            $file = Input::file('imgFeature');
            if ($file) {
                $alias = $this->CommonUpload(DAL_Config::IMAGE_ALIAS_SITE, $file);
                if ($alias) {
                    $this->imageCrop->MakeSiteThumb($alias);
                    $siteData['ms_avatar'] = $alias;
                }
            }

            $social = [
                ['name' => 'Facebook',
                    'link' => trim($request->txtFacebook)],
                [
                    'name' => 'Instagram',
                    'link' => trim($request->txtInstagram)
                ],
                ["name" => "Twitter", "link" => trim($request->txtTwitter)],
                ["name" => "Linkin", "link" => trim($request->txtLinkin)],
            ];

            if ($newSite = $this->dal_site->createMicroSite($siteData)) {
                $this->dal_site->setSiteInfo($newSite->ms_id, _ObjectType::KEY_SOCIAL_LINK, $social);
                $this->dal_site->setSiteInfo($newSite->ms_id, _ObjectType::KEY_ABOUT_US, ['text' => $request->txtAbout]);

                return _ApiCode::SUCCESS;
            }
            return _ApiCode::ERROR_UNKNOWN;
        } catch (\Exception $e) {
            //log excetion
            \Log::error($e->getMessage(), $e->getTrace());
            return _ApiCode::ERROR_UNKNOWN;
        }
    }

    public function postEditSiteInfo($request)
    {
        try {
            $siteId = $request->lbId;
            $site = $this->dal_site->getDetailSite($siteId);
            $site->ms_name = $request->txtName;

            if($request->txtAlias != '') $site->ms_alias = Common::createSlug($request->txtAlias);
            else $site->ms_alias = Common::createSlug($request->txtName);
            $site->ms_email = $request->txtEmail;
            $site->ms_phone = $request->txtPhone;
//            $site->ms_address = $request->txtAddress;
            $site->ms_region = $request->sltRegion;
            $site->pa_locationId = $request->txtLocationId;
            $site->pa_companyId = $request->txtCompanyId;
            $site->ms_associated = $request->txtAssociatedId;
            $site->ms_trial = $request->sltTrial;
            $site->ms_postal = $request->txtPostal;

            $file = Input::file('imgFeature');
            if ($file) {
                $this->imageCrop->RemoveThumb($site->ms_avatar);
                $alias = $this->CommonUpload(DAL_Config::IMAGE_ALIAS_SITE, $file);
                if ($alias) {
                    $this->imageCrop->MakeSiteThumb($alias);
                    $site->ms_avatar = $alias;
                }
            }

            $social = [
                ['name' => 'Facebook',
                    'link' => trim($request->txtFacebook)],
                [
                    'name' => 'Instagram',
                    'link' => trim($request->txtInstagram)
                ],
                ["name" => "Twitter", "link" => trim($request->txtTwitter)],
                ["name" => "Linkin", "link" => trim($request->txtLinkin)],
            ];
            $this->dal_site->setSiteInfo($siteId, _ObjectType::KEY_SOCIAL_LINK, $social);
            $this->dal_site->setSiteInfo($siteId, _ObjectType::KEY_ABOUT_US, ['text' => $request->txtAbout]);
            $this->dal_site->setSiteInfo($siteId, _ObjectType::KEY_SESSION_COST, [
                "one" => $request->txtOneOff,
                "block" => $request->txtBlockOf4,
            ]);

            if ($site->save()) {
                return _ApiCode::SUCCESS;
            }
            return _ApiCode::ERROR_UNKNOWN;
        } catch (\Exception $e) {
            //log excetion
            \Log::error($e->getMessage(), $e->getTrace());
            return _ApiCode::ERROR_UNKNOWN;
        }
    }

    public function postAddSubPage($request)
    {
        if (SubPage::create([
            'sub_site' => $request->siteId,
            'sub_name' => $request->name,
            'sub_alias' => Common::createSlug($request->url)
        ])) return _ApiCode::SUCCESS;
        return _ApiCode::ERROR_UNKNOWN;
    }

    public function postEditSubPage($request)
    {
        $subPage = SubPage::find($request->page);
        if ($subPage && $subPage->sub_id) {
            $subPage->sub_name = $request->name;
            $subPage->sub_alias = $request->url;
            $subPage->save();
            return _ApiCode::SUCCESS;
        }
        return _ApiCode::ERROR_UNKNOWN;
    }
    public function postDeleteSubPage($request)
    {
        $subPage = SubPage::find($request->page);
        if ($subPage && $subPage->sub_id) {
            $subPage->delete();
            return _ApiCode::SUCCESS;
        }
        return _ApiCode::ERROR_UNKNOWN;
    }

    public function postCoachInfo($request)
    {
        $siteId = $request->lbId;
        $CoachInfo = $this->dal_site->getSiteInfo($siteId, _ObjectType::KEY_COACH_INFO);
        $CoachInfo['name'] = $request->txtName;
        $CoachInfo['description'] = $request->txtDes;
        $CoachInfo['detail'] = $request->txtDetail;
        $CoachInfo['skill'] = [
            'Form' => $request->txtForm,
            'Experience' => $request->txtExperience,
            'Speed' => $request->txtSpeed,
            'Goals' => $request->txtGoals,
            'Attack' => $request->txtAttack,
            'Defence' => $request->txtDefence,
        ];
        $file = Input::file('imgFeature');
        if ($file) {
            if (isset($CoachInfo['avatar'])) $this->imageCrop->RemoveThumb($CoachInfo['avatar']);
            $alias = $this->CommonUpload(DAL_Config::IMAGE_ALIAS_USER, $file);
            if ($alias) {
                $this->imageCrop->MakeUserThumb($alias);
                $CoachInfo['avatar'] = $alias;
            }
        }
        $this->dal_site->setSiteInfo($siteId, _ObjectType::KEY_COACH_INFO, $CoachInfo);

        $coaching = $this->dal_site->getSiteInfo($siteId, _ObjectType::KEY_1ON1_COACHING);
        $coaching['address']['text'] = $request->txtAddress;
        $this->dal_site->setSiteInfo($siteId, _ObjectType::KEY_1ON1_COACHING, $coaching);

        return _ApiCode::SUCCESS;
    }

    public function updatePriceWeekly($request)
    {
        $siteId = $request->lbId;
        $weeklyTraining = $this->dal_site->getSiteInfo($siteId, _ObjectType::KEY_WEEKLY_TRAINING);
        $priceTraining = $weeklyTraining['price'];
        $priceTraining['unit'] = 'weeks';
        $priceTraining['amount'] = $request->txtAmount;
        $priceTraining['price'] = $request->txtPrice;
        $priceTraining['currency'] = '£';
        $weeklyTraining['price'] = $priceTraining;
        $this->dal_site->setSiteInfo($siteId, _ObjectType::KEY_WEEKLY_TRAINING, $weeklyTraining);
        return _ApiCode::SUCCESS;
    }

    public function updateAddressWeekly($request)
    {
        $siteId = $request->lbId;
        $weeklyTraining = $this->dal_site->getSiteInfo($siteId, _ObjectType::KEY_WEEKLY_TRAINING);
        $addressTraining = $weeklyTraining['address'];
        $addressTraining['text'] = $request->txtAddress;
        $weeklyTraining['address'] = $addressTraining;
        $this->dal_site->setSiteInfo($siteId, _ObjectType::KEY_WEEKLY_TRAINING, $weeklyTraining);
        return _ApiCode::SUCCESS;
    }

    public function createClassWeekly($request)
    {
        $siteId = $request->lbId;
        $weeklyTraining = $this->dal_site->getSiteInfo($siteId, _ObjectType::KEY_WEEKLY_TRAINING);
        $classTraining = $weeklyTraining['class'];

        array_push($classTraining, [
            'id' => Str::uuid(),
            "date" => $request->sltDate,
            "timeStart" => $request->txtTimeStart,
            "timeEnd" => $request->txtTimeEnd,
            "ageStart" => $request->txtAgeStart,
            "ageEnd" => $request->txtAgeEnd,
        ]);

        $weeklyTraining['class'] = $classTraining;
        $this->dal_site->setSiteInfo($siteId, _ObjectType::KEY_WEEKLY_TRAINING, $weeklyTraining);
        return _ApiCode::SUCCESS;
    }

    public function updateClassWeekly($request)
    {
        $siteId = $request->lbId;
        $weeklyTraining = $this->dal_site->getSiteInfo($siteId, _ObjectType::KEY_WEEKLY_TRAINING);
        $classTraining = $weeklyTraining['class'];
        $editedClass = [];

        foreach ($classTraining as $class) {
            if ($class['id'] == $request->classId) {
                $class['date'] = $request->sltDate;
                $class['timeStart'] = $request->txtTimeStart;
                $class['timeEnd'] = $request->txtTimeEnd;
                $class['ageStart'] = $request->txtAgeStart;
                $class['ageEnd'] = $request->txtAgeEnd;
            }
            array_push($editedClass, $class);
        }

        $weeklyTraining['class'] = $editedClass;
        $this->dal_site->setSiteInfo($siteId, _ObjectType::KEY_WEEKLY_TRAINING, $weeklyTraining);
        return _ApiCode::SUCCESS;
    }

    public function postCreateCamp($request)
    {
        $siteId = $request->lbId;
        $holidayCamp = $this->dal_site->getSiteInfo($siteId, _ObjectType::KEY_HOLIDAY_CAMP);
        $dateCamp = $holidayCamp['date'];

        array_push($dateCamp, [
            'id' => Str::uuid(),
            "dateStart" => $request->txtDateStart,
            "dateEnd" => $request->txtDateEnd,
        ]);

        $holidayCamp['date'] = $dateCamp;
        $this->dal_site->setSiteInfo($siteId, _ObjectType::KEY_HOLIDAY_CAMP, $holidayCamp);
        return _ApiCode::SUCCESS;
    }

    public function postUpdateCamp($request)
    {
        $siteId = $request->lbId;
        $holidayCamp = $this->dal_site->getSiteInfo($siteId, _ObjectType::KEY_HOLIDAY_CAMP);
        $dateCamp = $holidayCamp['date'];
        $editedCamp = [];

        foreach ($dateCamp as $camp) {
            if ($camp['id'] == $request->campId) {
                $camp['dateStart'] = $request->txtDateStart;
                $camp['dateEnd'] = $request->txtDateEnd;
            }
            array_push($editedCamp, $camp);
        }

        $holidayCamp['date'] = $editedCamp;
        $this->dal_site->setSiteInfo($siteId, _ObjectType::KEY_HOLIDAY_CAMP, $holidayCamp);
        return _ApiCode::SUCCESS;
    }

    public function postCreateCalendar($request)
    {
        $siteId = $request->lbId;
        $holidayCamp = $this->dal_site->getSiteInfo($siteId, _ObjectType::KEY_HOLIDAY_CAMP);
        $calendarCamp = $holidayCamp['calendar'];

        array_push($calendarCamp, [
            "id" => Str::uuid(),
            "timeStart" => $request->txtTimeStart,
            "timeEnd" => $request->txtTimeEnd,
            "title" => $request->txtTitle,
            "explain" => $request->txtExplain,
        ]);

        $holidayCamp['calendar'] = $calendarCamp;
        $this->dal_site->setSiteInfo($siteId, _ObjectType::KEY_HOLIDAY_CAMP, $holidayCamp);
        return _ApiCode::SUCCESS;
    }

    public function postUpdateCalendar($request)
    {
        $siteId = $request->lbId;
        $holidayCamp = $this->dal_site->getSiteInfo($siteId, _ObjectType::KEY_HOLIDAY_CAMP);
        $dateCamp = $holidayCamp['calendar'];
        $editedCal = [];

        foreach ($dateCamp as $calendar) {
            if ($calendar['id'] == $request->calId) {
                $calendar['timeStart'] = $request->txtTimeStart;
                $calendar['timeEnd'] = $request->txtTimeEnd;
                $calendar['title'] = $request->txtTitle;
                $calendar['explain'] = $request->txtExplain;
            }
            array_push($editedCal, $calendar);
        }

        $holidayCamp['calendar'] = $editedCal;
        $this->dal_site->setSiteInfo($siteId, _ObjectType::KEY_HOLIDAY_CAMP, $holidayCamp);
        return _ApiCode::SUCCESS;
    }
}
