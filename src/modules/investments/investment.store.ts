import { defineStore } from "pinia"

export const useInvestmentStore = defineStore("investment", {
  state: () => ({
    monthlyContribution: 3000,
    annualIncrease: 6,
    annualReturn: 10,
    years: 33,
    freedomTarget: 15000000,
    autoMode: false,

    // TFSA tracking
    tfsaAnnualContribution: 0,
    tfsaLifetimeContribution: 0,
    tfsaAnnualLimit: 36000,
    tfsaLifetimeLimit: 500000,
  }),

  actions: {
    load() {
      const saved = localStorage.getItem("investment")
      if (saved) {
        Object.assign(this, JSON.parse(saved))
      }
    },

    persist() {
      localStorage.setItem(
        "investment",
        JSON.stringify(this.$state)
      )
    },
  },
})