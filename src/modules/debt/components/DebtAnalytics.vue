<script setup lang="ts">
import { computed, ref } from "vue"
import { useDebtStore } from "../debt.store"
import { useCashflowStore } from "@/modules/cashflow/cashflow.store"
import { simulateSnowball } from "../debt.projection"
import { compareInterest } from "../debt.projection"

const debtStore = useDebtStore()
const cashflowStore = useCashflowStore()

const manualExtra = ref(0)
const mode = ref<"manual" | "auto">("auto")

const totalDebtPayments = computed(() =>
  debtStore.debts.reduce((sum: number, d: any) => sum + d.monthlyPayment, 0)
)

const surplus = computed(() =>
  cashflowStore.salary -
  cashflowStore.fixedExpenses -
  totalDebtPayments.value
)

const comparison = computed(() =>
    compareInterest(
        debtStore.debts,
        Math.max(
            cashflowStore.salary -
            cashflowStore.fixedExpenses -
            totalDebtPayments.value,
            0
        )
    )
)

const projection = computed(() => {
    const extra =
        mode.value === "auto"
            ? Math.max(surplus.value, 0)
            : manualExtra.value

    return simulateSnowball(debtStore.debts, {
        extraPayment: extra,
        mode: mode.value,
    })
})
</script>

<template>
    <div class="p-6 rounded-2xl shadow-md mt-6" style="background-color: var(--card)">
        <h2 class="text-xl font-semibold mb-4">Debt Projection</h2>

        <div class="mb-4">
            <label class="mr-4">
                <input type="radio" value="auto" v-model="mode" />
                Auto (Use Surplus)
            </label>
            <label>
                <input type="radio" value="manual" v-model="mode" />
                Manual Override
            </label>
        </div>

        <div v-if="mode === 'manual'" class="mb-4">
            <input v-model.number="manualExtra" type="number" placeholder="Extra Monthly Payment" class="input" />
        </div>

        <div class="space-y-2">
            <p>Months to Debt Freedom: {{ projection.months }}</p>
            <p>Total Interest Paid: R{{ projection.totalInterestPaid.toFixed(2) }}</p>
            <p>Projected Payoff Date: {{ projection.payoffDate?.toDateString() }}</p>
            <p>Interest Saved:
                R{{ comparison.interestSaved.toFixed(0) }}
            </p>
        </div>
    </div>
</template>

<style scoped>
.input {
    @apply p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent;
}
</style>