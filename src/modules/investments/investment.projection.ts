export function projectInvestment(config: {
  monthlyContribution: number
  annualIncrease: number
  annualReturn: number
  years: number
}) {
  const {
    monthlyContribution,
    annualIncrease,
    annualReturn,
    years,
  } = config

  const annualTfsaLimit = 36000
  const lifetimeTfsaLimit = 500000

  let portfolio = 0
  let tfsaLifetimeUsed = 0

  const yearlyTotals: number[] = []

  for (let year = 0; year < years; year++) {
    const adjustedMonthly =
      monthlyContribution *
      Math.pow(1 + annualIncrease / 100, year)

    const yearlyContribution = adjustedMonthly * 12

    let tfsaContribution = Math.min(
      yearlyContribution,
      annualTfsaLimit
    )

    if (tfsaLifetimeUsed + tfsaContribution > lifetimeTfsaLimit) {
      tfsaContribution =
        lifetimeTfsaLimit - tfsaLifetimeUsed
    }

    tfsaLifetimeUsed += tfsaContribution

    const taxableContribution =
      yearlyContribution - tfsaContribution

    const totalContribution =
      tfsaContribution + taxableContribution

    portfolio =
      (portfolio + totalContribution) *
      (1 + annualReturn / 100)

    yearlyTotals.push(portfolio)

    if (tfsaLifetimeUsed >= lifetimeTfsaLimit) {
      for (let remaining = year + 1; remaining < years; remaining++) {
        const nextMonthly =
          monthlyContribution *
          Math.pow(1 + annualIncrease / 100, remaining)

        const nextYearly = nextMonthly * 12

        portfolio =
          (portfolio + nextYearly) *
          (1 + annualReturn / 100)

        yearlyTotals.push(portfolio)
      }
      break
    }
  }

  return yearlyTotals
}