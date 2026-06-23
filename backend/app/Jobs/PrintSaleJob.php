<?php

namespace App\Jobs;

use App\Models\Sale;
use App\Services\PrintService;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Log;

class PrintSaleJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable;

    public function __construct(
        private readonly int $saleId
    ) {}

    public function handle(PrintService $printService): void
    {
        try {
            $sale = Sale::with(['items', 'payments', 'user'])->find($this->saleId);

            if (!$sale) {
                Log::warning('PrintJob: Venda não encontrada', ['sale_id' => $this->saleId]);
                return;
            }

            $printService->printSale($sale);

            Log::info('PrintJob: Impressão concluída', ['sale_id' => $this->saleId]);
        } catch (\Exception $e) {
            Log::error('PrintJob: Falha na impressão', [
                'sale_id' => $this->saleId,
                'error' => $e->getMessage(),
            ]);

            $this->release(10);
        }
    }

    public function retryUntil(): \DateTime
    {
        return now()->addMinutes(5);
    }
}
