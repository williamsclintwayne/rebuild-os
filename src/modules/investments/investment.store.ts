import { defineStore } from "pinia"

export const useInvestmentStore = defineStore("investment", {
  state: () => ({
    monthlyContribution: 11000,
    annualIncrease: 6,
    annualReturn: 10,
    years: 20,
    freedomTarget: 15000000,
  }),

  actions: {
    load() {
      const saved = localStorage.getItem("investment")
      if (saved) Object.assign(this, JSON.parse(saved))
    },

    persist() {
      localStorage.setItem("investment", JSON.stringify(this.$state))
    },
  },
})