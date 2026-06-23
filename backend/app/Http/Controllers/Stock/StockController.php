<?php

namespace App\Http\Controllers\Stock;

use App\Enums\MovementType;
use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Services\StockService;
use Illuminate\Http\Request;

class StockController extends Controller
{
    public function __construct(
        private readonly StockService $stockService
    ) {}

    public function index()
    {
        $products = Product::with('category')
            ->orderBy('name')
            ->paginate();

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

    public function show(Product $product)
    {
        return response()->json([
            'success' => true,
            'data' => $product->load('category'),
            'message' => null,
        ]);
    }

    public function movements()
    {
        $movements = $this->stockService->getMovements(
            request()->only(['product_id', 'type'])
        );

        return response()->json([
            'success' => true,
            'data' => $movements->items(),
            'meta' => [
                'total' => $movements->total(),
                'per_page' => $movements->perPage(),
                'current_page' => $movements->currentPage(),
            ],
        ]);
    }

    public function adjust(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'type' => 'required|in:IN,OUT,ADJUST',
            'quantity' => 'required|integer|min:1',
            'reason' => 'required|string|max:255',
        ]);

        $product = Product::findOrFail($request->input('product_id'));
        $type = MovementType::from($request->input('type'));

        $movement = $this->stockService->adjust(
            product: $product,
            type: $type,
            quantity: (int) $request->input('quantity'),
            reason: $request->input('reason'),
        );

        return response()->json([
            'success' => true,
            'data' => $movement->load('product'),
            'message' => 'Estoque ajustado',
        ]);
    }

    public function entry(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
            'reason' => 'nullable|string|max:255',
        ]);

        $product = Product::findOrFail($request->input('product_id'));

        $movement = $this->stockService->adjust(
            product: $product,
            type: MovementType::IN,
            quantity: (int) $request->input('quantity'),
            reason: $request->input('reason', 'Entrada manual'),
        );

        return response()->json([
            'success' => true,
            'data' => $movement->load('product'),
            'message' => 'Entrada registrada',
        ], 201);
    }
}
