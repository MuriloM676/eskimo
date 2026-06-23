<template>
  <div>
    <h2 class="mb-3">Movimentações de Estoque</h2>

    <DataTable :value="movements" :loading="loading" paginator :rows="20">
      <Column field="created_at" header="Data">
        <template #body="{ data }">
          {{ new Date(data.created_at).toLocaleString('pt-BR') }}
        </template>
      </Column>
      <Column field="product.name" header="Produto" />
      <Column field="type" header="Tipo">
        <template #body="{ data }">
          <Tag :value="data.type" :severity="data.type === 'IN' ? 'success' : data.type === 'OUT' ? 'danger' : 'warn'" />
        </template>
      </Column>
      <Column field="quantity" header="Qtd" />
      <Column field="previous_quantity" header="Anterior" />
      <Column field="new_quantity" header="Novo" />
      <Column field="reason" header="Motivo" />
      <Column field="user.name" header="Usuário" />
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { StockService } from '@/services/StockService'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Tag from 'primevue/tag'

const movements = ref<any[]>([])
const loading = ref(false)

onMounted(async () => {
  loading.value = true
  try {
    const result = await StockService.movements()
    movements.value = result.data
  } finally {
    loading.value = false
  }
})
</script>
