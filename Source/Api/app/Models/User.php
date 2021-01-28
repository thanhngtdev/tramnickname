<?php

namespace App\Models;

use Spatie\Permission\Traits\HasRoles;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;

/**
 * App\Models\User
 */
class User extends Authenticatable implements JWTSubject
{
    use HasRoles;
    use Notifiable;

    protected $guard_name = 'web';
    protected $table = 'user';
    protected $primaryKey = 'user_id';
    public $timestamps = true;
    protected $hidden = ['password','remember_token'];
    protected $guarded = [];

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }

    public function academy(){
        return $this->hasMany("\App\Models\User_detail",'dt_user','user_id')
            ->where('dt_name','academy');
    }
}
