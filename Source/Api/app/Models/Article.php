<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Article
 */
class Article extends Model
{
    protected $table = 'article';
    protected $primaryKey = 'atc_id';
    protected $guarded = [];
    protected $with = ['author'];
    public $timestamps = true;

    public function cate_article(){
        return $this->belongsTo('App\Models\Cate_article','atc_cate');
    }

    public function author(){
        return $this->belongsTo('App\Models\User','atc_createdBy');
    }

    public function tags(){
        return $this->morphToMany('App\Models\Tag','tga','taggable',
            'tga_id','tga_tag');
    }

    public function getId()
    {
        return $this->getAttribute('atc_id');
    }


}
