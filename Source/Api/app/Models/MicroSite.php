<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MicroSite extends Model
{
    protected $table = 'micro_site';
    protected $primaryKey = 'ms_id';
    public $timestamps = true;
    protected $hidden = [];
    protected $guarded = [];

    public function site_data(){
        return $this->hasMany('App\Models\SiteData','dt_site','ms_id');
    }

    public function sub_page(){
        return $this->hasMany('App\Models\SubPage','sub_site','ms_id');
    }
}
