<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Cate_article
 */
class Cate_article extends Model
{
    protected $table = 'cate_article';
    protected $primaryKey = 'cate_id';
    protected $guarded=[];
    public $timestamps = true;
    public $translatedAttributes = ['cate_value','cate_alias'];

    public function sub_cate(){
        return $this->hasMany('App\Models\Cate_article','cate_parent','cate_id');
    }

    public function parent_cate(){
        return $this->belongsTo('App\Models\Cate_article','cate_parent','cate_id');
    }

}
