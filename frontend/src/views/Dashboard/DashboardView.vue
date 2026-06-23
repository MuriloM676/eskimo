<template>
  <div>
    <h2 class="mb-3">Dashboard</h2>

    <div class="grid mb-3">
      <div class="col-3">
        <div class="surface-card p-3 border-round shadow-1">
          <div class="text-sm text-gray-500">Vendas Hoje</div>
          <div class="text-3xl font-bold">{{ dashboard?.sales_today || 0 }}</div>
        </div>
      </div>
      <div class="col-3">
        <div class="surface-card p-3 border-round shadow-1">
          <div class="text-sm text-gray-500">Faturamento</div>
          <div class="text-3xl font-bold">{{ formatPrice(dashboard?.revenue_today || 0) }}</div>
        </div>
      </div>
      <div class="col-3">
        <div class="surface-card p-3 border-round shadow-1">
          <div class="text-sm text-gray-500">Ticket Médio</div>
          <div class="text-3xl font-bold">{{ formatPrice(dashboard?.average_ticket || 0) }}</div>
        </div>
      </div>
      <div class="col-3">
        <div class="surface-card p-3 border-round shadow-1">
          <div class="text-sm text-gray-500">Caixa</div>
          <div class="text-3xl font-bold" :class="register ? 'text-green-600' : 'text-red-600'">
            {{ register ? 'Aberto' : 'Fechado' }}
          </div>
        </div>
      </div>
    </div>

    <div class="grid">
      <div class="col-6">
        <div class="surface-card p-3 border-round shadow-1">
          <h3 class="mb-2">Top Produtos</h3>
          <DataTable :value="dashboard?.top_products || []">
            <Column field="product_name_snapshot" header="Produto" />
            <Column field="total_qty" header="Qtd Vendida" />
          </DataTable>
        </div>
      </div>
      <div class="col-6">
        <div class="surface-card p-3 border-round shadow-1">
          <h3 class="mb-2">Estoque Baixo</h3>
          <DataTable :value="dashboard?.low_stock_products || []">
            <Column field="name" header="Produto" />
            <Column field="stock_quantity" header="Estoque" />
            <Column field="min_stock" header="Mínimo" />
          </DataTable>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ReportService } from '@/services/ReportService'
import { CashRegisterService } from '@/services/CashRegisterService'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import type { DashboardData } from '@/types'

const dashboard = ref<DashboardData | null>(null)
const register = ref<any>(null)

function formatPrice(cents: number): string {
  return (cents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

onMounted(async () => {
  try {
    dashboard.value = await ReportService.dashboard()
  } catch {}
  try {
    register.value = await CashRegisterService.current()
  } catch {}
})
</script>
