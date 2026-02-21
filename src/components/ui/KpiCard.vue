<script setup lang="ts">
defineProps<{
  title: string
  value: string
}>()
</script>

<template>
  <div
    class="p-5 rounded-2xl shadow-md transition hover:scale-[1.02]"
    style="background-color: var(--card)"
  >
    <p class="text-sm opacity-60">{{ title }}</p>
    <h3 class="text-2xl font-bold mt-2">{{ value }}</h3>
  </div>
</template>