<template>
  <div>
    <div class="flex justify-content-between align-items-center mb-3">
      <h2>Estoque</h2>
      <div class="flex gap-2">
        <Button label="Movimentações" outlined @click="$router.push('/stock/movements')" />
        <Button label="Entrada Manual" icon="pi pi-plus" @click="showEntryDialog" />
      </div>
    </div>

    <DataTable :value="products" :loading="loading" paginator :rows="20">
      <Column field="name" header="Produto" />
      <Column field="stock_quantity" header="Estoque">
        <template #body="{ data }">
          <Tag :value="data.stock_quantity" :severity="data.stock_quantity <= data.min_stock ? 'danger' : data.stock_quantity === 0 ? 'warn' : 'success'" />
        </template>
      </Column>
      <Column field="min_stock" header="Mínimo" />
      <Column header="Status">
        <template #body="{ data }">
          <Tag :value="data.stock_quantity <= data.min_stock ? 'Baixo' : 'OK'" :severity="data.stock_quantity <= data.min_stock ? 'danger' : 'success'" />
        </template>
      </Column>
      <Column header="Ações" style="width:120px">
        <template #body="{ data }">
          <Button icon="pi pi-pencil" text @click="showAdjustDialog(data)" />
        </template>
      </Column>
    </DataTable>

    <Dialog v-model:visible="entryDialog" header="Entrada de Estoque" modal style="width:400px">
      <div class="field mb-2">
        <label>Produto</label>
        <Select v-model="entryProductId" :options="products" optionLabel="name" optionValue="id" class="w-full" />
      </div>
      <div class="field mb-2">
        <label>Quantidade</label>
        <InputNumber v-model="entryQuantity" :min="1" class="w-full" />
      </div>
      <Button label="Registrar Entrada" @click="registerEntry" class="w-full" />
    </Dialog>

    <Dialog v-model:visible="adjustDialog" header="Ajustar Estoque" modal style="width:400px">
      <div class="field mb-2">
        <label>Tipo</label>
        <Select v-model="adjustType" :options="adjustTypes" optionLabel="label" optionValue="value" class="w-full" />
      </div>
      <div class="field mb-2">
        <label>Quantidade</label>
        <InputNumber v-model="adjustQuantity" :min="1" class="w-full" />
      </div>
      <div class="field mb-2">
        <label>Motivo</label>
        <InputText v-model="adjustReason" class="w-full" />
      </div>
      <Button label="Aplicar Ajuste" @click="applyAdjust" class="w-full" />
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { StockService } from '@/services/StockService'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Select from 'primevue/select'
import Tag from 'primevue/tag'
import { useToast } from 'primevue/usetoast'

const toast = useToast()
const products = ref<any[]>([])
const loading = ref(false)

const entryDialog = ref(false)
const entryProductId = ref<number | null>(null)
const entryQuantity = ref(1)

const adjustDialog = ref(false)
const adjustProduct = ref<any>(null)
const adjustType = ref('ADJUST')
const adjustQuantity = ref(1)
const adjustReason = ref('')
const adjustTypes = [
  { label: 'Ajuste (+/-)', value: 'ADJUST' },
  { label: 'Saída', value: 'OUT' },
  { label: 'Entrada', value: 'IN' },
]

function showEntryDialog() {
  entryDialog.value = true
}

async function registerEntry() {
  await StockService.entry(entryProductId.value!, entryQuantity.value)
  entryDialog.value = false
  toast.add({ severity: 'success', summary: 'Entrada registrada', life: 2000 })
  await load()
}

function showAdjustDialog(product: any) {
  adjustProduct.value = product
  adjustDialog.value = true
}

async function applyAdjust() {
  await StockService.adjust(adjustProduct.value.id, adjustType.value as any, adjustQuantity.value, adjustReason.value)
  adjustDialog.value = false
  toast.add({ severity: 'success', summary: 'Estoque ajustado', life: 2000 })
  await load()
}

async function load() {
  loading.value = true
  try {
    const result = await StockService.list()
    products.value = result.data
  } finally {
    loading.value = false
  }
}

onMounted(load)
</script>
