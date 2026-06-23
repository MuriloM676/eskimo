# Spec 006 - Pagamentos

# Objetivo

Definir o módulo de pagamentos do sistema PDV, responsável por registrar, processar e controlar todas as formas de pagamento de uma venda, incluindo cenários simples e pagamentos múltiplos.

Este módulo garante a integridade financeira do sistema.

---

# Escopo

Este módulo cobre:

- Registro de pagamentos
- Dinheiro, PIX, cartão débito/crédito
- Pagamento múltiplo (split)
- Cálculo de troco
- Integração com fechamento de venda
- Validação financeira
- Estorno futuro (preparado)
- Auditoria de pagamentos

---

# Modelos de Dados

## Payment

```
id
sale_id
cash_register_id
method
amount
change_amount
status
created_at
updated_at
``` id="pay001"

---

## PaymentMethod (configuração futura)

```
id
name
key
active
requires_integration
created_at
updated_at
``` id="pay002"

---

## PaymentAllocation (pagamento múltiplo)

```
id
payment_id
sale_id
method
amount
created_at
``` id="pay003"

---

# Métodos de Pagamento

## MVP

- cash (Dinheiro)
- pix
- debit
- credit

---

## Futuro

- voucher
- convênio
- carteira digital
- integração TEF
- pagamento por QR dinâmico

---

# Fluxo de Pagamento

## Fluxo padrão

```
1. Venda finalizada no PDV
2. Sistema calcula total
3. Operador seleciona método
4. Valor é informado
5. Sistema valida pagamento
6. Registro é criado
7. Venda é marcada como PAID
8. Estoque é baixado
9. Impressão é acionada
``` id="flow001"

---

# Pagamento em Dinheiro

## Regras

- Permite troco
- Troco calculado automaticamente
- Não pode haver valor negativo

## Fórmula

```
troco = valor_pago - total_venda
``` id="cash001"

---

## Exemplo

```
Total: 25,00
Pago: 30,00
Troco: 5,00
```

---

# Pagamento PIX

## Regras

- Registro manual no MVP
- Futuro: integração automática com QR Code dinâmico

## Fluxo atual

```
Operador confirma pagamento PIX
→ registra no sistema
→ finaliza venda
``` id="pix001"

---

# Pagamento Cartão (Débito/Crédito)

## MVP

- Registro manual
- Sem TEF integrado inicialmente

## Futuro

- integração com adquirentes
- captura automática via terminal

---

# Pagamento Múltiplo (Split)

Permite dividir pagamento entre métodos.

## Exemplo

```
Total: 50,00

20,00 dinheiro
30,00 cartão
``` id="split001"

---

## Regras

- Soma dos pagamentos deve ser igual ao total
- Pode haver múltiplos registros PaymentAllocation
- Venda só finaliza quando total for atingido

---

# Status de Pagamento

## Payment.status

```
PENDING
COMPLETED
CANCELED
``` id="status001"

---

# Regras de Negócio

- Venda só pode ser finalizada com pagamento completo
- Pagamento não pode exceder total da venda
- Alterações após finalização exigem estorno (futuro)
- Todo pagamento deve estar vinculado a uma venda

---

# Integração com PDV

Fluxo:

```
PDV → Payment Service → Sale Update → Finalização
``` id="pdvpay"

---

# API Endpoints

## Pagamentos

```
POST /api/v1/payments
GET  /api/v1/payments/{id}
``` id="api001"

---

## Pagamento de venda

```
POST /api/v1/sales/{id}/pay
``` id="api002"

---

Payload exemplo:

```json
{
  "methods": [
    {
      "method": "cash",
      "amount": 20.00
    },
    {
      "method": "pix",
      "amount": 10.00
    }
  ]
}
```

---

# Validações

## Backend

- soma dos pagamentos = total da venda
- método válido
- venda deve estar OPEN
- não permitir pagamento duplicado

---

## Frontend

- impedir valores negativos
- mostrar troco em tempo real
- validar soma antes de enviar

---

# Regras de Troco

- apenas dinheiro gera troco
- troco nunca pode ser negativo
- sistema deve exibir troco antes da confirmação

---

# Auditoria

Registrar:

- método usado
- valor pago
- operador
- data/hora
- caixa
- diferença (troco)
- tentativa de pagamento inválido

---

# Segurança

- pagamentos só podem ser criados com usuário autenticado
- permissões necessárias para métodos específicos (futuro)
- logs imutáveis após criação

---

# Fluxo de Finalização

```
Pagamento validado
→ Sale.status = PAID
→ estoque atualizado
→ impressão enviada
→ gaveta aberta (dinheiro)
``` id="final001"

---

# Integração com Hardware

## Impressão

Após pagamento:

```
POST /print
``` id="print001"

---

## Gaveta de Dinheiro

Se método incluir cash:

```
POST /drawer/open
``` id="drawer001"

---

# Cache e Performance

- cálculos de total feitos no frontend e backend
- evitar recomputação de itens
- respostas de pagamento < 500ms

---

# Erros Comuns

- "Pagamento maior que total"
- "Venda já paga"
- "Método inválido"
- "Venda não encontrada"

---

# Requisitos Não Funcionais

- consistência financeira absoluta
- nenhuma perda de dados de pagamento
- logs auditáveis
- tolerância a falhas de rede (retry futuro)

---

# Futuro (não MVP)

- TEF integrado
- PIX automático com QR dinâmico
- split avançado com regras
- cashback
- carteira digital
- estorno automático
- conciliação financeira

---

# Objetivo Final

Garantir que o sistema:

- registre pagamentos com precisão
- suporte múltiplos métodos
- mantenha integridade financeira total
- funcione rápido no ambiente de caixa
```