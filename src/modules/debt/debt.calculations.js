export function calculateProgress(debt) {
    if (debt.startingBalance === 0)
        return 0;
    return ((debt.startingBalance - debt.currentBalance) /
        debt.startingBalance);
}
export function snowballOrder(debts) {
    return [...debts].sort((a, b) => a.currentBalance - b.currentBalance);
}
export function totalDebt(debts) {
    return debts.reduce((sum, d) => sum + d.currentBalance, 0);
}
