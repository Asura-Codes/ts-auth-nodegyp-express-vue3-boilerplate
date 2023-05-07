<script setup lang="ts">
import { RouterView } from 'vue-router'
import Menu from './components/Menu.vue'

// Only menu and content
</script>

<template>
  <header>
    <Menu />
  </header>

  <v-app class="my-3">
    <RouterView />
  </v-app>
</template>

<style scoped>

</style>
