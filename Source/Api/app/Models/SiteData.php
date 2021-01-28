<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SiteData extends Model
{
    protected $table = 'site_data';
    protected $primaryKey = 'dt_id';
    protected $guarded = [];
    public $timestamps = true;
    protected $casts = [
        'dt_value' => 'array',
    ];

}
