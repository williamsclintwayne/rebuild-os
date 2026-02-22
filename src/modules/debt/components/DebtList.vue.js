import { ref, onMounted } from "vue";
import { useDebtStore } from "../debt.store";
import { calculateProgress } from "../debt.calculations";
import { estimateDebtPayoffMonths } from "../debt.projection";
const store = useDebtStore();
const editingId = ref(null);
const editedDebt = ref(null);
onMounted(() => {
    store.load();
});
function startEdit(debt) {
    editingId.value = debt.id;
    editedDebt.value = { ...debt };
}
function saveEdit() {
    if (editedDebt.value) {
        store.updateDebt(editedDebt.value);
        editingId.value = null;
        editedDebt.value = null;
    }
}
function cancelEdit() {
    editingId.value = null;
    editedDebt.value = null;
}
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "mt-6 space-y-4" },
});
/** @type {__VLS_StyleScopedClasses['mt-6']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-4']} */ ;
if (__VLS_ctx.store.debts.length === 0) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "opacity-50" },
    });
    /** @type {__VLS_StyleScopedClasses['opacity-50']} */ ;
}
for (const [debt] of __VLS_vFor((__VLS_ctx.store.orderedDebts))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        key: (debt.id),
        ...{ class: "p-4 rounded-2xl shadow-md" },
        ...{ style: {} },
    });
    /** @type {__VLS_StyleScopedClasses['p-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-2xl']} */ ;
    /** @type {__VLS_StyleScopedClasses['shadow-md']} */ ;
    if (__VLS_ctx.editingId === debt.id) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "space-y-3" },
        });
        /** @type {__VLS_StyleScopedClasses['space-y-3']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.input)({
            ...{ class: "input" },
        });
        (__VLS_ctx.editedDebt.name);
        /** @type {__VLS_StyleScopedClasses['input']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.input)({
            type: "number",
            ...{ class: "input" },
        });
        (__VLS_ctx.editedDebt.startingBalance);
        /** @type {__VLS_StyleScopedClasses['input']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.input)({
            type: "number",
            ...{ class: "input" },
        });
        (__VLS_ctx.editedDebt.currentBalance);
        /** @type {__VLS_StyleScopedClasses['input']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.input)({
            type: "number",
            ...{ class: "input" },
        });
        (__VLS_ctx.editedDebt.interestRate);
        /** @type {__VLS_StyleScopedClasses['input']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.input)({
            type: "number",
            ...{ class: "input" },
        });
        (__VLS_ctx.editedDebt.monthlyPayment);
        /** @type {__VLS_StyleScopedClasses['input']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "flex gap-2" },
        });
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
            ...{ onClick: (__VLS_ctx.saveEdit) },
            ...{ class: "bg-green-600 text-white px-3 py-1 rounded" },
        });
        /** @type {__VLS_StyleScopedClasses['bg-green-600']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-white']} */ ;
        /** @type {__VLS_StyleScopedClasses['px-3']} */ ;
        /** @type {__VLS_StyleScopedClasses['py-1']} */ ;
        /** @type {__VLS_StyleScopedClasses['rounded']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
            ...{ onClick: (__VLS_ctx.cancelEdit) },
            ...{ class: "bg-gray-500 text-white px-3 py-1 rounded" },
        });
        /** @type {__VLS_StyleScopedClasses['bg-gray-500']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-white']} */ ;
        /** @type {__VLS_StyleScopedClasses['px-3']} */ ;
        /** @type {__VLS_StyleScopedClasses['py-1']} */ ;
        /** @type {__VLS_StyleScopedClasses['rounded']} */ ;
    }
    else {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "flex justify-between items-center" },
        });
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
        /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({
            ...{ class: "font-semibold" },
        });
        /** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
        let __VLS_0;
        /** @ts-ignore @type {typeof __VLS_components.routerLink | typeof __VLS_components.RouterLink | typeof __VLS_components.routerLink | typeof __VLS_components.RouterLink} */
        routerLink;
        // @ts-ignore
        const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
            to: ('/debts/' + debt.id),
            ...{ class: "font-semibold hover:underline" },
        }));
        const __VLS_2 = __VLS_1({
            to: ('/debts/' + debt.id),
            ...{ class: "font-semibold hover:underline" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_1));
        /** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
        /** @type {__VLS_StyleScopedClasses['hover:underline']} */ ;
        const { default: __VLS_5 } = __VLS_3.slots;
        (debt.name);
        // @ts-ignore
        [store, store, editingId, editedDebt, editedDebt, editedDebt, editedDebt, editedDebt, saveEdit, cancelEdit,];
        var __VLS_3;
        if (debt.currentBalance === 0) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                ...{ class: "ml-2 text-green-500 text-xs font-bold" },
            });
            /** @type {__VLS_StyleScopedClasses['ml-2']} */ ;
            /** @type {__VLS_StyleScopedClasses['text-green-500']} */ ;
            /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
            /** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
        }
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "flex gap-2" },
        });
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
            ...{ onClick: (...[$event]) => {
                    if (!!(__VLS_ctx.editingId === debt.id))
                        return;
                    __VLS_ctx.startEdit(debt);
                    // @ts-ignore
                    [startEdit,];
                } },
            ...{ class: "text-blue-500" },
        });
        /** @type {__VLS_StyleScopedClasses['text-blue-500']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
            ...{ onClick: (...[$event]) => {
                    if (!!(__VLS_ctx.editingId === debt.id))
                        return;
                    __VLS_ctx.store.deleteDebt(debt.id);
                    // @ts-ignore
                    [store,];
                } },
            ...{ class: "text-red-500" },
        });
        /** @type {__VLS_StyleScopedClasses['text-red-500']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
            ...{ class: "text-sm mt-2" },
        });
        /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
        /** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
        (debt.currentBalance.toLocaleString());
        __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
            ...{ class: "text-xs opacity-70 mt-1" },
        });
        /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
        /** @type {__VLS_StyleScopedClasses['opacity-70']} */ ;
        /** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
        ((__VLS_ctx.calculateProgress(debt) * 100).toFixed(1));
        __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
            ...{ class: "text-xs opacity-60 mt-1" },
        });
        /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
        /** @type {__VLS_StyleScopedClasses['opacity-60']} */ ;
        /** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
        (__VLS_ctx.estimateDebtPayoffMonths(debt));
        __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
            ...{ class: "text-xs opacity-60" },
        });
        /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
        /** @type {__VLS_StyleScopedClasses['opacity-60']} */ ;
        (((debt.currentBalance * debt.interestRate) / 100 / 12).toFixed(0));
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "mt-2 h-2 bg-gray-300 dark:bg-gray-600 rounded" },
        });
        /** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
        /** @type {__VLS_StyleScopedClasses['h-2']} */ ;
        /** @type {__VLS_StyleScopedClasses['bg-gray-300']} */ ;
        /** @type {__VLS_StyleScopedClasses['dark:bg-gray-600']} */ ;
        /** @type {__VLS_StyleScopedClasses['rounded']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "h-2 bg-primary rounded" },
            ...{ style: ({ width: (__VLS_ctx.calculateProgress(debt) * 100) + '%' }) },
        });
        /** @type {__VLS_StyleScopedClasses['h-2']} */ ;
        /** @type {__VLS_StyleScopedClasses['bg-primary']} */ ;
        /** @type {__VLS_StyleScopedClasses['rounded']} */ ;
    }
    // @ts-ignore
    [calculateProgress, calculateProgress, estimateDebtPayoffMonths,];
}
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
