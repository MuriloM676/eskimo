<?php

namespace App\Repositories;

use App\Models\Role;

class RoleRepository
{
    public function findById(int $id): ?Role
    {
        return Role::with('permissions')->find($id);
    }

    public function all()
    {
        return Role::with('permissions')->orderBy('name')->get();
    }
}
