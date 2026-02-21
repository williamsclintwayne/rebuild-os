<script setup lang="ts">
import { useRoute } from "vue-router"
import { useDebtStore } from "./debt.store"
import { generateAmortization } from "./debt.projection"
import { Line } from "vue-chartjs"
import { Chart, registerables } from "chart.js"
import { computed } from "vue"

Chart.register(...registerables)

const route = useRoute()
const store = useDebtStore()

const debt = computed(() =>
  store.debts.find(d => d.id === route.params.id)
)

const schedule = computed(() =>
  debt.value ? generateAmortization(debt.value) : []
)

const chartData = computed(() => ({
  labels: schedule.value.map(r => r.month),
  datasets: [
    {
      label: "Balance Decline",
      data: schedule.value.map(r => r.endingBalance),
      borderColor: "#ef4444",
      tension: 0.3,
    },
  ],
}))
</script>

<template>
  <div v-if="debt" class="p-6 space-y-6">

    <h2 class="text-xl font-bold">{{ debt.name }} Detail</h2>

    <Line :data="chartData" />

    <div class="overflow-auto max-h-80">
      <table class="w-full text-sm">
        <thead>
          <tr>
            <th>Month</th>
            <th>Start</th>
            <th>Interest</th>
            <th>Payment</th>
            <th>End</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in schedule" :key="row.month">
            <td>{{ row.month }}</td>
            <td>{{ row.startingBalance.toFixed(0) }}</td>
            <td>{{ row.interest.toFixed(0) }}</td>
            <td>{{ row.payment.toFixed(0) }}</td>
            <td>{{ row.endingBalance.toFixed(0) }}</td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>