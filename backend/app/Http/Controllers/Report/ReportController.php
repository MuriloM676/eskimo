<?php

namespace App\Http\Controllers\Report;

use App\Http\Controllers\Controller;
use App\Services\ReportService;

class ReportController extends Controller
{
    public function __construct(
        private readonly ReportService $reportService
    ) {}

    public function dashboard()
    {
        $data = $this->reportService->dashboard();

        return response()->json([
            'success' => true,
            'data' => $data,
            'message' => null,
        ]);
    }

    public function sales()
    {
        $sales = $this->reportService->sales(
            request()->only(['date_from', 'date_to', 'user_id'])
        );

        return response()->json([
            'success' => true,
            'data' => $sales->items(),
            'meta' => [
                'total' => $sales->total(),
                'per_page' => $sales->perPage(),
                'current_page' => $sales->currentPage(),
            ],
        ]);
    }

    public function cash()
    {
        $registers = $this->reportService->cash();

        return response()->json([
            'success' => true,
            'data' => $registers->items(),
            'meta' => [
                'total' => $registers->total(),
                'per_page' => $registers->perPage(),
                'current_page' => $registers->currentPage(),
            ],
        ]);
    }

    public function products()
    {
        $products = $this->reportService->products();

        return response()->json([
            'success' => true,
            'data' => $products->items(),
            'meta' => [
                'total' => $products->total(),
                'per_page' => $products->perPage(),
                'current_page' => $products->currentPage(),
            ],
        ]);
    }

    public function stock()
    {
        $stock = $this->reportService->stock();

        return response()->json([
            'success' => true,
            'data' => $stock->items(),
            'meta' => [
                'total' => $stock->total(),
                'per_page' => $stock->perPage(),
                'current_page' => $stock->currentPage(),
            ],
        ]);
    }
}
