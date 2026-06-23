<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    protected $fillable = [
        'name',
        'description',
    ];

    public function permissions()
    {
        return $this->belongsToMany(Permission::class, 'role_permission');
    }

    public function users()
    {
        return $this->hasMany(User::class);
    }

    public function syncPermissions(array $permissionKeys): void
    {
        $permissions = Permission::whereIn('key', $permissionKeys)->get();
        $this->permissions()->sync($permissions->pluck('id'));
    }
}
