# Spec 001 - Sistema de Caixa para Sorveteria (PDV Web)

# Objetivo

Desenvolver um sistema de Frente de Caixa (PDV) totalmente web para utilização em sorveterias, permitindo registrar vendas de maneira rápida, simples e segura.

O sistema deverá funcionar em navegador moderno, utilizando arquitetura SPA + API, sendo totalmente executado em containers Docker.

O foco principal é velocidade de operação no caixa.

---

# Objetivos do Projeto

O sistema deverá permitir:

- Registrar vendas em poucos segundos
- Operação totalmente via teclado
- Integração com leitor de código de barras
- Impressão de cupons em impressoras térmicas ESC/POS
- Controle de caixa
- Controle de estoque
- Cadastro de produtos
- Cadastro de usuários
- Relatórios financeiros
- Histórico completo de vendas

---

# Público Alvo

Pequenas e médias sorveterias.

O sistema deverá funcionar em computadores Windows e Linux utilizando apenas navegador web.

---

# Stack Tecnológica

## Backend

- PHP 8.4
- Laravel 12
- Laravel Octane (opcional)
- PostgreSQL
- Redis

## Frontend

- Vue 3
- TypeScript
- Vite
- Pinia
- Vue Router
- PrimeVue

---

# Arquitetura

Frontend (Vue SPA)

↓

API REST Laravel

↓

PostgreSQL

↓

Redis

↓

Hardware Agent

↓

Impressora / Gaveta / Outros dispositivos

---

# Comunicação

Todo acesso aos dados será realizado através de API REST.

Não haverá renderização de páginas Blade.

O frontend será totalmente desacoplado do backend.

---

# Hardware Suportado

O sistema deverá suportar:

- Leitor USB de código de barras
- Impressoras térmicas ESC/POS
- Gaveta de dinheiro
- Impressoras USB
- Impressoras de rede

No futuro deverá suportar:

- Balança
- Display do cliente
- NFC-e
- SAT
- PIX automático
- TEF

---

# Hardware Agent

O acesso aos dispositivos físicos NÃO deverá ser realizado diretamente pelo navegador.

Será desenvolvido um agente local responsável pela comunicação com:

- Impressora
- Gaveta
- Display
- Balança

O agente deverá disponibilizar uma API HTTP ou WebSocket local.

Exemplo:

http://localhost:9100

Endpoints exemplo:

POST /print

POST /drawer/open

GET /status

GET /printers

---

# Integração com Leitor de Código de Barras

O sistema deverá considerar leitores USB do tipo HID (Keyboard Emulator).

Esses leitores digitam automaticamente o código e enviam ENTER.

O frontend deverá possuir um campo de captura permanente para leitura dos códigos.

Ao receber ENTER deverá:

1. localizar o produto
2. adicionar na venda
3. atualizar total
4. limpar o campo

Sem necessidade de clique do operador.

---

# Integração ESC/POS

O sistema deverá gerar comandos ESC/POS.

O backend enviará o conteúdo para o Hardware Agent.

O agente será responsável pela impressão.

Deverá existir suporte para:

- Texto
- Negrito
- Centralização
- QRCode
- Código de barras
- Corte de papel
- Abertura de gaveta

---

# Operação do Caixa

A tela principal deverá permitir:

- leitura por código de barras
- pesquisa rápida
- alteração de quantidade
- desconto
- cancelamento de item
- cancelamento da venda
- múltiplas formas de pagamento
- impressão automática
- abertura da gaveta

Toda operação deverá ser possível utilizando apenas teclado.

---

# Performance

Objetivos:

Tempo de abertura da tela:

< 2 segundos

Leitura de código:

< 200ms

Adicionar produto:

< 100ms

Impressão:

< 2 segundos

---

# Segurança

Autenticação obrigatória.

Controle de permissões.

Registro de auditoria.

Sessões protegidas.

API autenticada.

Proteção CSRF quando aplicável.

---

# Banco de Dados

Utilizar PostgreSQL.

Todos os registros importantes deverão possuir:

id

created_at

updated_at

deleted_at (Soft Delete quando necessário)

---

# Controle de Estoque

Toda venda deverá gerar movimentação automática de estoque.

Não será permitido estoque negativo (configurável futuramente).

---

# Controle Financeiro

Cada venda deverá registrar:

- total
- desconto
- acréscimo
- operador
- horário
- caixa
- formas de pagamento

---

# Usuários

Perfis previstos:

Administrador

Gerente

Operador de Caixa

Cada perfil possuirá permissões específicas.

---

# Docker

Todo ambiente deverá ser executado via Docker Compose.

Containers previstos:

nginx

php

postgres

redis

mailpit

adminer

---

# Organização do Projeto

/backend

/frontend

/docker

/docs

/specs

/scripts

---

# Estrutura Backend

Controllers

Services

Repositories

Models

Policies

Requests

Resources

Jobs

Events

Listeners

---

# Estrutura Frontend

Views

Components

Layouts

Stores

Composables

Services

Types

Router

---

# Qualidade de Código

Seguir PSR-12.

Utilizar TypeScript Strict.

Utilizar SOLID.

Utilizar Clean Architecture sempre que possível.

Evitar lógica de negócio em Controllers.

Toda regra deverá ficar em Services.

---

# Escalabilidade

O sistema deverá ser preparado para futura expansão com:

- Multiempresa
- Multiloja
- Delivery
- Comandas
- Fidelidade
- Cashback
- Aplicativo Mobile
- Dashboard em Tempo Real
- Integração com ERP
- Integração com APIs fiscais

---

# Fora do Escopo Inicial

Nesta primeira versão NÃO serão desenvolvidos:

- NFC-e
- SAT
- PIX automático
- Delivery
- Comandas
- Aplicativo Mobile
- Multiempresa
- Integrações fiscais

Esses módulos serão implementados em futuras especificações.

---

# Próximas Specs

Spec-002 Arquitetura

Spec-003 Usuários e Permissões

Spec-004 Cadastro de Produtos

Spec-005 Frente de Caixa (PDV)

Spec-006 Pagamentos

Spec-007 Estoque

Spec-008 Impressão ESC/POS

Spec-009 Hardware Agent

Spec-010 Relatórios

Spec-011 Docker

Spec-012 Requisitos Não Funcionais