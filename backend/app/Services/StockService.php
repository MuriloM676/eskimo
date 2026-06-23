<?php

namespace App\Services;

use App\Enums\MovementType;
use App\Models\Product;
use App\Models\ProductStockMovement;
use App\Repositories\ProductRepository;
use Illuminate\Support\Facades\DB;

class StockService
{
    public function __construct(
        private readonly ProductRepository $productRepository,
        private readonly AuditService $auditService,
    ) {}

    public function registerMovement(
        Product $product,
        MovementType $type,
        int $quantity,
        string $reason = null,
        ?int $userId = null,
        ?string $referenceType = null,
        ?string $referenceId = null,
    ): ProductStockMovement {
        return DB::transaction(function () use ($product, $type, $quantity, $reason, $userId, $referenceType, $referenceId) {
            $previousQuantity = $product->stock_quantity;

            if ($type === MovementType::OUT || $type === MovementType::SALE) {
                $newQuantity = $previousQuantity - $quantity;
            } elseif ($type === MovementType::IN) {
                $newQuantity = $previousQuantity + $quantity;
            } else {
                $newQuantity = $previousQuantity + $quantity;
            }

            if ($newQuantity < 0) {
                throw new \RuntimeException("Estoque insuficiente para {$product->name}");
            }

            $product->update(['stock_quantity' => $newQuantity]);

            $movement = ProductStockMovement::create([
                'product_id' => $product->id,
                'type' => $type,
                'quantity' => $quantity,
                'previous_quantity' => $previousQuantity,
                'new_quantity' => $newQuantity,
                'reason' => $reason,
                'reference_type' => $referenceType,
                'reference_id' => $referenceId,
                'user_id' => $userId ?? auth()->id(),
            ]);

            return $movement;
        });
    }

    public function getStock(int $productId): ?Product
    {
        return Product::find($productId);
    }

    public function getMovements(array $filters = [])
    {
        return ProductStockMovement::with(['product', 'user'])
            ->when(isset($filters['product_id']), fn($q) => $q->where('product_id', $filters['product_id']))
            ->when(isset($filters['type']), fn($q) => $q->where('type', $filters['type']))
            ->orderByDesc('created_at')
            ->paginate();
    }

    public function adjust(Product $product, MovementType $type, int $quantity, string $reason): ProductStockMovement
    {
        $movement = $this->registerMovement(
            product: $product,
            type: $type,
            quantity: $quantity,
            reason: $reason,
        );

        $this->auditService->logFromRequest(
            action: "stock.{$type->value}",
            entityType: 'Product',
            entityId: (string) $product->id,
            payload: [
                'type' => $type->value,
                'quantity' => $quantity,
                'reason' => $reason,
            ]
        );

        return $movement;
    }
}
