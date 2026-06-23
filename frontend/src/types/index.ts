export interface User {
  id: number
  name: string
  email: string
  role: string
  permissions: string[]
}

export interface Role {
  id: number
  name: string
  description: string
  permissions: Permission[]
}

export interface Permission {
  id: number
  name: string
  key: string
  description: string
}

export interface Category {
  id: number
  name: string
  description: string
  active: boolean
}

export interface Product {
  id: number
  name: string
  description: string | null
  barcode: string
  price: number
  cost_price: number | null
  category_id: number | null
  category: Category | null
  stock_quantity: number
  min_stock: number
  active: boolean
  image_url: string | null
}

export interface Sale {
  id: number
  cash_register_id: number
  user_id: number
  user: User
  status: 'OPEN' | 'PAID' | 'CANCELED'
  subtotal: number
  discount: number
  total: number
  items: SaleItem[]
  payments: Payment[]
  created_at: string
}

export interface SaleItem {
  id: number
  sale_id: number
  product_id: number
  product: Product
  product_name_snapshot: string
  quantity: number
  unit_price: number
  total_price: number
}

export interface Payment {
  id: number
  sale_id: number
  method: 'cash' | 'pix' | 'debit' | 'credit'
  amount: number
  change_amount: number
  status: string
}

export interface CashRegister {
  id: number
  user_id: number
  user: User
  status: 'OPENED' | 'CLOSED'
  initial_amount: number
  final_amount: number
  expected_amount: number
  opened_at: string
  closed_at: string
}

export interface StockMovement {
  id: number
  product_id: number
  product: Product
  type: 'IN' | 'OUT' | 'ADJUST' | 'SALE'
  quantity: number
  previous_quantity: number
  new_quantity: number
  reason: string
  user: User
  created_at: string
}

export interface DashboardData {
  sales_today: number
  revenue_today: number
  average_ticket: number
  top_products: { product_name_snapshot: string; total_qty: number }[]
  low_stock_products: Product[]
}

export interface ApiResponse<T = any> {
  success: boolean
  data: T
  message: string | null
  errors?: Record<string, string[]>
  meta?: {
    total: number
    per_page: number
    current_page: number
  }
}

export interface LoginPayload {
  email: string
  password: string
}

export interface LoginResponse {
  token: string
  user: User
}

export interface PaymentMethod {
  method: 'cash' | 'pix' | 'debit' | 'credit'
  amount: number
}
