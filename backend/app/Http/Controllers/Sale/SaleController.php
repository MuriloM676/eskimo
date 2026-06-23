<?php

namespace App\Http\Controllers\Sale;

use App\Http\Controllers\Controller;
use App\Http\Requests\Sale\AddItemRequest;
use App\Http\Requests\Sale\PayRequest;
use App\Models\Sale;
use App\Services\SaleService;

class SaleController extends Controller
{
    public function __construct(
        private readonly SaleService $saleService
    ) {}

    public function start()
    {
        $sale = $this->saleService->start();

        return response()->json([
            'success' => true,
            'data' => $sale,
            'message' => null,
        ]);
    }

    public function addItem(AddItemRequest $request)
    {
        $sale = $this->saleService->start();
        $sale = $this->saleService->addItem(
            $sale,
            $request->validated('barcode'),
            $request->validated('quantity', 1)
        );

        return response()->json([
            'success' => true,
            'data' => $sale,
            'message' => null,
        ]);
    }

    public function removeItem(Sale $sale)
    {
        $itemId = request()->input('item_id');
        $sale = $this->saleService->removeItem($sale, $itemId);

        return response()->json([
            'success' => true,
            'data' => $sale,
            'message' => null,
        ]);
    }

    public function applyDiscount(Sale $sale)
    {
        $discount = (int) request()->input('discount', 0);
        $sale = $this->saleService->applyDiscount($sale, $discount);

        return response()->json([
            'success' => true,
            'data' => $sale,
            'message' => null,
        ]);
    }

    public function pay(Sale $sale, PayRequest $request)
    {
        $sale = $this->saleService->pay($sale, $request->validated('methods'));

        return response()->json([
            'success' => true,
            'data' => $sale,
            'message' => 'Venda finalizada',
        ]);
    }

    public function cancel(Sale $sale)
    {
        $sale = $this->saleService->cancel($sale);

        return response()->json([
            'success' => true,
            'data' => $sale,
            'message' => 'Venda cancelada',
        ]);
    }

    public function show(Sale $sale)
    {
        $sale->load(['items.product', 'payments', 'user']);

        return response()->json([
            'success' => true,
            'data' => $sale,
            'message' => null,
        ]);
    }

    public function index()
    {
        $sales = $this->saleService->list(request()->only(['status', 'date_from', 'date_to']));

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
}
