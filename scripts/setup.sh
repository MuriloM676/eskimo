#!/bin/bash
set -e

echo "=== Setup PDV Sorveteria ==="

# Backend
echo "[1/4] Instalando dependências do backend..."
cd backend
cp .env.example .env 2>/dev/null || true
composer install --no-interaction
php artisan key:generate
cd ..

# Frontend
echo "[2/4] Instalando dependências do frontend..."
cd frontend
npm install
cd ..

# Docker
echo "[3/4] Iniciando containers Docker..."
docker compose up -d --build

echo "[4/4] Executando migrations e seeds..."
docker compose exec app php artisan migrate --seed

echo "=== Setup concluído ==="
echo "Backend: http://localhost/api/v1"
echo "Frontend: http://localhost:5173"
echo "Admin: admin@sorveteria.com / 123456"
