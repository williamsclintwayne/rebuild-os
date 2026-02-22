import { defineStore } from "pinia"

export const useCashflowStore = defineStore("cashflow", {
  state: () => ({
    salary: 0,
    rent: 0,
    groceries: 0,
    fuel: 0,
    electricity: 0,
    babyExpenses: 0,
    wifi: 0,
    other: 0,
    extraToDebt: 0,
    emergencyFund: 0,
    bonusAmount: 0,
  }),

  getters: {
    fixedExpenses(state) {
      return (
        state.rent +
        state.groceries +
        state.fuel +
        state.electricity +
        state.babyExpenses +
        state.wifi +
        state.other
      )
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