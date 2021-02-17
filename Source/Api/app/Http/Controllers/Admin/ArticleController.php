<?php

namespace App\Http\Controllers\Admin;

use App\Helper\_ApiCode;
use App\Http\Business\Admin\BzArticle;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;


class ArticleController extends Controller
{
    protected $bzArticle;
    public function __construct(){
        parent::__construct();
        $this->bzArticle = new BzArticle();
    }

    #region *** ARTICLE ***

    public function getListArticle($cateId=0){
        $lstArticle = $this->bzArticle->getListArticle($cateId);
        return view('admin.article.list_article', compact('lstArticle'));
    }

    public function getListArticleData(){
        return $this->bzArticle->getListArticleData();
    }

    public function getEditArticle($atcId){
        $data = $this->bzArticle->getEditArticle($atcId);
        return view('admin.article.edit_article', compact('data'));
    }

    public function postEditArticle(Request $request){
        $errorCode = $this->bzArticle->postEditArticle($request);
        if($errorCode == _ApiCode::SUCCESS)
            return redirect()->back()->with(['success_message' => 'Edit news successfully']);
        else
            return redirect()->back()->with(['error_message' => 'Edit news not successfully']);
    }

    public function getAddArticle($siteId=0){
        return view('admin.article.add_article',compact('siteId'));
    }

    public function postAddArticle(Request $request){
        $errorCode = $this->bzArticle->postAddArticle($request);
        if($errorCode == _ApiCode::SUCCESS)
            return redirect()->back()->with(['success_message' => 'Add news successfully']);
        else
            return redirect()->back()->with(['error_message' => 'Add news not successfully']);
    }

    public function getDeleteArticle($atcId){
        $errorCode = $this->bzArticle->getDeleteArticle($atcId);
        if($errorCode == _ApiCode::SUCCESS)
            return redirect()->back()->with(['success_message' => 'Delete news successfully']);
        else
            return redirect()->back()->with(['error_message' => 'Delete news not successfully']);
    }
    #endregion

    #region  Question and Answer
    public function getListQNA(){
        return view('admin.article.list_qna');
    }

    public function getListQNAData(){
        return $this->bzArticle->getListQNAData();
    }

    public function getAddQNA($siteId=0){
        return view('admin.article.add_qna', compact('siteId'));
    }

    public function postAddQNA(Request $request){
        $errorCode = $this->bzArticle->postAddQNA($request);
        if($errorCode == _ApiCode::SUCCESS)
            return redirect()->back()->with(['success_message' => 'Success']);
        else
            return redirect()->back()->with(['error_message' => 'Failed. Please try again later']);
    }

    public function getEditQNA($atcId){
        $article = $this->bzArticle->getEditArticle($atcId);
        return view('admin.article.edit_qna',compact('article'));
    }

    public function postEditQNA(Request $request){
        $errorCode = $this->bzArticle->postEditQNA($request);
        if($errorCode == _ApiCode::SUCCESS)
            return redirect()->back()->with(['success_message' => 'Success']);
        else
            return redirect()->back()->with(['error_message' => 'Failed. Please try again later']);
    }

    public function getDeleteQNA($atcId){
        $errorCode = $this->bzArticle->getDeleteArticle($atcId);
        if($errorCode == _ApiCode::SUCCESS)
            return redirect()->back()->with(['success_message' => 'Success']);
        else
            return redirect()->back()->with(['error_message' => 'Failed. Please try again later']);
    }
    #endregion


    #region *** CATE ARTICLE ***
    /*
     * Get list cate article by type
     * id: type article
     * function getListCate
     */
    public function getListCate(){
        return view('admin.article.list_cate');
    }

    /*
     * Get list cate article by type
     * get data bind to datatable
     * id: type article
     * function getListCateData
     */
    public function getListCateData(){
        return $this->bzArticle->getListCateAjax();
    }

    /*
     * Edit cate article
     * cateId: cate id
     * function getEditCate
     */
    public function getEditCate($cateId){
        $data = $this->bzArticle->getEditCate($cateId);
        return view('admin.article.edit_cate',compact('data'));
    }

    /*
     * Execute edit cate article
     * function postEditCate
     */
    public function postEditCate(Request $request){
        $errorCode = $this->bzArticle->postEditCate($request);
        if($errorCode == _ApiCode::SUCCESS)
            return redirect()->back()->with(['success_message' => 'Chỉnh sửa danh mục thành công']);
        else
            return redirect()->back()->with(['error_message' => 'Chỉnh sửa danh mục không thành công']);
    }

    /*
     * Add cate article
     * id: cate parent/ or grand parent, corresponding type article
     * function getAddCate
     */
    public function getAddCate($type=1){
        return view('admin.article.add_cate', compact('type'));
    }

    /*
     * Execute add cate article
     * function postAddCate
     */
    public function postAddCate(Request $request){
        $errorCode = $this->bzArticle->postAddCate($request);
        if($errorCode == _ApiCode::SUCCESS)
            return redirect()->back()->with(['success_message' => 'Thêm mới danh mục thành công']);
        else
            return redirect()->back()->with(['error_message' => 'Thêm mới danh mục không thành công']);
    }

    #endregion


    public function postUpload(){
        return $this->bzArticle->postUploadImage('article');
    }
}
