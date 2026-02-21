<script setup lang="ts">
import { ref } from "vue"
import { useDebtStore } from "../debt.store"
import { applyBonus } from "../debt.bonus"

const store = useDebtStore()
const bonus = ref(0)
const preview = ref([])

function simulate() {
  preview.value = applyBonus(store.debts, bonus.value)
}
</script>

<template>
  <div class="mt-8 p-6 rounded-2xl shadow-md"
       style="background-color: var(--card)">
    <h2 class="text-lg font-semibold mb-4">Bonus Simulator</h2>

    <input v-model.number="bonus"
           type="number"
           placeholder="Enter Bonus Amount"
           class="input mb-4" />

    <button @click="simulate"
            class="bg-primary text-white px-4 py-2 rounded">
      Simulate
    </button>

    <div v-if="preview.length" class="mt-4 space-y-2">
      <div v-for="d in preview" :key="d.id"
           class="text-sm">
        {{ d.name }} → R{{ d.currentBalance.toFixed(0) }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.input {
  @apply w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent;
}
</style>