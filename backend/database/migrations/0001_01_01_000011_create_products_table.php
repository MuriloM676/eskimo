<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->string('barcode', 48)->nullable()->unique();
            $table->integer('price')->comment('Preço em centavos');
            $table->integer('cost_price')->nullable()->comment('Custo em centavos');
            $table->foreignId('category_id')->nullable()->constrained()->nullOnDelete();
            $table->integer('stock_quantity')->default(0);
            $table->integer('min_stock')->default(0);
            $table->boolean('active')->default(true);
            $table->string('image_url')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->index('name');
            $table->index('active');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
