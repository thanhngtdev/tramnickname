<?php

namespace App\Models;

use App\Helper\Common;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Tag
 */
class Tag extends Model
{
    protected $table = 'tag';
    protected $primaryKey = 'tag_id';
    protected $connection = 'mysql';
    protected $fillable = [
        'tag_id',
        'tag_name',
        'tag_alias',
        'tag_normalized'
    ];
    protected $sumField = [
        'atc_id',
        'atc_title',
        'atc_alias',
        'atc_cate',
        'atc_type',
        'atc_featureImg',
        'atc_createdBy',
        'atc_status',
        'atc_sapo',
        'atc_view',
        'article.created_at',
    ];
    public $timestamps = true;
    protected $hidden = [];

    public function tga()
    {
        return $this->morphTo();
    }

    public static function finds($tagName)
    {
        $normalized = mb_strtolower($tagName);
        return Tag::where('tag_normalized', $normalized)
            ->orWhere('tag_alias', $normalized)->first();
    }

    static function createTag($tags)
    {
        $tags = Common::buildTagArray($tags);
        foreach ($tags as $tagName) {
            $tagName = trim($tagName);
            if (!self::finds($tagName))
                self::createOneTag($tagName);
        }
        return true;
    }

    static function createOneTag($tagName){
        return parent::create([
            'tag_name' => $tagName,
            'tag_normalized' => mb_strtolower($tagName),
            'tag_alias' => Common::CreateSlug($tagName),
        ]);
    }

    static function findOrCreateTag($tagName){
        $tag = Tag::finds($tagName);
        if (!$tag) {
            $tag = Tag::createOneTag($tagName);
        }
        return $tag;
    }

    public function articles()
    {
        return $this->morphedByMany('App\Models\Article', 'tga',
            'taggable','tga_tag','tga_id');
    }
}
