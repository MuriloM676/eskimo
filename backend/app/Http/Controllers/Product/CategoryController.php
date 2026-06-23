<?php

namespace App\Http\Controllers\Product;

use App\Http\Controllers\Controller;
use App\Http\Requests\Product\StoreCategoryRequest;
use App\Http\Requests\Product\UpdateCategoryRequest;
use App\Models\Category;
use App\Services\CategoryService;

class CategoryController extends Controller
{
    public function __construct(
        private readonly CategoryService $categoryService
    ) {}

    public function index()
    {
        return response()->json([
            'success' => true,
            'data' => $this->categoryService->list(),
            'message' => null,
        ]);
    }

    public function show(Category $category)
    {
        return response()->json([
            'success' => true,
            'data' => $category,
            'message' => null,
        ]);
    }

    public function store(StoreCategoryRequest $request)
    {
        $category = $this->categoryService->create($request->validated());

        return response()->json([
            'success' => true,
            'data' => $category,
            'message' => 'Categoria criada',
        ], 201);
    }

    public function update(UpdateCategoryRequest $request, Category $category)
    {
        $category = $this->categoryService->update($category, $request->validated());

        return response()->json([
            'success' => true,
            'data' => $category,
            'message' => 'Categoria atualizada',
        ]);
    }

    public function destroy(Category $category)
    {
        $this->categoryService->delete($category);

        return response()->json([
            'success' => true,
            'data' => null,
            'message' => 'Categoria removida',
        ]);
    }
}
