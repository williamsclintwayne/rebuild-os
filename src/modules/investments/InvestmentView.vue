<script setup lang="ts">
import { onMounted } from "vue"
import { useInvestmentStore } from "./investment.store"

const store = useInvestmentStore()

onMounted(() => {
  store.load()
})

function save() {
  store.persist()
}
</script>

<template>
  <div class="max-w-2xl mx-auto p-6 rounded-2xl shadow-md" style="background-color: var(--card)">
    <h2 class="text-xl font-semibold mb-6">Investment Configuration</h2>

    <div class="space-y-4">

      <div>
        <label class="block text-sm mb-1">Monthly Contribution (R)</label>
        <input v-model.number="store.monthlyContribution" type="number" class="input" />
      </div>

      <div>
        <label class="block text-sm mb-1">Annual Contribution Increase (%)</label>
        <input v-model.number="store.annualIncrease" type="number" class="input" />
      </div>

      <div>
        <label class="block text-sm mb-1">Expected Annual Return (%)</label>
        <input v-model.number="store.annualReturn" type="number" class="input" />
      </div>

      <div>
        <label class="block text-sm mb-1">Projection Years</label>
        <input v-model.number="store.years" type="number" class="input" />
      </div>

      <div>
        <label class="block text-sm mb-1">Freedom Target (R)</label>
        <input v-model.number="store.freedomTarget" type="number" class="input" />
      </div>

      <div class="flex items-center gap-2 mt-4">
        <input type="checkbox" v-model="store.autoMode" />
        <label>Auto invest full surplus</label>
      </div>

      <button @click="save" class="w-full bg-black text-white py-2 rounded-xl mt-4">
        Save Investment Settings
      </button>

    </div>
  </div>
</template>

<style scoped>
.input {
  @apply w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent;
}
</style>