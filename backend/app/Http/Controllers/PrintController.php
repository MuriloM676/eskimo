<?php

namespace App\Http\Controllers;

use App\Models\Sale;
use App\Services\PrintService;

class PrintController extends Controller
{
    public function __construct(
        private readonly PrintService $printService
    ) {}

    public function printSale(Sale $sale)
    {
        $this->printService->printSale($sale);

        return response()->json([
            'success' => true,
            'data' => null,
            'message' => 'Impressão enviada',
        ]);
    }

    public function test()
    {
        $result = $this->printService->testPrint();

        return response()->json($result);
    }
}
