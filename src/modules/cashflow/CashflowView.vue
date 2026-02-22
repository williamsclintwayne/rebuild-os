<script setup lang="ts">
import { computed } from "vue"
import { useCashflowStore } from "./cashflow.store"
import { useDebtStore } from "../debt/debt.store"
import { formatCurrency } from "@/shared/utils/format"
import { useInvestmentStore } from "../investments/investment.store"

const cashflowStore = useCashflowStore()
const debtStore = useDebtStore()
const investmentStore = useInvestmentStore()

cashflowStore.load()

const totalDebtPayments = computed(() =>
  debtStore.debts.reduce((sum: number, d: any) => sum + d.monthlyPayment, 0)
)

const surplus = computed(() =>
  cashflowStore.salary -
  cashflowStore.fixedExpenses -
  totalDebtPayments.value
)

function applyBonus(type: string) {
  const bonus = cashflowStore.bonusAmount

  if (!bonus || bonus <= 0) return

  if (type === "emergency") {
    cashflowStore.emergencyFund += bonus
  }

  if (type === "invest") {
    investmentStore.monthlyContribution += bonus / 12
  }

  if (type === "debt") {
  let remainingBonus = bonus

  const sortedDebts = debtStore.debts
    .filter(d => d.currentBalance > 0)
    .sort((a, b) => a.currentBalance - b.currentBalance)

  for (const debt of sortedDebts) {
    if (remainingBonus <= 0) break

    if (remainingBonus >= debt.currentBalance) {
      remainingBonus -= debt.currentBalance
      debt.currentBalance = 0
    } else {
      debt.currentBalance -= remainingBonus
      remainingBonus = 0
    }
  }
}

  cashflowStore.bonusAmount = 0
}

function save() {
  cashflowStore.persist()
}
</script>

<template>
  <div class="max-w-5xl mx-auto p-6 space-y-10">

    <!-- Income Card -->
    <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-6 space-y-4">
      <h2 class="text-xl font-semibold">Income</h2>

      <div>
        <label class="block text-sm text-gray-500 mb-1">Net Monthly Salary</label>
        <input v-model.number="cashflowStore.salary" type="number" class="w-full border rounded-lg px-3 py-2" />
      </div>
    </div>

    <!-- Expenses Card -->
    <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-6 space-y-6">
      <h2 class="text-xl font-semibold">Monthly Expenses</h2>

      <div class="grid sm:grid-cols-2 gap-4">
        <div>
          <label class="label">Rent</label>
          <input v-model.number="cashflowStore.rent" type="number" class="input" />
        </div>

        <div>
          <label class="label">Groceries</label>
          <input v-model.number="cashflowStore.groceries" type="number" class="input" />
        </div>

        <div>
          <label class="label">Fuel</label>
          <input v-model.number="cashflowStore.fuel" type="number" class="input" />
        </div>

        <div>
          <label class="label">Electricity</label>
          <input v-model.number="cashflowStore.electricity" type="number" class="input" />
        </div>

        <div>
          <label class="label">Baby Expenses</label>
          <input v-model.number="cashflowStore.babyExpenses" type="number" class="input" />
        </div>

        <div>
          <label class="label">WiFi</label>
          <input v-model.number="cashflowStore.wifi" type="number" class="input" />
        </div>

        <div>
          <label class="label">Other</label>
          <input v-model.number="cashflowStore.other" type="number" class="input" />
        </div>
      </div>
    </div>

    <!-- Summary Card -->
    <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-6 space-y-3">
      <h2 class="text-xl font-semibold">Summary</h2>

      <p><strong>Total Fixed Expenses:</strong> {{ formatCurrency(cashflowStore.fixedExpenses) }}</p>
      <p><strong>Total Debt Payments:</strong> {{ formatCurrency(totalDebtPayments) }}</p>

      <p class="text-lg font-bold">
        Monthly Surplus:
        <span :class="surplus >= 0 ? 'text-green-600' : 'text-red-600'">
          {{ formatCurrency(surplus) }}
        </span>
      </p>

      <div class="mt-4">
        <label class="block text-sm text-gray-500 mb-2">
          Allocate Extra to Debt (Snowball Boost)
        </label>
        <input type="range" min="0" :max="surplus > 0 ? surplus : 0" v-model.number="cashflowStore.extraToDebt"
          class="w-full" />
        <p class="text-sm mt-1">
          Extra Payment: {{ formatCurrency(cashflowStore.extraToDebt || 0) }}
        </p>
      </div>

      <div class="mt-6 border-t pt-4">
        <h3 class="font-semibold">Emergency Fund</h3>

        <input v-model.number="cashflowStore.emergencyFund" type="number" placeholder="Current Emergency Fund"
          class="input mt-2" />

        <p class="mt-2 text-sm text-gray-500">
          3 Months Coverage Target:
          {{
            formatCurrency(
              (cashflowStore.fixedExpenses + totalDebtPayments) * 3
            )
          }}
        </p>
      </div>

      <div class="mt-8 border-t pt-6">
        <h3 class="text-lg font-semibold mb-4">Bonus Injection</h3>

        <input v-model.number="cashflowStore.bonusAmount" type="number" placeholder="Enter Bonus Amount"
          class="input" />

        <div class="flex gap-4 mt-4">
          <button @click="applyBonus('debt')"
            class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
            Apply to Debt
          </button>

          <button @click="applyBonus('emergency')"
            class="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600">
            Add to Emergency Fund
          </button>

          <button @click="applyBonus('invest')"
            class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
            Invest
          </button>
        </div>
      </div>

      <button @click="save" class="mt-4 bg-black text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
        Save Cashflow
      </button>
    </div>

  </div>
</template>

<style scoped>
.label {
  display: block;
  font-size: 0.85rem;
  margin-bottom: 4px;
  color: #64748b;
}

.input {
  width: 100%;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 8px 10px;
}
</style>