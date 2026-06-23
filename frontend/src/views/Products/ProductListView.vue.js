import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { ProductService } from '@/services/ProductService';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import Tag from 'primevue/tag';
const auth = useAuthStore();
const products = ref([]);
const loading = ref(false);
const total = ref(0);
const filters = ref({ search: '' });
async function loadProducts(event) {
    loading.value = true;
    try {
        const result = await ProductService.list({
            page: event?.page || 1,
            search: filters.value.search,
        });
        products.value = result.data;
        total.value = result.meta?.total || 0;
    }
    finally {
        loading.value = false;
    }
}
onMounted(loadProducts);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "flex justify-content-between align-items-center mb-3" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
if (__VLS_ctx.auth.hasPermission('product.manage')) {
    const __VLS_0 = {}.Button;
    /** @type {[typeof __VLS_components.Button, ]} */ ;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        ...{ 'onClick': {} },
        label: "Novo Produto",
        icon: "pi pi-plus",
    }));
    const __VLS_2 = __VLS_1({
        ...{ 'onClick': {} },
        label: "Novo Produto",
        icon: "pi pi-plus",
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    let __VLS_4;
    let __VLS_5;
    let __VLS_6;
    const __VLS_7 = {
        onClick: (...[$event]) => {
            if (!(__VLS_ctx.auth.hasPermission('product.manage')))
                return;
            __VLS_ctx.$router.push('/products/new');
        }
    };
    var __VLS_3;
}
const __VLS_8 = {}.DataTable;
/** @type {[typeof __VLS_components.DataTable, typeof __VLS_components.DataTable, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
    ...{ 'onPage': {} },
    value: (__VLS_ctx.products),
    loading: (__VLS_ctx.loading),
    paginator: true,
    rows: (20),
    totalRecords: (__VLS_ctx.total),
    filters: (__VLS_ctx.filters),
}));
const __VLS_10 = __VLS_9({
    ...{ 'onPage': {} },
    value: (__VLS_ctx.products),
    loading: (__VLS_ctx.loading),
    paginator: true,
    rows: (20),
    totalRecords: (__VLS_ctx.total),
    filters: (__VLS_ctx.filters),
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
let __VLS_12;
let __VLS_13;
let __VLS_14;
const __VLS_15 = {
    onPage: (__VLS_ctx.loadProducts)
};
__VLS_11.slots.default;
const __VLS_16 = {}.Column;
/** @type {[typeof __VLS_components.Column, ]} */ ;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
    field: "name",
    header: "Nome",
    sortable: true,
}));
const __VLS_18 = __VLS_17({
    field: "name",
    header: "Nome",
    sortable: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_17));
const __VLS_20 = {}.Column;
/** @type {[typeof __VLS_components.Column, ]} */ ;
// @ts-ignore
const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
    field: "barcode",
    header: "Cód. Barras",
}));
const __VLS_22 = __VLS_21({
    field: "barcode",
    header: "Cód. Barras",
}, ...__VLS_functionalComponentArgsRest(__VLS_21));
const __VLS_24 = {}.Column;
/** @type {[typeof __VLS_components.Column, typeof __VLS_components.Column, ]} */ ;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
    field: "price",
    header: "Preço",
}));
const __VLS_26 = __VLS_25({
    field: "price",
    header: "Preço",
}, ...__VLS_functionalComponentArgsRest(__VLS_25));
__VLS_27.slots.default;
{
    const { body: __VLS_thisSlot } = __VLS_27.slots;
    const [{ data }] = __VLS_getSlotParams(__VLS_thisSlot);
    ((data.price / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
}
var __VLS_27;
const __VLS_28 = {}.Column;
/** @type {[typeof __VLS_components.Column, ]} */ ;
// @ts-ignore
const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({
    field: "category.name",
    header: "Categoria",
}));
const __VLS_30 = __VLS_29({
    field: "category.name",
    header: "Categoria",
}, ...__VLS_functionalComponentArgsRest(__VLS_29));
const __VLS_32 = {}.Column;
/** @type {[typeof __VLS_components.Column, ]} */ ;
// @ts-ignore
const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({
    field: "stock_quantity",
    header: "Estoque",
}));
const __VLS_34 = __VLS_33({
    field: "stock_quantity",
    header: "Estoque",
}, ...__VLS_functionalComponentArgsRest(__VLS_33));
const __VLS_36 = {}.Column;
/** @type {[typeof __VLS_components.Column, typeof __VLS_components.Column, ]} */ ;
// @ts-ignore
const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({
    field: "active",
    header: "Ativo",
}));
const __VLS_38 = __VLS_37({
    field: "active",
    header: "Ativo",
}, ...__VLS_functionalComponentArgsRest(__VLS_37));
__VLS_39.slots.default;
{
    const { body: __VLS_thisSlot } = __VLS_39.slots;
    const [{ data }] = __VLS_getSlotParams(__VLS_thisSlot);
    const __VLS_40 = {}.Tag;
    /** @type {[typeof __VLS_components.Tag, ]} */ ;
    // @ts-ignore
    const __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({
        value: (data.active ? 'Sim' : 'Não'),
        severity: (data.active ? 'success' : 'danger'),
    }));
    const __VLS_42 = __VLS_41({
        value: (data.active ? 'Sim' : 'Não'),
        severity: (data.active ? 'success' : 'danger'),
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
    if (__VLS_ctx.auth.hasPermission('product.manage')) {
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
                if (!(__VLS_ctx.auth.hasPermission('product.manage')))
                    return;
                __VLS_ctx.$router.push(`/products/${data.id}/edit`);
            }
        };
        var __VLS_51;
    }
}
var __VLS_47;
var __VLS_11;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-content-between']} */ ;
/** @type {__VLS_StyleScopedClasses['align-items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            DataTable: DataTable,
            Column: Column,
            Button: Button,
            Tag: Tag,
            auth: auth,
            products: products,
            loading: loading,
            total: total,
            filters: filters,
            loadProducts: loadProducts,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
