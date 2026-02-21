import type { InvestmentConfig } from "./investment.types"

export function projectInvestment(config: InvestmentConfig) {
  const monthlyRate = config.annualReturn / 100 / 12
  const months = config.years * 12

  let value = 0
  let monthlyContribution = config.monthlyContribution

  const yearlyData: number[] = []

  for (let m = 1; m <= months; m++) {
    value = value * (1 + monthlyRate) + monthlyContribution

    if (m % 12 === 0) {
      yearlyData.push(value)
      monthlyContribution *= 1 + config.annualIncrease / 100
    }
  }

  return yearlyData
}