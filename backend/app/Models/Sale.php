<?php

namespace App\Models;

use App\Enums\SaleStatus;
use Illuminate\Database\Eloquent\Model;

class Sale extends Model
{
    protected $fillable = [
        'cash_register_id',
        'user_id',
        'status',
        'subtotal',
        'discount',
        'total',
    ];

    protected function casts(): array
    {
        return [
            'status' => SaleStatus::class,
            'subtotal' => 'integer',
            'discount' => 'integer',
            'total' => 'integer',
        ];
    }

    public function cashRegister()
    {
        return $this->belongsTo(CashRegister::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function items()
    {
        return $this->hasMany(SaleItem::class);
    }

    public function payments()
    {
        return $this->hasMany(Payment::class);
    }

    public function isOpen(): bool
    {
        return $this->status === SaleStatus::OPEN;
    }

    public function isPaid(): bool
    {
        return $this->status === SaleStatus::PAID;
    }

    public function recalculate(): void
    {
        $this->subtotal = $this->items()->sum('total_price');
        $this->total = $this->subtotal - $this->discount;
        if ($this->total < 0) {
            $this->total = 0;
        }
        $this->save();
    }
}
