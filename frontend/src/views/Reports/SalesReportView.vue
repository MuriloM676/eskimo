<template>
  <div>
    <h2 class="mb-3">Relatório de Vendas</h2>

    <div class="flex gap-2 mb-3 align-items-center">
      <label>De:</label>
      <InputText v-model="dateFrom" type="date" />
      <label>Até:</label>
      <InputText v-model="dateTo" type="date" />
      <Button label="Filtrar" @click="load" />
    </div>

    <DataTable :value="sales" :loading="loading" paginator :rows="20">
      <Column field="created_at" header="Data">
        <template #body="{ data }">
          {{ new Date(data.created_at).toLocaleString('pt-BR') }}
        </template>
      </Column>
      <Column header="N°">
        <template #body="{ data }">#{{ data.id }}</template>
      </Column>
      <Column field="user.name" header="Operador" />
      <Column field="items" header="Itens">
        <template #body="{ data }">{{ data.items?.length || 0 }}</template>
      </Column>
      <Column field="subtotal" header="Subtotal">
        <template #body="{ data }">{{ formatPrice(data.subtotal) }}</template>
      </Column>
      <Column field="discount" header="Desconto">
        <template #body="{ data }">{{ formatPrice(data.discount) }}</template>
      </Column>
      <Column field="total" header="Total">
        <template #body="{ data }"><strong>{{ formatPrice(data.total) }}</strong></template>
      </Column>
      <Column field="status" header="Status">
        <template #body="{ data }">
          <Tag :value="data.status" :severity="data.status === 'PAID' ? 'success' : 'danger'" />
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ReportService } from '@/services/ReportService'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Tag from 'primevue/tag'

const sales = ref<any[]>([])
const loading = ref(false)
const dateFrom = ref('')
const dateTo = ref('')

function formatPrice(cents: number): string {
  return (cents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

async function load() {
  loading.value = true
  try {
    const result = await ReportService.sales({ date_from: dateFrom.value, date_to: dateTo.value })
    sales.value = result.data
  } finally {
    loading.value = false
  }
}

onMounted(load)
</script>
