import { ref, onMounted } from 'vue';
import { ReportService } from '@/services/ReportService';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Tag from 'primevue/tag';
const sales = ref([]);
const loading = ref(false);
const dateFrom = ref('');
const dateTo = ref('');
function formatPrice(cents) {
    return (cents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}
async function load() {
    loading.value = true;
    try {
        const result = await ReportService.sales({ date_from: dateFrom.value, date_to: dateTo.value });
        sales.value = result.data;
    }
    finally {
        loading.value = false;
    }
}
onMounted(load);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
    ...{ class: "mb-3" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "flex gap-2 mb-3 align-items-center" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
const __VLS_0 = {}.InputText;
/** @type {[typeof __VLS_components.InputText, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    modelValue: (__VLS_ctx.dateFrom),
    type: "date",
}));
const __VLS_2 = __VLS_1({
    modelValue: (__VLS_ctx.dateFrom),
    type: "date",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
const __VLS_4 = {}.InputText;
/** @type {[typeof __VLS_components.InputText, ]} */ ;
// @ts-ignore
const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
    modelValue: (__VLS_ctx.dateTo),
    type: "date",
}));
const __VLS_6 = __VLS_5({
    modelValue: (__VLS_ctx.dateTo),
    type: "date",
}, ...__VLS_functionalComponentArgsRest(__VLS_5));
const __VLS_8 = {}.Button;
/** @type {[typeof __VLS_components.Button, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
    ...{ 'onClick': {} },
    label: "Filtrar",
}));
const __VLS_10 = __VLS_9({
    ...{ 'onClick': {} },
    label: "Filtrar",
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
let __VLS_12;
let __VLS_13;
let __VLS_14;
const __VLS_15 = {
    onClick: (__VLS_ctx.load)
};
var __VLS_11;
const __VLS_16 = {}.DataTable;
/** @type {[typeof __VLS_components.DataTable, typeof __VLS_components.DataTable, ]} */ ;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
    value: (__VLS_ctx.sales),
    loading: (__VLS_ctx.loading),
    paginator: true,
    rows: (20),
}));
const __VLS_18 = __VLS_17({
    value: (__VLS_ctx.sales),
    loading: (__VLS_ctx.loading),
    paginator: true,
    rows: (20),
}, ...__VLS_functionalComponentArgsRest(__VLS_17));
__VLS_19.slots.default;
const __VLS_20 = {}.Column;
/** @type {[typeof __VLS_components.Column, typeof __VLS_components.Column, ]} */ ;
// @ts-ignore
const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
    field: "created_at",
    header: "Data",
}));
const __VLS_22 = __VLS_21({
    field: "created_at",
    header: "Data",
}, ...__VLS_functionalComponentArgsRest(__VLS_21));
__VLS_23.slots.default;
{
    const { body: __VLS_thisSlot } = __VLS_23.slots;
    const [{ data }] = __VLS_getSlotParams(__VLS_thisSlot);
    (new Date(data.created_at).toLocaleString('pt-BR'));
}
var __VLS_23;
const __VLS_24 = {}.Column;
/** @type {[typeof __VLS_components.Column, typeof __VLS_components.Column, ]} */ ;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
    header: "N°",
}));
const __VLS_26 = __VLS_25({
    header: "N°",
}, ...__VLS_functionalComponentArgsRest(__VLS_25));
__VLS_27.slots.default;
{
    const { body: __VLS_thisSlot } = __VLS_27.slots;
    const [{ data }] = __VLS_getSlotParams(__VLS_thisSlot);
    (data.id);
}
var __VLS_27;
const __VLS_28 = {}.Column;
/** @type {[typeof __VLS_components.Column, ]} */ ;
// @ts-ignore
const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({
    field: "user.name",
    header: "Operador",
}));
const __VLS_30 = __VLS_29({
    field: "user.name",
    header: "Operador",
}, ...__VLS_functionalComponentArgsRest(__VLS_29));
const __VLS_32 = {}.Column;
/** @type {[typeof __VLS_components.Column, typeof __VLS_components.Column, ]} */ ;
// @ts-ignore
const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({
    field: "items",
    header: "Itens",
}));
const __VLS_34 = __VLS_33({
    field: "items",
    header: "Itens",
}, ...__VLS_functionalComponentArgsRest(__VLS_33));
__VLS_35.slots.default;
{
    const { body: __VLS_thisSlot } = __VLS_35.slots;
    const [{ data }] = __VLS_getSlotParams(__VLS_thisSlot);
    (data.items?.length || 0);
}
var __VLS_35;
const __VLS_36 = {}.Column;
/** @type {[typeof __VLS_components.Column, typeof __VLS_components.Column, ]} */ ;
// @ts-ignore
const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({
    field: "subtotal",
    header: "Subtotal",
}));
const __VLS_38 = __VLS_37({
    field: "subtotal",
    header: "Subtotal",
}, ...__VLS_functionalComponentArgsRest(__VLS_37));
__VLS_39.slots.default;
{
    const { body: __VLS_thisSlot } = __VLS_39.slots;
    const [{ data }] = __VLS_getSlotParams(__VLS_thisSlot);
    (__VLS_ctx.formatPrice(data.subtotal));
}
var __VLS_39;
const __VLS_40 = {}.Column;
/** @type {[typeof __VLS_components.Column, typeof __VLS_components.Column, ]} */ ;
// @ts-ignore
const __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({
    field: "discount",
    header: "Desconto",
}));
const __VLS_42 = __VLS_41({
    field: "discount",
    header: "Desconto",
}, ...__VLS_functionalComponentArgsRest(__VLS_41));
__VLS_43.slots.default;
{
    const { body: __VLS_thisSlot } = __VLS_43.slots;
    const [{ data }] = __VLS_getSlotParams(__VLS_thisSlot);
    (__VLS_ctx.formatPrice(data.discount));
}
var __VLS_43;
const __VLS_44 = {}.Column;
/** @type {[typeof __VLS_components.Column, typeof __VLS_components.Column, ]} */ ;
// @ts-ignore
const __VLS_45 = __VLS_asFunctionalComponent(__VLS_44, new __VLS_44({
    field: "total",
    header: "Total",
}));
const __VLS_46 = __VLS_45({
    field: "total",
    header: "Total",
}, ...__VLS_functionalComponentArgsRest(__VLS_45));
__VLS_47.slots.default;
{
    const { body: __VLS_thisSlot } = __VLS_47.slots;
    const [{ data }] = __VLS_getSlotParams(__VLS_thisSlot);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
    (__VLS_ctx.formatPrice(data.total));
}
var __VLS_47;
const __VLS_48 = {}.Column;
/** @type {[typeof __VLS_components.Column, typeof __VLS_components.Column, ]} */ ;
// @ts-ignore
const __VLS_49 = __VLS_asFunctionalComponent(__VLS_48, new __VLS_48({
    field: "status",
    header: "Status",
}));
const __VLS_50 = __VLS_49({
    field: "status",
    header: "Status",
}, ...__VLS_functionalComponentArgsRest(__VLS_49));
__VLS_51.slots.default;
{
    const { body: __VLS_thisSlot } = __VLS_51.slots;
    const [{ data }] = __VLS_getSlotParams(__VLS_thisSlot);
    const __VLS_52 = {}.Tag;
    /** @type {[typeof __VLS_components.Tag, ]} */ ;
    // @ts-ignore
    const __VLS_53 = __VLS_asFunctionalComponent(__VLS_52, new __VLS_52({
        value: (data.status),
        severity: (data.status === 'PAID' ? 'success' : 'danger'),
    }));
    const __VLS_54 = __VLS_53({
        value: (data.status),
        severity: (data.status === 'PAID' ? 'success' : 'danger'),
    }, ...__VLS_functionalComponentArgsRest(__VLS_53));
}
var __VLS_51;
var __VLS_19;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['align-items-center']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            DataTable: DataTable,
            Column: Column,
            Button: Button,
            InputText: InputText,
            Tag: Tag,
            sales: sales,
            loading: loading,
            dateFrom: dateFrom,
            dateTo: dateTo,
            formatPrice: formatPrice,
            load: load,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
