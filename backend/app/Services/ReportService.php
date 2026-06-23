<?php

namespace App\Services;

use App\Enums\SaleStatus;
use App\Models\Product;
use App\Models\Sale;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class ReportService
{
    public function dashboard(): array
    {
        return Cache::remember('dashboard', 10, function () {
            $today = now()->startOfDay();

            $salesToday = Sale::where('status', SaleStatus::PAID)
                ->whereDate('created_at', $today)
                ->get();

            $totalSales = $salesToday->count();
            $totalRevenue = $salesToday->sum('total');
            $averageTicket = $totalSales > 0 ? $totalRevenue / $totalSales : 0;

            $topProducts = Sale::where('status', SaleStatus::PAID)
                ->whereDate('sales.created_at', $today)
                ->join('sale_items', 'sales.id', '=', 'sale_items.sale_id')
                ->select('sale_items.product_name_snapshot', DB::raw('SUM(sale_items.quantity) as total_qty'))
                ->groupBy('sale_items.product_name_snapshot')
                ->orderByDesc('total_qty')
                ->limit(5)
                ->get();

            $lowStockProducts = Product::where('active', true)
                ->where('min_stock', '>', 0)
                ->whereColumn('stock_quantity', '<=', 'min_stock')
                ->orderBy('stock_quantity')
                ->limit(10)
                ->get();

            return [
                'sales_today' => $totalSales,
                'revenue_today' => $totalRevenue,
                'average_ticket' => (int) $averageTicket,
                'top_products' => $topProducts,
                'low_stock_products' => $lowStockProducts,
            ];
        });
    }

    public function sales(array $filters = [])
    {
        return Sale::with(['user', 'payments', 'items'])
            ->where('status', SaleStatus::PAID)
            ->when(isset($filters['date_from']), fn($q) => $q->whereDate('created_at', '>=', $filters['date_from']))
            ->when(isset($filters['date_to']), fn($q) => $q->whereDate('created_at', '<=', $filters['date_to']))
            ->when(isset($filters['user_id']), fn($q) => $q->where('user_id', $filters['user_id']))
            ->orderByDesc('created_at')
            ->paginate();
    }

    public function cash()
    {
        return \App\Models\CashRegister::with('user')
            ->orderByDesc('created_at')
            ->paginate();
    }

    public function products()
    {
        $top = Sale::where('status', SaleStatus::PAID)
            ->join('sale_items', 'sales.id', '=', 'sale_items.sale_id')
            ->select(
                'sale_items.product_name_snapshot',
                DB::raw('SUM(sale_items.quantity) as total_quantity'),
                DB::raw('SUM(sale_items.total_price) as total_revenue')
            )
            ->groupBy('sale_items.product_name_snapshot')
            ->orderByDesc('total_quantity')
            ->paginate();

        return $top;
    }

    public function stock()
    {
        return Product::with('category')
            ->where('active', true)
            ->orderBy('stock_quantity')
            ->paginate();
    }
}
