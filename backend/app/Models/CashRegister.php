<?php

namespace App\Models;

use App\Enums\CashRegisterStatus;
use Illuminate\Database\Eloquent\Model;

class CashRegister extends Model
{
    protected $fillable = [
        'user_id',
        'status',
        'initial_amount',
        'final_amount',
        'expected_amount',
        'opened_at',
        'closed_at',
    ];

    protected function casts(): array
    {
        return [
            'status' => CashRegisterStatus::class,
            'initial_amount' => 'integer',
            'final_amount' => 'integer',
            'expected_amount' => 'integer',
            'opened_at' => 'datetime',
            'closed_at' => 'datetime',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function sales()
    {
        return $this->hasMany(Sale::class);
    }

    public function isOpen(): bool
    {
        return $this->status === CashRegisterStatus::OPENED;
    }
}
