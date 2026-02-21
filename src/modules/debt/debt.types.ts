export interface Debt {
  id: string
  name: string
  startingBalance: number
  currentBalance: number
  interestRate: number
  monthlyPayment: number
}