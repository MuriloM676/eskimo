import { ref, onMounted } from 'vue';
import { StockService } from '@/services/StockService';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Select from 'primevue/select';
import Tag from 'primevue/tag';
import { useToast } from 'primevue/usetoast';
const toast = useToast();
const products = ref([]);
const loading = ref(false);
const entryDialog = ref(false);
const entryProductId = ref(null);
const entryQuantity = ref(1);
const adjustDialog = ref(false);
const adjustProduct = ref(null);
const adjustType = ref('ADJUST');
const adjustQuantity = ref(1);
const adjustReason = ref('');
const adjustTypes = [
    { label: 'Ajuste (+/-)', value: 'ADJUST' },
    { label: 'Saída', value: 'OUT' },
    { label: 'Entrada', value: 'IN' },
];
function showEntryDialog() {
    entryDialog.value = true;
}
async function registerEntry() {
    await StockService.entry(entryProductId.value, entryQuantity.value);
    entryDialog.value = false;
    toast.add({ severity: 'success', summary: 'Entrada registrada', life: 2000 });
    await load();
}
function showAdjustDialog(product) {
    adjustProduct.value = product;
    adjustDialog.value = true;
}
async function applyAdjust() {
    await StockService.adjust(adjustProduct.value.id, adjustType.value, adjustQuantity.value, adjustReason.value);
    adjustDialog.value = false;
    toast.add({ severity: 'success', summary: 'Estoque ajustado', life: 2000 });
    await load();
}
async function load() {
    loading.value = true;
    try {
        const result = await StockService.list();
        products.value = result.data;
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
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "flex justify-content-between align-items-center mb-3" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "flex gap-2" },
});
const __VLS_0 = {}.Button;
/** @type {[typeof __VLS_components.Button, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ 'onClick': {} },
    label: "Movimentações",
    outlined: true,
}));
const __VLS_2 = __VLS_1({
    ...{ 'onClick': {} },
    label: "Movimentações",
    outlined: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_4;
let __VLS_5;
let __VLS_6;
const __VLS_7 = {
    onClick: (...[$event]) => {
        __VLS_ctx.$router.push('/stock/movements');
    }
};
var __VLS_3;
const __VLS_8 = {}.Button;
/** @type {[typeof __VLS_components.Button, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
    ...{ 'onClick': {} },
    label: "Entrada Manual",
    icon: "pi pi-plus",
}));
const __VLS_10 = __VLS_9({
    ...{ 'onClick': {} },
    label: "Entrada Manual",
    icon: "pi pi-plus",
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
let __VLS_12;
let __VLS_13;
let __VLS_14;
const __VLS_15 = {
    onClick: (__VLS_ctx.showEntryDialog)
};
var __VLS_11;
const __VLS_16 = {}.DataTable;
/** @type {[typeof __VLS_components.DataTable, typeof __VLS_components.DataTable, ]} */ ;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
    value: (__VLS_ctx.products),
    loading: (__VLS_ctx.loading),
    paginator: true,
    rows: (20),
}));
const __VLS_18 = __VLS_17({
    value: (__VLS_ctx.products),
    loading: (__VLS_ctx.loading),
    paginator: true,
    rows: (20),
}, ...__VLS_functionalComponentArgsRest(__VLS_17));
__VLS_19.slots.default;
const __VLS_20 = {}.Column;
/** @type {[typeof __VLS_components.Column, ]} */ ;
// @ts-ignore
const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
    field: "name",
    header: "Produto",
}));
const __VLS_22 = __VLS_21({
    field: "name",
    header: "Produto",
}, ...__VLS_functionalComponentArgsRest(__VLS_21));
const __VLS_24 = {}.Column;
/** @type {[typeof __VLS_components.Column, typeof __VLS_components.Column, ]} */ ;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
    field: "stock_quantity",
    header: "Estoque",
}));
const __VLS_26 = __VLS_25({
    field: "stock_quantity",
    header: "Estoque",
}, ...__VLS_functionalComponentArgsRest(__VLS_25));
__VLS_27.slots.default;
{
    const { body: __VLS_thisSlot } = __VLS_27.slots;
    const [{ data }] = __VLS_getSlotParams(__VLS_thisSlot);
    const __VLS_28 = {}.Tag;
    /** @type {[typeof __VLS_components.Tag, ]} */ ;
    // @ts-ignore
    const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({
        value: (data.stock_quantity),
        severity: (data.stock_quantity <= data.min_stock ? 'danger' : data.stock_quantity === 0 ? 'warn' : 'success'),
    }));
    const __VLS_30 = __VLS_29({
        value: (data.stock_quantity),
        severity: (data.stock_quantity <= data.min_stock ? 'danger' : data.stock_quantity === 0 ? 'warn' : 'success'),
    }, ...__VLS_functionalComponentArgsRest(__VLS_29));
}
var __VLS_27;
const __VLS_32 = {}.Column;
/** @type {[typeof __VLS_components.Column, ]} */ ;
// @ts-ignore
const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({
    field: "min_stock",
    header: "Mínimo",
}));
const __VLS_34 = __VLS_33({
    field: "min_stock",
    header: "Mínimo",
}, ...__VLS_functionalComponentArgsRest(__VLS_33));
const __VLS_36 = {}.Column;
/** @type {[typeof __VLS_components.Column, typeof __VLS_components.Column, ]} */ ;
// @ts-ignore
const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({
    header: "Status",
}));
const __VLS_38 = __VLS_37({
    header: "Status",
}, ...__VLS_functionalComponentArgsRest(__VLS_37));
__VLS_39.slots.default;
{
    const { body: __VLS_thisSlot } = __VLS_39.slots;
    const [{ data }] = __VLS_getSlotParams(__VLS_thisSlot);
    const __VLS_40 = {}.Tag;
    /** @type {[typeof __VLS_components.Tag, ]} */ ;
    // @ts-ignore
    const __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({
        value: (data.stock_quantity <= data.min_stock ? 'Baixo' : 'OK'),
        severity: (data.stock_quantity <= data.min_stock ? 'danger' : 'success'),
    }));
    const __VLS_42 = __VLS_41({
        value: (data.stock_quantity <= data.min_stock ? 'Baixo' : 'OK'),
        severity: (data.stock_quantity <= data.min_stock ? 'danger' : 'success'),
    }, ...__VLS_functionalComponentArgsRest(__VLS_41));
}
var __VLS_39;
const __VLS_44 = {}.Column;
/** @type {[typeof __VLS_components.Column, typeof __VLS_components.Column, ]} */ ;
// @ts-ignore
const __VLS_45 = __VLS_asFunctionalComponent(__VLS_44, new __VLS_44({
    header: "Ações",
    ...{ style: {} },
}));
const __VLS_46 = __VLS_45({
    header: "Ações",
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_45));
__VLS_47.slots.default;
{
    const { body: __VLS_thisSlot } = __VLS_47.slots;
    const [{ data }] = __VLS_getSlotParams(__VLS_thisSlot);
    const __VLS_48 = {}.Button;
    /** @type {[typeof __VLS_components.Button, ]} */ ;
    // @ts-ignore
    const __VLS_49 = __VLS_asFunctionalComponent(__VLS_48, new __VLS_48({
        ...{ 'onClick': {} },
        icon: "pi pi-pencil",
        text: true,
    }));
    const __VLS_50 = __VLS_49({
        ...{ 'onClick': {} },
        icon: "pi pi-pencil",
        text: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_49));
    let __VLS_52;
    let __VLS_53;
    let __VLS_54;
    const __VLS_55 = {
        onClick: (...[$event]) => {
            __VLS_ctx.showAdjustDialog(data);
        }
    };
    var __VLS_51;
}
var __VLS_47;
var __VLS_19;
const __VLS_56 = {}.Dialog;
/** @type {[typeof __VLS_components.Dialog, typeof __VLS_components.Dialog, ]} */ ;
// @ts-ignore
const __VLS_57 = __VLS_asFunctionalComponent(__VLS_56, new __VLS_56({
    visible: (__VLS_ctx.entryDialog),
    header: "Entrada de Estoque",
    modal: true,
    ...{ style: {} },
}));
const __VLS_58 = __VLS_57({
    visible: (__VLS_ctx.entryDialog),
    header: "Entrada de Estoque",
    modal: true,
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_57));
__VLS_59.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "field mb-2" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
const __VLS_60 = {}.Select;
/** @type {[typeof __VLS_components.Select, ]} */ ;
// @ts-ignore
const __VLS_61 = __VLS_asFunctionalComponent(__VLS_60, new __VLS_60({
    modelValue: (__VLS_ctx.entryProductId),
    options: (__VLS_ctx.products),
    optionLabel: "name",
    optionValue: "id",
    ...{ class: "w-full" },
}));
const __VLS_62 = __VLS_61({
    modelValue: (__VLS_ctx.entryProductId),
    options: (__VLS_ctx.products),
    optionLabel: "name",
    optionValue: "id",
    ...{ class: "w-full" },
}, ...__VLS_functionalComponentArgsRest(__VLS_61));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "field mb-2" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
const __VLS_64 = {}.InputNumber;
/** @type {[typeof __VLS_components.InputNumber, ]} */ ;
// @ts-ignore
const __VLS_65 = __VLS_asFunctionalComponent(__VLS_64, new __VLS_64({
    modelValue: (__VLS_ctx.entryQuantity),
    min: (1),
    ...{ class: "w-full" },
}));
const __VLS_66 = __VLS_65({
    modelValue: (__VLS_ctx.entryQuantity),
    min: (1),
    ...{ class: "w-full" },
}, ...__VLS_functionalComponentArgsRest(__VLS_65));
const __VLS_68 = {}.Button;
/** @type {[typeof __VLS_components.Button, ]} */ ;
// @ts-ignore
const __VLS_69 = __VLS_asFunctionalComponent(__VLS_68, new __VLS_68({
    ...{ 'onClick': {} },
    label: "Registrar Entrada",
    ...{ class: "w-full" },
}));
const __VLS_70 = __VLS_69({
    ...{ 'onClick': {} },
    label: "Registrar Entrada",
    ...{ class: "w-full" },
}, ...__VLS_functionalComponentArgsRest(__VLS_69));
let __VLS_72;
let __VLS_73;
let __VLS_74;
const __VLS_75 = {
    onClick: (__VLS_ctx.registerEntry)
};
var __VLS_71;
var __VLS_59;
const __VLS_76 = {}.Dialog;
/** @type {[typeof __VLS_components.Dialog, typeof __VLS_components.Dialog, ]} */ ;
// @ts-ignore
const __VLS_77 = __VLS_asFunctionalComponent(__VLS_76, new __VLS_76({
    visible: (__VLS_ctx.adjustDialog),
    header: "Ajustar Estoque",
    modal: true,
    ...{ style: {} },
}));
const __VLS_78 = __VLS_77({
    visible: (__VLS_ctx.adjustDialog),
    header: "Ajustar Estoque",
    modal: true,
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_77));
__VLS_79.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "field mb-2" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
const __VLS_80 = {}.Select;
/** @type {[typeof __VLS_components.Select, ]} */ ;
// @ts-ignore
const __VLS_81 = __VLS_asFunctionalComponent(__VLS_80, new __VLS_80({
    modelValue: (__VLS_ctx.adjustType),
    options: (__VLS_ctx.adjustTypes),
    optionLabel: "label",
    optionValue: "value",
    ...{ class: "w-full" },
}));
const __VLS_82 = __VLS_81({
    modelValue: (__VLS_ctx.adjustType),
    options: (__VLS_ctx.adjustTypes),
    optionLabel: "label",
    optionValue: "value",
    ...{ class: "w-full" },
}, ...__VLS_functionalComponentArgsRest(__VLS_81));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "field mb-2" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
const __VLS_84 = {}.InputNumber;
/** @type {[typeof __VLS_components.InputNumber, ]} */ ;
// @ts-ignore
const __VLS_85 = __VLS_asFunctionalComponent(__VLS_84, new __VLS_84({
    modelValue: (__VLS_ctx.adjustQuantity),
    min: (1),
    ...{ class: "w-full" },
}));
const __VLS_86 = __VLS_85({
    modelValue: (__VLS_ctx.adjustQuantity),
    min: (1),
    ...{ class: "w-full" },
}, ...__VLS_functionalComponentArgsRest(__VLS_85));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "field mb-2" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
const __VLS_88 = {}.InputText;
/** @type {[typeof __VLS_components.InputText, ]} */ ;
// @ts-ignore
const __VLS_89 = __VLS_asFunctionalComponent(__VLS_88, new __VLS_88({
    modelValue: (__VLS_ctx.adjustReason),
    ...{ class: "w-full" },
}));
const __VLS_90 = __VLS_89({
    modelValue: (__VLS_ctx.adjustReason),
    ...{ class: "w-full" },
}, ...__VLS_functionalComponentArgsRest(__VLS_89));
const __VLS_92 = {}.Button;
/** @type {[typeof __VLS_components.Button, ]} */ ;
// @ts-ignore
const __VLS_93 = __VLS_asFunctionalComponent(__VLS_92, new __VLS_92({
    ...{ 'onClick': {} },
    label: "Aplicar Ajuste",
    ...{ class: "w-full" },
}));
const __VLS_94 = __VLS_93({
    ...{ 'onClick': {} },
    label: "Aplicar Ajuste",
    ...{ class: "w-full" },
}, ...__VLS_functionalComponentArgsRest(__VLS_93));
let __VLS_96;
let __VLS_97;
let __VLS_98;
const __VLS_99 = {
    onClick: (__VLS_ctx.applyAdjust)
};
var __VLS_95;
var __VLS_79;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-content-between']} */ ;
/** @type {__VLS_StyleScopedClasses['align-items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['field']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['field']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['field']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['field']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['field']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            DataTable: DataTable,
            Column: Column,
            Button: Button,
            Dialog: Dialog,
            InputText: InputText,
            InputNumber: InputNumber,
            Select: Select,
            Tag: Tag,
            products: products,
            loading: loading,
            entryDialog: entryDialog,
            entryProductId: entryProductId,
            entryQuantity: entryQuantity,
            adjustDialog: adjustDialog,
            adjustType: adjustType,
            adjustQuantity: adjustQuantity,
            adjustReason: adjustReason,
            adjustTypes: adjustTypes,
            showEntryDialog: showEntryDialog,
            registerEntry: registerEntry,
            showAdjustDialog: showAdjustDialog,
            applyAdjust: applyAdjust,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
