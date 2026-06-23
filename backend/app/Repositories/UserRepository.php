<?php

namespace App\Repositories;

use App\Models\User;

class UserRepository
{
    public function findById(int $id): ?User
    {
        return User::with('role.permissions')->find($id);
    }

    public function findByEmail(string $email): ?User
    {
        return User::with('role.permissions')->where('email', $email)->first();
    }

    public function findActiveByEmail(string $email): ?User
    {
        return User::with('role.permissions')
            ->where('email', $email)
            ->where('active', true)
            ->first();
    }
}
