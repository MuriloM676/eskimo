#!/bin/sh
set -e

# Ensure required directories exist
mkdir -p storage/framework/cache/data \
    storage/framework/sessions \
    storage/framework/views \
    storage/logs \
    bootstrap/cache

chmod -R 777 storage bootstrap/cache

# Install dependencies if vendor is missing (e.g., on volume mount)
if [ ! -d "vendor" ]; then
    echo "Installing composer dependencies..."
    composer install --no-interaction --optimize-autoloader
fi

# Create .env if missing
if [ ! -f ".env" ]; then
    cp .env.example .env
    php artisan key:generate
fi

# If a command was passed, run it instead of php-fpm
if [ $# -gt 0 ]; then
    exec "$@"
fi

exec php-fpm
