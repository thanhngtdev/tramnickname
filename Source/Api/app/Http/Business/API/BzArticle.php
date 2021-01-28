<?php
/**
 * Created by PhpStorm.
 * Project: Alium_main
 * User: quanvu
 * Date: 13/07/2019
 */


namespace App\Http\Business\API;


use App\Helper\_ApiCode;
use App\Helper\Common;
use App\Http\DAL\DAL_Config;
use App\Models\Config;
use App\Models\Feedback;
use Illuminate\Support\Facades\Auth;

class BzArticle extends BzApi
{
    public function getStaticPage($alias)
    {
        $config = Config::where('cfg_alias', $alias)->first();
        if (!$config) $config = Config::find(100);
        return [
            'alias' => $alias,
            'config' => array_values(DAL_Config::getConfigByLocale($config->cfg_id))[0]
        ];
    }

    public function postAddQNA($request)
    {
        try {
            $dataFb = [
                'fb_email' => $request->email,
                'fb_phone' => $request->phone,
                'fb_name' => $request->name,
                'fb_order' => $request->order,
                'fb_cate' => $request->cate,
                'fb_content' => $request->content,
            ];
            if (Auth::check()) $dataFb['fb_user'] = Auth::user()->user_id;
            if (Feedback::create($dataFb)) {
                return _ApiCode::SUCCESS;
            }
            return _ApiCode::ERROR_UNKNOWN;
        } catch (\Exception $e) {
            //log exception
            activity()->performedOn(Feedback::getModel())
                ->log("line " . $e->getLine() . " file " . $e->getFile() . "\n" . $e->getMessage());
            \Log::error($e->getMessage(), $e->getTrace());
            return _ApiCode::ERROR_UNKNOWN;
        }
    }

    public function getListArticle()
    {
        $cateAlias = ''; $academyAlias= '';
        if (isset($_GET['cate'])) $cateAlias = $_GET['cate'];
        if (isset($_GET['alias'])) $academyAlias = $_GET['alias'];
        if (isset($_GET['page']) && $_GET['page'] != 'undefined') Common::SetCurrentPage($_GET['page']);
        $lstArticle = $this->dal_article->getListArticle([DAL_Config::ARTICLE_STATUS_PUBLIC]);
        if($academyAlias != ''){
            $currentAcademy = $this->dal_site->getDetailSite($academyAlias);
            if($currentAcademy && $currentAcademy->ms_id)
                $lstArticle = $this->dal_article->getListArticleByAcademy($currentAcademy->ms_id);
        }
        else if ($cateAlias != '') {
            $currentCate = $this->dal_article->getDetailCateArticle($cateAlias);
            if ($currentCate && $currentCate->cate_id)
                $lstArticle = $this->dal_article->getListArticleByCate([$currentCate->cate_id]);
        }
        $lstCate = $this->dal_article->getListCateArticle([1]);
        return [
            'lstArticle' => $lstArticle,
            'lstPromote' => $this->dal_article->getListPromoteArticle(),
            'lstCate' => $lstCate
        ];
    }

    public function getListQNA()
    {
        $cateParentId = 0;
        $cateAlias = '';
        $lstArticle = [];
        $currentCate = null;
        if (isset($_GET['cate'])) $cateAlias = $_GET['cate'];
        if ($cateAlias != '') {
            $currentCate = $this->dal_article->getDetailCateArticle($cateAlias);
            if ($currentCate && $currentCate->cate_id) {
                $cateParentId = $currentCate->cate_id;
                $lstArticle = $this->dal_article->getListQNA(0, $cateAlias);
            }
        }
        $lstCate = $this->dal_article->getListSubCate($cateParentId);
        foreach ($lstCate as $cate) {
            $cate->article = $this->dal_article->getListQNA(0, $cate->cate_id);
        }

        return [
            'lstArticle' => $lstArticle,
            'lstCate' => $lstCate,
            'cate' => $currentCate
        ];
    }

    public function getDetailArticle()
    {
        $atcId = $_GET['atcId'];
        $article = $this->dal_article->getDetailArticle($atcId);
        $lstCate = $this->dal_article->getListCateArticle([$article->atc_type]);
        return [
            'article' => $article,
            'lstCate' => $lstCate,
            'related' => $this->dal_article->getRelatedArticle($article)
        ];
    }
}
