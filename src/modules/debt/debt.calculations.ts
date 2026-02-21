import type { Debt } from "./debt.types"

export function calculateProgress(debt: Debt): number {
  if (debt.startingBalance === 0) return 0
  return (
    (debt.startingBalance - debt.currentBalance) /
    debt.startingBalance
  )
}

export function snowballOrder(debts: Debt[]): Debt[] {
  return [...debts].sort(
    (a, b) => a.currentBalance - b.currentBalance
  )
}

export function totalDebt(debts: Debt[]): number {
  return debts.reduce((sum, d) => sum + d.currentBalance, 0)
}