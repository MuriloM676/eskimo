<template>
  <div class="admin-layout">
    <aside class="sidebar">
      <div class="sidebar-header">
        <h2>PDV Sorveteria</h2>
      </div>
      <nav>
        <router-link to="/pdv">
          <i class="pi pi-shopping-cart"></i> PDV
        </router-link>
        <router-link to="/products" v-if="auth.hasPermission('product.view')">
          <i class="pi pi-box"></i> Produtos
        </router-link>
        <router-link to="/categories" v-if="auth.hasPermission('product.manage')">
          <i class="pi pi-tag"></i> Categorias
        </router-link>
        <router-link to="/stock" v-if="auth.hasPermission('stock.manage')">
          <i class="pi pi-warehouse"></i> Estoque
        </router-link>
        <router-link to="/cash-register" v-if="auth.hasPermission('cash.open')">
          <i class="pi pi-calculator"></i> Caixa
        </router-link>
        <router-link to="/dashboard" v-if="auth.hasPermission('report.view')">
          <i class="pi pi-chart-bar"></i> Dashboard
        </router-link>
        <router-link to="/reports/sales" v-if="auth.hasPermission('report.view')">
          <i class="pi pi-file"></i> Relatórios
        </router-link>
        <router-link to="/users" v-if="auth.hasPermission('user.manage')">
          <i class="pi pi-users"></i> Usuários
        </router-link>
      </nav>
      <div class="sidebar-footer">
        <div>{{ auth.user?.name }}</div>
        <div style="color: #888; font-size: 0.75rem;">{{ auth.user?.role }}</div>
        <Button label="Sair" text size="small" @click="auth.logout()" class="p-0 mt-2" />
      </div>
    </aside>
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
const auth = useAuthStore()
</script>
