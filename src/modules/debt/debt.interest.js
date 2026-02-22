export function calculateTotalInterestIfMinimum(debts) {
    let total = 0;
    debts.forEach(d => {
        const monthlyRate = d.interestRate / 100 / 12;
        total += d.currentBalance * monthlyRate;
    });
    return total;
}
