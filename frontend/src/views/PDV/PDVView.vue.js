import { ref, computed, onMounted, watch } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useSaleStore } from '@/stores/sale';
import { ProductService } from '@/services/ProductService';
import { CashRegisterService } from '@/services/CashRegisterService';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Select from 'primevue/select';
import Dialog from 'primevue/dialog';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
const auth = useAuthStore();
const saleStore = useSaleStore();
const barcodeInput = ref(null);
const register = ref(null);
const barcode = ref('');
const selectedItem = ref(null);
const searchVisible = ref(false);
const searchTerm = ref('');
const searchResults = ref([]);
const discountVisible = ref(false);
const discountValue = ref(0);
const paymentVisible = ref(false);
const paymentMethods = ref([{ method: 'cash', amount: 0 }]);
const paymentOptions = [
    { label: 'Dinheiro', value: 'cash' },
    { label: 'PIX', value: 'pix' },
    { label: 'Débito', value: 'debit' },
    { label: 'Crédito', value: 'credit' },
];
const canPay = computed(() => {
    const totalPaid = paymentMethods.value.reduce((s, pm) => s + (pm.amount || 0), 0);
    return totalPaid >= (saleStore.total / 100);
});
const changeAmount = computed(() => {
    const cashPayment = paymentMethods.value.find(pm => pm.method === 'cash');
    if (!cashPayment)
        return 0;
    const totalPaid = paymentMethods.value.reduce((s, pm) => s + (pm.amount || 0), 0) * 100;
    if (totalPaid > saleStore.total) {
        return totalPaid - saleStore.total;
    }
    return 0;
});
function focusInput() {
    setTimeout(() => barcodeInput.value?.focus(), 100);
}
async function handleBarcode() {
    if (!barcode.value.trim())
        return;
    const code = barcode.value.trim();
    barcode.value = '';
    await saleStore.addItem(code);
    selectedItem.value = null;
}
async function openSearch() {
    searchTerm.value = '';
    searchResults.value = [];
    searchVisible.value = true;
}
watch(searchTerm, async (term) => {
    if (term.length >= 2) {
        searchResults.value = await ProductService.search(term);
    }
});
function selectFromSearch() {
    if (searchResults.value.length > 0) {
        selectProduct(searchResults.value[0]);
    }
}
async function selectProduct(product) {
    searchVisible.value = false;
    await saleStore.addItem(String(product.barcode || product.id));
}
function openDiscount() {
    discountValue.value = 0;
    discountVisible.value = true;
}
async function applyDiscount() {
    await saleStore.applyDiscount(Math.round(discountValue.value * 100));
    discountVisible.value = false;
}
function openPayment() {
    paymentMethods.value = [{ method: 'cash', amount: saleStore.total / 100 }];
    paymentVisible.value = true;
}
function addPaymentMethod() {
    if (paymentMethods.value.length < 4) {
        paymentMethods.value.push({ method: 'pix', amount: 0 });
    }
}
async function confirmPayment() {
    const methods = paymentMethods.value.map(pm => ({
        method: pm.method,
        amount: pm.amount || 0,
    }));
    await saleStore.pay(methods);
    paymentVisible.value = false;
}
async function cancelSale() {
    await saleStore.cancel('Cancelado pelo operador');
}
onMounted(async () => {
    try {
        register.value = await CashRegisterService.current();
    }
    catch { }
    await saleStore.start();
    focusInput();
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ onClick: (__VLS_ctx.focusInput) },
    ...{ class: "pdv-container" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "pdv-header" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "pdv-info" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
(__VLS_ctx.auth.user?.name);
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
(__VLS_ctx.register?.id ? '#' + __VLS_ctx.register.id : 'Fechado');
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "pdv-content" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "pdv-items" },
});
if (__VLS_ctx.saleStore.items.length > 0) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.table, __VLS_intrinsicElements.table)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.thead, __VLS_intrinsicElements.thead)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
        ...{ style: {} },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
        ...{ style: {} },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
        ...{ style: {} },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
        ...{ style: {} },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.tbody, __VLS_intrinsicElements.tbody)({});
    for (const [item] of __VLS_getVForSourceType((__VLS_ctx.saleStore.items))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({
            ...{ onClick: (...[$event]) => {
                    if (!(__VLS_ctx.saleStore.items.length > 0))
                        return;
                    __VLS_ctx.selectedItem = item.id;
                } },
            key: (item.id),
            ...{ class: "item-row" },
            ...{ class: ({ selected: __VLS_ctx.selectedItem === item.id }) },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
        (item.product_name_snapshot);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
        (item.quantity);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
        (__VLS_ctx.saleStore.formatPrice(item.unit_price));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
        (__VLS_ctx.saleStore.formatPrice(item.total_price));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
        if (__VLS_ctx.auth.hasPermission('sale.cancel')) {
            const __VLS_0 = {}.Button;
            /** @type {[typeof __VLS_components.Button, ]} */ ;
            // @ts-ignore
            const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
                ...{ 'onClick': {} },
                icon: "pi pi-trash",
                text: true,
                severity: "danger",
                size: "small",
            }));
            const __VLS_2 = __VLS_1({
                ...{ 'onClick': {} },
                icon: "pi pi-trash",
                text: true,
                severity: "danger",
                size: "small",
            }, ...__VLS_functionalComponentArgsRest(__VLS_1));
            let __VLS_4;
            let __VLS_5;
            let __VLS_6;
            const __VLS_7 = {
                onClick: (...[$event]) => {
                    if (!(__VLS_ctx.saleStore.items.length > 0))
                        return;
                    if (!(__VLS_ctx.auth.hasPermission('sale.cancel')))
                        return;
                    __VLS_ctx.saleStore.removeItem(item.id);
                }
            };
            var __VLS_3;
        }
    }
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "flex flex-column align-items-center justify-content-center h-full text-gray-400" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)({
        ...{ class: "pi pi-cart-plus" },
        ...{ style: {} },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: "mt-2" },
    });
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "pdv-total-bar" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "total-label" },
});
if (__VLS_ctx.saleStore.discount > 0) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "total-label" },
    });
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "total-label" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ style: {} },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
(__VLS_ctx.saleStore.formatPrice(__VLS_ctx.saleStore.subtotal));
if (__VLS_ctx.saleStore.discount > 0) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    (__VLS_ctx.saleStore.formatPrice(__VLS_ctx.saleStore.discount));
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "total-value" },
});
(__VLS_ctx.saleStore.formatPrice(__VLS_ctx.saleStore.total));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "pdv-input-bar" },
});
const __VLS_8 = {}.InputText;
/** @type {[typeof __VLS_components.InputText, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
    ...{ 'onKeydown': {} },
    ref: "barcodeInput",
    modelValue: (__VLS_ctx.barcode),
    placeholder: "Código de barras...",
    ...{ class: "w-full" },
    autofocus: true,
}));
const __VLS_10 = __VLS_9({
    ...{ 'onKeydown': {} },
    ref: "barcodeInput",
    modelValue: (__VLS_ctx.barcode),
    placeholder: "Código de barras...",
    ...{ class: "w-full" },
    autofocus: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
let __VLS_12;
let __VLS_13;
let __VLS_14;
const __VLS_15 = {
    onKeydown: (__VLS_ctx.handleBarcode)
};
/** @type {typeof __VLS_ctx.barcodeInput} */ ;
var __VLS_16 = {};
var __VLS_11;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "pdv-actions" },
});
const __VLS_18 = {}.Button;
/** @type {[typeof __VLS_components.Button, ]} */ ;
// @ts-ignore
const __VLS_19 = __VLS_asFunctionalComponent(__VLS_18, new __VLS_18({
    ...{ 'onClick': {} },
    label: "F2 - Buscar",
    icon: "pi pi-search",
    outlined: true,
}));
const __VLS_20 = __VLS_19({
    ...{ 'onClick': {} },
    label: "F2 - Buscar",
    icon: "pi pi-search",
    outlined: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_19));
let __VLS_22;
let __VLS_23;
let __VLS_24;
const __VLS_25 = {
    onClick: (__VLS_ctx.openSearch)
};
var __VLS_21;
if (__VLS_ctx.auth.hasPermission('sale.cancel')) {
    const __VLS_26 = {}.Button;
    /** @type {[typeof __VLS_components.Button, ]} */ ;
    // @ts-ignore
    const __VLS_27 = __VLS_asFunctionalComponent(__VLS_26, new __VLS_26({
        ...{ 'onClick': {} },
        label: "F3 - Desconto",
        icon: "pi pi-percentage",
        outlined: true,
        disabled: (!__VLS_ctx.saleStore.isOpen),
    }));
    const __VLS_28 = __VLS_27({
        ...{ 'onClick': {} },
        label: "F3 - Desconto",
        icon: "pi pi-percentage",
        outlined: true,
        disabled: (!__VLS_ctx.saleStore.isOpen),
    }, ...__VLS_functionalComponentArgsRest(__VLS_27));
    let __VLS_30;
    let __VLS_31;
    let __VLS_32;
    const __VLS_33 = {
        onClick: (__VLS_ctx.openDiscount)
    };
    var __VLS_29;
}
const __VLS_34 = {}.Button;
/** @type {[typeof __VLS_components.Button, ]} */ ;
// @ts-ignore
const __VLS_35 = __VLS_asFunctionalComponent(__VLS_34, new __VLS_34({
    ...{ 'onClick': {} },
    label: "F4 - Pagamento",
    icon: "pi pi-credit-card",
    disabled: (!__VLS_ctx.saleStore.isOpen || __VLS_ctx.saleStore.items.length === 0),
    severity: "success",
}));
const __VLS_36 = __VLS_35({
    ...{ 'onClick': {} },
    label: "F4 - Pagamento",
    icon: "pi pi-credit-card",
    disabled: (!__VLS_ctx.saleStore.isOpen || __VLS_ctx.saleStore.items.length === 0),
    severity: "success",
}, ...__VLS_functionalComponentArgsRest(__VLS_35));
let __VLS_38;
let __VLS_39;
let __VLS_40;
const __VLS_41 = {
    onClick: (__VLS_ctx.openPayment)
};
var __VLS_37;
const __VLS_42 = {}.Button;
/** @type {[typeof __VLS_components.Button, ]} */ ;
// @ts-ignore
const __VLS_43 = __VLS_asFunctionalComponent(__VLS_42, new __VLS_42({
    ...{ 'onClick': {} },
    label: "F9 - Finalizar",
    icon: "pi pi-check",
    disabled: (!__VLS_ctx.saleStore.isOpen || __VLS_ctx.saleStore.items.length === 0),
    severity: "info",
}));
const __VLS_44 = __VLS_43({
    ...{ 'onClick': {} },
    label: "F9 - Finalizar",
    icon: "pi pi-check",
    disabled: (!__VLS_ctx.saleStore.isOpen || __VLS_ctx.saleStore.items.length === 0),
    severity: "info",
}, ...__VLS_functionalComponentArgsRest(__VLS_43));
let __VLS_46;
let __VLS_47;
let __VLS_48;
const __VLS_49 = {
    onClick: (__VLS_ctx.openPayment)
};
var __VLS_45;
const __VLS_50 = {}.Button;
/** @type {[typeof __VLS_components.Button, ]} */ ;
// @ts-ignore
const __VLS_51 = __VLS_asFunctionalComponent(__VLS_50, new __VLS_50({
    ...{ 'onClick': {} },
    label: "ESC - Cancelar",
    icon: "pi pi-times",
    outlined: true,
    severity: "danger",
    disabled: (!__VLS_ctx.saleStore.isOpen),
}));
const __VLS_52 = __VLS_51({
    ...{ 'onClick': {} },
    label: "ESC - Cancelar",
    icon: "pi pi-times",
    outlined: true,
    severity: "danger",
    disabled: (!__VLS_ctx.saleStore.isOpen),
}, ...__VLS_functionalComponentArgsRest(__VLS_51));
let __VLS_54;
let __VLS_55;
let __VLS_56;
const __VLS_57 = {
    onClick: (__VLS_ctx.cancelSale)
};
var __VLS_53;
const __VLS_58 = {}.Dialog;
/** @type {[typeof __VLS_components.Dialog, typeof __VLS_components.Dialog, ]} */ ;
// @ts-ignore
const __VLS_59 = __VLS_asFunctionalComponent(__VLS_58, new __VLS_58({
    ...{ 'onHide': {} },
    visible: (__VLS_ctx.searchVisible),
    header: "Buscar Produto",
    modal: true,
    ...{ style: {} },
}));
const __VLS_60 = __VLS_59({
    ...{ 'onHide': {} },
    visible: (__VLS_ctx.searchVisible),
    header: "Buscar Produto",
    modal: true,
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_59));
let __VLS_62;
let __VLS_63;
let __VLS_64;
const __VLS_65 = {
    onHide: (__VLS_ctx.focusInput)
};
__VLS_61.slots.default;
const __VLS_66 = {}.InputText;
/** @type {[typeof __VLS_components.InputText, ]} */ ;
// @ts-ignore
const __VLS_67 = __VLS_asFunctionalComponent(__VLS_66, new __VLS_66({
    ...{ 'onKeydown': {} },
    modelValue: (__VLS_ctx.searchTerm),
    placeholder: "Digite nome ou código...",
    ...{ class: "w-full mb-2" },
    autofocus: true,
}));
const __VLS_68 = __VLS_67({
    ...{ 'onKeydown': {} },
    modelValue: (__VLS_ctx.searchTerm),
    placeholder: "Digite nome ou código...",
    ...{ class: "w-full mb-2" },
    autofocus: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_67));
let __VLS_70;
let __VLS_71;
let __VLS_72;
const __VLS_73 = {
    onKeydown: (__VLS_ctx.selectFromSearch)
};
var __VLS_69;
const __VLS_74 = {}.DataTable;
/** @type {[typeof __VLS_components.DataTable, typeof __VLS_components.DataTable, ]} */ ;
// @ts-ignore
const __VLS_75 = __VLS_asFunctionalComponent(__VLS_74, new __VLS_74({
    ...{ 'onRowClick': {} },
    value: (__VLS_ctx.searchResults),
    selectionMode: "single",
    dataKey: "id",
}));
const __VLS_76 = __VLS_75({
    ...{ 'onRowClick': {} },
    value: (__VLS_ctx.searchResults),
    selectionMode: "single",
    dataKey: "id",
}, ...__VLS_functionalComponentArgsRest(__VLS_75));
let __VLS_78;
let __VLS_79;
let __VLS_80;
const __VLS_81 = {
    onRowClick: (__VLS_ctx.selectProduct)
};
__VLS_77.slots.default;
const __VLS_82 = {}.Column;
/** @type {[typeof __VLS_components.Column, ]} */ ;
// @ts-ignore
const __VLS_83 = __VLS_asFunctionalComponent(__VLS_82, new __VLS_82({
    field: "name",
    header: "Nome",
}));
const __VLS_84 = __VLS_83({
    field: "name",
    header: "Nome",
}, ...__VLS_functionalComponentArgsRest(__VLS_83));
const __VLS_86 = {}.Column;
/** @type {[typeof __VLS_components.Column, ]} */ ;
// @ts-ignore
const __VLS_87 = __VLS_asFunctionalComponent(__VLS_86, new __VLS_86({
    field: "barcode",
    header: "Código",
}));
const __VLS_88 = __VLS_87({
    field: "barcode",
    header: "Código",
}, ...__VLS_functionalComponentArgsRest(__VLS_87));
const __VLS_90 = {}.Column;
/** @type {[typeof __VLS_components.Column, typeof __VLS_components.Column, ]} */ ;
// @ts-ignore
const __VLS_91 = __VLS_asFunctionalComponent(__VLS_90, new __VLS_90({
    field: "price",
    header: "Preço",
}));
const __VLS_92 = __VLS_91({
    field: "price",
    header: "Preço",
}, ...__VLS_functionalComponentArgsRest(__VLS_91));
__VLS_93.slots.default;
{
    const { body: __VLS_thisSlot } = __VLS_93.slots;
    const [{ data }] = __VLS_getSlotParams(__VLS_thisSlot);
    ((data.price / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
}
var __VLS_93;
var __VLS_77;
var __VLS_61;
const __VLS_94 = {}.Dialog;
/** @type {[typeof __VLS_components.Dialog, typeof __VLS_components.Dialog, ]} */ ;
// @ts-ignore
const __VLS_95 = __VLS_asFunctionalComponent(__VLS_94, new __VLS_94({
    ...{ 'onHide': {} },
    visible: (__VLS_ctx.discountVisible),
    header: "Aplicar Desconto",
    modal: true,
    ...{ style: {} },
}));
const __VLS_96 = __VLS_95({
    ...{ 'onHide': {} },
    visible: (__VLS_ctx.discountVisible),
    header: "Aplicar Desconto",
    modal: true,
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_95));
let __VLS_98;
let __VLS_99;
let __VLS_100;
const __VLS_101 = {
    onHide: (__VLS_ctx.focusInput)
};
__VLS_97.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "field" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
const __VLS_102 = {}.InputNumber;
/** @type {[typeof __VLS_components.InputNumber, ]} */ ;
// @ts-ignore
const __VLS_103 = __VLS_asFunctionalComponent(__VLS_102, new __VLS_102({
    modelValue: (__VLS_ctx.discountValue),
    min: (0),
    max: (__VLS_ctx.saleStore.subtotal),
    ...{ class: "w-full" },
}));
const __VLS_104 = __VLS_103({
    modelValue: (__VLS_ctx.discountValue),
    min: (0),
    max: (__VLS_ctx.saleStore.subtotal),
    ...{ class: "w-full" },
}, ...__VLS_functionalComponentArgsRest(__VLS_103));
const __VLS_106 = {}.Button;
/** @type {[typeof __VLS_components.Button, ]} */ ;
// @ts-ignore
const __VLS_107 = __VLS_asFunctionalComponent(__VLS_106, new __VLS_106({
    ...{ 'onClick': {} },
    label: "Aplicar",
    ...{ class: "w-full" },
}));
const __VLS_108 = __VLS_107({
    ...{ 'onClick': {} },
    label: "Aplicar",
    ...{ class: "w-full" },
}, ...__VLS_functionalComponentArgsRest(__VLS_107));
let __VLS_110;
let __VLS_111;
let __VLS_112;
const __VLS_113 = {
    onClick: (__VLS_ctx.applyDiscount)
};
var __VLS_109;
var __VLS_97;
const __VLS_114 = {}.Dialog;
/** @type {[typeof __VLS_components.Dialog, typeof __VLS_components.Dialog, ]} */ ;
// @ts-ignore
const __VLS_115 = __VLS_asFunctionalComponent(__VLS_114, new __VLS_114({
    ...{ 'onHide': {} },
    visible: (__VLS_ctx.paymentVisible),
    header: "Finalizar Pagamento",
    modal: true,
    ...{ style: {} },
}));
const __VLS_116 = __VLS_115({
    ...{ 'onHide': {} },
    visible: (__VLS_ctx.paymentVisible),
    header: "Finalizar Pagamento",
    modal: true,
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_115));
let __VLS_118;
let __VLS_119;
let __VLS_120;
const __VLS_121 = {
    onHide: (__VLS_ctx.focusInput)
};
__VLS_117.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "mb-3" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
(__VLS_ctx.saleStore.formatPrice(__VLS_ctx.saleStore.total));
for (const [pm, i] of __VLS_getVForSourceType((__VLS_ctx.paymentMethods))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        key: (i),
        ...{ class: "flex gap-2 mb-2 align-items-center" },
    });
    const __VLS_122 = {}.Select;
    /** @type {[typeof __VLS_components.Select, ]} */ ;
    // @ts-ignore
    const __VLS_123 = __VLS_asFunctionalComponent(__VLS_122, new __VLS_122({
        modelValue: (pm.method),
        options: (__VLS_ctx.paymentOptions),
        optionLabel: "label",
        optionValue: "value",
        ...{ style: {} },
    }));
    const __VLS_124 = __VLS_123({
        modelValue: (pm.method),
        options: (__VLS_ctx.paymentOptions),
        optionLabel: "label",
        optionValue: "value",
        ...{ style: {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_123));
    const __VLS_126 = {}.InputNumber;
    /** @type {[typeof __VLS_components.InputNumber, ]} */ ;
    // @ts-ignore
    const __VLS_127 = __VLS_asFunctionalComponent(__VLS_126, new __VLS_126({
        modelValue: (pm.amount),
        min: (0),
        ...{ class: "flex-1" },
        placeholder: (`Valor ${pm.method}`),
    }));
    const __VLS_128 = __VLS_127({
        modelValue: (pm.amount),
        min: (0),
        ...{ class: "flex-1" },
        placeholder: (`Valor ${pm.method}`),
    }, ...__VLS_functionalComponentArgsRest(__VLS_127));
    if (__VLS_ctx.paymentMethods.length > 1) {
        const __VLS_130 = {}.Button;
        /** @type {[typeof __VLS_components.Button, ]} */ ;
        // @ts-ignore
        const __VLS_131 = __VLS_asFunctionalComponent(__VLS_130, new __VLS_130({
            ...{ 'onClick': {} },
            icon: "pi pi-times",
            text: true,
            severity: "danger",
        }));
        const __VLS_132 = __VLS_131({
            ...{ 'onClick': {} },
            icon: "pi pi-times",
            text: true,
            severity: "danger",
        }, ...__VLS_functionalComponentArgsRest(__VLS_131));
        let __VLS_134;
        let __VLS_135;
        let __VLS_136;
        const __VLS_137 = {
            onClick: (...[$event]) => {
                if (!(__VLS_ctx.paymentMethods.length > 1))
                    return;
                __VLS_ctx.paymentMethods.splice(i, 1);
            }
        };
        var __VLS_133;
    }
}
const __VLS_138 = {}.Button;
/** @type {[typeof __VLS_components.Button, ]} */ ;
// @ts-ignore
const __VLS_139 = __VLS_asFunctionalComponent(__VLS_138, new __VLS_138({
    ...{ 'onClick': {} },
    label: "+ Adicionar forma",
    text: true,
    ...{ class: "mb-2" },
}));
const __VLS_140 = __VLS_139({
    ...{ 'onClick': {} },
    label: "+ Adicionar forma",
    text: true,
    ...{ class: "mb-2" },
}, ...__VLS_functionalComponentArgsRest(__VLS_139));
let __VLS_142;
let __VLS_143;
let __VLS_144;
const __VLS_145 = {
    onClick: (__VLS_ctx.addPaymentMethod)
};
var __VLS_141;
if (__VLS_ctx.changeAmount > 0) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "text-green-600 font-bold mb-2" },
    });
    (__VLS_ctx.saleStore.formatPrice(__VLS_ctx.changeAmount));
}
const __VLS_146 = {}.Button;
/** @type {[typeof __VLS_components.Button, ]} */ ;
// @ts-ignore
const __VLS_147 = __VLS_asFunctionalComponent(__VLS_146, new __VLS_146({
    ...{ 'onClick': {} },
    label: "Confirmar Pagamento",
    ...{ class: "w-full" },
    severity: "success",
    disabled: (!__VLS_ctx.canPay),
}));
const __VLS_148 = __VLS_147({
    ...{ 'onClick': {} },
    label: "Confirmar Pagamento",
    ...{ class: "w-full" },
    severity: "success",
    disabled: (!__VLS_ctx.canPay),
}, ...__VLS_functionalComponentArgsRest(__VLS_147));
let __VLS_150;
let __VLS_151;
let __VLS_152;
const __VLS_153 = {
    onClick: (__VLS_ctx.confirmPayment)
};
var __VLS_149;
var __VLS_117;
/** @type {__VLS_StyleScopedClasses['pdv-container']} */ ;
/** @type {__VLS_StyleScopedClasses['pdv-header']} */ ;
/** @type {__VLS_StyleScopedClasses['pdv-info']} */ ;
/** @type {__VLS_StyleScopedClasses['pdv-content']} */ ;
/** @type {__VLS_StyleScopedClasses['pdv-items']} */ ;
/** @type {__VLS_StyleScopedClasses['item-row']} */ ;
/** @type {__VLS_StyleScopedClasses['selected']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-column']} */ ;
/** @type {__VLS_StyleScopedClasses['align-items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-content-center']} */ ;
/** @type {__VLS_StyleScopedClasses['h-full']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-400']} */ ;
/** @type {__VLS_StyleScopedClasses['pi']} */ ;
/** @type {__VLS_StyleScopedClasses['pi-cart-plus']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['pdv-total-bar']} */ ;
/** @type {__VLS_StyleScopedClasses['total-label']} */ ;
/** @type {__VLS_StyleScopedClasses['total-label']} */ ;
/** @type {__VLS_StyleScopedClasses['total-label']} */ ;
/** @type {__VLS_StyleScopedClasses['total-value']} */ ;
/** @type {__VLS_StyleScopedClasses['pdv-input-bar']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['pdv-actions']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['field']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['align-items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-green-600']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
// @ts-ignore
var __VLS_17 = __VLS_16;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            Button: Button,
            InputText: InputText,
            InputNumber: InputNumber,
            Select: Select,
            Dialog: Dialog,
            DataTable: DataTable,
            Column: Column,
            auth: auth,
            saleStore: saleStore,
            barcodeInput: barcodeInput,
            register: register,
            barcode: barcode,
            selectedItem: selectedItem,
            searchVisible: searchVisible,
            searchTerm: searchTerm,
            searchResults: searchResults,
            discountVisible: discountVisible,
            discountValue: discountValue,
            paymentVisible: paymentVisible,
            paymentMethods: paymentMethods,
            paymentOptions: paymentOptions,
            canPay: canPay,
            changeAmount: changeAmount,
            focusInput: focusInput,
            handleBarcode: handleBarcode,
            openSearch: openSearch,
            selectFromSearch: selectFromSearch,
            selectProduct: selectProduct,
            openDiscount: openDiscount,
            applyDiscount: applyDiscount,
            openPayment: openPayment,
            addPaymentMethod: addPaymentMethod,
            confirmPayment: confirmPayment,
            cancelSale: cancelSale,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
