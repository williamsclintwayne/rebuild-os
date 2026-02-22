import { computed } from "vue";
import { Line } from "vue-chartjs";
import { Chart, registerables } from "chart.js";
import KpiCard from "@/components/ui/KpiCard.vue";
import { useDebtStore } from "@/modules/debt/debt.store";
import { useCashflowStore } from "@/modules/cashflow/cashflow.store";
import { useInvestmentStore } from "@/modules/investments/investment.store";
import { simulateSnowball } from "@/modules/debt/debt.projection";
import { projectDebtYearly } from "@/modules/debt/debt.projection";
import { projectInvestment } from "@/modules/investments/investment.projection";
import { formatCurrency } from "@/shared/utils/format";
Chart.register(...registerables);
const debtStore = useDebtStore();
const cashflowStore = useCashflowStore();
const investmentStore = useInvestmentStore();
investmentStore.load();
/* ================================
   CASHFLOW
================================ */
const totalDebtPayments = computed(() => debtStore.debts.reduce((sum, d) => sum + d.monthlyPayment, 0));
const realSurplus = computed(() => cashflowStore.salary -
    cashflowStore.fixedExpenses -
    totalDebtPayments.value);
/* ================================
   DEBT PROJECTION
================================ */
const projection = computed(() => simulateSnowball(debtStore.debts, {
    extraPayment: cashflowStore.extraToDebt ?? 0,
    mode: "manual",
}));
const yearsToFreedom = computed(() => (projection.value.months / 12).toFixed(1));
const totalDebtValue = computed(() => debtStore.debts.reduce((sum, d) => sum + d.currentBalance, 0));
/* ================================
   YEARLY DEBT FOR CHART
================================ */
const debtYearly = computed(() => projectDebtYearly(debtStore.debts, Math.max(realSurplus.value, 0)));
/* ================================
   INVESTMENT PROJECTION
================================ */
const investmentContribution = computed(() => {
    if (investmentStore.autoMode) {
        return Math.max(realSurplus.value, 0);
    }
    return investmentStore.monthlyContribution;
});
const investmentData = computed(() => projectInvestment({
    monthlyContribution: investmentContribution.value,
    annualIncrease: investmentStore.annualIncrease,
    annualReturn: investmentStore.annualReturn,
    years: investmentStore.years,
}));
const freedomPercent = computed(() => {
    const lastValue = investmentData.value[investmentData.value.length - 1] || 0;
    return ((lastValue / investmentStore.freedomTarget) *
        100).toFixed(1);
});
const fireTarget = 30000000; // 30m example
const fireProgress = computed(() => {
    const lastValue = investmentData.value[investmentData.value.length - 1] || 0;
    return ((lastValue / fireTarget) * 100).toFixed(1);
});
const tfsaAnnualRemaining = computed(() => investmentStore.tfsaAnnualLimit -
    investmentStore.tfsaAnnualContribution);
const tfsaLifetimeRemaining = computed(() => investmentStore.tfsaLifetimeLimit -
    investmentStore.tfsaLifetimeContribution);
const tfsaLifetimeProgress = computed(() => ((investmentStore.tfsaLifetimeContribution /
    investmentStore.tfsaLifetimeLimit) *
    100).toFixed(1));
/* ================================
   INTERSECTION YEAR
================================ */
const intersectionYear = computed(() => {
    for (let i = 0; i < investmentData.value.length; i++) {
        if (debtYearly.value[i] !== undefined &&
            investmentData.value[i] !== undefined &&
            investmentData.value[i] > debtYearly.value[i]) {
            return i + 1;
        }
    }
    return null;
});
/* ================================
   CHART DATA
================================ */
const combinedData = computed(() => {
    const years = Math.max(debtYearly.value.length, investmentData.value.length);
    const labels = Array.from({ length: years }, (_, i) => `Year ${i + 1}`);
    return {
        labels,
        datasets: [
            {
                label: "Remaining Debt",
                data: debtYearly.value,
                borderColor: "#ef4444",
                backgroundColor: "rgba(239,68,68,0.1)",
                borderWidth: 2,
                tension: 0.4,
            },
            {
                label: "Investment Growth",
                data: investmentData.value,
                borderColor: "#22c55e",
                backgroundColor: "rgba(34,197,94,0.1)",
                borderWidth: 2,
                tension: 0.4,
            },
        ],
    };
});
const chartOptions = {
    responsive: true,
    plugins: {
        legend: {
            labels: {
                color: "#94a3b8",
            },
        },
    },
    scales: {
        x: {
            ticks: { color: "#94a3b8" },
        },
        y: {
            ticks: { color: "#94a3b8" },
        },
    },
};
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "max-w-6xl mx-auto p-6 space-y-10" },
});
/** @type {__VLS_StyleScopedClasses['max-w-6xl']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['p-6']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-10']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
    ...{ class: "text-xl font-semibold tracking-tight" },
});
/** @type {__VLS_StyleScopedClasses['text-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['tracking-tight']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "grid sm:grid-cols-2 lg:grid-cols-4 gap-6" },
});
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:grid-cols-2']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:grid-cols-4']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-6']} */ ;
const __VLS_0 = KpiCard;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    title: "Total Debt",
    value: (__VLS_ctx.formatCurrency(__VLS_ctx.totalDebtValue)),
}));
const __VLS_2 = __VLS_1({
    title: "Total Debt",
    value: (__VLS_ctx.formatCurrency(__VLS_ctx.totalDebtValue)),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const __VLS_5 = KpiCard;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent1(__VLS_5, new __VLS_5({
    title: "Months to Freedom",
    value: (__VLS_ctx.projection.months.toString()),
}));
const __VLS_7 = __VLS_6({
    title: "Months to Freedom",
    value: (__VLS_ctx.projection.months.toString()),
}, ...__VLS_functionalComponentArgsRest(__VLS_6));
const __VLS_10 = KpiCard;
// @ts-ignore
const __VLS_11 = __VLS_asFunctionalComponent1(__VLS_10, new __VLS_10({
    title: "Debt Freedom (Years)",
    value: (__VLS_ctx.yearsToFreedom),
}));
const __VLS_12 = __VLS_11({
    title: "Debt Freedom (Years)",
    value: (__VLS_ctx.yearsToFreedom),
}, ...__VLS_functionalComponentArgsRest(__VLS_11));
const __VLS_15 = KpiCard;
// @ts-ignore
const __VLS_16 = __VLS_asFunctionalComponent1(__VLS_15, new __VLS_15({
    title: "Projected Portfolio",
    value: (__VLS_ctx.formatCurrency(__VLS_ctx.investmentData[__VLS_ctx.investmentData.length - 1] || 0)),
}));
const __VLS_17 = __VLS_16({
    title: "Projected Portfolio",
    value: (__VLS_ctx.formatCurrency(__VLS_ctx.investmentData[__VLS_ctx.investmentData.length - 1] || 0)),
}, ...__VLS_functionalComponentArgsRest(__VLS_16));
const __VLS_20 = KpiCard;
// @ts-ignore
const __VLS_21 = __VLS_asFunctionalComponent1(__VLS_20, new __VLS_20({
    title: "FIRE Progress",
    value: (__VLS_ctx.fireProgress + '%'),
}));
const __VLS_22 = __VLS_21({
    title: "FIRE Progress",
    value: (__VLS_ctx.fireProgress + '%'),
}, ...__VLS_functionalComponentArgsRest(__VLS_21));
const __VLS_25 = KpiCard;
// @ts-ignore
const __VLS_26 = __VLS_asFunctionalComponent1(__VLS_25, new __VLS_25({
    title: "Monthly Surplus",
    value: (__VLS_ctx.formatCurrency(__VLS_ctx.realSurplus)),
}));
const __VLS_27 = __VLS_26({
    title: "Monthly Surplus",
    value: (__VLS_ctx.formatCurrency(__VLS_ctx.realSurplus)),
}, ...__VLS_functionalComponentArgsRest(__VLS_26));
const __VLS_30 = KpiCard;
// @ts-ignore
const __VLS_31 = __VLS_asFunctionalComponent1(__VLS_30, new __VLS_30({
    title: "Wealth > Debt Year",
    value: (__VLS_ctx.intersectionYear ? 'Year ' + __VLS_ctx.intersectionYear : '—'),
}));
const __VLS_32 = __VLS_31({
    title: "Wealth > Debt Year",
    value: (__VLS_ctx.intersectionYear ? 'Year ' + __VLS_ctx.intersectionYear : '—'),
}, ...__VLS_functionalComponentArgsRest(__VLS_31));
const __VLS_35 = KpiCard;
// @ts-ignore
const __VLS_36 = __VLS_asFunctionalComponent1(__VLS_35, new __VLS_35({
    title: "Freedom Progress",
    value: (__VLS_ctx.freedomPercent + '%'),
}));
const __VLS_37 = __VLS_36({
    title: "Freedom Progress",
    value: (__VLS_ctx.freedomPercent + '%'),
}, ...__VLS_functionalComponentArgsRest(__VLS_36));
const __VLS_40 = KpiCard;
// @ts-ignore
const __VLS_41 = __VLS_asFunctionalComponent1(__VLS_40, new __VLS_40({
    title: "TFSA Annual Remaining",
    value: (__VLS_ctx.formatCurrency(__VLS_ctx.tfsaAnnualRemaining)),
}));
const __VLS_42 = __VLS_41({
    title: "TFSA Annual Remaining",
    value: (__VLS_ctx.formatCurrency(__VLS_ctx.tfsaAnnualRemaining)),
}, ...__VLS_functionalComponentArgsRest(__VLS_41));
const __VLS_45 = KpiCard;
// @ts-ignore
const __VLS_46 = __VLS_asFunctionalComponent1(__VLS_45, new __VLS_45({
    title: "TFSA Lifetime Remaining",
    value: (__VLS_ctx.formatCurrency(__VLS_ctx.tfsaLifetimeRemaining)),
}));
const __VLS_47 = __VLS_46({
    title: "TFSA Lifetime Remaining",
    value: (__VLS_ctx.formatCurrency(__VLS_ctx.tfsaLifetimeRemaining)),
}, ...__VLS_functionalComponentArgsRest(__VLS_46));
const __VLS_50 = KpiCard;
// @ts-ignore
const __VLS_51 = __VLS_asFunctionalComponent1(__VLS_50, new __VLS_50({
    title: "TFSA Lifetime Used",
    value: (__VLS_ctx.tfsaLifetimeProgress + '%'),
}));
const __VLS_52 = __VLS_51({
    title: "TFSA Lifetime Used",
    value: (__VLS_ctx.tfsaLifetimeProgress + '%'),
}, ...__VLS_functionalComponentArgsRest(__VLS_51));
__VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
    ...{ class: "text-xl font-semibold tracking-tight" },
});
/** @type {__VLS_StyleScopedClasses['text-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['tracking-tight']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "p-6 rounded-2xl shadow-md" },
    ...{ style: {} },
});
/** @type {__VLS_StyleScopedClasses['p-6']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-md']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
    ...{ class: "text-lg font-semibold mb-4" },
});
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
let __VLS_55;
/** @ts-ignore @type {typeof __VLS_components.Line} */
Line;
// @ts-ignore
const __VLS_56 = __VLS_asFunctionalComponent1(__VLS_55, new __VLS_55({
    data: (__VLS_ctx.combinedData),
    options: (__VLS_ctx.chartOptions),
}));
const __VLS_57 = __VLS_56({
    data: (__VLS_ctx.combinedData),
    options: (__VLS_ctx.chartOptions),
}, ...__VLS_functionalComponentArgsRest(__VLS_56));
// @ts-ignore
[formatCurrency, formatCurrency, formatCurrency, formatCurrency, formatCurrency, totalDebtValue, projection, yearsToFreedom, investmentData, investmentData, fireProgress, realSurplus, intersectionYear, intersectionYear, freedomPercent, tfsaAnnualRemaining, tfsaLifetimeRemaining, tfsaLifetimeProgress, combinedData, chartOptions,];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
