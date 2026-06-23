<?php

namespace App\Services;

use App\Enums\CashRegisterStatus;
use App\Models\CashRegister;
use App\Models\Sale;
use Illuminate\Support\Facades\Log;

class CashRegisterService
{
    public function __construct(
        private readonly AuditService $auditService
    ) {}

    public function getCurrent(): ?CashRegister
    {
        return CashRegister::where('status', CashRegisterStatus::OPENED)
            ->with('user')
            ->latest()
            ->first();
    }

    public function open(int $initialAmount): CashRegister
    {
        $current = $this->getCurrent();

        if ($current) {
            throw new \RuntimeException('Já existe um caixa aberto');
        }

        $register = CashRegister::create([
            'user_id' => auth()->id(),
            'status' => CashRegisterStatus::OPENED,
            'initial_amount' => $initialAmount,
            'opened_at' => now(),
        ]);

        $this->auditService->logFromRequest(
            action: 'cash.open',
            entityType: 'CashRegister',
            entityId: (string) $register->id,
            payload: ['initial_amount' => $initialAmount]
        );

        Log::info('Caixa aberto', [
            'cash_register_id' => $register->id,
            'user_id' => auth()->id(),
            'initial_amount' => $initialAmount,
        ]);

        return $register;
    }

    public function close(): CashRegister
    {
        $register = $this->getCurrent();

        if (!$register) {
            throw new \RuntimeException('Nenhum caixa aberto');
        }

        $totalSales = Sale::where('cash_register_id', $register->id)
            ->where('status', 'PAID')
            ->sum('total');

        $expectedAmount = $register->initial_amount + $totalSales;

        $register->update([
            'status' => CashRegisterStatus::CLOSED,
            'final_amount' => $expectedAmount,
            'expected_amount' => $expectedAmount,
            'closed_at' => now(),
        ]);

        $this->auditService->logFromRequest(
            action: 'cash.close',
            entityType: 'CashRegister',
            entityId: (string) $register->id,
            payload: [
                'initial_amount' => $register->initial_amount,
                'final_amount' => $expectedAmount,
                'total_sales' => $totalSales,
            ]
        );

        Log::info('Caixa fechado', [
            'cash_register_id' => $register->id,
            'final_amount' => $expectedAmount,
        ]);

        return $register->fresh();
    }
}
