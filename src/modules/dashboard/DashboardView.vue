<script setup lang="ts">
import { computed } from "vue"
import { Line } from "vue-chartjs"
import { Chart, registerables } from "chart.js"
import KpiCard from "@/components/ui/KpiCard.vue"
import { useDebtStore } from "@/modules/debt/debt.store"
import { useCashflowStore } from "@/modules/cashflow/cashflow.store"
import { simulateSnowball } from "@/modules/debt/debt.projection"
import { projectInvestment } from "@/modules/investments/investment.projection"
import { projectDebtYearly } from "@/modules/debt/debt.projection"
import { formatCurrency } from "@/shared/utils/format"
import { useInvestmentStore } from "@/modules/investments/investment.store"

Chart.register(...registerables)

const debtStore = useDebtStore()
const cashflowStore = useCashflowStore()
const investmentStore = useInvestmentStore()

const projection = computed(() =>
    simulateSnowball(debtStore.debts, {
        extraPayment: Math.max(cashflowStore.surplus, 0),
        mode: "auto",
    })
)

investmentStore.load()
const investmentData = computed(() =>
    projectInvestment({
        monthlyContribution: investmentStore.monthlyContribution,
        annualIncrease: investmentStore.annualIncrease,
        annualReturn: investmentStore.annualReturn,
        years: investmentStore.years,
    })
)

const freedomPercent = computed(() => {
    const lastValue = investmentData.value[investmentData.value.length - 1] || 0
    return ((lastValue / investmentStore.freedomTarget) * 100).toFixed(1)
})

const debtYearly = computed(() =>
    projectDebtYearly(
        debtStore.debts,
        Math.max(cashflowStore.surplus, 0)
    )
)

const combinedData = computed(() => {
    const years = Math.max(
        debtYearly.value.length,
        investmentData.value.length
    )

    const labels = Array.from({ length: years }, (_, i) => `Year ${i + 1}`)

    return {
        labels,
        datasets: [
            {
                label: "Remaining Debt",
                data: debtYearly.value,
                borderColor: "#ef4444",
                backgroundColor: "rgba(239,68,68,0.1)",
                borderWidth: 2,
                tension: 0.4,
            },
            {
                label: "Investment Growth",
                data: investmentData.value,
                borderColor: "#22c55e",
                backgroundColor: "rgba(34,197,94,0.1)",
                borderWidth: 2,
                tension: 0.4,
            },
        ],
    }
})

const chartOptions = {
    responsive: true,
    plugins: {
        legend: {
            labels: {
                color: "#94a3b8",
            },
        },
    },
    scales: {
        x: {
            ticks: { color: "#94a3b8" },
        },
        y: {
            ticks: { color: "#94a3b8" },
        },
    },
}

const intersectionYear = computed(() => {
    for (let i = 0; i < investmentData.value.length; i++) {
        if (
            debtYearly.value[i] !== undefined &&
            investmentData.value[i] > debtYearly.value[i]
        ) {
            return i + 1
        }
    }
    return null
})



</script>

<template>
    <div class="p-6 space-y-8">

        <!-- KPI Row -->
        <div class="grid md:grid-cols-4 gap-4">
            <KpiCard title="Total Debt" :value="'R' + debtStore.debts.reduce((s, d) => s + d.currentBalance, 0)" />
            <KpiCard title="Months to Freedom" :value="projection.months.toString()" />
            <KpiCard title="Projected Portfolio (20y)"
                :value="formatCurrency(investmentData[investmentData.length - 1] || 0)" />
            <KpiCard title="Monthly Surplus" :value="'R' + cashflowStore.surplus" />
            <KpiCard title="Wealth > Debt Year" :value="intersectionYear ? 'Year ' + intersectionYear : '—'" />
            <KpiCard title="Freedom Progress" :value="freedomPercent + '%'" />
        </div>

        <!-- Charts -->
        <div class="p-6 rounded-2xl shadow-md" style="background-color: var(--card)">
            <h2 class="text-lg font-semibold mb-4">
                Wealth Trajectory (Debt vs Investment)
            </h2>
            <Line :data="combinedData" :options="chartOptions" />
        </div>

    </div>
</template>