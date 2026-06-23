<?php

use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    // Auth
    Route::prefix('auth')->group(function () {
        Route::post('login', [\App\Http\Controllers\Auth\AuthController::class, 'login']);
        Route::post('logout', [\App\Http\Controllers\Auth\AuthController::class, 'logout'])->middleware('auth:sanctum');
        Route::get('me', [\App\Http\Controllers\Auth\AuthController::class, 'me'])->middleware('auth:sanctum');
    });

    // Protected routes
    Route::middleware('auth:sanctum')->group(function () {
        // Users
        Route::middleware('permission:user.manage')->group(function () {
            Route::apiResource('users', \App\Http\Controllers\Auth\UserController::class);
            Route::apiResource('roles', \App\Http\Controllers\Auth\RoleController::class);
            Route::apiResource('permissions', \App\Http\Controllers\Auth\PermissionController::class);
        });

        // Products
        Route::middleware('permission:product.view')->group(function () {
            Route::get('products/search', [\App\Http\Controllers\Product\ProductController::class, 'search']);
            Route::get('products', [\App\Http\Controllers\Product\ProductController::class, 'index']);
            Route::get('products/{product}', [\App\Http\Controllers\Product\ProductController::class, 'show']);
        });

        Route::middleware('permission:product.manage')->group(function () {
            Route::post('products', [\App\Http\Controllers\Product\ProductController::class, 'store']);
            Route::put('products/{product}', [\App\Http\Controllers\Product\ProductController::class, 'update']);
            Route::delete('products/{product}', [\App\Http\Controllers\Product\ProductController::class, 'destroy']);
        });

        // Categories
        Route::get('categories', [\App\Http\Controllers\Product\CategoryController::class, 'index']);
        Route::get('categories/{category}', [\App\Http\Controllers\Product\CategoryController::class, 'show']);
        Route::middleware('permission:product.manage')->group(function () {
            Route::post('categories', [\App\Http\Controllers\Product\CategoryController::class, 'store']);
            Route::put('categories/{category}', [\App\Http\Controllers\Product\CategoryController::class, 'update']);
            Route::delete('categories/{category}', [\App\Http\Controllers\Product\CategoryController::class, 'destroy']);
        });

        // Cash Register
        Route::prefix('cash-register')->middleware('permission:cash.open')->group(function () {
            Route::post('open', [\App\Http\Controllers\CashRegister\CashRegisterController::class, 'open']);
            Route::post('close', [\App\Http\Controllers\CashRegister\CashRegisterController::class, 'close']);
            Route::get('current', [\App\Http\Controllers\CashRegister\CashRegisterController::class, 'current']);
        });

        // Sales (PDV)
        Route::prefix('sales')->group(function () {
            Route::get('/', [\App\Http\Controllers\Sale\SaleController::class, 'index']);
            Route::post('start', [\App\Http\Controllers\Sale\SaleController::class, 'start']);
            Route::post('add-item', [\App\Http\Controllers\Sale\SaleController::class, 'addItem']);

            // Routes with sale binding (must come after static routes)
            Route::post('{sale}/remove-item', [\App\Http\Controllers\Sale\SaleController::class, 'removeItem']);
            Route::post('{sale}/apply-discount', [\App\Http\Controllers\Sale\SaleController::class, 'applyDiscount']);
            Route::post('{sale}/pay', [\App\Http\Controllers\Sale\SaleController::class, 'pay']);
            Route::post('{sale}/cancel', [\App\Http\Controllers\Sale\SaleController::class, 'cancel']);
            Route::get('{sale}', [\App\Http\Controllers\Sale\SaleController::class, 'show']);
        });

        // Payments
        Route::prefix('payments')->group(function () {
            Route::post('/', [\App\Http\Controllers\Payment\PaymentController::class, 'store']);
            Route::get('{payment}', [\App\Http\Controllers\Payment\PaymentController::class, 'show']);
        });

        // Stock
        Route::middleware('permission:stock.manage')->group(function () {
            Route::get('stock', [\App\Http\Controllers\Stock\StockController::class, 'index']);
            Route::get('stock/{product}', [\App\Http\Controllers\Stock\StockController::class, 'show']);
            Route::get('stock/movements', [\App\Http\Controllers\Stock\StockController::class, 'movements']);
            Route::post('stock/adjust', [\App\Http\Controllers\Stock\StockController::class, 'adjust']);
            Route::post('stock/in', [\App\Http\Controllers\Stock\StockController::class, 'entry']);
        });

        // Print
        Route::prefix('print')->group(function () {
            Route::post('sale/{sale}', [\App\Http\Controllers\PrintController::class, 'printSale']);
            Route::post('test', [\App\Http\Controllers\PrintController::class, 'test']);
        });

        // Reports
        Route::prefix('reports')->middleware('permission:report.view')->group(function () {
            Route::get('dashboard', [\App\Http\Controllers\Report\ReportController::class, 'dashboard']);
            Route::get('sales', [\App\Http\Controllers\Report\ReportController::class, 'sales']);
            Route::get('cash', [\App\Http\Controllers\Report\ReportController::class, 'cash']);
            Route::get('products', [\App\Http\Controllers\Report\ReportController::class, 'products']);
            Route::get('stock', [\App\Http\Controllers\Report\ReportController::class, 'stock']);
        });
    });
});
