import api from './api'
import type { ApiResponse, CashRegister } from '@/types'

export const CashRegisterService = {
  async open(initialAmount: number) {
    const { data } = await api.post<ApiResponse<CashRegister>>('/cash-register/open', { initial_amount: initialAmount / 100 })
    return data.data
  },

  async close() {
    const { data } = await api.post<ApiResponse<CashRegister>>('/cash-register/close')
    return data.data
  },

  async current() {
    const { data } = await api.get<ApiResponse<CashRegister>>('/cash-register/current')
    return data.data
  },
}
