<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $adminRole = \App\Models\Role::where('name', 'Admin')->first();
        $operatorRole = \App\Models\Role::where('name', 'Operador de Caixa')->first();

        User::firstOrCreate(
            ['email' => 'admin@sorveteria.com'],
            [
                'name' => 'Admin',
                'password' => '123456',
                'role_id' => $adminRole->id,
                'active' => true,
            ]
        );

        User::firstOrCreate(
            ['email' => 'operador@sorveteria.com'],
            [
                'name' => 'Operador',
                'password' => '123456',
                'role_id' => $operatorRole->id,
                'active' => true,
            ]
        );
    }
}
