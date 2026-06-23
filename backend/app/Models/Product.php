<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'description',
        'barcode',
        'price',
        'cost_price',
        'category_id',
        'stock_quantity',
        'min_stock',
        'active',
        'image_url',
    ];

    protected function casts(): array
    {
        return [
            'price' => 'integer',
            'cost_price' => 'integer',
            'stock_quantity' => 'integer',
            'min_stock' => 'integer',
            'active' => 'boolean',
        ];
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function stockMovements()
    {
        return $this->hasMany(ProductStockMovement::class);
    }

    public function isLowStock(): bool
    {
        return $this->min_stock > 0 && $this->stock_quantity <= $this->min_stock;
    }

    public function scopeActive($query)
    {
        return $query->where('active', true);
    }

    public function scopeSearch($query, string $term)
    {
        return $query->where(function ($q) use ($term) {
            $q->where('name', 'ilike', "%{$term}%")
              ->orWhere('barcode', 'ilike', "%{$term}%");
        });
    }
}
