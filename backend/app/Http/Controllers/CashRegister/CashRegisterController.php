<?php

namespace App\Http\Controllers\CashRegister;

use App\Http\Controllers\Controller;
use App\Services\CashRegisterService;
use Illuminate\Http\Request;

class CashRegisterController extends Controller
{
    public function __construct(
        private readonly CashRegisterService $cashRegisterService
    ) {}

    public function open(Request $request)
    {
        $request->validate(['initial_amount' => 'required|numeric|min:0']);

        $register = $this->cashRegisterService->open(
            (int) round((float) $request->input('initial_amount') * 100)
        );

        return response()->json([
            'success' => true,
            'data' => $register,
            'message' => 'Caixa aberto',
        ]);
    }

    public function close()
    {
        $register = $this->cashRegisterService->close();

        return response()->json([
            'success' => true,
            'data' => $register,
            'message' => 'Caixa fechado',
        ]);
    }

    public function current()
    {
        $register = $this->cashRegisterService->getCurrent();

        return response()->json([
            'success' => true,
            'data' => $register,
            'message' => null,
        ]);
    }
}
