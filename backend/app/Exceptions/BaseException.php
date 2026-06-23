<?php

namespace App\Exceptions;

use Exception;

class BaseException extends Exception
{
    protected string $userMessage;
    protected int $statusCode;

    public function __construct(string $message = '', int $code = 0, ?\Throwable $previous = null)
    {
        parent::__construct($message, $code, $previous);
        $this->userMessage = $message;
    }

    public function render()
    {
        return response()->json([
            'success' => false,
            'message' => $this->userMessage,
            'errors' => [],
        ], $this->statusCode ?? 400);
    }
}
