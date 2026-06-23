import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Sale, SaleItem, PaymentMethod } from '@/types'
import { SaleService } from '@/services/SaleService'
import { useToast } from 'primevue/usetoast'

export const useSaleStore = defineStore('sale', () => {
  const toast = useToast()
  const sale = ref<Sale | null>(null)
  const loading = ref(false)

  const items = computed(() => sale.value?.items || [])
  const total = computed(() => sale.value?.total || 0)
  const subtotal = computed(() => sale.value?.subtotal || 0)
  const discount = computed(() => sale.value?.discount || 0)
  const isOpen = computed(() => sale.value?.status === 'OPEN')

  function formatPrice(cents: number): string {
    return (cents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  }

  async function start() {
    loading.value = true
    try {
      sale.value = await SaleService.start()
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Erro ao iniciar venda'
      toast.add({ severity: 'error', summary: 'Erro', detail: msg, life: 3000 })
    } finally {
      loading.value = false
    }
  }

  async function addItem(barcode: string) {
    loading.value = true
    try {
      sale.value = await SaleService.addItem(barcode)
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Produto não encontrado'
      toast.add({ severity: 'warn', summary: 'Aviso', detail: msg, life: 2000 })
      throw err
    } finally {
      loading.value = false
    }
  }

  async function removeItem(itemId: number) {
    if (!sale.value) return
    loading.value = true
    try {
      sale.value = await SaleService.removeItem(sale.value.id, itemId)
    } finally {
      loading.value = false
    }
  }

  async function applyDiscount(discountValue: number) {
    if (!sale.value) return
    loading.value = true
    try {
      sale.value = await SaleService.applyDiscount(sale.value.id, discountValue)
    } finally {
      loading.value = false
    }
  }

  async function pay(methods: PaymentMethod[]) {
    if (!sale.value) return
    loading.value = true
    try {
      sale.value = await SaleService.pay(sale.value.id, methods)
      toast.add({ severity: 'success', summary: 'Venda finalizada', detail: `Total: ${formatPrice(total.value)}`, life: 3000 })
      sale.value = null
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Erro ao finalizar venda'
      toast.add({ severity: 'error', summary: 'Erro', detail: msg, life: 3000 })
      throw err
    } finally {
      loading.value = false
    }
  }

  async function cancel(reason?: string) {
    if (!sale.value) return
    loading.value = true
    try {
      sale.value = await SaleService.cancel(sale.value.id, reason)
      toast.add({ severity: 'info', summary: 'Venda cancelada', life: 2000 })
      sale.value = null
    } finally {
      loading.value = false
    }
  }

  function reset() {
    sale.value = null
  }

  return {
    sale, loading, items, total, subtotal, discount, isOpen,
    formatPrice, start, addItem, removeItem, applyDiscount, pay, cancel, reset,
  }
})
