// debt.projection.ts

import type { Debt } from "./debt.types"

export interface ProjectionConfig {
  extraPayment: number
  mode: "manual" | "auto"
}

export interface ProjectionResult {
  months: number
  totalInterestPaid: number
  payoffDate?: Date
}

export function simulateSnowball(
  debts: Debt[],
  config: ProjectionConfig
): ProjectionResult {
  const cloned = debts.map(d => ({ ...d }))
  let months = 0
  let totalInterestPaid = 0

  while (cloned.some(d => d.currentBalance > 0) && months < 600) {
    months++

    cloned.sort((a, b) => a.currentBalance - b.currentBalance)

    let surplusApplied = false

    for (const debt of cloned) {
      if (debt.currentBalance <= 0) continue

      const monthlyInterest =
        (debt.currentBalance * debt.interestRate) / 100 / 12

      totalInterestPaid += monthlyInterest
      debt.currentBalance += monthlyInterest

      let payment = debt.monthlyPayment

      // Apply surplus only once to first active debt
      if (!surplusApplied) {
        payment += config.extraPayment
        surplusApplied = true
      }

      if (payment > debt.currentBalance) {
        payment = debt.currentBalance
      }

      debt.currentBalance -= payment
    }
  }

  const payoffDate = new Date()
  payoffDate.setMonth(payoffDate.getMonth() + months)

  return {
    months,
    totalInterestPaid,
    payoffDate,
  }
}

export function projectDebtYearly(
  debts: Debt[],
  extraPayment: number
) {
  const cloned = debts.map(d => ({ ...d }))
  const yearlyData: number[] = []
  let months = 0

  while (cloned.some(d => d.currentBalance > 0) && months < 600) {
    months++
    cloned.sort((a, b) => a.currentBalance - b.currentBalance)

    for (const debt of cloned) {
      if (debt.currentBalance <= 0) continue

      const monthlyInterest =
        (debt.currentBalance * debt.interestRate) / 100 / 12

      debt.currentBalance += monthlyInterest

      let payment = debt.monthlyPayment
      if (debt === cloned[0]) {
        payment += extraPayment
      }

      debt.currentBalance -= payment
      if (debt.currentBalance < 0) debt.currentBalance = 0
    }

    if (months % 12 === 0) {
      const totalRemaining = cloned.reduce(
        (sum, d) => sum + d.currentBalance,
        0
      )
      yearlyData.push(totalRemaining)
    }
  }

  return yearlyData
}

export function estimateDebtPayoffMonths(
  debt: Debt
): number {
  let balance = debt.currentBalance
  let months = 0
  const monthlyRate = debt.interestRate / 100 / 12

  while (balance > 0 && months < 600) {
    months++
    balance += balance * monthlyRate
    balance -= debt.monthlyPayment
  }

  return months
}

export interface AmortizationRow {
  month: number
  startingBalance: number
  interest: number
  payment: number
  endingBalance: number
}

export function generateAmortization(
  debt: Debt
): AmortizationRow[] {
  const schedule: AmortizationRow[] = []
  let balance = debt.currentBalance
  let month = 0
  const monthlyRate = debt.interestRate / 100 / 12

  while (balance > 0 && month < 600) {
    month++

    const startingBalance = balance
    const interest = balance * monthlyRate
    balance += interest

    let payment = debt.monthlyPayment
    if (payment > balance) payment = balance

    balance -= payment

    schedule.push({
      month,
      startingBalance,
      interest,
      payment,
      endingBalance: balance,
    })
  }

  return schedule
}

export function compareInterest(
  debts: Debt[],
  extraPayment: number
) {
  const minimum = simulateSnowball(debts, {
    extraPayment: 0,
    mode: "manual",
  })

  const aggressive = simulateSnowball(debts, {
    extraPayment,
    mode: "manual",
  })

  return {
    minimumInterest: minimum.totalInterestPaid,
    aggressiveInterest: aggressive.totalInterestPaid,
    interestSaved:
      minimum.totalInterestPaid - aggressive.totalInterestPaid,
  }
}