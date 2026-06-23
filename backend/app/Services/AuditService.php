<?php

namespace App\Services;

use App\Models\AuditLog;
use Illuminate\Http\Request;

class AuditService
{
    public function log(
        string $action,
        ?string $entityType = null,
        ?string $entityId = null,
        ?array $payload = null,
        ?int $userId = null,
        ?string $ipAddress = null
    ): AuditLog {
        return AuditLog::create([
            'user_id' => $userId,
            'action' => $action,
            'entity_type' => $entityType,
            'entity_id' => $entityId,
            'payload' => $payload,
            'ip_address' => $ipAddress ?? request()->ip(),
        ]);
    }

    public function logFromRequest(
        string $action,
        ?string $entityType = null,
        ?string $entityId = null,
        ?array $payload = null
    ): AuditLog {
        return $this->log(
            action: $action,
            entityType: $entityType,
            entityId: $entityId,
            payload: $payload,
            userId: auth()->id(),
            ipAddress: request()->ip()
        );
    }
}
