<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class CheckPermission
{
    public function handle(Request $request, Closure $next, string $permission): Response
    {
        $user = $request->user();

        if (!$user || !$user->hasPermission($permission)) {
            Log::warning('Acesso negado por permissão', [
                'user_id' => $user?->id,
                'permission' => $permission,
                'route' => $request->route()->getName(),
                'ip' => $request->ip(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Acesso negado: permissão necessária',
                'errors' => [],
            ], 403);
        }

        return $next($request);
    }
}
