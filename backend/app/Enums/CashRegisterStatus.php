<?php

namespace App\Enums;

enum CashRegisterStatus: string
{
    case OPENED = 'OPENED';
    case CLOSED = 'CLOSED';
}
