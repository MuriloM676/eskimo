<?php

namespace App\Repositories;

use App\Models\Permission;

class PermissionRepository
{
    public function all()
    {
        return Permission::orderBy('name')->get();
    }

    public function findByKey(string $key): ?Permission
    {
        return Permission::where('key', $key)->first();
    }
}
