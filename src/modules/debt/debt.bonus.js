export function applyBonus(debts, bonus) {
    const cloned = debts.map(d => ({ ...d }));
    cloned.sort((a, b) => a.currentBalance - b.currentBalance);
    for (const debt of cloned) {
        if (bonus <= 0)
            break;
        if (bonus >= debt.currentBalance) {
            bonus -= debt.currentBalance;
            debt.currentBalance = 0;
        }
        else {
            debt.currentBalance -= bonus;
            bonus = 0;
        }
    }
    return cloned;
}
