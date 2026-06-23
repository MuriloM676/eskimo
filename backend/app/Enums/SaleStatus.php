<?php

namespace App\Enums;

enum SaleStatus: string
{
    case OPEN = 'OPEN';
    case PAID = 'PAID';
    case CANCELED = 'CANCELED';
}
