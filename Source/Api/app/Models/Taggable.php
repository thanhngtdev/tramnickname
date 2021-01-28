<?php

namespace App\Models;

use App\Helper\Common;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Taggable
 */
class Taggable extends Model
{
    protected $table = 'taggable';
    protected $connection = 'mysql';
    protected $fillable = [
        'tga_id',
        'tga_tag',
        'tga_type'
    ];
    public $timestamps = true;
    protected $hidden = [];

    static function tag(Model $model,$tags){
        $tags = Common::buildTagArray($tags);
        foreach ($tags as $tagName){
            $tag = Tag::findOrCreateTag($tagName);
            parent::firstOrCreate([
                'tga_id' => $model->getId(),
                'tga_tag' => $tag->tag_id,
                'tga_type' => get_class($model),
            ]);
        }
    }

    static function untag(Model $model,$tags){
        $tags = Common::buildTagArray($tags);
        foreach ($tags as $tagName){
            $tag = Tag::finds($tagName);
            $model->tags()->detach($tag);
        }
    }

    static function detag(Model $model){
        $model->tags()->detach();
    }

    static function retag(Model $model, $tags){
        self::detag($model);
        self::tag($model, $tags);
    }
}
