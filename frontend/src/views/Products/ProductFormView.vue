<template>
  <div>
    <h2 class="mb-3">{{ editing ? 'Editar Produto' : 'Novo Produto' }}</h2>

    <form @submit.prevent="save">
      <div class="grid">
        <div class="col-6 field">
          <label>Nome *</label>
          <InputText v-model="form.name" class="w-full" required />
        </div>
        <div class="col-3 field">
          <label>Preço *</label>
          <InputNumber v-model="form.price" :minFractionDigits="2" :maxFractionDigits="2" class="w-full" required />
        </div>
        <div class="col-3 field">
          <label>Custo</label>
          <InputNumber v-model="form.cost_price" :minFractionDigits="2" class="w-full" />
        </div>
        <div class="col-4 field">
          <label>Código de Barras</label>
          <InputText v-model="form.barcode" class="w-full" />
        </div>
        <div class="col-4 field">
          <label>Categoria</label>
          <Select v-model="form.category_id" :options="categories" optionLabel="name" optionValue="id" class="w-full" showClear />
        </div>
        <div class="col-2 field">
          <label>Estoque Inicial</label>
          <InputNumber v-model="form.stock_quantity" :min="0" class="w-full" />
        </div>
        <div class="col-2 field">
          <label>Estoque Mínimo</label>
          <InputNumber v-model="form.min_stock" :min="0" class="w-full" />
        </div>
        <div class="col-12 field">
          <label>Descrição</label>
          <Textarea v-model="form.description" class="w-full" rows="3" />
        </div>
        <div class="col-12 field">
          <ToggleSwitch v-model="form.active" /> Ativo
        </div>
      </div>

      <div class="flex gap-2">
        <Button type="submit" label="Salvar" icon="pi pi-check" />
        <Button label="Cancelar" outlined @click="$router.push('/products')" />
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ProductService } from '@/services/ProductService'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Textarea from 'primevue/textarea'
import Select from 'primevue/select'
import ToggleSwitch from 'primevue/toggleswitch'
import { useToast } from 'primevue/usetoast'

const route = useRoute()
const router = useRouter()
const toast = useToast()
const categories = ref<any[]>([])
const editing = computed(() => !!route.params.id)

const form = ref({
  name: '',
  barcode: '',
  price: 0,
  cost_price: 0,
  category_id: null as number | null,
  stock_quantity: 0,
  min_stock: 0,
  description: '',
  active: true,
})

async function save() {
  try {
    const payload = {
      ...form.value,
      price: form.value.price,
      cost_price: form.value.cost_price || null,
    }

    if (editing.value) {
      await ProductService.update(Number(route.params.id), payload)
      toast.add({ severity: 'success', summary: 'Produto atualizado', life: 2000 })
    } else {
      await ProductService.create(payload as any)
      toast.add({ severity: 'success', summary: 'Produto criado', life: 2000 })
    }
    await router.push('/products')
  } catch (err: any) {
    toast.add({ severity: 'error', summary: 'Erro', detail: err.response?.data?.message || 'Erro ao salvar', life: 3000 })
  }
}

onMounted(async () => {
  categories.value = await ProductService.listCategories()
  if (editing.value) {
    const product = await ProductService.find(Number(route.params.id))
    form.value = {
      name: product.name,
      barcode: product.barcode,
      price: product.price / 100,
      cost_price: product.cost_price ? product.cost_price / 100 : 0,
      category_id: product.category_id,
      stock_quantity: product.stock_quantity,
      min_stock: product.min_stock,
      description: product.description || '',
      active: product.active,
    }
  }
})
</script>
