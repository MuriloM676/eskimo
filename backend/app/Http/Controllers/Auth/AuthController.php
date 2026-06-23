<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Resources\BaseResource;
use App\Services\AuthService;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function __construct(
        private readonly AuthService $authService
    ) {}

    public function login(LoginRequest $request)
    {
        $result = $this->authService->login(
            email: $request->validated('email'),
            password: $request->validated('password')
        );

        return response()->json([
            'success' => true,
            'data' => $result,
            'message' => null,
        ]);
    }

    public function logout(Request $request)
    {
        $this->authService->logout($request->user());

        return response()->json([
            'success' => true,
            'data' => null,
            'message' => 'Logout realizado',
        ]);
    }

    public function me(Request $request)
    {
        $data = $this->authService->me($request->user());

        return response()->json([
            'success' => true,
            'data' => $data,
            'message' => null,
        ]);
    }
}
