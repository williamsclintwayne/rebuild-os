import { defineStore } from "pinia"

export const useCashflowStore = defineStore("cashflow", {
  state: () => ({
    salary: 0,
    fixedExpenses: 0,
    debtPayments: 0,
  }),

  getters: {
    surplus(state) {
      return state.salary - state.fixedExpenses - state.debtPayments
    },
  },

  actions: {
    load() {
      const saved = localStorage.getItem("cashflow")
      if (saved) Object.assign(this, JSON.parse(saved))
    },

    persist() {
      localStorage.setItem("cashflow", JSON.stringify(this.$state))
    },
  },
})