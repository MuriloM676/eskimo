<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Resources\Json\JsonResource;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        JsonResource::withoutWrapping();

        Validator::extend('valid_payment_method', function ($attribute, $value, $parameters, $validator) {
            return in_array($value, ['cash', 'pix', 'debit', 'credit']);
        });
    }
}
