import api from './api'
import type { ApiResponse, StockMovement } from '@/types'

export const StockService = {
  async list(params?: Record<string, any>) {
    const { data } = await api.get('/stock', { params })
    return data
  },

  async movements(params?: Record<string, any>) {
    const { data } = await api.get<ApiResponse<StockMovement[]>>('/stock/movements', { params })
    return data
  },

  async adjust(productId: number, type: 'IN' | 'OUT' | 'ADJUST', quantity: number, reason: string) {
    const { data } = await api.post('/stock/adjust', { product_id: productId, type, quantity, reason })
    return data.data
  },

  async entry(productId: number, quantity: number, reason?: string) {
    const { data } = await api.post('/stock/in', { product_id: productId, quantity, reason })
    return data.data
  },
}
