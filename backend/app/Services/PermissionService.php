<?php

namespace App\Services;

use App\Models\Permission;
use App\Models\Role;

class PermissionService
{
    public function getAllRoles()
    {
        return Role::with('permissions')->get();
    }

    public function getAllPermissions()
    {
        return Permission::all();
    }

    public function updateRolePermissions(Role $role, array $permissionKeys): Role
    {
        $role->syncPermissions($permissionKeys);

        app(AuditService::class)->logFromRequest(
            action: 'role.permissions.update',
            entityType: 'Role',
            entityId: (string) $role->id,
            payload: ['permissions' => $permissionKeys]
        );

        return $role->load('permissions');
    }
}
