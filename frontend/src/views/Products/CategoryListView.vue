<template>
  <div>
    <div class="flex justify-content-between align-items-center mb-3">
      <h2>Categorias</h2>
      <Button label="Nova Categoria" icon="pi pi-plus" @click="showDialog()" />
    </div>

    <DataTable :value="categories" :loading="loading">
      <Column field="name" header="Nome" />
      <Column field="description" header="Descrição" />
      <Column field="active" header="Ativo">
        <template #body="{ data }">
          <Tag :value="data.active ? 'Sim' : 'Não'" :severity="data.active ? 'success' : 'danger'" />
        </template>
      </Column>
      <Column header="Ações" style="width:120px">
        <template #body="{ data }">
          <Button icon="pi pi-pencil" text @click="showDialog(data)" />
          <Button icon="pi pi-trash" text severity="danger" @click="remove(data.id)" />
        </template>
      </Column>
    </DataTable>

    <Dialog v-model:visible="dialogVisible" :header="editing ? 'Editar Categoria' : 'Nova Categoria'" modal style="width:400px">
      <div class="field mb-2">
        <label>Nome *</label>
        <InputText v-model="form.name" class="w-full" />
      </div>
      <div class="field mb-2">
        <label>Descrição</label>
        <InputText v-model="form.description" class="w-full" />
      </div>
      <div class="field mb-2">
        <ToggleSwitch v-model="form.active" /> Ativo
      </div>
      <Button label="Salvar" @click="save" class="w-full" />
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ProductService } from '@/services/ProductService'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import Tag from 'primevue/tag'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import ToggleSwitch from 'primevue/toggleswitch'
import { useToast } from 'primevue/usetoast'

const toast = useToast()
const categories = ref<any[]>([])
const loading = ref(false)
const dialogVisible = ref(false)
const editing = ref(false)

const form = ref({ name: '', description: '', active: true })
const selectedId = ref<number | null>(null)

function showDialog(cat?: any) {
  if (cat) {
    editing.value = true
    selectedId.value = cat.id
    form.value = { name: cat.name, description: cat.description || '', active: cat.active }
  } else {
    editing.value = false
    selectedId.value = null
    form.value = { name: '', description: '', active: true }
  }
  dialogVisible.value = true
}

async function save() {
  try {
    if (editing.value && selectedId.value) {
      await ProductService.updateCategory(selectedId.value, form.value)
    } else {
      await ProductService.createCategory(form.value)
    }
    dialogVisible.value = false
    await load()
    toast.add({ severity: 'success', summary: 'Salvo', life: 2000 })
  } catch {}
}

async function remove(id: number) {
  await ProductService.deleteCategory(id)
  await load()
}

async function load() {
  loading.value = true
  try {
    categories.value = await ProductService.listCategories()
  } finally {
    loading.value = false
  }
}

onMounted(load)
</script>
