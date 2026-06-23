<?php

namespace App\Models;

use App\Enums\PaymentStatus;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    protected $fillable = [
        'sale_id',
        'method',
        'amount',
        'change_amount',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'amount' => 'integer',
            'change_amount' => 'integer',
            'status' => PaymentStatus::class,
        ];
    }

    public function sale()
    {
        return $this->belongsTo(Sale::class);
    }
}
