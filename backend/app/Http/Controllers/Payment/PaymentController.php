<?php

namespace App\Http\Controllers\Payment;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use App\Services\PaymentService;

class PaymentController extends Controller
{
    public function __construct(
        private readonly PaymentService $paymentService
    ) {}

    public function show(Payment $payment)
    {
        $payment->load('sale');

        return response()->json([
            'success' => true,
            'data' => $payment,
            'message' => null,
        ]);
    }
}
