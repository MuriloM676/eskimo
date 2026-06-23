import { ref, onMounted } from 'vue';
import { StockService } from '@/services/StockService';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Tag from 'primevue/tag';
const movements = ref([]);
const loading = ref(false);
onMounted(async () => {
    loading.value = true;
    try {
        const result = await StockService.movements();
        movements.value = result.data;
    }
    finally {
        loading.value = false;
    }
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
    ...{ class: "mb-3" },
});
const __VLS_0 = {}.DataTable;
/** @type {[typeof __VLS_components.DataTable, typeof __VLS_components.DataTable, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    value: (__VLS_ctx.movements),
    loading: (__VLS_ctx.loading),
    paginator: true,
    rows: (20),
}));
const __VLS_2 = __VLS_1({
    value: (__VLS_ctx.movements),
    loading: (__VLS_ctx.loading),
    paginator: true,
    rows: (20),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_3.slots.default;
const __VLS_4 = {}.Column;
/** @type {[typeof __VLS_components.Column, typeof __VLS_components.Column, ]} */ ;
// @ts-ignore
const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
    field: "created_at",
    header: "Data",
}));
const __VLS_6 = __VLS_5({
    field: "created_at",
    header: "Data",
}, ...__VLS_functionalComponentArgsRest(__VLS_5));
__VLS_7.slots.default;
{
    const { body: __VLS_thisSlot } = __VLS_7.slots;
    const [{ data }] = __VLS_getSlotParams(__VLS_thisSlot);
    (new Date(data.created_at).toLocaleString('pt-BR'));
}
var __VLS_7;
const __VLS_8 = {}.Column;
/** @type {[typeof __VLS_components.Column, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
    field: "product.name",
    header: "Produto",
}));
const __VLS_10 = __VLS_9({
    field: "product.name",
    header: "Produto",
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
const __VLS_12 = {}.Column;
/** @type {[typeof __VLS_components.Column, typeof __VLS_components.Column, ]} */ ;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
    field: "type",
    header: "Tipo",
}));
const __VLS_14 = __VLS_13({
    field: "type",
    header: "Tipo",
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
__VLS_15.slots.default;
{
    const { body: __VLS_thisSlot } = __VLS_15.slots;
    const [{ data }] = __VLS_getSlotParams(__VLS_thisSlot);
    const __VLS_16 = {}.Tag;
    /** @type {[typeof __VLS_components.Tag, ]} */ ;
    // @ts-ignore
    const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
        value: (data.type),
        severity: (data.type === 'IN' ? 'success' : data.type === 'OUT' ? 'danger' : 'warn'),
    }));
    const __VLS_18 = __VLS_17({
        value: (data.type),
        severity: (data.type === 'IN' ? 'success' : data.type === 'OUT' ? 'danger' : 'warn'),
    }, ...__VLS_functionalComponentArgsRest(__VLS_17));
}
var __VLS_15;
const __VLS_20 = {}.Column;
/** @type {[typeof __VLS_components.Column, ]} */ ;
// @ts-ignore
const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
    field: "quantity",
    header: "Qtd",
}));
const __VLS_22 = __VLS_21({
    field: "quantity",
    header: "Qtd",
}, ...__VLS_functionalComponentArgsRest(__VLS_21));
const __VLS_24 = {}.Column;
/** @type {[typeof __VLS_components.Column, ]} */ ;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
    field: "previous_quantity",
    header: "Anterior",
}));
const __VLS_26 = __VLS_25({
    field: "previous_quantity",
    header: "Anterior",
}, ...__VLS_functionalComponentArgsRest(__VLS_25));
const __VLS_28 = {}.Column;
/** @type {[typeof __VLS_components.Column, ]} */ ;
// @ts-ignore
const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({
    field: "new_quantity",
    header: "Novo",
}));
const __VLS_30 = __VLS_29({
    field: "new_quantity",
    header: "Novo",
}, ...__VLS_functionalComponentArgsRest(__VLS_29));
const __VLS_32 = {}.Column;
/** @type {[typeof __VLS_components.Column, ]} */ ;
// @ts-ignore
const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({
    field: "reason",
    header: "Motivo",
}));
const __VLS_34 = __VLS_33({
    field: "reason",
    header: "Motivo",
}, ...__VLS_functionalComponentArgsRest(__VLS_33));
const __VLS_36 = {}.Column;
/** @type {[typeof __VLS_components.Column, ]} */ ;
// @ts-ignore
const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({
    field: "user.name",
    header: "Usuário",
}));
const __VLS_38 = __VLS_37({
    field: "user.name",
    header: "Usuário",
}, ...__VLS_functionalComponentArgsRest(__VLS_37));
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            DataTable: DataTable,
            Column: Column,
            Tag: Tag,
            movements: movements,
            loading: loading,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
