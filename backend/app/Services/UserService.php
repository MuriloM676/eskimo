<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserService
{
    public function __construct(
        private readonly AuditService $auditService
    ) {}

    public function list(array $filters = [])
    {
        return User::with('role')
            ->when(isset($filters['active']), fn($q) => $q->where('active', $filters['active']))
            ->when(isset($filters['role_id']), fn($q) => $q->where('role_id', $filters['role_id']))
            ->orderBy('name')
            ->paginate();
    }

    public function create(array $data): User
    {
        $data['password'] = Hash::make($data['password']);

        $user = User::create($data);

        $this->auditService->logFromRequest(
            action: 'user.create',
            entityType: 'User',
            entityId: (string) $user->id
        );

        return $user->load('role');
    }

    public function update(User $user, array $data): User
    {
        if (isset($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        }

        $user->update($data);

        $this->auditService->logFromRequest(
            action: 'user.update',
            entityType: 'User',
            entityId: (string) $user->id,
            payload: ['changes' => array_keys($data)]
        );

        return $user->fresh()->load('role');
    }

    public function delete(User $user): void
    {
        $this->auditService->logFromRequest(
            action: 'user.delete',
            entityType: 'User',
            entityId: (string) $user->id
        );

        $user->delete();
    }
}
