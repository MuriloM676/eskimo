<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Services\PermissionService;

class PermissionController extends Controller
{
    public function __construct(
        private readonly PermissionService $permissionService
    ) {}

    public function index()
    {
        $permissions = $this->permissionService->getAllPermissions();

        return response()->json([
            'success' => true,
            'data' => $permissions,
            'message' => null,
        ]);
    }
}
