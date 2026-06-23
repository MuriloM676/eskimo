<?php

namespace App\Services;

use App\Enums\MovementType;
use App\Enums\SaleStatus;
use App\Models\Product;
use App\Models\Sale;
use App\Models\SaleItem;
use App\Jobs\PrintSaleJob;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class SaleService
{
    public function __construct(
        private readonly StockService $stockService,
        private readonly PaymentService $paymentService,
        private readonly AuditService $auditService,
        private readonly CashRegisterService $cashRegisterService,
    ) {}

    public function start(): Sale
    {
        $register = $this->cashRegisterService->getCurrent();

        if (!$register) {
            throw new \RuntimeException('Caixa não está aberto');
        }

        $openSale = Sale::where('cash_register_id', $register->id)
            ->where('status', SaleStatus::OPEN)
            ->first();

        if ($openSale) {
            return $openSale->load('items.product');
        }

        $sale = Sale::create([
            'cash_register_id' => $register->id,
            'user_id' => auth()->id(),
            'status' => SaleStatus::OPEN,
            'subtotal' => 0,
            'discount' => 0,
            'total' => 0,
        ]);

        return $sale;
    }

    public function addItem(Sale $sale, string $barcodeOrId, int $quantity = 1): Sale
    {
        $this->ensureOpen($sale);

        $product = is_numeric($barcodeOrId) && strlen($barcodeOrId) > 5
            ? Product::where('barcode', $barcodeOrId)->active()->first()
            : Product::find((int) $barcodeOrId);

        if (!$product || !$product->active) {
            throw new \RuntimeException('Produto não encontrado');
        }

        if ($product->stock_quantity < $quantity) {
            throw new \RuntimeException("Estoque insuficiente para {$product->name}");
        }

        $existing = $sale->items()->where('product_id', $product->id)->first();

        if ($existing) {
            $existing->increment('quantity', $quantity);
            $existing->update(['total_price' => $existing->unit_price * $existing->quantity]);
        } else {
            SaleItem::create([
                'sale_id' => $sale->id,
                'product_id' => $product->id,
                'product_name_snapshot' => $product->name,
                'quantity' => $quantity,
                'unit_price' => $product->price,
                'total_price' => $product->price * $quantity,
            ]);
        }

        $sale->recalculate();

        return $sale->load('items.product');
    }

    public function removeItem(Sale $sale, int $itemId): Sale
    {
        $this->ensureOpen($sale);

        $item = $sale->items()->findOrFail($itemId);
        $item->delete();

        $sale->recalculate();

        $this->auditService->logFromRequest(
            action: 'sale.remove_item',
            entityType: 'Sale',
            entityId: (string) $sale->id,
            payload: ['item_id' => $itemId]
        );

        return $sale->load('items.product');
    }

    public function applyDiscount(Sale $sale, int $discount): Sale
    {
        $this->ensureOpen($sale);

        if ($discount > $sale->subtotal) {
            throw new \RuntimeException('Desconto não pode ser maior que o subtotal');
        }

        $sale->update(['discount' => $discount]);
        $sale->recalculate();

        $this->auditService->logFromRequest(
            action: 'sale.discount',
            entityType: 'Sale',
            entityId: (string) $sale->id,
            payload: ['discount' => $discount]
        );

        return $sale->load('items.product');
    }

    public function pay(Sale $sale, array $paymentsData): Sale
    {
        $this->ensureOpen($sale);

        if ($sale->items()->count() === 0) {
            throw new \RuntimeException('Venda não pode ser vazia');
        }

        DB::transaction(function () use ($sale, $paymentsData) {
            $this->paymentService->processPayments($sale, $paymentsData);

            $sale->update(['status' => SaleStatus::PAID]);

            foreach ($sale->items as $item) {
                if ($item->product_id) {
                    $this->stockService->registerMovement(
                        product: $item->product,
                        type: MovementType::SALE,
                        quantity: $item->quantity,
                        reason: 'Venda PDV',
                        referenceType: 'Sale',
                        referenceId: (string) $sale->id,
                    );
                }
            }

            PrintSaleJob::dispatch($sale->id);
        });

        $this->auditService->logFromRequest(
            action: 'sale.pay',
            entityType: 'Sale',
            entityId: (string) $sale->id,
            payload: ['payments' => $paymentsData]
        );

        Log::info('Venda finalizada', [
            'sale_id' => $sale->id,
            'total' => $sale->total,
            'user_id' => auth()->id(),
        ]);

        return $sale->load(['items.product', 'payments']);
    }

    public function cancel(Sale $sale): Sale
    {
        if (!$sale->isOpen()) {
            throw new \RuntimeException('Apenas vendas abertas podem ser canceladas');
        }

        $sale->update(['status' => SaleStatus::CANCELED]);

        $this->auditService->logFromRequest(
            action: 'sale.cancel',
            entityType: 'Sale',
            entityId: (string) $sale->id,
            payload: ['reason' => request()->input('reason', 'Cancelado pelo operador')]
        );

        Log::info('Venda cancelada', ['sale_id' => $sale->id]);

        return $sale->fresh();
    }

    public function getOpenSale(): ?Sale
    {
        $register = $this->cashRegisterService->getCurrent();

        if (!$register) {
            return null;
        }

        return Sale::where('cash_register_id', $register->id)
            ->where('status', SaleStatus::OPEN)
            ->with('items.product')
            ->first();
    }

    public function list(array $filters = [])
    {
        return Sale::with(['user', 'items', 'payments'])
            ->when(isset($filters['status']), fn($q) => $q->where('status', $filters['status']))
            ->when(isset($filters['date_from']), fn($q) => $q->whereDate('created_at', '>=', $filters['date_from']))
            ->when(isset($filters['date_to']), fn($q) => $q->whereDate('created_at', '<=', $filters['date_to']))
            ->orderByDesc('created_at')
            ->paginate();
    }

    private function ensureOpen(Sale $sale): void
    {
        if (!$sale->isOpen()) {
            throw new \RuntimeException('Venda não está aberta');
        }
    }
}
