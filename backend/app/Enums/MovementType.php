<?php

namespace App\Enums;

enum MovementType: string
{
    case IN = 'IN';
    case OUT = 'OUT';
    case ADJUST = 'ADJUST';
    case SALE = 'SALE';
}
