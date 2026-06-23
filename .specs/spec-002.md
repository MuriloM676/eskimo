# Spec 002 - Arquitetura do Sistema

# Objetivo

Definir a arquitetura técnica do sistema de Caixa (PDV), estabelecendo padrões de desenvolvimento, organização do projeto, responsabilidades de cada camada e diretrizes para garantir escalabilidade, manutenção e facilidade de evolução.

---

# Arquitetura Geral

O sistema seguirá uma arquitetura desacoplada baseada em SPA (Single Page Application) + API REST.

```
┌──────────────────────────────┐
│          Navegador           │
│         Vue 3 + TS           │
└──────────────┬───────────────┘
               │ HTTPS / JSON
               ▼
┌──────────────────────────────┐
│      Laravel REST API        │
└──────────────┬───────────────┘
               │
        ┌──────┴───────┐
        ▼              ▼
 PostgreSQL         Redis
               │
               ▼
      Hardware Agent
               │
      ┌────────┼──────────┐
      ▼        ▼          ▼
 Impressora  Gaveta   Outros dispositivos
```

---

# Tecnologias

## Backend

- PHP 8.4
- Laravel 12
- PostgreSQL
- Redis
- Composer
- PHPUnit

---

## Frontend

- Vue 3
- TypeScript
- Vite
- Pinia
- Vue Router
- PrimeVue
- Axios

---

## Infraestrutura

- Docker Compose
- Nginx
- PHP-FPM
- Redis
- PostgreSQL

---

# Estrutura do Projeto

```
/
├── backend/
├── frontend/
├── docker/
├── scripts/
├── docs/
├── .specs/
└── README.md
```

---

# Estrutura Backend

```
backend/

app/

├── Actions/
├── Console/
├── DTO/
├── Enums/
├── Events/
├── Exceptions/
├── Helpers/
├── Http/
│   ├── Controllers/
│   ├── Middleware/
│   ├── Requests/
│   └── Resources/
│
├── Jobs/
├── Listeners/
├── Models/
├── Policies/
├── Providers/
├── Repositories/
├── Rules/
├── Services/
├── Traits/
└── ValueObjects/
```

---

# Responsabilidade das Camadas

## Controller

Responsável apenas por:

- receber requisições
- validar Request
- chamar Service
- retornar Resource

Nunca conter regra de negócio.

---

## Request

Responsável por:

- validação
- autorização
- normalização dos dados

---

## Service

Contém toda regra de negócio.

Exemplos:

- abrir caixa
- fechar venda
- aplicar desconto
- registrar pagamento
- baixar estoque

Toda regra do sistema deverá estar nesta camada.

---

## Repository

Responsável exclusivamente pelo acesso ao banco.

Nunca conter regra de negócio.

---

## Resource

Transformação dos Models para JSON.

Nunca retornar Models diretamente.

---

## Model

Representa entidades do banco.

Responsável apenas por:

- relacionamentos
- casts
- scopes
- atributos

Evitar lógica de negócio.

---

# Estrutura Frontend

```
frontend/src/

api/

assets/

components/

composables/

config/

constants/

layouts/

pages/

router/

services/

stores/

types/

utils/

views/

plugins/

styles/
```

---

# Organização dos Componentes

```
components/

common/

forms/

tables/

modals/

buttons/

inputs/

layout/

pdv/

reports/

products/

users/
```

---

# Organização das Views

```
views/

Dashboard/

PDV/

Products/

Stock/

Reports/

Settings/

Login/

Users/

CashRegister/
```

---

# Stores (Pinia)

Cada domínio possuirá sua própria Store.

Exemplo:

```
stores/

auth.ts

cashier.ts

products.ts

sale.ts

stock.ts

settings.ts
```

---

# Services Frontend

Responsáveis pela comunicação com API.

Nunca acessar Axios diretamente nas Views.

Exemplo:

```
services/

AuthService.ts

ProductService.ts

SaleService.ts

CashRegisterService.ts

ReportService.ts
```

---

# Comunicação Frontend

Todo acesso será feito via Axios.

Exemplo:

```
View

↓

Store

↓

Service

↓

Axios

↓

API
```

---

# API REST

Todas as respostas deverão ser JSON.

Nunca retornar HTML.

Exemplo:

```
GET /api/products

POST /api/products

PUT /api/products/{id}

DELETE /api/products/{id}
```

---

# Versionamento da API

Toda API deverá possuir versão.

Exemplo:

```
/api/v1/
```

No futuro:

```
/api/v2/
```

---

# Padrão de Resposta

Sucesso

```json
{
  "success": true,
  "data": {},
  "message": null
}
```

Erro

```json
{
  "success": false,
  "message": "Produto não encontrado",
  "errors": {}
}
```

---

# Paginação

Sempre utilizar paginação padrão.

```
data

links

meta
```

---

# Tratamento de Exceções

Nunca retornar erro interno do Laravel.

Todos os erros deverão possuir resposta padronizada.

Exemplo:

404

422

401

403

500

---

# Logs

Utilizar Logs para:

Login

Logout

Vendas

Cancelamentos

Descontos

Fechamento

Falhas

Integrações

---

# Eventos

Utilizar Events para processos importantes.

Exemplos:

SaleCreated

SaleCancelled

PaymentReceived

StockUpdated

CashOpened

CashClosed

---

# Jobs

Toda operação pesada deverá utilizar Queue.

Exemplo:

Impressão

Exportação

Relatórios

Backup

Sincronizações futuras

---

# Cache

Redis será utilizado para:

Sessões

Cache de produtos

Configurações

Permissões

Dashboard

---

# Configurações

Nunca utilizar valores fixos no código.

Toda configuração deverá ficar em:

```
config/
```

Ou

Tabela

```
settings
```

---

# Variáveis de Ambiente

Utilizar apenas .env.

Nunca armazenar credenciais em código.

---

# Banco de Dados

Migrations obrigatórias.

Seeders para ambiente de desenvolvimento.

Factories para testes.

---

# Convenções

Tabela

snake_case

Campos

snake_case

Classes

PascalCase

Métodos

camelCase

Constantes

UPPER_CASE

---

# Soft Delete

Utilizar Soft Delete para:

Produtos

Usuários

Categorias

Clientes

Nunca para:

Itens da venda

Movimentações financeiras

Histórico

---

# Auditoria

Registrar:

Quem criou

Quem alterou

Quem excluiu

Data

IP

---

# Segurança

Sanitização de entrada

Validação obrigatória

Proteção contra SQL Injection

Proteção XSS

Rate Limit

Autenticação JWT ou Sanctum

CORS configurado

---

# Estrutura de Módulos

Cada domínio deverá ser independente.

Exemplo:

```
Auth

Products

Sales

Payments

Stock

Reports

Users

Settings
```

Cada módulo deverá possuir:

```
Controller

Service

Repository

Request

Resource

Model

Routes
```

---

# Padrões de Código

Seguir:

- SOLID
- DRY
- KISS
- Clean Code
- Clean Architecture (quando aplicável)

---

# Fluxo de Venda

```
Operador

↓

Leitura Código

↓

Busca Produto

↓

Adiciona Item

↓

Atualiza Total

↓

Seleciona Pagamento

↓

Finaliza Venda

↓

Baixa Estoque

↓

Registra Financeiro

↓

Imprime Cupom

↓

Abre Gaveta (se necessário)
```

---

# Hardware Agent

A comunicação com dispositivos físicos deverá ocorrer exclusivamente através do Hardware Agent.

Fluxo:

```
Frontend

↓

API

↓

Hardware Agent

↓

Impressora
```

Nunca acessar impressoras diretamente pelo navegador.

---

# Docker

Todos os serviços deverão comunicar-se por rede Docker.

Volumes persistentes para:

- PostgreSQL
- Redis
- Logs

---

# Escalabilidade

A arquitetura deverá permitir futuramente:

- Multiempresa
- Multiloja
- API pública
- Aplicativo Mobile
- Dashboard Web
- Integração Fiscal
- Integração com ERP
- Integração com Delivery
- Programa de Fidelidade

Sem necessidade de reescrita da arquitetura.

---

# Objetivos Arquiteturais

- Alta coesão
- Baixo acoplamento
- Facilidade de testes
- Facilidade de manutenção
- Separação clara de responsabilidades
- Código reutilizável
- Escalabilidade horizontal
- Evolução contínua sem quebra de compatibilidade