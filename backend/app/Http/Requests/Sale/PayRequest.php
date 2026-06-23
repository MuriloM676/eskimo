<?php

namespace App\Http\Requests\Sale;

use Illuminate\Foundation\Http\FormRequest;

class PayRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'methods' => ['required', 'array', 'min:1'],
            'methods.*.method' => ['required', 'string', 'in:cash,pix,debit,credit'],
            'methods.*.amount' => ['required', 'numeric', 'min:0.01'],
        ];
    }

    public function messages(): array
    {
        return [
            'methods.required' => 'Informe ao menos uma forma de pagamento',
            'methods.*.method.in' => 'Forma de pagamento inválida',
            'methods.*.amount.min' => 'Valor de pagamento deve ser maior que zero',
        ];
    }
}
