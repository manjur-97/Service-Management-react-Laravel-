<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RequestStatuse extends Model
{
    use HasFactory;
    protected $fillable=['name'];

    public function requestTokens(){
        return $this->hasMany(RequestToken::class);
    }
}
