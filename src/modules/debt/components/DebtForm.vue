<script setup lang="ts">
import { reactive } from "vue"
import { useDebtStore } from "../debt.store"

const store = useDebtStore()

const form = reactive({
    name: "",
    startingBalance: 0,
    currentBalance: 0,
    interestRate: 0,
    monthlyPayment: 0,
})

function submit() {
    store.addDebt({ ...form })

    form.name = ""
    form.startingBalance = 0
    form.currentBalance = 0
    form.interestRate = 0
    form.monthlyPayment = 0
}
</script>

<template>
    <div class="p-6 rounded-2xl shadow-md space-y-4" style="background-color: var(--card)">
        <h2 class="text-xl font-semibold mb-6">Add Debt</h2>

        <div class="space-y-4">

            <!-- Debt Name -->
            <div>
                <label class="block text-sm opacity-70 mb-1">
                    Debt Name
                </label>
                <input v-model="form.name" type="text" placeholder="e.g. African Bank" class="input" />
            </div>

            <!-- Starting Balance -->
            <div>
                <label class="block text-sm opacity-70 mb-1">
                    Starting Balance (R)
                </label>
                <input v-model.number="form.startingBalance" type="number" placeholder="208000" class="input" />
            </div>

            <!-- Current Balance -->
            <div>
                <label class="block text-sm opacity-70 mb-1">
                    Current Balance (R)
                </label>
                <input v-model.number="form.currentBalance" type="number" placeholder="205000" class="input" />
            </div>

            <!-- Interest Rate -->
            <div>
                <label class="block text-sm opacity-70 mb-1">
                    Interest Rate (%)
                </label>
                <input v-model.number="form.interestRate" type="number" placeholder="20.75" class="input" />
            </div>

            <!-- Monthly Payment -->
            <div>
                <label class="block text-sm opacity-70 mb-1">
                    Monthly Payment (R)
                </label>
                <input v-model.number="form.monthlyPayment" type="number" placeholder="6050" class="input" />
            </div>

            <button @click="submit" type="button" class="w-full bg-black text-white py-3 rounded-xl font-medium mt-4">
                Add Debt
            </button>

        </div>
    </div>
</template>

<style scoped>
.input {
    @apply w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-transparent;
}
</style>