<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;
    
    protected $fillable=['name', 'mobile', 'email', 'status_id'];

    public function status(){
        return $this->hasMany(RequestToken::class);
    }
}
