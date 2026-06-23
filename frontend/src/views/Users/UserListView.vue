<template>
  <div>
    <div class="flex justify-content-between align-items-center mb-3">
      <h2>Usuários</h2>
      <Button label="Novo Usuário" icon="pi pi-plus" @click="showDialog()" />
    </div>

    <DataTable :value="users" :loading="loading" paginator :rows="20">
      <Column field="name" header="Nome" />
      <Column field="email" header="Email" />
      <Column field="role.name" header="Perfil" />
      <Column field="active" header="Ativo">
        <template #body="{ data }">
          <Tag :value="data.active ? 'Sim' : 'Não'" :severity="data.active ? 'success' : 'danger'" />
        </template>
      </Column>
      <Column field="last_login_at" header="Último Login">
        <template #body="{ data }">
          {{ data.last_login_at ? new Date(data.last_login_at).toLocaleString('pt-BR') : '-' }}
        </template>
      </Column>
      <Column header="Ações" style="width:120px">
        <template #body="{ data }">
          <Button icon="pi pi-pencil" text @click="showDialog(data)" />
        </template>
      </Column>
    </DataTable>

    <Dialog v-model:visible="dialogVisible" :header="editing ? 'Editar Usuário' : 'Novo Usuário'" modal style="width:450px">
      <div class="field mb-2">
        <label>Nome *</label>
        <InputText v-model="form.name" class="w-full" />
      </div>
      <div class="field mb-2">
        <label>Email *</label>
        <InputText v-model="form.email" type="email" class="w-full" />
      </div>
      <div class="field mb-2">
        <label>{{ editing ? 'Nova Senha (deixar vazio para manter)' : 'Senha *' }}</label>
        <InputText v-model="form.password" type="password" class="w-full" />
      </div>
      <div class="field mb-2">
        <label>Perfil</label>
        <Select v-model="form.role_id" :options="roles" optionLabel="name" optionValue="id" class="w-full" />
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
import api from '@/services/api'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import Tag from 'primevue/tag'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'
import ToggleSwitch from 'primevue/toggleswitch'
import { useToast } from 'primevue/usetoast'

const toast = useToast()
const users = ref<any[]>([])
const roles = ref<any[]>([])
const loading = ref(false)
const dialogVisible = ref(false)
const editing = ref(false)
const selectedId = ref<number | null>(null)

const form = ref({ name: '', email: '', password: '', role_id: null as number | null, active: true })

function showDialog(user?: any) {
  if (user) {
    editing.value = true
    selectedId.value = user.id
    form.value = { name: user.name, email: user.email, password: '', role_id: user.role_id, active: user.active }
  } else {
    editing.value = false
    selectedId.value = null
    form.value = { name: '', email: '', password: '', role_id: null, active: true }
  }
  dialogVisible.value = true
}

async function save() {
  try {
    const payload = { ...form.value }
    if (!payload.password) delete (payload as any).password

    if (editing.value && selectedId.value) {
      await api.put(`/users/${selectedId.value}`, payload)
    } else {
      await api.post('/users', payload)
    }
    dialogVisible.value = false
    toast.add({ severity: 'success', summary: 'Salvo', life: 2000 })
    await load()
  } catch {}
}

async function load() {
  loading.value = true
  try {
    const { data: userData } = await api.get('/users')
    users.value = userData.data
    const { data: roleData } = await api.get('/roles')
    roles.value = roleData.data
  } finally {
    loading.value = false
  }
}

onMounted(load)
</script>
