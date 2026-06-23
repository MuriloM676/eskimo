# PDV Sorveteria - Plano de Implementação

## Dependências entre Módulos

```
Auth → Products → Sales → Payments → Stock → Print → Reports
                        ↕           ↕
                  Hardware Agent ←──┘
```

## Ordem de Implementação

### Fase 1 - Fundação (prioridade: crítica)
- [ ] 1.1 Docker infra (docker-compose, nginx, Dockerfiles)
- [ ] 1.2 Backend Laravel (config, .env, estrutura de pastas)
- [ ] 1.3 Frontend Vue 3 + TypeScript + PrimeVue

### Fase 2 - Auth (prioridade: crítica)
- [ ] 2.1 Migrations: roles, permissions, role_permission, users, audit_logs
- [ ] 2.2 Seeds: roles (admin, gerente, operador), permissions, admin user
- [ ] 2.3 Models: User, Role, Permission, AuditLog
- [ ] 2.4 Services: AuthService, PermissionService, AuditService
- [ ] 2.5 Repositories: UserRepository, RoleRepository, PermissionRepository
- [ ] 2.6 Controllers: AuthController, UserController
- [ ] 2.7 Middleware: CheckPermission
- [ ] 2.8 Frontend: Auth store, Login page, Axios interceptor, router guard

### Fase 3 - Products (prioridade: crítica)
- [ ] 3.1 Migrations: categories, products, product_stock_movements
- [ ] 3.2 Models: Category, Product, ProductStockMovement
- [ ] 3.3 Services: ProductService, CategoryService
- [ ] 3.4 Repositories: ProductRepository, CategoryRepository
- [ ] 3.5 Controllers: ProductController, CategoryController
- [ ] 3.6 Busca rápida otimizada (cache Redis + índices)
- [ ] 3.7 Frontend: Products list, Product form, Categories CRUD

### Fase 4 - PDV Core (prioridade: crítica)
- [ ] 4.1 Migrations: cash_registers, sales, sale_items
- [ ] 4.2 Models: CashRegister, Sale, SaleItem
- [ ] 4.3 Services: CashRegisterService, SaleService
- [ ] 4.4 Repositories: SaleRepository, CashRegisterRepository
- [ ] 4.5 Controllers: SaleController, CashRegisterController
- [ ] 4.6 Frontend: PDV screen (teclado total, barcode, itens, total)
- [ ] 4.7 Pinia store: saleStore, cashRegisterStore

### Fase 5 - Payments (prioridade: alta)
- [ ] 5.1 Migrations: payments, payment_allocations
- [ ] 5.2 Models: Payment, PaymentAllocation
- [ ] 5.3 Services: PaymentService
- [ ] 5.4 Controllers: PaymentController
- [ ] 5.5 Split payment validation
- [ ] 5.6 Frontend: Payment modal (cash, pix, debit, credit, split)

### Fase 6 - Stock (prioridade: alta)
- [ ] 6.1 StockService integrado com SaleService
- [ ] 6.2 Stock adjustment endpoints
- [ ] 6.3 Frontend: Stock view, movements, adjustments

### Fase 7 - Print (prioridade: média)
- [ ] 7.1 PrintService (ESC/POS template builder)
- [ ] 7.2 PrintJob (queue via Redis)
- [ ] 7.3 Reimpressão endpoints
- [ ] 7.4 Hardware Agent HTTP client

### Fase 8 - Reports (prioridade: média)
- [ ] 8.1 DashboardService (cached)
- [ ] 8.2 SalesReportService, StockReportService
- [ ] 8.3 Frontend: Dashboard, Reports views

### Fase 9 - Hardware Agent (prioridade: média)
- [ ] 9.1 Python agent with Flask/FastAPI
- [ ] 9.2 ESC/POS commands builder
- [ ] 9.3 Drawer control
- [ ] 9.4 Printer discovery

## Critérios de Aceitação Globais
- [ ] Login < 300ms
- [ ] Busca produto < 200ms
- [ ] Adição item PDV < 100ms
- [ ] Finalização venda < 500ms
- [ ] PDV 100% operável por teclado
- [ ] Zero lógica de negócio em Controllers
- [ ] Toda ação crítica auditada
- [ ] Soft delete para users, products, categories
- [ ] Preços em centavos no backend
- [ ] Cache Redis para produtos e permissões
