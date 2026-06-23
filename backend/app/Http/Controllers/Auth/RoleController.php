<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Services\PermissionService;

class RoleController extends Controller
{
    public function __construct(
        private readonly PermissionService $permissionService
    ) {}

    public function index()
    {
        $roles = $this->permissionService->getAllRoles();

        return response()->json([
            'success' => true,
            'data' => $roles,
            'message' => null,
        ]);
    }

    public function show(Role $role)
    {
        $role->load('permissions');

        return response()->json([
            'success' => true,
            'data' => $role,
            'message' => null,
        ]);
    }

    public function update(Role $role)
    {
        $role = $this->permissionService->updateRolePermissions(
            $role,
            request()->input('permissions', [])
        );

        return response()->json([
            'success' => true,
            'data' => $role,
            'message' => 'Permissões atualizadas',
        ]);
    }
}
