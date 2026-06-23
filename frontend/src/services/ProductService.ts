import api from './api'
import type { ApiResponse, Product, Category } from '@/types'

export const ProductService = {
  async list(params?: Record<string, any>) {
    const { data } = await api.get<ApiResponse<Product[]>>('/products', { params })
    return data
  },

  async search(term: string) {
    const { data } = await api.get<ApiResponse<Product[]>>('/products/search', { params: { q: term } })
    return data.data
  },

  async find(id: number) {
    const { data } = await api.get<ApiResponse<Product>>(`/products/${id}`)
    return data.data
  },

  async create(payload: Partial<Product>) {
    const { data } = await api.post<ApiResponse<Product>>('/products', payload)
    return data.data
  },

  async update(id: number, payload: Partial<Product>) {
    const { data } = await api.put<ApiResponse<Product>>(`/products/${id}`, payload)
    return data.data
  },

  async delete(id: number) {
    await api.delete(`/products/${id}`)
  },

  async listCategories() {
    const { data } = await api.get<ApiResponse<Category[]>>('/categories')
    return data.data
  },

  async createCategory(payload: Partial<Category>) {
    const { data } = await api.post<ApiResponse<Category>>('/categories', payload)
    return data.data
  },

  async updateCategory(id: number, payload: Partial<Category>) {
    const { data } = await api.put<ApiResponse<Category>>(`/categories/${id}`, payload)
    return data.data
  },

  async deleteCategory(id: number) {
    await api.delete(`/categories/${id}`)
  },
}
