import { computed, ref } from "vue";
import { useDebtStore } from "../debt.store";
import { useCashflowStore } from "@/modules/cashflow/cashflow.store";
import { simulateSnowball } from "../debt.projection";
import { compareInterest } from "../debt.projection";
const debtStore = useDebtStore();
const cashflowStore = useCashflowStore();
const manualExtra = ref(0);
const mode = ref("auto");
const totalDebtPayments = computed(() => debtStore.debts.reduce((sum, d) => sum + d.monthlyPayment, 0));
const surplus = computed(() => cashflowStore.salary -
    cashflowStore.fixedExpenses -
    totalDebtPayments.value);
const comparison = computed(() => compareInterest(debtStore.debts, Math.max(cashflowStore.salary -
    cashflowStore.fixedExpenses -
    totalDebtPayments.value, 0)));
const projection = computed(() => {
    const extra = mode.value === "auto"
        ? Math.max(surplus.value, 0)
        : manualExtra.value;
    return simulateSnowball(debtStore.debts, {
        extraPayment: extra,
        mode: mode.value,
    });
});
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "p-6 rounded-2xl shadow-md mt-6" },
    ...{ style: {} },
});
/** @type {__VLS_StyleScopedClasses['p-6']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-md']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-6']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
    ...{ class: "text-xl font-semibold mb-4" },
});
/** @type {__VLS_StyleScopedClasses['text-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "mb-4" },
});
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
    ...{ class: "mr-4" },
});
/** @type {__VLS_StyleScopedClasses['mr-4']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.input)({
    type: "radio",
    value: "auto",
});
(__VLS_ctx.mode);
__VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.input)({
    type: "radio",
    value: "manual",
});
(__VLS_ctx.mode);
if (__VLS_ctx.mode === 'manual') {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "mb-4" },
    });
    /** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.input)({
        type: "number",
        placeholder: "Extra Monthly Payment",
        ...{ class: "input" },
    });
    (__VLS_ctx.manualExtra);
    /** @type {__VLS_StyleScopedClasses['input']} */ ;
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "space-y-2" },
});
/** @type {__VLS_StyleScopedClasses['space-y-2']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
(__VLS_ctx.projection.months);
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
(__VLS_ctx.projection.totalInterestPaid.toFixed(2));
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
(__VLS_ctx.projection.payoffDate?.toDateString());
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
(__VLS_ctx.comparison.interestSaved.toFixed(0));
// @ts-ignore
[mode, mode, mode, manualExtra, projection, projection, projection, comparison,];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
