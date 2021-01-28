<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Feedback extends Model
{
    protected $table = 'feedback';
    protected $primaryKey = 'fb_id';
    protected $guarded = [];
    public $timestamps = true;
    protected $hidden = [];

}
