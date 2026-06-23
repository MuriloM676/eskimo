<?php

namespace App\Services;

use App\Models\Sale;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class PrintService
{
    private string $agentUrl;

    public function __construct()
    {
        $this->agentUrl = env('HARDWARE_AGENT_URL', 'http://localhost:9100');
    }

    public function printSale(Sale $sale): void
    {
        $sale->load(['items', 'payments', 'user']);

        $lines = [];
        $lines[] = ['text' => 'SORVETERIA', 'align' => 'center', 'bold' => true];
        $lines[] = ['text' => '---', 'align' => 'center'];
        $lines[] = ['text' => 'Data: ' . $sale->created_at->format('d/m/Y H:i'), 'align' => 'center'];
        $lines[] = ['text' => 'Operador: ' . $sale->user->name, 'align' => 'center'];
        $lines[] = ['text' => str_repeat('-', 32)];

        foreach ($sale->items as $item) {
            $name = mb_substr($item->product_name_snapshot, 0, 20);
            $line = sprintf('%-20s %2dx R$ %6.2f', $name, $item->quantity, $item->unit_price / 100);
            $lines[] = ['text' => $line];
        }

        $lines[] = ['text' => str_repeat('-', 32)];

        if ($sale->discount > 0) {
            $lines[] = ['text' => sprintf('Subtotal:      R$ %6.2f', $sale->subtotal / 100)];
            $lines[] = ['text' => sprintf('Desconto:      R$ %6.2f', $sale->discount / 100)];
        }

        $lines[] = ['text' => sprintf('TOTAL:         R$ %6.2f', $sale->total / 100), 'bold' => true];

        foreach ($sale->payments as $payment) {
            $method = ucfirst($payment->method);
            $lines[] = ['text' => sprintf('%-12s   R$ %6.2f', $method . ':', $payment->amount / 100)];

            if ($payment->change_amount > 0) {
                $lines[] = ['text' => sprintf('Troco:         R$ %6.2f', $payment->change_amount / 100)];
            }
        }

        $lines[] = ['text' => ''];
        $lines[] = ['text' => 'Obrigado pela preferência!', 'align' => 'center'];

        $this->sendToAgent([
            'type' => 'receipt',
            'lines' => $lines,
            'cut' => true,
            'open_drawer' => $sale->payments->contains('method', 'cash'),
        ]);
    }

    private function sendToAgent(array $payload): void
    {
        try {
            Http::timeout(5)->post("{$this->agentUrl}/print", [
                'printer' => 'default',
                'content' => $payload,
            ]);

            Log::info('Impressão enviada ao agente', ['type' => $payload['type']]);
        } catch (\Exception $e) {
            Log::warning('Falha ao enviar impressão para agente', [
                'error' => $e->getMessage(),
                'agent_url' => $this->agentUrl,
            ]);

            // Não bloquear venda por falha de impressão
        }
    }

    public function openDrawer(): void
    {
        try {
            Http::timeout(3)->post("{$this->agentUrl}/drawer/open");
            Log::info('Comando de abertura de gaveta enviado');
        } catch (\Exception $e) {
            Log::warning('Falha ao abrir gaveta', ['error' => $e->getMessage()]);
        }
    }

    public function testPrint(): array
    {
        try {
            $response = Http::timeout(5)->post("{$this->agentUrl}/print", [
                'printer' => 'default',
                'content' => [
                    'type' => 'receipt',
                    'lines' => [
                        ['text' => 'TESTE DE IMPRESSÃO', 'align' => 'center', 'bold' => true],
                        ['text' => '---', 'align' => 'center'],
                        ['text' => 'Data: ' . now()->format('d/m/Y H:i'), 'align' => 'center'],
                        ['text' => 'Sistema PDV funcionando!'],
                        ['text' => ''],
                        ['text' => 'Corte de papel', 'align' => 'center'],
                    ],
                    'cut' => true,
                ],
            ]);

            return [
                'success' => $response->successful(),
                'message' => $response->successful() ? 'Impressão enviada' : 'Falha no agente',
            ];
        } catch (\Exception $e) {
            return [
                'success' => false,
                'message' => 'Agente indisponível: ' . $e->getMessage(),
            ];
        }
    }
}
