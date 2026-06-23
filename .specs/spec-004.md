# Spec 004 - Cadastro de Produtos e Catálogo

# Objetivo

Definir o módulo responsável pelo cadastro, manutenção e consulta de produtos no sistema PDV da sorveteria.

Este módulo é crítico, pois todo o fluxo de venda depende da precisão dos dados de produtos (preço, código de barras, estoque e categoria).

---

# Escopo

Este módulo cobre:

- Cadastro de produtos
- Edição e remoção lógica
- Busca rápida (PDV)
- Código de barras
- Categorias
- Preços
- Controle de estoque básico
- Ativação/desativação de produtos
- Importação futura

---

# Modelo de Dados

## Product

```
id
name
description
barcode
price
cost_price
category_id
stock_quantity
min_stock
active
image_url
created_at
updated_at
deleted_at
``` id="prd001"

---

## Category

```
id
name
description
active
created_at
updated_at
``` id="cat001"

---

## ProductStockMovement

Controle de movimentação de estoque:

```
id
product_id
type (IN | OUT | ADJUST)
quantity
reason
reference_type
reference_id
user_id
created_at
``` id="stk001"

---

# Regras de Negócio

## Produto

- Todo produto deve ter nome e preço obrigatórios
- Código de barras deve ser único (quando informado)
- Produto pode existir sem estoque inicial
- Produto inativo não aparece no PDV
- Soft delete obrigatório

---

## Preço

- Preço é sempre em centavos internamente (evitar float)
- Exibição formatada no frontend
- Futuro: múltiplos preços (atacado/varejo)

---

## Estoque

- Estoque é atualizado automaticamente via vendas
- Movimentações manuais são registradas em ProductStockMovement
- Estoque nunca deve ser alterado diretamente no campo stock_quantity sem registro

---

# Código de Barras

## Regras

- Leitura via padrão EAN-13 / Code128
- Campo barcode deve aceitar strings numéricas
- Busca no PDV deve priorizar barcode

---

## Fluxo no PDV

```
Leitor → Frontend → API → Product lookup → retorno imediato
``` id="bcflow"

Tempo máximo: < 200ms

---

# Categorias

Exemplos:

- Sorvetes
- Picolés
- Bebidas
- Complementos
- Embalagens
- Outros

---

# API Endpoints

## Produtos

```
GET    /api/v1/products
GET    /api/v1/products/{id}
POST   /api/v1/products
PUT    /api/v1/products/{id}
DELETE /api/v1/products/{id}
``` id="api001"

---

## Busca rápida (PDV)

Endpoint otimizado:

```
GET /api/v1/products/search?q=
``` id="api002"

Regras:

- Deve buscar por nome
- Deve buscar por código de barras
- Deve retornar no máximo 20 itens
- Deve ser extremamente rápido (cache Redis)

---

## Categorias

```
GET /api/v1/categories
POST /api/v1/categories
PUT /api/v1/categories/{id}
DELETE /api/v1/categories/{id}
``` id="api003"

---

# Regras de Performance

- Busca deve usar índice no banco (barcode, name)
- Cache de produtos frequentes no Redis
- Evitar joins pesados no PDV
- Serialização leve (DTO + Resource)

---

# Frontend

## Telas

### Produtos

- Lista de produtos
- Busca
- Filtro por categoria
- Status ativo/inativo

---

### Cadastro de Produto

Campos:

- Nome
- Descrição
- Código de barras
- Preço
- Custo
- Categoria
- Estoque inicial
- Estoque mínimo
- Status
- Imagem

---

## UX

- Formulário rápido
- Validação em tempo real
- Auto focus no campo nome
- Atalhos de teclado (futuro)

---

# Integração com PDV

O produto deve ser carregado rapidamente na tela de venda:

```
barcode → product lookup → add item
``` id="pdvint"

Sem delays perceptíveis ao operador.

---

# Validações

## Backend

- Nome obrigatório
- Preço > 0
- Barcode único
- Categoria válida (se informada)

---

## Frontend

- Form validation imediata
- Máscara de preço
- Validação de código de barras numérico

---

# Importação (Futuro)

Preparado para:

- CSV
- Excel
- API externa

Formato esperado:

```
name,barcode,price,cost,category,stock
```

---

# Imagens de Produto

- Suporte a URL de imagem
- Futuro: upload local via storage (S3/MinIO)

---

# Estoque Inicial

Ao criar produto:

- pode definir estoque inicial
- gera movimentação automática tipo IN

---

# Movimentação de Estoque

Sempre que ocorrer:

- venda → OUT
- ajuste manual → ADJUST
- compra futura → IN

Exemplo:

```json id="mov001"
{
  "product_id": 1,
  "type": "OUT",
  "quantity": 2,
  "reason": "Venda PDV",
  "reference_type": "Sale",
  "reference_id": 10
}
```

---

# Segurança

- Apenas admin e gerente podem criar/editar produtos
- Operador pode apenas visualizar
- Exclusão sempre soft delete

---

# Cache Strategy

Redis:

- Produtos mais vendidos
- Últimos produtos vendidos
- Busca por barcode

TTL: curto (30s–2min)

---

# Índices de Banco

- products.barcode (unique index)
- products.name (index)
- products.category_id (index)

---

# Requisitos Não Funcionais

- Busca por código: < 100ms
- Listagem geral: < 300ms
- Criação: < 500ms
- Cache hit rate alta no PDV

---

# Objetivo Final

Garantir que o operador consiga:

- encontrar produto instantaneamente
- vender sem travamentos
- operar apenas com teclado/leitor
- manter estoque consistente automaticamente
```