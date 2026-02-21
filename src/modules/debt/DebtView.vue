<script setup lang="ts">
import DebtForm from "./components/DebtForm.vue"
import DebtList from "./components/DebtList.vue"
</script>

<template>
  <div class="max-w-2xl mx-auto space-y-6">
    <DebtForm />
    <DebtList />
    <DebtBonusSimulator />
  </div>
</template>