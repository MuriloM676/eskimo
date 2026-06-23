<template>
  <router-view />
  <Toast position="bottom-right" />
  <DynamicDialog />
</template>

<script setup lang="ts">
import Toast from 'primevue/toast'
import DynamicDialog from 'primevue/dynamicdialog'
</script>
