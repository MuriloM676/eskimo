
<h1 align="center">
  <br>
  <br>
  🍦 Eskimo
  <br>
</h1>

<h4 align="center">Sistema PDV completo para sorveterias — rápido, moderno e open-source.</h4>

<p align="center">
  <a href="#-funcionalidades">Funcionalidades</a> •
  <a href="#-stack">Stack</a> •
  <a href="#-arquitetura">Arquitetura</a> •
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-estrutura">Estrutura</a> •
  <a href="#-screenshots">Screenshots</a> •
  <a href="#-licença">Licença</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/PHP-8.4-777BB4?style=for-the-badge&logo=php&logoColor=white" alt="PHP 8.4">
  <img src="https://img.shields.io/badge/Laravel-11-FF2D20?style=for-the-badge&logo=laravel&logoColor=white" alt="Laravel 11">
  <img src="https://img.shields.io/badge/Vue_3-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white" alt="Vue 3">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/PostgreSQL-16-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL 16">
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker">
</p>

---

## ✨ Funcionalidades

| Módulo | O que faz |
|--------|-----------|
| **PDV (Frente de Caixa)** | Venda rápida com busca de produtos, cálculo automático de troco e suporte a múltiplos pagamentos |
| **Catálogo de Produtos** | Cadastro de produtos com preços, categorias e controle por balança |
| **Estoque** | Controle de movimentações (entrada/saída/ajuste), histórico completo |
| **Caixa** | Abertura e fechamento de caixa por operador, registro de valores |
| **Relatórios** | Dashboard com gráficos, vendas por período, produto mais vendido |
| **Impressão Térmica** | Cupom fiscal ESC/POS via agente Python + fila Redis |
| **RBAC** | Roles: Admin, Gerente, Operador — cada um com permissões granulares |
| **Auditoria** | Log de todas as ações sensíveis |
| **Docker** | Ambiente completo com 1 comando |

---

## 🧱 Stack

```
┌─────────────────────────────────────────────────────┐
│                   Frontend                          │
│  Vue 3 · TypeScript · PrimeVue 4 · Pinia · Vite    │
├─────────────────────────────────────────────────────┤
│                   Backend                           │
│  Laravel 11 · PHP 8.4 · Sanctum · Redis · Queue    │
├─────────────────────────────────────────────────────┤
│                   Database                          │
│  PostgreSQL 16                                     │
├─────────────────────────────────────────────────────┤
│              Hardware Agent                         │
│  Python · Flask · python-escpos                    │
├─────────────────────────────────────────────────────┤
│                   Infra                             │
│  Docker Compose · Nginx · PHP-FPM                   │
└─────────────────────────────────────────────────────┘
```

---

## 🏗️ Arquitetura

```
                    ┌──────────┐
                    │  Nginx   │  ← proxy reverso
                    └────┬─────┘
                   ┌─────┴──────┐
                   │            │
            ┌──────┴──┐   ┌────┴─────┐
            │  SPA    │   │  API     │
            │  Vue 3  │   │ Laravel  │
            └─────────┘   └────┬─────┘
                               │
                    ┌──────────┼──────────┐
                    │          │          │
              ┌─────┴──┐ ┌────┴────┐ ┌───┴────┐
              │ Redis  │ │  PG    │ │ Queue  │
              │ Cache  │ │  16   │ │ (Redis)│
              └────────┘ └─────────┘ └───┬────┘
                                         │
                                   ┌─────┴─────┐
                                   │  Hardware │
                                   │   Agent   │
                                   │ (Python)  │
                                   └───────────┘
```

---

## ⚡ Quick Start

```bash
git clone https://github.com/seu-usuario/eskimo.git
cd eskimo
chmod +x scripts/setup.sh
./scripts/setup.sh
```

O script setup faz tudo:

1. Copia `.env.example` → `.env`
2. Instala dependências do Composer
3. Gera `APP_KEY`
4. Instala dependências npm
5. Sobe os containers Docker
6. Roda migrations + seeders

Acesse:
- **PDV:** `http://localhost`
- **Adminer (DB):** `http://localhost:8080`
- **Mailpit:** `http://localhost:8025`

### Serviços Docker

| Serviço | Porta | Descrição |
|---------|-------|-----------|
| `nginx` | `80` | Proxy reverso |
| `app` | `9000` | PHP-FPM Laravel |
| `queue` | — | Worker de filas |
| `scheduler` | — | Agendador Laravel |
| `db` | `5432` | PostgreSQL 16 |
| `redis` | `6379` | Cache/queue |
| `mailpit` | `8025` | Email dev |
| `adminer` | `8080` | Admin DB |

### Desenvolvimento

```bash
# Backend
docker compose exec app composer install
docker compose exec app php artisan migrate --seed

# Frontend (com hot reload)
cd frontend && npm run dev

# Hardware agent
cd hardware-agent && pip install -r requirements.txt && python agent.py
```

---

## 📁 Estrutura

```
eskimo/
├── backend/              # API Laravel (Controllers, Services, Repositories, Models)
│   ├── app/Http/Controllers/
│   ├── app/Services/
│   ├── app/Repositories/
│   ├── app/Models/
│   ├── database/migrations/
│   └── routes/api.php
├── frontend/             # SPA Vue 3 + PrimeVue
│   └── src/
│       ├── views/        # Login, PDV, Dashboard, Produtos, Estoque, etc.
│       ├── stores/       # Pinia (auth, sale)
│       ├── services/     # API calls
│       └── router/       # Vue Router + guard
├── hardware-agent/       # Flask ESC/POS agent
│   └── agent.py
├── docker/               # Nginx config
├── scripts/              # Setup
├── .specs/               # Especificações detalhadas
└── docker-compose.yml    # 8 serviços
```

---

## 👥 Roles e Permissões

| Role     | Acesso |
|----------|--------|
| **Admin**   | Tudo — configurações, usuários, relatórios |
| **Gerente** | Operações + relatórios, sem gestão de usuários |
| **Operador**| PDV, consulta de estoque, fechamento de caixa |

---

## 🖨️ Impressão Térmica

O fluxo de impressão usa fila Redis para não travar o caixa:

```
PDV → API → Job (Redis) → PrintService → Hardware Agent (Flask) → ESC/POS Printer
```

O agente Python roda em `localhost:9100` e faz auto-detecção da impressora. Se offline, a impressão é enfileirada e re-tentada.

---

## 🧪 Roadmap

- [x] Autenticação e RBAC
- [x] Cadastro de produtos e categorias
- [x] PDV com vendas e pagamentos
- [x] Controle de estoque
- [x] Abertura/fechamento de caixa
- [x] Impressão térmica ESC/POS
- [x] Relatórios e dashboard
- [ ] Testes automatizados
- [ ] NFe / NFCe
- [ ] Integração com balanças
- [ ] Modo off-line
- [ ] Aplicativo PWA

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

<p align="center">
  Feito com 🍦 por <a href="https://github.com/MuriloM676">@MuriloM676</a>
</p>
