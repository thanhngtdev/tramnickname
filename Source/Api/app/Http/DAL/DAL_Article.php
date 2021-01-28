<?php
/**
 * Created by PhpStorm.
 * User: QuanVH
 * Date: 17/02/2017
 * Time: 21:45 CH
 */

namespace App\Http\DAL;

use App\Models\Article;
use App\Models\Cate_article;
use App\Models\Taggable;

class DAL_Article
{
    protected $sumField;
    protected $articleStatus = [1];

    public function __construct()
    {
        $this->sumField = [
            'atc_id', 'atc_featureImg',
            'atc_title', 'atc_sapo', 'atc_createdBy',
            'atc_alias',
            'atc_view', 'atc_cate', 'atc_status',
            'created_at',
            'atc_content',
            'atc_publicDate'
        ];
    }

    #region *** ARTICLE ***
    public function getNewestArticle($num = 4)
    {
        return $this->getListArticle([DAL_Config::ARTICLE_STATUS_PUBLIC], 'created_at', 'desc', $num);
    }

    public function getMostViewArticle($num = 4)
    {
        return $this->getListArticle([DAL_Config::ARTICLE_STATUS_PUBLIC], 'atc_view', 'desc', $num);
    }

    public function getListPromoteArticle($cateId=0)
    {
        $query = Article::where('atc_status', 1)
            ->where('atc_promote', 1);
        if ($cateId && $cateId > 0)
            $query = $query->where('atc_cate', $cateId);
        return $query->orderBy('created_at', 'desc')->take(1)->get();
    }

    public function getRelatedArticle($article)
    {
        return Article::where('atc_id', '!=', $article->atc_id)
            ->where('atc_cate', $article->atc_cate)
            ->where('atc_type',$article->atc_type)->orderBy('created_at', 'desc')
            ->with(['cate_article', 'author'])
            ->take(3)->get();
    }

    public function getListArticle($status, $order = 'created_at', $desc = 'desc', $num = DAL_Config::NUM_PER_PAGE_ARTICLE)
    {
        return Article::whereIn('atc_status', $status)
            ->where('atc_type', 1)
            ->orderBy($order, $desc)
            ->select($this->sumField)
            ->with(['cate_article', 'author'])
            ->paginate($num);
    }

    public function getListArticleByAcademy($source, $order = 'created_at', $desc = 'desc', $num = DAL_Config::NUM_PER_PAGE_ARTICLE){
        return Article::whereIn('atc_status', $this->articleStatus)
            ->where('atc_source',$source)
            ->where('atc_type', 1)
            ->orderBy($order, $desc)
            ->select($this->sumField)
            ->with(['cate_article', 'author'])
            ->paginate($num);
    }

    public function getListArticleByCate($lstCate, $num = DAL_Config::NUM_PER_PAGE_ARTICLE)
    {
        return Article::whereIn('atc_status', $this->articleStatus)
            ->where('atc_type', 1)
            ->whereIn('atc_cate', $lstCate)
            ->orderBy('created_at', 'desc')
            ->with(['cate_article', 'author'])
            ->select($this->sumField)
            ->paginate($num);
    }

    public function getDetailArticle($atcId)
    {
        return Article::where('atc_id', $atcId)->with(['cate_article', 'author'])->first();
    }

    public function createArticle($data = array())
    {
        return Article::create($data);
    }

    public function updateArticle($atcId = 1, $data = array())
    {
        return Article::where('atc_id', $atcId)->update($data);
    }
    #endregion

    #region *** Question and Answer ***
    public function getListSiteArticle($siteId)
    {
        return Article::whereIn('atc_status', $this->articleStatus)
            ->where('atc_type', 1)->where('atc_source', $siteId)
            ->paginate(DAL_Config::NUM_PER_PAGE_ARTICLE);
    }

    public function getListQNA($siteId = 0, $cateId = 0)
    {
        $q = Article::whereIn('atc_status', $this->articleStatus)
            ->where('atc_type', 2);
        if ($siteId > 0) $q = $q->where('atc_source', $siteId);
        if ($cateId > 0) {
            $lstSubCate = Cate_article::where('cate_id',$cateId)->orWhere('cate_parent',$cateId)->pluck('cate_id');
            $q = $q->whereIn('atc_cate', $lstSubCate);
        }

        return $q->paginate(DAL_Config::NUM_PER_PAGE_ARTICLE);
    }

    public function getQNAByCate($cateId,$siteId=0){
        $lstSubCate = Cate_article::where('cate_id',$cateId)->orWhere('cate_parent',$cateId)->pluck('cate_id');
        $query = Article::whereIn('atc_status', $this->articleStatus)
            ->where('atc_type', 2)->whereIn('atc_cate',$lstSubCate);
        if($siteId > 0) $query  = $query->where('atc_source',$siteId);
        return $query->get();
    }

    #endregion


    #region *** CATE ARTICLE ***
    public function getDetailCateArticle($cate)
    {
        return Cate_article::where('cate_id', $cate)->orWhere('cate_alias', $cate)->first();
    }

    public function getCateByAlias($cateAlias)
    {
        return Cate_article::where('cate_alias', $cateAlias)->first();
    }

    public function getListCateArticle($status)
    {
        return Cate_article::whereIn('cate_status', $status)
            ->where('cate_parent', 0)->with(['sub_cate'])->get();
    }

    public function getListSubCate($cateId){
        return Cate_article::where('cate_parent',$cateId)
            ->where('cate_status',2)->get();
    }

    public function getListCateAjax($order, $direct, $num)
    {
        return Cate_article::whereIn('cate_status', [1, 2])
            ->orderBy($order, $direct)->paginate($num);
    }

    public function getListCatePublic()
    {
        return $this->getListCateArticle([1]);
    }

    public function createCateArticle($array)
    {
        return Cate_article::create($array);
    }

    public function updateCateArticle($cateId = 1, $data = array())
    {
        return Cate_article::where('cate_id', $cateId)
            ->update($data);
    }

    #endregion

    public function getListArticleByTag($tagId)
    {
        return Taggable::join('article', 'article.atc_id', '=', 'taggable.tga_id')
            ->where('tga_tag', $tagId)->get();
    }
}
