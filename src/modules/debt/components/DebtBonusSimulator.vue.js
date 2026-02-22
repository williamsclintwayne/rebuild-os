import { ref } from "vue";
import { useDebtStore } from "../debt.store";
import { applyBonus } from "../debt.bonus";
const store = useDebtStore();
const bonus = ref(0);
const preview = ref([]);
function simulate() {
    preview.value = applyBonus(store.debts, bonus.value);
}
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "mt-8 p-6 rounded-2xl shadow-md" },
    ...{ style: {} },
});
/** @type {__VLS_StyleScopedClasses['mt-8']} */ ;
/** @type {__VLS_StyleScopedClasses['p-6']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-md']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
    ...{ class: "text-lg font-semibold mb-4" },
});
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.input)({
    type: "number",
    placeholder: "Enter Bonus Amount",
    ...{ class: "input mb-4" },
});
(__VLS_ctx.bonus);
/** @type {__VLS_StyleScopedClasses['input']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (__VLS_ctx.simulate) },
    ...{ class: "bg-primary text-white px-4 py-2 rounded" },
});
/** @type {__VLS_StyleScopedClasses['bg-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
if (__VLS_ctx.preview.length) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "mt-4 space-y-2" },
    });
    /** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['space-y-2']} */ ;
    for (const [d] of __VLS_vFor((__VLS_ctx.preview))) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            key: (d.id),
            ...{ class: "text-sm" },
        });
        /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
        (d.name);
        (d.currentBalance.toFixed(0));
        // @ts-ignore
        [bonus, simulate, preview, preview,];
    }
}
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
