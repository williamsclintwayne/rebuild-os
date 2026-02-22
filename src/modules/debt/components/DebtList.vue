<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useDebtStore } from "../debt.store"
import { calculateProgress } from "../debt.calculations"
import type { Debt } from "../debt.types"
import { estimateDebtPayoffMonths } from "../debt.projection"

const store = useDebtStore()
const editingId = ref<string | null>(null)
const editedDebt = ref<Debt | null>(null)

onMounted(() => {
    store.load()
})

function startEdit(debt: Debt) {
    editingId.value = debt.id
    editedDebt.value = { ...debt }
}

function saveEdit() {
    if (editedDebt.value) {
        store.updateDebt(editedDebt.value)
        editingId.value = null
        editedDebt.value = null
    }
}

function cancelEdit() {
    editingId.value = null
    editedDebt.value = null
}
</script>

<template>
    <div class="mt-6 space-y-4">
        <div v-if="store.debts.length === 0" class="opacity-50">
            No debts added yet.
        </div>

        <div v-for="debt in store.orderedDebts" :key="debt.id" class="p-4 rounded-2xl shadow-md"
            style="background-color: var(--card)">

            <!-- EDIT MODE -->
            <div v-if="editingId === debt.id" class="space-y-3">
                <input v-model="editedDebt!.name" class="input" />
                <input v-model.number="editedDebt!.startingBalance" type="number" class="input" />
                <input v-model.number="editedDebt!.currentBalance" type="number" class="input" />
                <input v-model.number="editedDebt!.interestRate" type="number" class="input" />
                <input v-model.number="editedDebt!.monthlyPayment" type="number" class="input" />

                <div class="flex gap-2">
                    <button @click="saveEdit" class="bg-green-600 text-white px-3 py-1 rounded">
                        Save
                    </button>
                    <button @click="cancelEdit" class="bg-gray-500 text-white px-3 py-1 rounded">
                        Cancel
                    </button>
                </div>
            </div>

            <!-- VIEW MODE -->
            <div v-else>
                <div class="flex justify-between items-center">
                    <h3 class="font-semibold">
                        <router-link :to="'/debts/' + debt.id" class="font-semibold hover:underline">
                            {{ debt.name }}
                        </router-link>
                        <span v-if="debt.currentBalance === 0" class="ml-2 text-green-500 text-xs font-bold">
                            CLEARED
                        </span>
                    </h3>
                    <div class="flex gap-2">
                        <button @click="startEdit(debt)" class="text-blue-500">
                            Edit
                        </button>
                        <button @click="store.deleteDebt(debt.id)" class="text-red-500">
                            Delete
                        </button>
                    </div>
                </div>

                <p class="text-sm mt-2">
                    Balance: R{{ debt.currentBalance.toLocaleString() }}
                </p>

                <p class="text-xs opacity-70 mt-1">
                    {{ (calculateProgress(debt) * 100).toFixed(1) }}% paid off
                </p>

                <p class="text-xs opacity-60 mt-1">
                    Est. Payoff:
                    {{ estimateDebtPayoffMonths(debt) }} months
                </p>

                <p class="text-xs opacity-60">
                    Monthly Interest:
                    R{{ ((debt.currentBalance * debt.interestRate) / 100 / 12).toFixed(0) }}
                </p>

                <div class="mt-2 h-2 bg-gray-300 dark:bg-gray-600 rounded">
                    <div class="h-2 bg-primary rounded" :style="{ width: (calculateProgress(debt) * 100) + '%' }"></div>
                </div>
            </div>

        </div>
    </div>
</template>

<style scoped>
.input {
    @apply w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent;
}
</style>