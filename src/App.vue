<script setup lang="ts">
import { useThemeStore } from "@/core/theme.store"
const theme = useThemeStore()
</script>

<template>
  <div class="min-h-screen p-6">

    <!-- Top Bar -->
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-3xl font-bold">Rebuild OS</h1>
        <p class="text-sm opacity-60">Financial Control Dashboard</p>
      </div>

      <button
        @click="theme.toggleTheme"
        class="px-4 py-2 rounded-lg bg-primary text-white"
      >
        Toggle Theme
      </button>
    </div>

    <!-- Navigation -->
    <div class="flex gap-4 mb-6">
      <router-link to="/" class="underline">Dashboard</router-link>
      <router-link to="/debts" class="underline">Debts</router-link>
      <router-link to="/cashflow">Cashflow</router-link>
      <router-link to="/investments">Investments</router-link>
    </div>

    <!-- View -->
    <router-view />
  </div>
</template>