<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

class AuthService
{
    public function __construct(
        private readonly AuditService $auditService
    ) {}

    public function login(string $email, string $password): array
    {
        $user = User::with('role')->where('email', $email)->first();

        if (!$user || !Hash::check($password, $user->password)) {
            Log::warning('Tentativa de login inválida', ['email' => $email, 'ip' => request()->ip()]);
            throw ValidationException::withMessages([
                'email' => ['Credenciais inválidas'],
            ]);
        }

        if (!$user->active) {
            Log::warning('Tentativa de login de usuário inativo', ['user_id' => $user->id]);
            throw ValidationException::withMessages([
                'email' => ['Usuário inativo'],
            ]);
        }

        $user->update(['last_login_at' => now()]);

        $token = $user->createToken('pdv-token')->plainTextToken;

        $this->auditService->logFromRequest(
            action: 'auth.login',
            entityType: 'User',
            entityId: (string) $user->id
        );

        Log::info('Login realizado', ['user_id' => $user->id, 'name' => $user->name]);

        return [
            'token' => $token,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role->name,
                'permissions' => $user->role->permissions->pluck('key'),
            ],
        ];
    }

    public function logout(User $user): void
    {
        $user->currentAccessToken()->delete();

        $this->auditService->logFromRequest(
            action: 'auth.logout',
            entityType: 'User',
            entityId: (string) $user->id
        );

        Log::info('Logout realizado', ['user_id' => $user->id]);
    }

    public function me(User $user): array
    {
        $user->load('role.permissions');

        return [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'role' => $user->role->name,
            'permissions' => $user->role->permissions->pluck('key'),
        ];
    }
}
