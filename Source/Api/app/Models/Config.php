<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Config
 */
class Config extends Model
{
    protected $table = 'config';
    protected $primaryKey = 'cfg_id';
    protected $guarded = [];
    public $timestamps = true;
    protected $hidden = [];
    protected $casts = [
        'cfg_value' => 'array',
    ];
}
