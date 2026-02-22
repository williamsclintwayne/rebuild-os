<script setup lang="ts">
import { computed } from "vue"
import { Line } from "vue-chartjs"
import { Chart, registerables } from "chart.js"

import KpiCard from "@/components/ui/KpiCard.vue"

import { useDebtStore } from "@/modules/debt/debt.store"
import { useCashflowStore } from "@/modules/cashflow/cashflow.store"
import { useInvestmentStore } from "@/modules/investments/investment.store"

import { simulateSnowball } from "@/modules/debt/debt.projection"
import { projectDebtYearly } from "@/modules/debt/debt.projection"
import { projectInvestment } from "@/modules/investments/investment.projection"

import { formatCurrency } from "@/shared/utils/format"

Chart.register(...registerables)

const debtStore = useDebtStore()
const cashflowStore = useCashflowStore()
const investmentStore = useInvestmentStore()

investmentStore.load()

/* ================================
   CASHFLOW
================================ */

const totalDebtPayments = computed(() =>
     debtStore.debts.reduce((sum: number, d: any) => sum + d.monthlyPayment, 0)
)

const realSurplus = computed(() =>
    cashflowStore.salary -
    cashflowStore.fixedExpenses -
    totalDebtPayments.value
)

/* ================================
   DEBT PROJECTION
================================ */

const projection = computed(() =>
  simulateSnowball(debtStore.debts, {
    extraPayment: cashflowStore.extraToDebt ?? 0,
    mode: "manual",
  })
)

const yearsToFreedom = computed(() =>
    (projection.value.months / 12).toFixed(1)
)

const totalDebtValue = computed(() =>
    debtStore.debts.reduce((sum: number, d: any) => sum + d.currentBalance, 0)
)

/* ================================
   YEARLY DEBT FOR CHART
================================ */

const debtYearly = computed(() =>
    projectDebtYearly(
        debtStore.debts,
        Math.max(realSurplus.value, 0)
    )
)

/* ================================
   INVESTMENT PROJECTION
================================ */

const investmentContribution = computed(() => {
    if (investmentStore.autoMode) {
        return Math.max(realSurplus.value, 0)
    }
    return investmentStore.monthlyContribution
})

const investmentData = computed(() =>
    projectInvestment({
        monthlyContribution: investmentContribution.value,
        annualIncrease: investmentStore.annualIncrease,
        annualReturn: investmentStore.annualReturn,
        years: investmentStore.years,
    })
)

const freedomPercent = computed(() => {
    const lastValue =
        investmentData.value[investmentData.value.length - 1] || 0

    return (
        (lastValue / investmentStore.freedomTarget) *
        100
    ).toFixed(1)
})

const fireTarget = 30000000 // 30m example

const fireProgress = computed(() => {
    const lastValue =
        investmentData.value[investmentData.value.length - 1] || 0
    return ((lastValue / fireTarget) * 100).toFixed(1)
})

const tfsaAnnualRemaining = computed(() =>
    investmentStore.tfsaAnnualLimit -
    investmentStore.tfsaAnnualContribution
)

const tfsaLifetimeRemaining = computed(() =>
    investmentStore.tfsaLifetimeLimit -
    investmentStore.tfsaLifetimeContribution
)

const tfsaLifetimeProgress = computed(() =>
    (
        (investmentStore.tfsaLifetimeContribution /
            investmentStore.tfsaLifetimeLimit) *
        100
    ).toFixed(1)
)

/* ================================
   INTERSECTION YEAR
================================ */

const intersectionYear = computed(() => {
    for (let i = 0; i < investmentData.value.length; i++) {
        if (
            debtYearly.value[i] !== undefined &&
            investmentData.value[i] !== undefined &&
            investmentData.value[i] > debtYearly.value[i]
        ) {
            return i + 1
        }
    }
    return null
})

/* ================================
   CHART DATA
================================ */

const combinedData = computed(() => {
    const years = Math.max(
        debtYearly.value.length,
        investmentData.value.length
    )

    const labels = Array.from(
        { length: years },
        (_, i) => `Year ${i + 1}`
    )

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


</script>

<template>
    <div class="max-w-6xl mx-auto p-6 space-y-10">

        <h2 class="text-xl font-semibold tracking-tight">
            Snapshot
        </h2>

        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <KpiCard title="Total Debt" :value="formatCurrency(totalDebtValue)" />

            <KpiCard title="Months to Freedom" :value="projection.months.toString()" />

            <KpiCard title="Debt Freedom (Years)" :value="yearsToFreedom" />

            <KpiCard title="Projected Portfolio" :value="formatCurrency(
                investmentData[
                investmentData.length - 1
                ] || 0
            )" />

            <KpiCard title="FIRE Progress" :value="fireProgress + '%'" />

            <KpiCard title="Monthly Surplus" :value="formatCurrency(realSurplus)" />

            <KpiCard title="Wealth > Debt Year" :value="intersectionYear ? 'Year ' + intersectionYear : '—'" />

            <KpiCard title="Freedom Progress" :value="freedomPercent + '%'" />

            <KpiCard title="TFSA Annual Remaining" :value="formatCurrency(tfsaAnnualRemaining)" />

            <KpiCard title="TFSA Lifetime Remaining" :value="formatCurrency(tfsaLifetimeRemaining)" />

            <KpiCard title="TFSA Lifetime Used" :value="tfsaLifetimeProgress + '%'" />
        </div>

        <h2 class="text-xl font-semibold tracking-tight">
            Financial Trajectory
        </h2>

        <div class="p-6 rounded-2xl shadow-md" style="background-color: var(--card)">
            <h2 class="text-lg font-semibold mb-4">
                Wealth Trajectory (Debt vs Investment)
            </h2>

            <Line :data="combinedData" :options="chartOptions" />
        </div>

    </div>
</template>