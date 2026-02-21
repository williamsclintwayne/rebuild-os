import { defineStore } from "pinia"
import { v4 as uuidv4 } from "uuid"
import type { Debt } from "./debt.types"
import { snowballOrder } from "./debt.calculations"

export const useDebtStore = defineStore("debt", {
  state: () => ({
    debts: [] as Debt[],
  }),

  getters: {
    orderedDebts(state) {
      return snowballOrder(state.debts)
    },
  },

  actions: {
    load() {
      const saved = localStorage.getItem("debts")
      if (saved) this.debts = JSON.parse(saved)
    },

    persist() {
      localStorage.setItem("debts", JSON.stringify(this.debts))
    },

    addDebt(debt: Omit<Debt, "id">) {
      this.debts.push({ ...debt, id: uuidv4() })
      this.persist()
    },

    deleteDebt(id: string) {
      this.debts = this.debts.filter(d => d.id !== id)
      this.persist()
    },

    updateDebt(updated: Debt) {
      const index = this.debts.findIndex(d => d.id === updated.id)
      if (index !== -1) {
        this.debts[index] = updated
        this.persist()
      }
    },
  },
})