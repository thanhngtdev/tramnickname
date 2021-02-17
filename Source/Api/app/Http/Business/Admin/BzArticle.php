<?php
/**
 * Created by PhpStorm.
 * User: QuanVH
 * Date: 26/10/2016
 * Time: 21:49 CH
 */

namespace App\Http\Business\Admin;


use App\Helper\_ApiCode;
use App\Helper\Common;
use App\Http\DAL\DAL_Config;
use App\Models\Article;
use App\Models\Cate_article;
use App\Models\Taggable;
use Carbon\Carbon;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Storage;
use TomLingham\Searchy\Facades\Searchy;

class BzArticle extends BzAdmin
{
    #region *** ARTICLE ***
    public function getListArticle($cateId)
    {
        $startDate = Carbon::createFromDate(2019, 6, 1);
        $endDate = Carbon::now();
        if (isset($_GET['date'])) {
            $txtDateRange = $_GET['date'];
            $lstDate = explode('-', $txtDateRange);
            $startDate = trim($lstDate[0]);
            $endDate = count($lstDate) > 1 ? trim($lstDate[1]) : Carbon::now();
        }

        $query = Article::whereIn('atc_status', [
            DAL_Config::ARTICLE_STATUS_PUBLIC, DAL_Config::ARTICLE_STATUS_PENDING
        ])->where('atc_type',1);
        $query = $query->whereDate('created_at', '>=', Carbon::make($startDate)->toDateString())
            ->whereDate('created_at', '<=', Carbon::make($endDate)->toDateString());

        if (isset($_GET['q']) && $_GET['q'] != '') {
            $locale = App::getLocale();
            $lstLocale = Searchy::search('article_tran')->fields('article_atc_id', 'atc_title')
                ->query(trim($_GET['q']))->getQuery()
                ->get()->where('locale', $locale)->pluck('article_atc_id')->toArray();
            $query = $query->whereIn('atc_id', $lstLocale);
        }

        if ($cateId > 0) $query = $query->where('atc_cate', $cateId);
        if (isset($_GET['status']) && $_GET['status'] > 0)
            $query = $query->where('atc_status', $_GET['status']);
        return $query->orderBy('created_at', 'desc')
            ->paginate(DAL_Config::NUM_PER_PAGE_ARTICLE);
    }

    public function getListArticleData()
    {
        $columns = array(
            0 => 'atc_id',
            1 => 'atc_title',
            2 => 'atc_status',
            3 => 'atc_publicDate',
            4 => 'atc_id'
        );
        $order = $columns[$_GET['order'][0]['column']];
        $direct = $_GET['order'][0]['dir'];
        $number = $_GET['length'];
        $start = $_GET['start'];
        $search = $_GET['search']['value'];
        $page = round($start / $number) + 1;
        Common::SetCurrentPage($page);
        if ($search != '') {
            $lstArticle = Searchy::search('article')->fields('atc_title')
                ->query($search)->get();

            return [
                'data' => $lstArticle,
                'total' => 10
            ];

        } else {
            return 1;
            return $this->dal_article->getListArticle([
                DAL_Config::ARTICLE_STATUS_PUBLIC, DAL_Config::ARTICLE_STATUS_PENDING], $order, $direct, $number);
        }
    }

    public function getEditArticle($atcId)
    {
        return $this->dal_article->getDetailArticle($atcId);
    }

    public function postEditArticle($request)
    {
        try {
            $atcId = $request->lbId;
            $article = $this->dal_article->getDetailArticle($atcId);
            if(isset($request->sltCate)) $article->atc_cate = $request->sltCate;
            $article->atc_title = $request->txtTitle;
            $article->atc_sapo = $request->txtSapo;
            $article->atc_content = $request->txtContent;
            $article->atc_tag = $request->txtLink;
            if (isset($request->txtAlias) && $request->txtAlias != '')
                $article->atc_alias = trim($request->txtAlias);

            $file = Input::file('imgFeature');
            if ($file) {
                $this->imageCrop->RemoveThumb($article->atc_featureImg);
                $alias = $this->CommonUpload(DAL_Config::IMAGE_ALIAS_ARTICLE . '/feature', $file);
                if ($alias) {
                    $this->imageCrop->MakeArticleThumb($alias);
                    $article->atc_featureImg = $alias;
                }
            }
            if (isset($request->chbPublic)) {
                $article->atc_status = DAL_Config::ARTICLE_STATUS_PUBLIC;
            } else {
                $article->atc_status = DAL_Config::ARTICLE_STATUS_PENDING;
            }
            if (isset($request->chbFeature)) {
                $article->atc_promote = 1;
            } else {
                $article->atc_promote = 0;
            }
            if ($article->save()) {
                Taggable::retag($article, $request->sltTag);
                return _ApiCode::SUCCESS;
            }
            return _ApiCode::ERROR_UNKNOWN;
        } catch (\Exception $e) {
            //log excetion
            \Log::error($e->getMessage(), $e->getTrace());
            return _ApiCode::ERROR_UNKNOWN;
        }
    }

    public function createNewArticle($request, $type)
    {
        try {
            $dt = Carbon::now();
            $array = [
                'atc_title' => $request->txtTitle,
                'atc_sapo' => $request->txtSapo,
                'atc_content' => $request->txtContent,
                'atc_createdBy' => Auth::user()->user_id,
                'atc_status' => DAL_Config::ARTICLE_STATUS_PENDING,
                'atc_type' => $type,
                'atc_publicDate' => $dt->toDateString(),
            ];
            if(isset($request->sltCate)) $array['atc_cate'] = $request->sltCate;
            else $array['atc_cate'] = 20;
            if (isset($request->siteId)) $array['atc_source'] = $request->siteId;
            if (isset($request->chbSchedule)) {
                $publicTime = strtotime($request->dateSchedule);
                $array['atc_publicDate'] = date('Y-m-d', $publicTime);
                $array['atc_status'] = DAL_Config::ARTICLE_STATUS_PENDING;
            }
            if (isset($request->promote)) $array['atc_promote'] = 1;

            if (isset($request->txtAlias) && $request->txtAlias != '')
                $array['atc_alias'] = trim($request->txtAlias);
            else $array['atc_alias'] = Common::CreateSlug($request->txtTitle);
            $file = Input::file('imgFeature');
            if ($file) {
                $alias = $this->CommonUpload(DAL_Config::IMAGE_ALIAS_ARTICLE . '/feature', $file);
                if ($alias) {
                    $this->imageCrop->MakeArticleThumb($alias);
                    $array['atc_featureImg'] = $alias;
                }
            } else {
                $imgPath = $this->GetImageFromContent($array['atc_content']);
                if ($imgPath == '') {
                    // Not set feature image, and content doesn't include image tag
                } else {
                    $imagesInfo = pathinfo($imgPath);
                    $imgPath = str_replace('storage/', '', $imgPath);
                    if (Storage::exists($imgPath)) {
                        $newPath = DAL_Config::IMAGE_ALIAS_ARTICLE . '/feature/' . $imagesInfo['basename'];
                        Storage::copy($imgPath, $newPath);
                        $array['atc_featureImg'] = $newPath;
                        $this->imageCrop->MakeArticleThumb($array['atc_featureImg']);
                    }
                }
            }
            if ($article = $this->dal_article->createArticle($array)) {
                Taggable::retag($article, $request->sltTag);
                return _ApiCode::SUCCESS;
            }
            return _ApiCode::ERROR_UNKNOWN;
        } catch (\Exception $e) {
            // log exception
            return _ApiCode::ERROR_UNKNOWN;
        }
    }

    public function postAddArticle($request)
    {
        return $this->createNewArticle($request, 1);
    }

    public function getDeleteArticle($atcId)
    {
        if ($this->dal_article->updateArticle($atcId, [
            'atc_status' => DAL_Config::STATUS_DELETED
        ])) return _ApiCode::SUCCESS;
        return _ApiCode::ERROR_UNKNOWN;
    }
    #endregion

    #region *** Question and Answer ***
    public function getListQNAData()
    {
        $cateId = $_GET['cate'];
        return $this->dal_article->getListQNA(0,$cateId);
    }

    public function postAddQNA($request)
    {
        $dt = Carbon::now();
        $array = [
            'atc_sapo' => $request->txtSapo,
            'atc_content' => $request->txtContent,
            'atc_cate' => $request->sltCate,
            'atc_createdBy' => Auth::user()->user_id,
            'atc_status' => DAL_Config::ARTICLE_STATUS_PUBLIC,
            'atc_type' => 2,
            'atc_publicDate' => $dt->toDateString(),
        ];
        if (isset($request->siteId)) $array['atc_source'] = $request->siteId;

        if ($article = $this->dal_article->createArticle($array)) {
            Taggable::retag($article, $request->sltTag);
            return _ApiCode::SUCCESS;
        }
        return _ApiCode::ERROR_UNKNOWN;
    }

    public function postEditQNA($request)
    {
        try {
            $atcId = $request->lbId;
            $article = $this->dal_article->getDetailArticle($atcId);
            $article->atc_sapo = $request->txtSapo;
            $article->atc_content = $request->txtContent;
            $article->atc_cate = $request->sltCate;

            if ($article->save()) {
                Taggable::retag($article, $request->sltTag);
                return _ApiCode::SUCCESS;
            }
            return _ApiCode::ERROR_UNKNOWN;
        } catch (\Exception $e) {
            //log excetion
            \Log::error($e->getMessage(), $e->getTrace());
            return _ApiCode::ERROR_UNKNOWN;
        }
    }
    #endregion

    #region *** CATE ARTICLE ***
    /*
     * Get list cate article
     * id: parent cate id
     * function getListCate
     */
    public function getListCate()
    {
        return $this->dal_article->getListCateArticle(1);
    }

    /*
     * Get list cate article data
     * get data to datatable
     * id: article type id
     * function getListCateAjax
     */
    public function getListCateAjax()
    {
        $columns = array(
            0 => 'cate_id',
            1 => 'cate_name',
            2 => 'cate_alias',
            3 => 'cate_id',
        );
        $order = $columns[$_GET['order'][0]['column']];
        $direct = $_GET['order'][0]['dir'];
        $number = $_GET['length'];
        $start = $_GET['start'];
        $page = round($start / $number) + 1;

        Common::SetCurrentPage($page);
        return $this->dal_article->getListCateAjax($order, $direct, $number);
    }

    /*
     * Edit cate article
     * cateId: cate id
     * function getEditCate
     */
    public function getEditCate($cateId)
    {
        $data['cate'] = Cate_article::find($cateId);
        return $data;
    }

    /*
     * Execute edit cate article
     * function postEditCate
     */
    public function postEditCate($request)
    {
        $cateId = $request->lbId;
        $array = [
            'cate_name' => $request->txtName,
            'cate_value' => $request->txtName,
            'cate_parent' => $request->sltCate,
            'cate_alias' => Common::CreateSlug($request->txtName),
        ];
        if ($this->dal_article->updateCateArticle($cateId, $array))
            return _ApiCode::SUCCESS;
        return _ApiCode::ERROR_UNKNOWN;
    }

    /*
     * Execute add cate article
     * function postAddCate
     */
    public function postAddCate($request)
    {
        $articleData = [
            'cate_name' => $request->txtName,
            'cate_value' => $request->txtName,
            'cate_parent' => $request->sltCate,
            'cate_tag' => '',
            'cate_status' => $request->sltType,
            'cate_alias' => Common::CreateSlug($request->txtName),
        ];
        if ($this->dal_article->createCateArticle($articleData))
            return _ApiCode::SUCCESS;
        return _ApiCode::ERROR_UNKNOWN;
    }
    #endregion

}
