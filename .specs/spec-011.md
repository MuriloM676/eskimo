# Spec 011 - Docker, Deploy e Ambiente de Execução

# Objetivo

Definir a infraestrutura de execução do sistema PDV utilizando Docker, garantindo portabilidade, isolamento de serviços e facilidade de deploy em ambientes Windows e Linux.

---

# Escopo

Este módulo cobre:

- Ambiente Docker completo
- Orquestração com Docker Compose
- Containers do backend e frontend
- Banco de dados PostgreSQL
- Redis
- Nginx
- Ferramentas auxiliares
- Configuração de produção
- Persistência de dados
- Logs e monitoramento básico

---

# Arquitetura de Containers

```
┌───────────────┐
│   Nginx       │
│ (Reverse Proxy)
└───────┬───────┘
        │
        ▼
┌───────────────┐
│ Laravel API   │
│ PHP 8.4       │
└───────┬───────┘
        │
 ┌──────┴──────┐
 ▼             ▼
PostgreSQL    Redis
        │
        ▼
Frontend (Vue)
```

---

# Docker Compose

## Estrutura Base

```yaml id="dc001"
version: "3.9"

services:

  nginx:
    image: nginx:alpine
    container_name: pdv_nginx
    ports:
      - "80:80"
    volumes:
      - ./docker/nginx/default.conf:/etc/nginx/conf.d/default.conf
      - ./backend:/var/www
    depends_on:
      - app

  app:
    build:
      context: ./backend
      dockerfile: Dockerfile
    container_name: pdv_app
    volumes:
      - ./backend:/var/www
    working_dir: /var/www
    depends_on:
      - db
      - redis

  db:
    image: postgres:16
    container_name: pdv_db
    restart: always
    environment:
      POSTGRES_DB: pdv
      POSTGRES_USER: pdv
      POSTGRES_PASSWORD: secret
    ports:
      - "5432:5432"
    volumes:
      - db_data:/var/lib/postgresql/data

  redis:
    image: redis:7
    container_name: pdv_redis
    ports:
      - "6379:6379"

volumes:
  db_data:
```

---

# Backend Dockerfile

```dockerfile id="df001"
FROM php:8.4-fpm

WORKDIR /var/www

# Dependências do sistema
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libpq-dev \
    libzip-dev \
    && docker-php-ext-install pdo pdo_pgsql zip

# Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copiar projeto
COPY . .

# Instalar dependências
RUN composer install

EXPOSE 9000

CMD ["php-fpm"]
```

---

# Nginx Config

```nginx id="ng001"
server {
    listen 80;
    server_name localhost;

    root /var/www/public;

    index index.php;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        include fastcgi_params;
        fastcgi_pass app:9000;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
    }
}
```

---

# Frontend Docker (opcional dev)

```dockerfile id="fe001"
FROM node:20

WORKDIR /app

COPY package.json .
RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]
```

---

# Ambientes

## Desenvolvimento

- volumes montados
- hot reload
- debug ativo
- logs detalhados

---

## Produção

- imagens otimizadas
- sem volumes locais
- build do frontend separado
- cache agressivo
- logs centralizados

---

# Build do Sistema

## Backend

```
docker-compose up --build
```

---

## Frontend

```
npm run build
```

Arquivos gerados servidos via Nginx.

---

# Persistência

## Banco de Dados

- PostgreSQL com volume persistente
- backup automático futuro

---

## Redis

- cache
- sessões
- filas

---

# Variáveis de Ambiente

Arquivo `.env`

Exemplo:

```
APP_ENV=local
APP_KEY=base64:xxx
DB_HOST=db
DB_PORT=5432
DB_DATABASE=pdv
DB_USERNAME=pdv
DB_PASSWORD=secret
REDIS_HOST=redis
```

---

# Logs

## Tipos

- Laravel logs
- Nginx logs
- Redis logs (opcional)
- logs de fila (jobs)

---

## Diretórios

```
storage/logs
```

---

# Queue Worker

Processos em background:

```
php artisan queue:work
```

Executado dentro do container ou supervisor.

---

# Supervisor (futuro)

Para manter:

- queue worker
- scheduler
- processos longos

---

# Scheduler

Cron do Laravel:

```
* * * * * php artisan schedule:run
```

---

# Segurança

- containers isolados
- sem exposição direta do backend
- portas mínimas expostas
- uso de variáveis de ambiente
- sem credenciais hardcoded

---

# Rede Docker

Todos containers na mesma network:

```
pdv_network
```

---

# Health Check (futuro)

- API status endpoint
- Redis ping
- DB connection check

---

# Backup (futuro)

- dump automático PostgreSQL
- backup incremental
- upload para storage externo

---

# Escalabilidade

Preparado para:

- múltiplas instâncias da API
- load balancer (Nginx/Traefik)
- Redis cluster (futuro)
- banco replicado

---

# Integração com Hardware Agent

O agent NÃO roda no Docker.

Ele roda localmente na máquina do caixa.

Comunicação:

```
Docker (API) → LAN → Agent local
```

---

# Performance

- containers leves
- startup rápido (< 30s)
- baixa latência entre serviços
- Redis para reduzir carga no DB

---

# Ambientes suportados

- Windows (Docker Desktop)
- Linux (Ubuntu recomendado)
- WSL2

---

# Requisitos Não Funcionais

- fácil instalação
- zero dependências manuais além do Docker
- replicável em qualquer máquina
- isolado e previsível
- seguro para produção

---

# Objetivo Final

Garantir que o sistema:

- rode em qualquer máquina com Docker
- seja fácil de instalar e manter
- suporte crescimento futuro
- mantenha consistência entre dev e produção
```