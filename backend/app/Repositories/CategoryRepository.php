<?php

namespace App\Repositories;

use App\Models\Category;

class CategoryRepository
{
    public function all()
    {
        return Category::orderBy('name')->get();
    }

    public function allActive()
    {
        return Category::active()->orderBy('name')->get();
    }

    public function findById(int $id): ?Category
    {
        return Category::find($id);
    }
}
