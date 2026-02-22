export function simulateTfsaContribution(
  monthlyContribution: number,
  years: number,
  annualLimit: number,
  lifetimeLimit: number
) {
  let lifetimeContribution = 0

  const yearlyContributions: number[] = []

  for (let year = 0; year < years; year++) {
    let yearly = monthlyContribution * 12

    if (yearly > annualLimit) yearly = annualLimit
    if (lifetimeContribution + yearly > lifetimeLimit) {
      yearly = lifetimeLimit - lifetimeContribution
    }

    lifetimeContribution += yearly
    yearlyContributions.push(lifetimeContribution)

    if (lifetimeContribution >= lifetimeLimit) break
  }

  return {
    lifetimeContribution,
    yearlyContributions,
  }
}