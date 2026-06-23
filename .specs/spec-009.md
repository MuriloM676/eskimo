# Spec 008 - Impressão ESC/POS (Cupom, Comprovantes e Integração Térmica)

# Objetivo

Definir o módulo responsável por geração e envio de impressões para impressoras térmicas usando protocolo ESC/POS.

Este módulo cobre impressão de cupons de venda, abertura de gaveta, QR Code e comandos básicos de impressoras fiscais não integradas (MVP).

---

# Escopo

Este módulo cobre:

- Impressão de cupom de venda
- Impressão de recibos
- Impressão de fechamento de caixa
- Impressão de QR Code
- Impressão de código de barras
- Corte automático de papel
- Abertura de gaveta via impressora
- Templates de impressão
- Comunicação via Hardware Agent

---

# Arquitetura de Impressão

A impressão NÃO será feita pelo frontend.

Fluxo obrigatório:

```
Frontend → API Laravel → Hardware Agent → Impressora ESC/POS
``` id="arch001"

---

# Hardware Agent

Responsável por:

- comunicação com impressora
- envio de comandos ESC/POS
- gerenciamento de fila de impressão
- status da impressora

Endpoint base:

```
http://localhost:9100
``` id="agent001"

---

## Endpoints do Agent

### Impressão

```
POST /print
``` id="p001"

Payload:

```json
{
  "printer": "default",
  "content": "ESC/POS RAW or structured JSON"
}
```

---

### Abrir Gaveta

```
POST /drawer/open
``` id="d001"

---

### Status

```
GET /status
``` id="s001"

---

# Formato de Impressão

O sistema suportará dois modos:

## 1. ESC/POS RAW

Envio direto de comandos:

```
\x1B\x40  // reset
\x1B\x61\x01 // centralizar
```

---

## 2. Estruturado (Recomendado)

Formato JSON interpretado pelo Agent:

```json id="fmt001"
{
  "type": "receipt",
  "lines": [
    { "text": "SORVETERIA XPTO", "align": "center", "bold": true },
    { "text": "Rua Central, 123", "align": "center" },
    { "text": "------------------------" },
    { "text": "Coca Cola x1    R$ 8,00" }
  ],
  "cut": true
}
```

---

# Tipos de Impressão

## Cupom de Venda

Inclui:

- Nome da loja
- CNPJ (futuro)
- Data/hora
- Lista de itens
- Total
- Forma de pagamento
- Troco (se houver)
- QR Code (futuro NFC-e)
- Mensagem final

---

## Fechamento de Caixa

Inclui:

- total vendas
- total por método de pagamento
- sangria/suprimento
- operador
- período

---

## Recibos

Uso futuro para:

- pagamentos parciais
- confirmações internas

---

# Template de Cupom

```text id="tpl001"
SORVETERIA EXEMPLO
Rua Central, 123

--------------------------------
Coca Cola        1x   8,00
Sorvete 2 bolas  2x  24,00
--------------------------------
TOTAL:               32,00

Dinheiro: 50,00
Troco:    18,00

Obrigado pela preferência!
``` 

---

# ESC/POS Comandos Principais

## Inicialização

```
ESC @
``` id="esc001"

---

## Negrito

```
ESC E 1   (on)
ESC E 0   (off)
``` id="esc002"

---

## Centralizar

```
ESC a 1
``` id="esc003"

---

## Corte de Papel

```
GS V 1
``` id="esc004"

---

## Abrir Gaveta

```
ESC p 0 25 250
``` id="esc005"

---

## QR Code (futuro)

- geração via biblioteca
- envio como imagem raster

---

# Fluxo de Impressão

```
Venda finalizada
→ SaleService
→ PaymentService
→ PrintService (Laravel)
→ Hardware Agent
→ Impressora
``` id="flow001"

---

# PrintService (Backend)

Responsável por:

- montar layout do cupom
- converter para JSON ESC/POS
- enviar para agent
- registrar logs de impressão

---

# API Endpoints

## Impressão de venda

```
POST /api/v1/print/sale/{id}
``` id="api001"

---

## Fechamento de caixa

```
POST /api/v1/print/cash-close/{cash_id}
``` id="api002"

---

## Teste de impressora

```
POST /api/v1/print/test
``` id="api003"

---

# Regras de Negócio

- impressão só ocorre após pagamento confirmado
- impressão deve ser idempotente (evitar duplicação)
- reimpressão deve ser possível via permissão
- logs de todas impressões são obrigatórios

---

# Reimpressão

Permitida apenas para:

- admin
- gerente

Deve registrar motivo:

```
"cupom apagado"
"reimpressão solicitada"
``` id="rep001"

---

# Fila de Impressão

Sistema deve usar fila (Redis + Laravel Queue):

- evitar travamento do PDV
- garantir ordem de impressão
- retry automático em falhas

---

# Tratamento de Falhas

- impressora offline
- agent offline
- timeout de rede

Sistema deve:

- armazenar job
- tentar novamente
- alertar operador

---

# Performance

- envio para agent: < 200ms
- impressão: depende do hardware (< 2s ideal)
- geração de layout: < 100ms

---

# Segurança

- apenas backend pode enviar comandos de impressão
- agent só aceita requisições locais (localhost)
- validação de payload obrigatório
- proteção contra injeção de comandos ESC/POS

---

# Logs

Registrar:

- venda associada
- operador
- horário
- conteúdo impresso (hash)
- status (success/fail)

---

# Cache

Não aplicável diretamente, mas:

- templates de impressão podem ser cacheados
- configurações da loja podem ser cacheadas

---

# Extensibilidade

Preparado para:

- múltiplas impressoras por loja
- impressão automática por evento
- integração fiscal futura (NFC-e / SAT)
- personalização por unidade

---

# Requisitos Não Funcionais

- alta confiabilidade
- tolerância a falhas de hardware
- baixa latência no fluxo de venda
- operação contínua por horas

---

# Objetivo Final

Garantir que o sistema consiga:

- imprimir cupons consistentes
- operar com qualquer impressora ESC/POS compatível
- não travar o caixa em caso de falha de impressão
- manter histórico auditável de todas impressões
```