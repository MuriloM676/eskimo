<template>
  <div>
    <h2 class="mb-3">Controle de Caixa</h2>

    <div v-if="register">
      <div class="surface-card p-3 border-round shadow-1 mb-3">
        <div class="grid">
          <div class="col-4">
            <div class="text-sm text-gray-500">Status</div>
            <div class="text-xl font-bold text-green-600">ABERTO</div>
          </div>
          <div class="col-4">
            <div class="text-sm text-gray-500">Abertura</div>
            <div class="text-xl font-bold">{{ new Date(register.opened_at).toLocaleString('pt-BR') }}</div>
          </div>
          <div class="col-4">
            <div class="text-sm text-gray-500">Operador</div>
            <div class="text-xl font-bold">{{ register.user?.name }}</div>
          </div>
        </div>
      </div>

      <Button label="Fechar Caixa" icon="pi pi-lock" severity="danger" @click="closeRegister" />
    </div>

    <div v-else class="surface-card p-3 border-round shadow-1">
      <h3 class="mb-2">Abrir Caixa</h3>
      <div class="field mb-2">
        <label>Valor Inicial (R$)</label>
        <InputNumber v-model="initialAmount" :minFractionDigits="2" class="w-full" style="max-width:300px" />
      </div>
      <Button label="Abrir Caixa" icon="pi pi-lock-open" @click="openRegister" :loading="loading" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { CashRegisterService } from '@/services/CashRegisterService'
import Button from 'primevue/button'
import InputNumber from 'primevue/inputnumber'
import { useToast } from 'primevue/usetoast'

const toast = useToast()
const register = ref<any>(null)
const initialAmount = ref(0)
const loading = ref(false)

async function openRegister() {
  loading.value = true
  try {
    register.value = await CashRegisterService.open(initialAmount.value)
    toast.add({ severity: 'success', summary: 'Caixa aberto', life: 2000 })
  } catch (err: any) {
    toast.add({ severity: 'error', summary: 'Erro', detail: err.response?.data?.message, life: 3000 })
  } finally {
    loading.value = false
  }
}

async function closeRegister() {
  try {
    register.value = await CashRegisterService.close()
    toast.add({ severity: 'info', summary: 'Caixa fechado', life: 2000 })
  } catch (err: any) {
    toast.add({ severity: 'error', summary: 'Erro', detail: err.response?.data?.message, life: 3000 })
  }
}

onMounted(async () => {
  try {
    register.value = await CashRegisterService.current()
  } catch {}
})
</script>
