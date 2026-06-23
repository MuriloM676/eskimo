<?php

namespace App\Http\Controllers\Product;

use App\Http\Controllers\Controller;
use App\Http\Requests\Product\StoreProductRequest;
use App\Http\Requests\Product\UpdateProductRequest;
use App\Models\Product;
use App\Services\ProductService;

class ProductController extends Controller
{
    public function __construct(
        private readonly ProductService $productService
    ) {}

    public function index()
    {
        $products = $this->productService->list(request()->only(['category_id', 'active', 'search']));

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

    public function search()
    {
        $term = request()->get('q', '');
        $products = $this->productService->search($term);

        return response()->json([
            'success' => true,
            'data' => $products,
            'message' => null,
        ]);
    }

    public function show(Product $product)
    {
        $product->load('category');

        return response()->json([
            'success' => true,
            'data' => $product,
            'message' => null,
        ]);
    }

    public function store(StoreProductRequest $request)
    {
        $product = $this->productService->create($request->validated());

        return response()->json([
            'success' => true,
            'data' => $product,
            'message' => 'Produto criado',
        ], 201);
    }

    public function update(UpdateProductRequest $request, Product $product)
    {
        $product = $this->productService->update($product, $request->validated());

        return response()->json([
            'success' => true,
            'data' => $product,
            'message' => 'Produto atualizado',
        ]);
    }

    public function destroy(Product $product)
    {
        $this->productService->delete($product);

        return response()->json([
            'success' => true,
            'data' => null,
            'message' => 'Produto removido',
        ]);
    }
}
