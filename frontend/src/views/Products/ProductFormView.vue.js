import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ProductService } from '@/services/ProductService';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Textarea from 'primevue/textarea';
import Select from 'primevue/select';
import ToggleSwitch from 'primevue/toggleswitch';
import { useToast } from 'primevue/usetoast';
const route = useRoute();
const router = useRouter();
const toast = useToast();
const categories = ref([]);
const editing = computed(() => !!route.params.id);
const form = ref({
    name: '',
    barcode: '',
    price: 0,
    cost_price: 0,
    category_id: null,
    stock_quantity: 0,
    min_stock: 0,
    description: '',
    active: true,
});
async function save() {
    try {
        const payload = {
            ...form.value,
            price: form.value.price,
            cost_price: form.value.cost_price || null,
        };
        if (editing.value) {
            await ProductService.update(Number(route.params.id), payload);
            toast.add({ severity: 'success', summary: 'Produto atualizado', life: 2000 });
        }
        else {
            await ProductService.create(payload);
            toast.add({ severity: 'success', summary: 'Produto criado', life: 2000 });
        }
        await router.push('/products');
    }
    catch (err) {
        toast.add({ severity: 'error', summary: 'Erro', detail: err.response?.data?.message || 'Erro ao salvar', life: 3000 });
    }
}
onMounted(async () => {
    categories.value = await ProductService.listCategories();
    if (editing.value) {
        const product = await ProductService.find(Number(route.params.id));
        form.value = {
            name: product.name,
            barcode: product.barcode,
            price: product.price / 100,
            cost_price: product.cost_price ? product.cost_price / 100 : 0,
            category_id: product.category_id,
            stock_quantity: product.stock_quantity,
            min_stock: product.min_stock,
            description: product.description || '',
            active: product.active,
        };
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
(__VLS_ctx.editing ? 'Editar Produto' : 'Novo Produto');
__VLS_asFunctionalElement(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)({
    ...{ onSubmit: (__VLS_ctx.save) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "grid" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "col-6 field" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
const __VLS_0 = {}.InputText;
/** @type {[typeof __VLS_components.InputText, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    modelValue: (__VLS_ctx.form.name),
    ...{ class: "w-full" },
    required: true,
}));
const __VLS_2 = __VLS_1({
    modelValue: (__VLS_ctx.form.name),
    ...{ class: "w-full" },
    required: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "col-3 field" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
const __VLS_4 = {}.InputNumber;
/** @type {[typeof __VLS_components.InputNumber, ]} */ ;
// @ts-ignore
const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
    modelValue: (__VLS_ctx.form.price),
    minFractionDigits: (2),
    maxFractionDigits: (2),
    ...{ class: "w-full" },
    required: true,
}));
const __VLS_6 = __VLS_5({
    modelValue: (__VLS_ctx.form.price),
    minFractionDigits: (2),
    maxFractionDigits: (2),
    ...{ class: "w-full" },
    required: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_5));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "col-3 field" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
const __VLS_8 = {}.InputNumber;
/** @type {[typeof __VLS_components.InputNumber, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
    modelValue: (__VLS_ctx.form.cost_price),
    minFractionDigits: (2),
    ...{ class: "w-full" },
}));
const __VLS_10 = __VLS_9({
    modelValue: (__VLS_ctx.form.cost_price),
    minFractionDigits: (2),
    ...{ class: "w-full" },
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "col-4 field" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
const __VLS_12 = {}.InputText;
/** @type {[typeof __VLS_components.InputText, ]} */ ;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
    modelValue: (__VLS_ctx.form.barcode),
    ...{ class: "w-full" },
}));
const __VLS_14 = __VLS_13({
    modelValue: (__VLS_ctx.form.barcode),
    ...{ class: "w-full" },
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "col-4 field" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
const __VLS_16 = {}.Select;
/** @type {[typeof __VLS_components.Select, ]} */ ;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
    modelValue: (__VLS_ctx.form.category_id),
    options: (__VLS_ctx.categories),
    optionLabel: "name",
    optionValue: "id",
    ...{ class: "w-full" },
    showClear: true,
}));
const __VLS_18 = __VLS_17({
    modelValue: (__VLS_ctx.form.category_id),
    options: (__VLS_ctx.categories),
    optionLabel: "name",
    optionValue: "id",
    ...{ class: "w-full" },
    showClear: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_17));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "col-2 field" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
const __VLS_20 = {}.InputNumber;
/** @type {[typeof __VLS_components.InputNumber, ]} */ ;
// @ts-ignore
const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
    modelValue: (__VLS_ctx.form.stock_quantity),
    min: (0),
    ...{ class: "w-full" },
}));
const __VLS_22 = __VLS_21({
    modelValue: (__VLS_ctx.form.stock_quantity),
    min: (0),
    ...{ class: "w-full" },
}, ...__VLS_functionalComponentArgsRest(__VLS_21));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "col-2 field" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
const __VLS_24 = {}.InputNumber;
/** @type {[typeof __VLS_components.InputNumber, ]} */ ;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
    modelValue: (__VLS_ctx.form.min_stock),
    min: (0),
    ...{ class: "w-full" },
}));
const __VLS_26 = __VLS_25({
    modelValue: (__VLS_ctx.form.min_stock),
    min: (0),
    ...{ class: "w-full" },
}, ...__VLS_functionalComponentArgsRest(__VLS_25));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "col-12 field" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
const __VLS_28 = {}.Textarea;
/** @type {[typeof __VLS_components.Textarea, ]} */ ;
// @ts-ignore
const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({
    modelValue: (__VLS_ctx.form.description),
    ...{ class: "w-full" },
    rows: "3",
}));
const __VLS_30 = __VLS_29({
    modelValue: (__VLS_ctx.form.description),
    ...{ class: "w-full" },
    rows: "3",
}, ...__VLS_functionalComponentArgsRest(__VLS_29));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "col-12 field" },
});
const __VLS_32 = {}.ToggleSwitch;
/** @type {[typeof __VLS_components.ToggleSwitch, ]} */ ;
// @ts-ignore
const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({
    modelValue: (__VLS_ctx.form.active),
}));
const __VLS_34 = __VLS_33({
    modelValue: (__VLS_ctx.form.active),
}, ...__VLS_functionalComponentArgsRest(__VLS_33));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "flex gap-2" },
});
const __VLS_36 = {}.Button;
/** @type {[typeof __VLS_components.Button, ]} */ ;
// @ts-ignore
const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({
    type: "submit",
    label: "Salvar",
    icon: "pi pi-check",
}));
const __VLS_38 = __VLS_37({
    type: "submit",
    label: "Salvar",
    icon: "pi pi-check",
}, ...__VLS_functionalComponentArgsRest(__VLS_37));
const __VLS_40 = {}.Button;
/** @type {[typeof __VLS_components.Button, ]} */ ;
// @ts-ignore
const __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({
    ...{ 'onClick': {} },
    label: "Cancelar",
    outlined: true,
}));
const __VLS_42 = __VLS_41({
    ...{ 'onClick': {} },
    label: "Cancelar",
    outlined: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_41));
let __VLS_44;
let __VLS_45;
let __VLS_46;
const __VLS_47 = {
    onClick: (...[$event]) => {
        __VLS_ctx.$router.push('/products');
    }
};
var __VLS_43;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['col-6']} */ ;
/** @type {__VLS_StyleScopedClasses['field']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['col-3']} */ ;
/** @type {__VLS_StyleScopedClasses['field']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['col-3']} */ ;
/** @type {__VLS_StyleScopedClasses['field']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['col-4']} */ ;
/** @type {__VLS_StyleScopedClasses['field']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['col-4']} */ ;
/** @type {__VLS_StyleScopedClasses['field']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['col-2']} */ ;
/** @type {__VLS_StyleScopedClasses['field']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['col-2']} */ ;
/** @type {__VLS_StyleScopedClasses['field']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['col-12']} */ ;
/** @type {__VLS_StyleScopedClasses['field']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['col-12']} */ ;
/** @type {__VLS_StyleScopedClasses['field']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            Button: Button,
            InputText: InputText,
            InputNumber: InputNumber,
            Textarea: Textarea,
            Select: Select,
            ToggleSwitch: ToggleSwitch,
            categories: categories,
            editing: editing,
            form: form,
            save: save,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
