<template>
  <div class="login-page">
    <div class="login-card">
      <h1>PDV Sorveteria</h1>
      <p>Faça login para continuar</p>

      <form @submit.prevent="handleLogin">
        <div class="field mb-3">
          <label for="email">Email</label>
          <InputText id="email" v-model="email" type="email" class="w-full" placeholder="admin@sorveteria.com" autofocus />
        </div>
        <div class="field mb-3">
          <label for="password">Senha</label>
          <InputText id="password" v-model="password" type="password" class="w-full" placeholder="123456" />
        </div>
        <Button type="submit" label="Entrar" class="w-full" :loading="auth.loading" />
      </form>

      <p v-if="error" class="text-red-500 text-sm mt-2">{{ error }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

const auth = useAuthStore()
const email = ref('admin@sorveteria.com')
const password = ref('123456')
const error = ref('')

async function handleLogin() {
  error.value = ''
  try {
    await auth.login(email.value, password.value)
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Erro ao fazer login'
  }
}
</script>
