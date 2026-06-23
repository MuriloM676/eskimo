<template>
  <div class="pdv-container" @click="focusInput">
    <div class="pdv-header">
      <h1>PDV - Frente de Caixa</h1>
      <div class="pdv-info">
        <span>Operador: {{ auth.user?.name }}</span>
        <span>Caixa: {{ register?.id ? '#' + register.id : 'Fechado' }}</span>
      </div>
    </div>

    <div class="pdv-content">
      <div class="pdv-items">
        <table v-if="saleStore.items.length > 0">
          <thead>
            <tr>
              <th>Produto</th>
              <th style="width:80px">Qtd</th>
              <th style="width:120px">Preço</th>
              <th style="width:120px">Total</th>
              <th style="width:40px"></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in saleStore.items"
              :key="item.id"
              class="item-row"
              :class="{ selected: selectedItem === item.id }"
              @click="selectedItem = item.id"
            >
              <td>{{ item.product_name_snapshot }}</td>
              <td>{{ item.quantity }}</td>
              <td>{{ saleStore.formatPrice(item.unit_price) }}</td>
              <td><strong>{{ saleStore.formatPrice(item.total_price) }}</strong></td>
              <td>
                <Button
                  icon="pi pi-trash"
                  text
                  severity="danger"
                  size="small"
                  @click="saleStore.removeItem(item.id)"
                  v-if="auth.hasPermission('sale.cancel')"
                />
              </td>
            </tr>
          </tbody>
        </table>

        <div v-else class="flex flex-column align-items-center justify-content-center h-full text-gray-400">
          <i class="pi pi-cart-plus" style="font-size: 3rem"></i>
          <p class="mt-2">Escaneie um produto para começar</p>
        </div>
      </div>

      <div class="pdv-total-bar">
        <div>
          <div class="total-label">Subtotal</div>
          <div class="total-label" v-if="saleStore.discount > 0">Desconto</div>
          <div class="total-label">Total</div>
        </div>
        <div style="text-align: right">
          <div>{{ saleStore.formatPrice(saleStore.subtotal) }}</div>
          <div v-if="saleStore.discount > 0">- {{ saleStore.formatPrice(saleStore.discount) }}</div>
          <div class="total-value">{{ saleStore.formatPrice(saleStore.total) }}</div>
        </div>
      </div>

      <div class="pdv-input-bar">
        <InputText
          ref="barcodeInput"
          v-model="barcode"
          placeholder="Código de barras..."
          @keydown.enter="handleBarcode"
          class="w-full"
          autofocus
        />
      </div>

      <div class="pdv-actions">
        <Button label="F2 - Buscar" icon="pi pi-search" @click="openSearch" outlined />
        <Button label="F3 - Desconto" icon="pi pi-percentage" @click="openDiscount" outlined :disabled="!saleStore.isOpen" v-if="auth.hasPermission('sale.cancel')" />
        <Button label="F4 - Pagamento" icon="pi pi-credit-card" @click="openPayment" :disabled="!saleStore.isOpen || saleStore.items.length === 0" severity="success" />
        <Button label="F9 - Finalizar" icon="pi pi-check" @click="openPayment" :disabled="!saleStore.isOpen || saleStore.items.length === 0" severity="info" />
        <Button label="ESC - Cancelar" icon="pi pi-times" @click="cancelSale" outlined severity="danger" :disabled="!saleStore.isOpen" />
      </div>
    </div>

    <Dialog v-model:visible="searchVisible" header="Buscar Produto" modal style="width:600px" @hide="focusInput">
      <InputText v-model="searchTerm" placeholder="Digite nome ou código..." class="w-full mb-2" autofocus @keydown.enter="selectFromSearch" />
      <DataTable :value="searchResults" @row-click="selectProduct" selectionMode="single" dataKey="id">
        <Column field="name" header="Nome" />
        <Column field="barcode" header="Código" />
        <Column field="price" header="Preço">
          <template #body="{ data }">
            {{ (data.price / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}
          </template>
        </Column>
      </DataTable>
    </Dialog>

    <Dialog v-model:visible="discountVisible" header="Aplicar Desconto" modal style="width:400px" @hide="focusInput">
      <div class="field">
        <label>Valor do desconto (centavos)</label>
        <InputNumber v-model="discountValue" :min="0" :max="saleStore.subtotal" class="w-full" />
      </div>
      <Button label="Aplicar" @click="applyDiscount" class="w-full" />
    </Dialog>

    <Dialog v-model:visible="paymentVisible" header="Finalizar Pagamento" modal style="width:500px" @hide="focusInput">
      <div class="mb-3">
        <strong>Total: {{ saleStore.formatPrice(saleStore.total) }}</strong>
      </div>

      <div v-for="(pm, i) in paymentMethods" :key="i" class="flex gap-2 mb-2 align-items-center">
        <Select v-model="pm.method" :options="paymentOptions" optionLabel="label" optionValue="value" style="width:140px" />
        <InputNumber v-model="pm.amount" :min="0" class="flex-1" :placeholder="`Valor ${pm.method}`" />
        <Button icon="pi pi-times" text severity="danger" @click="paymentMethods.splice(i, 1)" v-if="paymentMethods.length > 1" />
      </div>

      <Button label="+ Adicionar forma" text @click="addPaymentMethod" class="mb-2" />

      <div v-if="changeAmount > 0" class="text-green-600 font-bold mb-2">
        Troco: {{ saleStore.formatPrice(changeAmount) }}
      </div>

      <Button label="Confirmar Pagamento" @click="confirmPayment" class="w-full" severity="success" :disabled="!canPay" />
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useSaleStore } from '@/stores/sale'
import { ProductService } from '@/services/ProductService'
import { CashRegisterService } from '@/services/CashRegisterService'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Select from 'primevue/select'
import Dialog from 'primevue/dialog'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import type { PaymentMethod, Product } from '@/types'

const auth = useAuthStore()
const saleStore = useSaleStore()
const barcodeInput = ref<HTMLInputElement | null>(null)
const register = ref<any>(null)

const barcode = ref('')
const selectedItem = ref<number | null>(null)

const searchVisible = ref(false)
const searchTerm = ref('')
const searchResults = ref<Product[]>([])

const discountVisible = ref(false)
const discountValue = ref(0)

const paymentVisible = ref(false)
const paymentMethods = ref<PaymentMethod[]>([{ method: 'cash', amount: 0 }])
const paymentOptions = [
  { label: 'Dinheiro', value: 'cash' },
  { label: 'PIX', value: 'pix' },
  { label: 'Débito', value: 'debit' },
  { label: 'Crédito', value: 'credit' },
]

const canPay = computed(() => {
  const totalPaid = paymentMethods.value.reduce((s, pm) => s + (pm.amount || 0), 0)
  return totalPaid >= (saleStore.total / 100)
})

const changeAmount = computed(() => {
  const cashPayment = paymentMethods.value.find(pm => pm.method === 'cash')
  if (!cashPayment) return 0
  const totalPaid = paymentMethods.value.reduce((s, pm) => s + (pm.amount || 0), 0) * 100
  if (totalPaid > saleStore.total) {
    return totalPaid - saleStore.total
  }
  return 0
})

function focusInput() {
  setTimeout(() => barcodeInput.value?.focus(), 100)
}

async function handleBarcode() {
  if (!barcode.value.trim()) return
  const code = barcode.value.trim()
  barcode.value = ''
  await saleStore.addItem(code)
  selectedItem.value = null
}

async function openSearch() {
  searchTerm.value = ''
  searchResults.value = []
  searchVisible.value = true
}

watch(searchTerm, async (term) => {
  if (term.length >= 2) {
    searchResults.value = await ProductService.search(term)
  }
})

function selectFromSearch() {
  if (searchResults.value.length > 0) {
    selectProduct(searchResults.value[0])
  }
}

async function selectProduct(product: any) {
  searchVisible.value = false
  await saleStore.addItem(String(product.barcode || product.id))
}

function openDiscount() {
  discountValue.value = 0
  discountVisible.value = true
}

async function applyDiscount() {
  await saleStore.applyDiscount(Math.round(discountValue.value * 100))
  discountVisible.value = false
}

function openPayment() {
  paymentMethods.value = [{ method: 'cash', amount: saleStore.total / 100 }]
  paymentVisible.value = true
}

function addPaymentMethod() {
  if (paymentMethods.value.length < 4) {
    paymentMethods.value.push({ method: 'pix', amount: 0 })
  }
}

async function confirmPayment() {
  const methods = paymentMethods.value.map(pm => ({
    method: pm.method,
    amount: pm.amount || 0,
  }))
  await saleStore.pay(methods)
  paymentVisible.value = false
}

async function cancelSale() {
  await saleStore.cancel('Cancelado pelo operador')
}

onMounted(async () => {
  try {
    register.value = await CashRegisterService.current()
  } catch {}
  await saleStore.start()
  focusInput()
})
</script>
