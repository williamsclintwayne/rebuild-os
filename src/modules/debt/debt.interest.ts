import type { Debt } from "./debt.types"

export function calculateTotalInterestIfMinimum(
  debts: Debt[]
): number {
  let total = 0

  debts.forEach(d => {
    const monthlyRate = d.interestRate / 100 / 12
    total += d.currentBalance * monthlyRate
  })

  return total
}