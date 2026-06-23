import api from './api'
import type { ApiResponse, DashboardData } from '@/types'

export const ReportService = {
  async dashboard(): Promise<DashboardData> {
    const { data } = await api.get<ApiResponse<DashboardData>>('/reports/dashboard')
    return data.data
  },

  async sales(params?: Record<string, any>) {
    const { data } = await api.get('/reports/sales', { params })
    return data
  },

  async cash() {
    const { data } = await api.get('/reports/cash')
    return data
  },

  async products() {
    const { data } = await api.get('/reports/products')
    return data
  },

  async stock() {
    const { data } = await api.get('/reports/stock')
    return data
  },
}
