<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    protected $table = 'booking';
    protected $primaryKey = 'bk_id';
    protected $guarded = [];
    protected $with = [];
    public $timestamps = true;

}
