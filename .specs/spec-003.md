# Spec 003 - Usuários, Autenticação e Permissões

# Objetivo

Definir o módulo de autenticação, gerenciamento de usuários, controle de acesso baseado em permissões (RBAC) e auditoria de ações no sistema de PDV da sorveteria.

Este módulo é base para toda a segurança do sistema.

---

# Escopo

Este módulo cobre:

- Login e logout
- Gestão de usuários
- Perfis de acesso
- Permissões por funcionalidade
- Controle de sessão
- Auditoria de ações
- Bloqueio de acesso indevido

---

# Modelos Principais

## User

```
id
name
email
password
role_id
active
last_login_at
created_at
updated_at
deleted_at
```

---

## Role (Perfil)

```
id
name
description
created_at
updated_at
```

Exemplos:

- Admin
- Gerente
- Operador de Caixa

---

## Permission

```
id
name
key
description
created_at
updated_at
```

Exemplos de keys:

```
cash.open
cash.close
sale.create
sale.cancel
product.create
product.delete
report.view
user.manage
```

---

## RolePermission

Tabela pivot:

```
role_id
permission_id
```

---

## AuditLog

```
id
user_id
action
entity_type
entity_id
payload (json)
ip_address
created_at
```

---

# Autenticação

## Método

Utilizar Laravel Sanctum.

Fluxo:

```
Frontend → POST /login → API → Token → Frontend
```

---

## Login

Endpoint:

```
POST /api/v1/auth/login
```

Payload:

```json
{
  "email": "admin@sorveteria.com",
  "password": "123456"
}
```

Resposta:

```json
{
  "success": true,
  "data": {
    "token": "abc123",
    "user": {
      "id": 1,
      "name": "Admin",
      "role": "Admin"
    }
  }
}
```

---

## Logout

```
POST /api/v1/auth/logout
```

Revoga token atual.

---

## Refresh (opcional futuro)

Preparado para renovação de token.

---

# Controle de Acesso (RBAC)

O sistema deverá usar Role-Based Access Control.

Fluxo:

```
Usuário → Role → Permissions
```

---

## Verificação de Permissão

Exemplo:

```php
$user->hasPermission('sale.create');
```

Ou via middleware:

```
permission:sale.create
```

---

## Middleware de Permissão

Exemplo:

```
Route::post('/sales', ...)
    ->middleware('permission:sale.create');
```

---

# Perfis de Acesso

## Admin

- Acesso total ao sistema
- Gerencia usuários
- Gerencia permissões
- Visualiza relatórios completos

---

## Gerente

- Abre e fecha caixa
- Visualiza relatórios
- Gerencia produtos e estoque
- Não gerencia usuários

---

## Operador de Caixa

- Acessa PDV
- Realiza vendas
- Aplica descontos limitados
- Não acessa relatórios financeiros completos

---

# Sessões

Utilizar Laravel Sanctum com tokens.

Cada login gera um token único.

O token deverá:

- Expirar após inatividade (configurável)
- Poder ser revogado
- Ser rastreável

---

# Segurança de Login

## Regras

- Bloqueio após X tentativas inválidas
- Rate limit por IP
- Log de tentativas de login
- Senhas criptografadas com bcrypt

---

## Password Policy

- Mínimo 6 caracteres (MVP)
- Futuro: regras mais fortes configuráveis

---

# Auditoria

Todas ações sensíveis deverão ser registradas.

## Ações auditadas:

- Login
- Logout
- Criação de venda
- Cancelamento de venda
- Abertura de caixa
- Fechamento de caixa
- Alteração de produto
- Exclusão de usuário
- Alteração de permissões

---

## Exemplo AuditLog

```json
{
  "user_id": 1,
  "action": "sale.cancel",
  "entity_type": "Sale",
  "entity_id": 10,
  "payload": {
    "reason": "Cliente desistiu"
  },
  "ip_address": "192.168.0.10"
}
```

---

# Fluxo de Autenticação

```
Login Screen
   ↓
API Login
   ↓
Token gerado
   ↓
Armazenado no Frontend
   ↓
Requests autenticadas
   ↓
Middleware valida token
   ↓
Libera acesso
```

---

# Frontend - Autenticação

## Store (Pinia)

```
auth.ts
```

Campos:

```
user
token
isAuthenticated
permissions
role
```

---

## Persistência

Token deve ser salvo em:

- localStorage (MVP)
- futuro: cookies httpOnly (melhor segurança)

---

## Interceptor Axios

Todas requisições devem conter:

```
Authorization: Bearer {token}
```

---

# Proteção de Rotas

Frontend:

```
/pdv → apenas operador autenticado
/admin → apenas admin/gerente
```

---

# Permissões no Frontend

Exemplo:

```ts
if (auth.hasPermission('sale.create')) {
  // mostra botão
}
```

---

# Usuário Logado

Endpoint:

```
GET /api/v1/auth/me
```

Retorna:

```json
{
  "id": 1,
  "name": "Admin",
  "role": "Admin",
  "permissions": ["sale.create", "cash.open"]
}
```

---

# Reset de Senha (Futuro)

Preparado para:

- envio de email
- token temporário
- redefinição segura

---

# Regras de Negócio

- Usuário inativo não pode logar
- Usuário deletado não pode logar
- Token inválido bloqueia acesso imediato
- Permissões são verificadas no backend SEMPRE (frontend é apenas UX)

---

# Estrutura Backend

```
Auth/
Users/
Roles/
Permissions/
Audit/
```

Cada módulo contém:

- Controller
- Service
- Repository
- Request
- Middleware
- Policy

---

# Policies

Usar Laravel Policies para regras finas.

Exemplo:

```
UserPolicy
SalePolicy
ProductPolicy
```

---

# Logs de Segurança

Registrar:

- IP
- User-Agent
- Tentativas de login
- Acessos negados

---

# Requisitos Não Funcionais

- Login < 300ms
- Middleware leve
- Cache de permissões via Redis
- Sessões seguras
- Proteção contra brute force

---

# Escalabilidade

Preparado para:

- SSO futuro
- Login via Google/Microsoft
- Multiempresa
- MFA (2FA)
- Biometria (futuro POS)

---

# Objetivo Final do Módulo

Garantir que:

- Apenas usuários autorizados operem o caixa
- Todas ações críticas sejam rastreáveis
- O sistema seja seguro mesmo em ambiente de loja física
```