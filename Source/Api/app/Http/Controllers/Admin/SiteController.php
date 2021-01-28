<?php

namespace App\Http\Controllers\Admin;

use App\Helper\_ApiCode;
use App\Http\Business\Admin\BzSite;
use App\Http\Controllers\Controller;
use App\Models\User_detail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class SiteController extends Controller
{
    protected $bzSite;
    public function __construct(){
        parent::__construct();
        $this->bzSite = new BzSite();
    }

    public function getListMicro(){
        return view('admin.site.list_site');
    }
    public function getListMicroFr(){
        $lstSite = $this->bzSite->getListMicroFr();
        return view('admin.site.list_site_fr',compact('lstSite'));
    }

    public function getListMicroData(){
        return $this->bzSite->getListMicroData();
    }

    public function getAddSite(){
        return view("admin.site.add_site");
    }

    public function getDeleteSite($siteId){
        $errorCode = $this->bzSite->getDeleteSite($siteId);
        if($errorCode == _ApiCode::SUCCESS)
            return redirect()->back()->with(['success_message' => 'Microsite deleted']);
        else
            return redirect()->back()->with(['error_message' => 'Can not delete microsite']);
    }

    public function postAddSite(Request $request){
        $errorCode = $this->bzSite->postAddSite($request);
        if($errorCode == _ApiCode::SUCCESS)
            return redirect()->back()->with(['success_message' => 'Microsite created']);
        else
            return redirect()->back()->with(['error_message' => 'Can not create microsite']);
    }

    public function getEditSiteInfo($siteId){
        $data = $this->bzSite->getEditSiteInfo($siteId);
        $siteCheck = User_detail::where('dt_user',Auth::user()->user_id)
            ->where('dt_name','academy')->where('dt_value',$siteId)->first();
        if(Auth::user()->hasRole(['Super Admin', 'Master Admin','Sub Admin']) ||
            (Auth::user()->hasRole('Franchise Admin') && $siteCheck && $siteCheck->dt_id ) ){
            return view('admin.site.edit_site_info',compact('data'));
        }
        return response('Unauthorized.', 403);;
    }

    public function postEditSiteInfo(Request $request){
        $errorCode = $this->bzSite->postEditSiteInfo($request);
        if($errorCode == _ApiCode::SUCCESS)
            return redirect()->back()->with(['success_message' => 'Information updated']);
        else
            return redirect()->back()->with(['error_message' => 'Update info failed']);
    }

    public function postAddSubPage(Request $request){
        return $this->bzSite->postAddSubPage($request);
    }

    public function postEditSubPage(Request $request){
        return $this->bzSite->postEditSubPage($request);
    }

    public function postDeleteSubPage(Request $request){
        return $this->bzSite->postDeleteSubPage($request);
    }

    public function postUpdateAddress(Request $request){
        $errorCode = $this->bzSite->postUpdateAddress($request);
        return $errorCode;
    }

    public function getListTesti($siteId){
        $data = $this->bzSite->getListTestimonial($siteId);
        return view('admin.site.list_testi',compact('data'));
    }

    public function getEditTesti($siteId, $testiId){
        $testi = $this->bzSite->getDetailTesti($testiId);
        return view('admin.site.edit_testi',compact('testi'));
    }

    public function postEditTesti(Request $request){
        $errorCode = $this->bzSite->postEditTesti($request);
        if($errorCode == _ApiCode::SUCCESS)
            return redirect()->back()->with(['success_message' => 'Successful']);
        else
            return redirect()->back()->with(['error_message' => 'Failed. Please try again later']);

    }

    public function getAddTesti($siteId){
        return view('admin.site.add_testi',compact('siteId'));
    }

    public function postAddTesti(Request $request){
        $errorCode = $this->bzSite->postAddTesti($request);
        if($errorCode == _ApiCode::SUCCESS)
            return redirect()->back()->with(['success_message' => 'Successful']);
        else
            return redirect()->back()->with(['error_message' => 'Failed. Please try again later']);
    }

    public function getDeleteTesti($siteId, $testiId){
        $errorCode = $this->bzSite->getDeleteTesti($testiId);
        if($errorCode == _ApiCode::SUCCESS)
            return redirect()->back()->with(['success_message' => 'Successful']);
        else
            return redirect()->back()->with(['error_message' => 'Failed. Please try again later']);
    }

    public function postAddStaff(Request $request){
        $errorCode = $this->bzSite->postAddStaff($request);
        if($errorCode == _ApiCode::SUCCESS)
            return redirect()->back()->with(['success_message' => 'Successful']);
        else
            return redirect()->back()->with(['error_message' => 'Failed. Please try again later']);
    }

    public function postEditStaff(Request $request){
        $errorCode = $this->bzSite->postEditStaff($request);
        if($errorCode == _ApiCode::SUCCESS)
            return redirect()->back()->with(['success_message' => 'Successful']);
        else
            return redirect()->back()->with(['error_message' => 'Failed. Please try again later']);
    }

    public function getListNews($siteId){
        $data = $this->bzSite->getListNews($siteId);
        return view('admin.site.list_news',compact('data'));
    }

    public function getListFaq($siteId){
        $data = $this->bzSite->getListFaq($siteId);
        return view('admin.site.list_faq',compact('data'));
    }

    public function getCoachInfo($siteId){
        $data = $this->bzSite->getEditSiteInfo($siteId);
        return view('admin.site.coach_info',compact('data'));
    }

    public function postCoachInfo(Request $request){
        $errorCode = $this->bzSite->postCoachInfo($request);
        if($errorCode == _ApiCode::SUCCESS)
            return redirect()->back()->with(['success_message' => 'Successful']);
        else
            return redirect()->back()->with(['error_message' => 'Failed. Please try again later']);
    }

    public function getWeeklyTraining($siteId){
        $data = $this->bzSite->getEditSiteInfo($siteId);
        return view('admin.site.weekly_training',compact('data'));
    }

    public function updatePriceWeekly(Request $request){
        $errorCode = $this->bzSite->updatePriceWeekly($request);
        if($errorCode == _ApiCode::SUCCESS)
            return redirect()->back()->with(['success_message' => 'Successful']);
        else
            return redirect()->back()->with(['error_message' => 'Failed. Please try again later']);
    }

    public function updateAddressWeekly(Request $request){
        $errorCode = $this->bzSite->updateAddressWeekly($request);
        if($errorCode == _ApiCode::SUCCESS)
            return redirect()->back()->with(['success_message' => 'Successful']);
        else
            return redirect()->back()->with(['error_message' => 'Failed. Please try again later']);
    }

    public function createClassWeekly(Request $request){
        $errorCode = $this->bzSite->createClassWeekly($request);
        if($errorCode == _ApiCode::SUCCESS)
            return redirect()->back()->with(['success_message' => 'Successful']);
        else
            return redirect()->back()->with(['error_message' => 'Failed. Please try again later']);
    }

    public function updateClassWeekly(Request $request){
        $errorCode = $this->bzSite->updateClassWeekly($request);
        if($errorCode == _ApiCode::SUCCESS)
            return redirect()->back()->with(['success_message' => 'Successful']);
        else
            return redirect()->back()->with(['error_message' => 'Failed. Please try again later']);
    }

    public function getHolidayCamp($siteId){
        $data = $this->bzSite->getEditSiteInfo($siteId);
        return view('admin.site.holiday_camp',compact('data'));
    }

    public function postCreateCamp(Request $request){
        $errorCode = $this->bzSite->postCreateCamp($request);
        if($errorCode == _ApiCode::SUCCESS)
            return redirect()->back()->with(['success_message' => 'Successful']);
        else
            return redirect()->back()->with(['error_message' => 'Failed. Please try again later']);
    }

    public function postUpdateCamp(Request $request){
        $errorCode = $this->bzSite->postUpdateCamp($request);
        if($errorCode == _ApiCode::SUCCESS)
            return redirect()->back()->with(['success_message' => 'Successful']);
        else
            return redirect()->back()->with(['error_message' => 'Failed. Please try again later']);
    }


    public function postCreateCalendar(Request $request){
        $errorCode = $this->bzSite->postCreateCalendar($request);
        if($errorCode == _ApiCode::SUCCESS)
            return redirect()->back()->with(['success_message' => 'Successful']);
        else
            return redirect()->back()->with(['error_message' => 'Failed. Please try again later']);
    }

    public function postUpdateCalendar(Request $request){
        $errorCode = $this->bzSite->postUpdateCalendar($request);
        if($errorCode == _ApiCode::SUCCESS)
            return redirect()->back()->with(['success_message' => 'Successful']);
        else
            return redirect()->back()->with(['error_message' => 'Failed. Please try again later']);
    }



}
