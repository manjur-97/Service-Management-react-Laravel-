<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RequestToken extends Model
{
    use HasFactory;
    protected $fillable=['customer_id', 'item', 'problem', 'status_id'];

   
    public function customer(){
        return $this->BelongsTo(Customer::class);
    }
    public function status(){
        return $this->BelongsTo(RequestStatuse::class);
    }
}
