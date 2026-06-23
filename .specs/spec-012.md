# Spec 012 - Requisitos Não Funcionais (Performance, Segurança, Escalabilidade e Confiabilidade)

# Objetivo

Definir os requisitos não funcionais do sistema PDV da sorveteria, garantindo que o sistema seja rápido, seguro, confiável e adequado para operação contínua em ambiente real de caixa.

Esta spec estabelece os padrões de qualidade do sistema como um todo.

---

# Escopo

Este documento cobre:

- Performance
- Segurança
- Confiabilidade
- Escalabilidade
- Disponibilidade
- Usabilidade
- Observabilidade
- Manutenibilidade
- Resiliência a falhas

---

# Performance

## Requisitos gerais

O sistema deve operar com latência mínima no ambiente de caixa.

### Tempo de resposta máximo

- Login: < 300ms
- Busca de produto: < 200ms
- Adição de item no PDV: < 100ms
- Atualização de tela: instantânea (< 50ms percebido)
- Finalização de venda: < 500ms
- Impressão (envio ao agent): < 200ms

---

## Estratégias de performance

- Cache agressivo (Redis)
- Queries otimizadas com índices
- DTOs leves (sem payloads desnecessários)
- Paginação obrigatória em listagens
- Evitar joins pesados no PDV
- Pré-carregamento de produtos mais usados

---

# Segurança

## Princípios

- Zero confiança no frontend
- Backend como fonte única de verdade
- Autenticação obrigatória em todas rotas
- Auditoria completa de ações críticas

---

## Proteções obrigatórias

- Sanctum ou JWT para autenticação
- Rate limiting por IP e usuário
- Proteção contra brute force
- CSRF (quando aplicável)
- Sanitização de inputs
- Proteção contra SQL Injection
- Proteção contra XSS

---

## Controle de acesso

- RBAC (Role-Based Access Control)
- Permissões granulares por ação
- Middleware de permissão obrigatório

Exemplo:

```
sale.create
sale.cancel
product.manage
cash.close
``` id="sec001"

---

# Confiabilidade

## Regras

- Sistema deve suportar operação contínua (8–12h+)
- Nenhuma perda de dados em caso de falha parcial
- Operações devem ser idempotentes quando possível
- Retry automático em falhas de rede

---

## Estratégias

- Jobs em fila (Redis + Laravel Queue)
- Persistência antes de ações críticas
- Logs imutáveis
- Backup de dados críticos (futuro)

---

# Resiliência a falhas

## Cenários

### Falha de rede

- Sistema continua operando localmente
- Filas armazenam ações pendentes
- Retry automático quando conexão retorna

---

### Falha de impressora

- Venda não deve ser bloqueada
- Job de impressão fica pendente
- Operador é notificado

---

### Falha do Hardware Agent

- Sistema continua vendendo
- Impressões ficam em fila no backend
- Reenvio automático quando agent volta

---

### Falha do banco de dados

- Sistema entra em modo degradado
- Evitar escrita até recuperação
- Logs locais mantidos (futuro)

---

# Escalabilidade

## Arquitetura preparada para crescimento

- Multi-caixa
- Multi-loja (futuro)
- Multi-tenant (futuro)
- APIs versionadas (/api/v1)
- Separação frontend/backend
- Serviços desacoplados

---

## Estratégias

- Stateless backend
- Redis para cache e sessão
- Banco relacional escalável (PostgreSQL)
- Filas para processamento assíncrono

---

# Disponibilidade

## Meta

- 99%+ em ambiente local de loja
- tolerância a falhas de hardware
- funcionamento offline parcial (futuro avançado)

---

## Estratégias

- Docker restart policies
- fallback de serviços
- retry automático de jobs
- logs persistentes

---

# Usabilidade (UX operacional)

## Regras fundamentais

- operação 100% via teclado no PDV
- zero necessidade de mouse no caixa
- interface limpa e de alto contraste
- fontes grandes e legíveis
- ações rápidas e previsíveis

---

## Objetivo de UX

O operador deve conseguir:

- abrir caixa
- vender produto
- finalizar venda
- imprimir cupom

em poucos segundos, sem fricção.

---

# Observabilidade

## Logs

O sistema deve registrar:

- vendas
- cancelamentos
- erros
- login/logout
- ações críticas
- impressões

---

## Monitoramento (futuro)

- dashboard de saúde do sistema
- status de hardware agent
- status de filas
- métricas de performance

---

## Métricas importantes

- vendas por minuto
- tempo médio de venda
- falhas de pagamento
- erros de impressão
- estoque baixo

---

# Manutenibilidade

## Regras de código

- Clean Code obrigatório
- SOLID aplicado no backend
- separação clara de camadas
- services isolando regras de negócio
- controllers finos

---

## Estrutura modular

Cada domínio deve ser independente:

- Auth
- Products
- Sales
- Payments
- Stock
- Reports

---

## Testabilidade

- Services devem ser testáveis isoladamente
- Repositories desacoplados
- uso de mocks para integrações

---

# Segurança de Dados

## Princípios

- dados financeiros nunca podem ser perdidos
- alterações devem ser rastreáveis
- histórico imutável para vendas e pagamentos

---

## Auditoria obrigatória

Registrar:

- usuário responsável
- ação executada
- data/hora
- IP
- entidade afetada

---

# Performance em ambiente de caixa

## Regras críticas

- nenhuma operação pode travar UI
- backend não pode bloquear PDV
- impressão nunca bloqueia venda
- fallback sempre disponível

---

# Limites do sistema

## Frontend

- até 10.000 produtos com cache otimizado
- busca otimizada por índice local

---

## Backend

- suportar múltiplos caixas simultâneos
- alta taxa de requisições no PDV
- baixa latência constante

---

# Requisitos de rede

- funcionar em rede local (LAN)
- tolerar latência variável
- suportar desconexões temporárias

---

# Requisitos de hardware

- compatível com PCs simples
- suporte a impressoras térmicas comuns ESC/POS
- leitor de código de barras HID padrão
- operação em Windows e Linux

---

# Evolução futura

Sistema preparado para:

- offline-first mode completo
- mobile POS
- integração fiscal (NFC-e / SAT)
- TEF e pagamentos automáticos
- IA para análise de vendas
- multi-loja e franquias

---

# Objetivo Final

Garantir que o sistema seja:

- rápido como caixa de supermercado real
- confiável para operação diária
- resistente a falhas de hardware e rede
- seguro para dados financeiros
- escalável para crescimento futuro
```