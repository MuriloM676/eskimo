# Spec 005 - Frente de Caixa (PDV)

# Objetivo

Definir o módulo principal do sistema: a tela de vendas (PDV - Point of Sale), responsável por registrar todas as vendas da sorveteria de forma rápida, fluida e operável 100% via teclado e leitor de código de barras.

Este é o coração do sistema.

---

# Escopo

Este módulo cobre:

- Tela principal do caixa
- Adição de produtos por código de barras
- Busca rápida de produtos
- Controle de itens da venda
- Cálculo de total
- Descontos e acréscimos
- Cancelamento de itens e venda
- Seleção de pagamento
- Finalização de venda
- Integração com impressão
- Integração com gaveta de dinheiro
- Operação por teclado
- Alta performance

---

# Fluxo Principal de Venda

```
1. Operador abre PDV
2. Sistema aguarda leitura
3. Produto escaneado
4. Item adicionado à venda
5. Operador repete processo
6. Cliente finaliza compra
7. Seleciona pagamento
8. Venda é finalizada
9. Estoque é atualizado
10. Cupom é impresso
11. Gaveta abre (se necessário)
```

---

# Modelo de Dados (Uso no PDV)

## Sale (Venda)

```
id
cash_register_id
user_id
customer_id (nullable)
status (OPEN | PAID | CANCELED)
subtotal
discount
total
created_at
updated_at
``` id="sale001"

---

## SaleItem

```
id
sale_id
product_id
product_name_snapshot
quantity
unit_price
total_price
created_at
``` id="sale002"

---

## Payment

```
id
sale_id
method (cash | pix | debit | credit | mixed)
amount
change_amount
created_at
``` id="pay001"

---

# Tela do PDV

## Layout

```
+---------------------------------------------------+
| PRODUTOS (lista da venda)                        |
|---------------------------------------------------|
| Coca Cola           1x   8.00                    |
| Sorvete 2 bolas     2x  24.00                   |
|---------------------------------------------------|
| TOTAL: R$ 32.00                                  |
|---------------------------------------------------|
| [ INPUT CODIGO DE BARRAS ..................... ]  |
|---------------------------------------------------|
| F2 Buscar | F3 Desconto | F4 Pagamento | F9 Final |
+---------------------------------------------------+
``` id="ui001"

---

# Entrada de Código de Barras

## Regras

- Campo sempre com autofocus
- Leitor funciona como teclado
- Enter adiciona produto automaticamente
- Sem necessidade de clique

```
7891234567890 + ENTER
→ adiciona produto
``` id="scan001"

---

# Busca de Produto

- F2 abre modal de busca
- Busca por nome ou código
- Retorno rápido (<200ms)
- Limite de 20 resultados

---

# Manipulação de Itens

## Operações

- aumentar quantidade
- diminuir quantidade
- remover item
- editar preço (com permissão)

---

## Atalhos

```
↑ ↓ → navegação
ENTER adicionar
DEL remover item
F3 desconto
F4 pagamento
ESC cancelar venda
``` id="keys001"

---

# Descontos

Regras:

- Apenas gerente/admin pode aplicar desconto livre
- Operador pode aplicar desconto limitado (ex: até 10%)
- Desconto pode ser:

  - valor fixo
  - percentual

---

# Cancelamento

## Venda

- Apenas antes do pagamento
- Após pagamento apenas estorno (futuro)

## Item

- Pode remover item da venda aberta
- Registro de auditoria obrigatório

---

# Pagamento

## Métodos

- Dinheiro
- PIX
- Débito
- Crédito
- Múltiplo

---

## Fluxo

```
Seleciona pagamento
→ calcula total
→ registra pagamento
→ finaliza venda
``` id="payflow"

---

## Troco

Se dinheiro:

```
troco = valor_pago - total
```

---

# Finalização de Venda

Ao finalizar:

1. Validar itens
2. Criar Payment
3. Atualizar Sale status = PAID
4. Dar baixa no estoque
5. Gerar log financeiro
6. Enviar impressão
7. Abrir gaveta (se dinheiro)

---

# Performance

O PDV deve ser extremamente rápido:

- Inserção de item: < 100ms
- Busca produto: < 200ms
- Atualização UI: instantânea
- Finalização venda: < 500ms

---

# Estado da Tela

## Frontend (Pinia)

```
sale
items
total
discount
payment
loading
error
```

---

# Regras de UX

- Sem reload de página
- Sem cliques desnecessários
- Tudo via teclado
- Interface sempre responsiva
- Modo fullscreen obrigatório
- Fonte grande para operação rápida

---

# Integração com Backend

## Endpoints principais

```
POST /api/v1/sales/start
POST /api/v1/sales/add-item
POST /api/v1/sales/remove-item
POST /api/v1/sales/apply-discount
POST /api/v1/sales/pay
POST /api/v1/sales/cancel
GET  /api/v1/sales/{id}
``` id="api005"

---

# Cache e Performance

- Carrinho mantido no frontend + backend sincronizado
- Redis para sessões de venda
- Evitar múltiplas consultas desnecessárias
- Produtos cacheados (Spec 004)

---

# Concorrência

- Apenas 1 venda ativa por caixa (configurável)
- Bloqueio de sessão de caixa

---

# Integração com Hardware

## Impressora

Após pagamento:

```
API → Hardware Agent → Impressora ESC/POS
``` id="print001"

---

## Gaveta

Se pagamento em dinheiro:

```
POST /drawer/open
``` id="drawer001"

---

# Regras de Segurança

- Venda só pode ser finalizada logado
- Desconto exige permissão
- Cancelamento gera auditoria
- Nenhuma venda pode ser alterada após pagamento

---

# Auditoria

Registrar:

- itens adicionados/removidos
- desconto aplicado
- venda cancelada
- pagamento realizado
- operador responsável

---

# Erros Comuns

- produto não encontrado
- estoque insuficiente
- caixa fechado
- permissão negada

---

# Estados da Venda

```
OPEN
PAID
CANCELED
``` id="state001"

---

# Validações

- não permitir venda vazia
- não permitir pagamento negativo
- validar estoque (opcional futuro modo flexível)

---

# Requisitos Não Funcionais

- UI sem delay perceptível
- estabilidade contínua (8h+ aberto)
- tolerância a falhas de rede (futuro offline mode)
- baixa latência em rede local

---

# Futuro (não MVP)

- split de pagamento avançado
- fidelidade/cashback
- integração PIX automática
- impressão personalizada por loja
- modo offline completo

---

# Objetivo Final

Permitir que o operador:

- escaneie produtos rapidamente
- finalize vendas em segundos
- nunca precise usar mouse
- tenha zero fricção no fluxo de caixa
```