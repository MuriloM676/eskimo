<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Database\Seeder;

class RolePermissionSeeder extends Seeder
{
    public function run(): void
    {
        $permissions = [
            ['name' => 'Ver caixa', 'key' => 'cash.open'],
            ['name' => 'Fechar caixa', 'key' => 'cash.close'],
            ['name' => 'Criar venda', 'key' => 'sale.create'],
            ['name' => 'Cancelar venda', 'key' => 'sale.cancel'],
            ['name' => 'Ver produtos', 'key' => 'product.view'],
            ['name' => 'Gerenciar produtos', 'key' => 'product.manage'],
            ['name' => 'Gerenciar estoque', 'key' => 'stock.manage'],
            ['name' => 'Ver relatórios', 'key' => 'report.view'],
            ['name' => 'Gerenciar usuários', 'key' => 'user.manage'],
        ];

        foreach ($permissions as $perm) {
            Permission::firstOrCreate(['key' => $perm['key']], $perm);
        }

        $admin = Role::firstOrCreate(
            ['name' => 'Admin'],
            ['description' => 'Acesso total ao sistema']
        );

        $manager = Role::firstOrCreate(
            ['name' => 'Gerente'],
            ['description' => 'Gerencia produtos, estoque e relatórios']
        );

        $operator = Role::firstOrCreate(
            ['name' => 'Operador de Caixa'],
            ['description' => 'Acesso ao PDV e vendas']
        );

        $admin->syncPermissions([
            'cash.open', 'cash.close',
            'sale.create', 'sale.cancel',
            'product.view', 'product.manage',
            'stock.manage',
            'report.view',
            'user.manage',
        ]);

        $manager->syncPermissions([
            'cash.open', 'cash.close',
            'sale.create', 'sale.cancel',
            'product.view', 'product.manage',
            'stock.manage',
            'report.view',
        ]);

        $operator->syncPermissions([
            'cash.open',
            'sale.create',
            'product.view',
        ]);
    }
}
