<?php

namespace App\Services;

use App\Models\Category;
use App\Repositories\CategoryRepository;

class CategoryService
{
    public function __construct(
        private readonly CategoryRepository $categoryRepository,
        private readonly AuditService $auditService,
    ) {}

    public function list()
    {
        return $this->categoryRepository->all();
    }

    public function create(array $data): Category
    {
        $category = Category::create($data);

        $this->auditService->logFromRequest(
            action: 'category.create',
            entityType: 'Category',
            entityId: (string) $category->id
        );

        return $category;
    }

    public function update(Category $category, array $data): Category
    {
        $category->update($data);

        $this->auditService->logFromRequest(
            action: 'category.update',
            entityType: 'Category',
            entityId: (string) $category->id
        );

        return $category->fresh();
    }

    public function delete(Category $category): void
    {
        $this->auditService->logFromRequest(
            action: 'category.delete',
            entityType: 'Category',
            entityId: (string) $category->id
        );

        $category->delete();
    }
}
