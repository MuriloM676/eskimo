import api from './api'
import type { ApiResponse, Sale, PaymentMethod } from '@/types'

export const SaleService = {
  async start(): Promise<Sale> {
    const { data } = await api.post<ApiResponse<Sale>>('/sales/start')
    return data.data
  },

  async addItem(barcode: string, quantity: number = 1): Promise<Sale> {
    const { data } = await api.post<ApiResponse<Sale>>('/sales/add-item', { barcode, quantity })
    return data.data
  },

  async removeItem(saleId: number, itemId: number): Promise<Sale> {
    const { data } = await api.post<ApiResponse<Sale>>(`/sales/${saleId}/remove-item`, { item_id: itemId })
    return data.data
  },

  async applyDiscount(saleId: number, discount: number): Promise<Sale> {
    const { data } = await api.post<ApiResponse<Sale>>(`/sales/${saleId}/apply-discount`, { discount })
    return data.data
  },

  async pay(saleId: number, methods: PaymentMethod[]): Promise<Sale> {
    const { data } = await api.post<ApiResponse<Sale>>(`/sales/${saleId}/pay`, { methods })
    return data.data
  },

  async cancel(saleId: number, reason?: string): Promise<Sale> {
    const { data } = await api.post<ApiResponse<Sale>>(`/sales/${saleId}/cancel`, { reason })
    return data.data
  },

  async get(saleId: number): Promise<Sale> {
    const { data } = await api.get<ApiResponse<Sale>>(`/sales/${saleId}`)
    return data.data
  },

  async list(params?: Record<string, any>) {
    const { data } = await api.get<ApiResponse<Sale[]>>('/sales', { params })
    return data
  },
}
