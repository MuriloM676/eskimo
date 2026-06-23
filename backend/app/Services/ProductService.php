<?php

namespace App\Services;

use App\Enums\MovementType;
use App\Models\Product;
use App\Repositories\ProductRepository;

class ProductService
{
    public function __construct(
        private readonly ProductRepository $productRepository,
        private readonly AuditService $auditService,
        private readonly StockService $stockService,
    ) {}

    public function list(array $filters = [])
    {
        return $this->productRepository->paginate($filters);
    }

    public function search(string $term, int $limit = 20)
    {
        return $this->productRepository->search($term, $limit);
    }

    public function findByBarcode(string $barcode): ?Product
    {
        return $this->productRepository->findByBarcode($barcode);
    }

    public function create(array $data): Product
    {
        $data['price'] = $this->toCents($data['price']);

        if (isset($data['cost_price'])) {
            $data['cost_price'] = $this->toCents($data['cost_price']);
        }

        $initialStock = (int) ($data['stock_quantity'] ?? 0);
        $data['stock_quantity'] = 0;
        $product = Product::create($data);

        if ($initialStock > 0) {
            $this->stockService->registerMovement(
                product: $product,
                type: MovementType::IN,
                quantity: $initialStock,
                reason: 'Estoque inicial',
                userId: auth()->id()
            );
        }

        $this->auditService->logFromRequest(
            action: 'product.create',
            entityType: 'Product',
            entityId: (string) $product->id
        );

        return $product->load('category');
    }

    public function update(Product $product, array $data): Product
    {
        if (isset($data['price'])) {
            $data['price'] = $this->toCents($data['price']);
        }

        if (isset($data['cost_price'])) {
            $data['cost_price'] = $this->toCents($data['cost_price']);
        }

        $product->update($data);

        $this->auditService->logFromRequest(
            action: 'product.update',
            entityType: 'Product',
            entityId: (string) $product->id,
            payload: ['changes' => array_keys($data)]
        );

        return $product->fresh()->load('category');
    }

    public function delete(Product $product): void
    {
        $this->auditService->logFromRequest(
            action: 'product.delete',
            entityType: 'Product',
            entityId: (string) $product->id
        );

        $product->delete();
    }

    private function toCents(float|int $value): int
    {
        return (int) round((float) $value * 100);
    }
}
