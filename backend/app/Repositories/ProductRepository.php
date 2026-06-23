<?php

namespace App\Repositories;

use App\Models\Product;
use Illuminate\Support\Facades\Cache;

class ProductRepository
{
    public function findById(int $id): ?Product
    {
        return Product::with('category')->find($id);
    }

    public function findByBarcode(string $barcode): ?Product
    {
        return Cache::remember("product.barcode.{$barcode}", 30, function () use ($barcode) {
            return Product::with('category')->where('barcode', $barcode)->where('active', true)->first();
        });
    }

    public function search(string $term, int $limit = 20)
    {
        return Product::with('category')
            ->active()
            ->search($term)
            ->orderBy('name')
            ->limit($limit)
            ->get();
    }

    public function paginate(array $filters = [])
    {
        return Product::with('category')
            ->when(isset($filters['category_id']), fn($q) => $q->where('category_id', $filters['category_id']))
            ->when(isset($filters['active']), fn($q) => $q->where('active', $filters['active']))
            ->when(isset($filters['search']), fn($q) => $q->search($filters['search']))
            ->orderBy('name')
            ->paginate();
    }
}
