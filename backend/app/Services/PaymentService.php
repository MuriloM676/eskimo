<?php

namespace App\Services;

use App\Models\Payment;
use App\Models\Sale;
use Illuminate\Support\Facades\Log;

class PaymentService
{
    public function __construct(
        private readonly AuditService $auditService
    ) {}

    public function processPayments(Sale $sale, array $paymentsData): array
    {
        $totalPaid = 0;
        $payments = [];

        foreach ($paymentsData as $paymentData) {
            $method = $paymentData['method'];
            $amount = $this->toCents($paymentData['amount']);
            $changeAmount = 0;

            if ($method === 'cash' && $amount > $sale->total) {
                $changeAmount = $amount - $sale->total;
            }

            if ($amount <= 0) {
                throw new \RuntimeException('Valor de pagamento inválido');
            }

            $payment = Payment::create([
                'sale_id' => $sale->id,
                'method' => $method,
                'amount' => $amount,
                'change_amount' => $changeAmount,
                'status' => 'COMPLETED',
            ]);

            $totalPaid += $amount;
            $payments[] = $payment;
        }

        $totalCents = $sale->total;

        if ($totalPaid < $totalCents) {
            throw new \RuntimeException('Valor pago insuficiente');
        }

        $this->auditService->logFromRequest(
            action: 'payment.processed',
            entityType: 'Sale',
            entityId: (string) $sale->id,
            payload: [
                'total' => $totalCents,
                'paid' => $totalPaid,
                'methods' => array_column($paymentsData, 'method'),
            ]
        );

        Log::info('Pagamento processado', [
            'sale_id' => $sale->id,
            'total' => $totalCents,
            'paid' => $totalPaid,
        ]);

        return $payments;
    }

    private function toCents(float|int $value): int
    {
        return (int) round((float) $value * 100);
    }
}
