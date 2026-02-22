import { useRoute } from "vue-router";
import { useDebtStore } from "./debt.store";
import { generateAmortization } from "./debt.projection";
import { Line } from "vue-chartjs";
import { Chart, registerables } from "chart.js";
import { computed } from "vue";
Chart.register(...registerables);
const route = useRoute();
const store = useDebtStore();
const debt = computed(() => store.debts.find(d => d.id === route.params.id));
const schedule = computed(() => debt.value ? generateAmortization(debt.value) : []);
const chartData = computed(() => ({
    labels: schedule.value.map(r => r.month),
    datasets: [
        {
            label: "Balance Decline",
            data: schedule.value.map(r => r.endingBalance),
            borderColor: "#ef4444",
            tension: 0.3,
        },
    ],
}));
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
if (__VLS_ctx.debt) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "p-6 space-y-6" },
    });
    /** @type {__VLS_StyleScopedClasses['p-6']} */ ;
    /** @type {__VLS_StyleScopedClasses['space-y-6']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
        ...{ class: "text-xl font-bold" },
    });
    /** @type {__VLS_StyleScopedClasses['text-xl']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
    (__VLS_ctx.debt.name);
    let __VLS_0;
    /** @ts-ignore @type {typeof __VLS_components.Line} */
    Line;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
        data: (__VLS_ctx.chartData),
    }));
    const __VLS_2 = __VLS_1({
        data: (__VLS_ctx.chartData),
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "overflow-auto max-h-80" },
    });
    /** @type {__VLS_StyleScopedClasses['overflow-auto']} */ ;
    /** @type {__VLS_StyleScopedClasses['max-h-80']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.table, __VLS_intrinsics.table)({
        ...{ class: "w-full text-sm" },
    });
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.thead, __VLS_intrinsics.thead)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.tr, __VLS_intrinsics.tr)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.th, __VLS_intrinsics.th)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.th, __VLS_intrinsics.th)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.th, __VLS_intrinsics.th)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.th, __VLS_intrinsics.th)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.th, __VLS_intrinsics.th)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.tbody, __VLS_intrinsics.tbody)({});
    for (const [row] of __VLS_vFor((__VLS_ctx.schedule))) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.tr, __VLS_intrinsics.tr)({
            key: (row.month),
        });
        __VLS_asFunctionalElement1(__VLS_intrinsics.td, __VLS_intrinsics.td)({});
        (row.month);
        __VLS_asFunctionalElement1(__VLS_intrinsics.td, __VLS_intrinsics.td)({});
        (row.startingBalance.toFixed(0));
        __VLS_asFunctionalElement1(__VLS_intrinsics.td, __VLS_intrinsics.td)({});
        (row.interest.toFixed(0));
        __VLS_asFunctionalElement1(__VLS_intrinsics.td, __VLS_intrinsics.td)({});
        (row.payment.toFixed(0));
        __VLS_asFunctionalElement1(__VLS_intrinsics.td, __VLS_intrinsics.td)({});
        (row.endingBalance.toFixed(0));
        // @ts-ignore
        [debt, debt, chartData, schedule,];
    }
}
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
