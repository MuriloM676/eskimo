# Spec 007 - Estoque e Movimentação de Produtos

# Objetivo

Definir o módulo de controle de estoque do sistema PDV da sorveteria, garantindo rastreabilidade total das entradas, saídas e ajustes de produtos.

Este módulo é responsável por manter a consistência física e lógica do estoque.

---

# Escopo

Este módulo cobre:

- Controle de estoque por produto
- Movimentações automáticas (vendas)
- Movimentações manuais (ajustes)
- Entradas de mercadoria
- Saídas por venda
- Histórico completo de movimentações
- Inventário futuro
- Alertas de estoque baixo

---

# Modelo de Dados

## ProductStock

```
id
product_id
quantity
updated_at
``` id="stk001"

---

## ProductStockMovement

```
id
product_id
type (IN | OUT | ADJUST | SALE)
quantity
previous_quantity
new_quantity
reason
reference_type
reference_id
user_id
created_at
``` id="stk002"

---

## StockAdjustment

```
id
product_id
user_id
type (IN | OUT)
quantity
reason
created_at
``` id="stk003"

---

# Tipos de Movimentação

## IN

- Entrada de estoque
- Compra de fornecedor
- Ajuste positivo

---

## OUT

- Venda
- Perda
- Ajuste negativo

---

## ADJUST

- Correção manual de estoque
- Inventário físico

---

## SALE

- Movimentação automática gerada por venda no PDV

---

# Regras de Negócio

- Todo movimento de estoque deve gerar histórico
- Estoque nunca deve ser alterado sem registro de movimentação
- Venda sempre gera saída automática (SALE)
- Ajustes precisam de permissão de gerente ou admin
- Estoque não pode ficar negativo (configurável)

---

# Fluxo de Venda (Integração PDV)

```
Venda finalizada
→ SaleService
→ baixa estoque
→ gera ProductStockMovement (SALE)
``` id="flow001"

---

# Atualização de Estoque

## Regra base

```
novo_estoque = estoque_atual + IN - OUT
``` id="calc001"

---

## Exemplo

```
Estoque atual: 10
Venda: 3 unidades

Novo estoque: 7
``` id="ex001"

---

# Entrada de Estoque

Usado quando chega mercadoria.

## Fluxo

```
Fornecedor entrega produto
→ usuário registra entrada
→ estoque aumenta
→ movimento IN criado
``` id="in001"

---

# Saída Manual

Casos:

- perda
- quebra
- consumo interno

---

# Ajuste de Estoque

## Regras

- somente gerente/admin
- sempre requer motivo
- cria histórico obrigatório

---

## Exemplo

```
Estoque sistema: 20
Estoque físico: 18

Ajuste: -2
``` id="adj001"

---

# Estoque Baixo

## Regra

Produto deve ter campo:

```
min_stock
``` id="min001"

---

## Alerta

Se:

```
stock_quantity <= min_stock
``` id="alert001"

Sistema deve:

- exibir alerta no dashboard
- destacar produto no painel

---

# API Endpoints

## Estoque

```
GET /api/v1/stock
GET /api/v1/stock/{product_id}
``` id="api001"

---

## Movimentações

```
GET /api/v1/stock/movements
``` id="api002"

---

## Ajuste

```
POST /api/v1/stock/adjust
``` id="api003"

Payload:

```json
{
  "product_id": 1,
  "type": "OUT",
  "quantity": 2,
  "reason": "Produto vencido"
}
```

---

## Entrada

```
POST /api/v1/stock/in
``` id="api004"

---

# Frontend

## Telas

### Estoque

- lista de produtos
- quantidade atual
- status (ok / baixo / zerado)

---

### Movimentações

- histórico completo
- filtros por produto
- filtros por tipo

---

### Ajuste Manual

- formulário simples
- motivo obrigatório
- permissão exigida

---

# Regras de Segurança

- somente usuários autorizados podem ajustar estoque
- toda alteração gera auditoria
- estoque nunca pode ser alterado diretamente no Product model

---

# Auditoria

Registrar:

- usuário responsável
- tipo de movimentação
- quantidade antes e depois
- motivo
- origem (PDV, manual, sistema)

---

# Integração com PDV

```
SaleItem → StockService → Movement (SALE)
``` id="pdv001"

---

# Performance

- leitura de estoque: < 100ms
- movimentação: < 300ms
- histórico paginado obrigatório
- índices no banco obrigatórios

---

# Índices de Banco

- product_id
- type
- created_at

---

# Cache

Redis:

- estoque atual de produtos mais vendidos
- alertas de estoque baixo

TTL curto (30–60s)

---

# Regras Importantes

- nunca confiar apenas no frontend
- backend é fonte da verdade
- estoque deve ser consistente mesmo com falhas de rede
- operações devem ser idempotentes (evitar duplicação em retry)

---

# Requisitos Não Funcionais

- consistência forte
- tolerância a falhas
- logs imutáveis
- rastreabilidade total
- performance estável em uso contínuo

---

# Futuro (não MVP)

- inventário completo (contagem física guiada)
- integração com fornecedor
- previsão de reposição automática
- relatórios avançados de perda
- múltiplos depósitos
- lote e validade de produtos

---

# Objetivo Final

Garantir que o sistema sempre saiba:

- quanto existe de cada produto
- onde foi consumido
- quem alterou
- por quê foi alterado

Com rastreabilidade total e sem inconsistências
```