<template>
  <div>
    <div class="flex justify-content-between align-items-center mb-3">
      <h2>Produtos</h2>
      <Button label="Novo Produto" icon="pi pi-plus" @click="$router.push('/products/new')" v-if="auth.hasPermission('product.manage')" />
    </div>

    <DataTable :value="products" :loading="loading" paginator :rows="20" :totalRecords="total" v-model:filters="filters" @page="loadProducts">
      <Column field="name" header="Nome" sortable />
      <Column field="barcode" header="Cód. Barras" />
      <Column field="price" header="Preço">
        <template #body="{ data }">
          {{ (data.price / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}
        </template>
      </Column>
      <Column field="category.name" header="Categoria" />
      <Column field="stock_quantity" header="Estoque" />
      <Column field="active" header="Ativo">
        <template #body="{ data }">
          <Tag :value="data.active ? 'Sim' : 'Não'" :severity="data.active ? 'success' : 'danger'" />
        </template>
      </Column>
      <Column header="Ações" style="width:120px">
        <template #body="{ data }">
          <Button icon="pi pi-pencil" text @click="$router.push(`/products/${data.id}/edit`)" v-if="auth.hasPermission('product.manage')" />
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { ProductService } from '@/services/ProductService'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import Tag from 'primevue/tag'

const auth = useAuthStore()
const products = ref<any[]>([])
const loading = ref(false)
const total = ref(0)
const filters = ref({ search: '' })

async function loadProducts(event?: any) {
  loading.value = true
  try {
    const result = await ProductService.list({
      page: event?.page || 1,
      search: filters.value.search,
    })
    products.value = result.data
    total.value = result.meta?.total || 0
  } finally {
    loading.value = false
  }
}

onMounted(loadProducts)
</script>
