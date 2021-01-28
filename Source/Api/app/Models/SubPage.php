<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SubPage extends Model
{
    protected $table = 'sub_page';
    protected $primaryKey = 'sub_id';
    public $timestamps = true;
    protected $hidden = [];
    protected $guarded = [];
}
