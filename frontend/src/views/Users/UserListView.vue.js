import { ref, onMounted } from 'vue';
import api from '@/services/api';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import Tag from 'primevue/tag';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Select from 'primevue/select';
import ToggleSwitch from 'primevue/toggleswitch';
import { useToast } from 'primevue/usetoast';
const toast = useToast();
const users = ref([]);
const roles = ref([]);
const loading = ref(false);
const dialogVisible = ref(false);
const editing = ref(false);
const selectedId = ref(null);
const form = ref({ name: '', email: '', password: '', role_id: null, active: true });
function showDialog(user) {
    if (user) {
        editing.value = true;
        selectedId.value = user.id;
        form.value = { name: user.name, email: user.email, password: '', role_id: user.role_id, active: user.active };
    }
    else {
        editing.value = false;
        selectedId.value = null;
        form.value = { name: '', email: '', password: '', role_id: null, active: true };
    }
    dialogVisible.value = true;
}
async function save() {
    try {
        const payload = { ...form.value };
        if (!payload.password)
            delete payload.password;
        if (editing.value && selectedId.value) {
            await api.put(`/users/${selectedId.value}`, payload);
        }
        else {
            await api.post('/users', payload);
        }
        dialogVisible.value = false;
        toast.add({ severity: 'success', summary: 'Salvo', life: 2000 });
        await load();
    }
    catch { }
}
async function load() {
    loading.value = true;
    try {
        const { data: userData } = await api.get('/users');
        users.value = userData.data;
        const { data: roleData } = await api.get('/roles');
        roles.value = roleData.data;
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
const __VLS_0 = {}.Button;
/** @type {[typeof __VLS_components.Button, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ 'onClick': {} },
    label: "Novo Usuário",
    icon: "pi pi-plus",
}));
const __VLS_2 = __VLS_1({
    ...{ 'onClick': {} },
    label: "Novo Usuário",
    icon: "pi pi-plus",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_4;
let __VLS_5;
let __VLS_6;
const __VLS_7 = {
    onClick: (...[$event]) => {
        __VLS_ctx.showDialog();
    }
};
var __VLS_3;
const __VLS_8 = {}.DataTable;
/** @type {[typeof __VLS_components.DataTable, typeof __VLS_components.DataTable, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
    value: (__VLS_ctx.users),
    loading: (__VLS_ctx.loading),
    paginator: true,
    rows: (20),
}));
const __VLS_10 = __VLS_9({
    value: (__VLS_ctx.users),
    loading: (__VLS_ctx.loading),
    paginator: true,
    rows: (20),
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
__VLS_11.slots.default;
const __VLS_12 = {}.Column;
/** @type {[typeof __VLS_components.Column, ]} */ ;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
    field: "name",
    header: "Nome",
}));
const __VLS_14 = __VLS_13({
    field: "name",
    header: "Nome",
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
const __VLS_16 = {}.Column;
/** @type {[typeof __VLS_components.Column, ]} */ ;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
    field: "email",
    header: "Email",
}));
const __VLS_18 = __VLS_17({
    field: "email",
    header: "Email",
}, ...__VLS_functionalComponentArgsRest(__VLS_17));
const __VLS_20 = {}.Column;
/** @type {[typeof __VLS_components.Column, ]} */ ;
// @ts-ignore
const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
    field: "role.name",
    header: "Perfil",
}));
const __VLS_22 = __VLS_21({
    field: "role.name",
    header: "Perfil",
}, ...__VLS_functionalComponentArgsRest(__VLS_21));
const __VLS_24 = {}.Column;
/** @type {[typeof __VLS_components.Column, typeof __VLS_components.Column, ]} */ ;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
    field: "active",
    header: "Ativo",
}));
const __VLS_26 = __VLS_25({
    field: "active",
    header: "Ativo",
}, ...__VLS_functionalComponentArgsRest(__VLS_25));
__VLS_27.slots.default;
{
    const { body: __VLS_thisSlot } = __VLS_27.slots;
    const [{ data }] = __VLS_getSlotParams(__VLS_thisSlot);
    const __VLS_28 = {}.Tag;
    /** @type {[typeof __VLS_components.Tag, ]} */ ;
    // @ts-ignore
    const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({
        value: (data.active ? 'Sim' : 'Não'),
        severity: (data.active ? 'success' : 'danger'),
    }));
    const __VLS_30 = __VLS_29({
        value: (data.active ? 'Sim' : 'Não'),
        severity: (data.active ? 'success' : 'danger'),
    }, ...__VLS_functionalComponentArgsRest(__VLS_29));
}
var __VLS_27;
const __VLS_32 = {}.Column;
/** @type {[typeof __VLS_components.Column, typeof __VLS_components.Column, ]} */ ;
// @ts-ignore
const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({
    field: "last_login_at",
    header: "Último Login",
}));
const __VLS_34 = __VLS_33({
    field: "last_login_at",
    header: "Último Login",
}, ...__VLS_functionalComponentArgsRest(__VLS_33));
__VLS_35.slots.default;
{
    const { body: __VLS_thisSlot } = __VLS_35.slots;
    const [{ data }] = __VLS_getSlotParams(__VLS_thisSlot);
    (data.last_login_at ? new Date(data.last_login_at).toLocaleString('pt-BR') : '-');
}
var __VLS_35;
const __VLS_36 = {}.Column;
/** @type {[typeof __VLS_components.Column, typeof __VLS_components.Column, ]} */ ;
// @ts-ignore
const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({
    header: "Ações",
    ...{ style: {} },
}));
const __VLS_38 = __VLS_37({
    header: "Ações",
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_37));
__VLS_39.slots.default;
{
    const { body: __VLS_thisSlot } = __VLS_39.slots;
    const [{ data }] = __VLS_getSlotParams(__VLS_thisSlot);
    const __VLS_40 = {}.Button;
    /** @type {[typeof __VLS_components.Button, ]} */ ;
    // @ts-ignore
    const __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({
        ...{ 'onClick': {} },
        icon: "pi pi-pencil",
        text: true,
    }));
    const __VLS_42 = __VLS_41({
        ...{ 'onClick': {} },
        icon: "pi pi-pencil",
        text: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_41));
    let __VLS_44;
    let __VLS_45;
    let __VLS_46;
    const __VLS_47 = {
        onClick: (...[$event]) => {
            __VLS_ctx.showDialog(data);
        }
    };
    var __VLS_43;
}
var __VLS_39;
var __VLS_11;
const __VLS_48 = {}.Dialog;
/** @type {[typeof __VLS_components.Dialog, typeof __VLS_components.Dialog, ]} */ ;
// @ts-ignore
const __VLS_49 = __VLS_asFunctionalComponent(__VLS_48, new __VLS_48({
    visible: (__VLS_ctx.dialogVisible),
    header: (__VLS_ctx.editing ? 'Editar Usuário' : 'Novo Usuário'),
    modal: true,
    ...{ style: {} },
}));
const __VLS_50 = __VLS_49({
    visible: (__VLS_ctx.dialogVisible),
    header: (__VLS_ctx.editing ? 'Editar Usuário' : 'Novo Usuário'),
    modal: true,
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_49));
__VLS_51.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "field mb-2" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
const __VLS_52 = {}.InputText;
/** @type {[typeof __VLS_components.InputText, ]} */ ;
// @ts-ignore
const __VLS_53 = __VLS_asFunctionalComponent(__VLS_52, new __VLS_52({
    modelValue: (__VLS_ctx.form.name),
    ...{ class: "w-full" },
}));
const __VLS_54 = __VLS_53({
    modelValue: (__VLS_ctx.form.name),
    ...{ class: "w-full" },
}, ...__VLS_functionalComponentArgsRest(__VLS_53));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "field mb-2" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
const __VLS_56 = {}.InputText;
/** @type {[typeof __VLS_components.InputText, ]} */ ;
// @ts-ignore
const __VLS_57 = __VLS_asFunctionalComponent(__VLS_56, new __VLS_56({
    modelValue: (__VLS_ctx.form.email),
    type: "email",
    ...{ class: "w-full" },
}));
const __VLS_58 = __VLS_57({
    modelValue: (__VLS_ctx.form.email),
    type: "email",
    ...{ class: "w-full" },
}, ...__VLS_functionalComponentArgsRest(__VLS_57));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "field mb-2" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
(__VLS_ctx.editing ? 'Nova Senha (deixar vazio para manter)' : 'Senha *');
const __VLS_60 = {}.InputText;
/** @type {[typeof __VLS_components.InputText, ]} */ ;
// @ts-ignore
const __VLS_61 = __VLS_asFunctionalComponent(__VLS_60, new __VLS_60({
    modelValue: (__VLS_ctx.form.password),
    type: "password",
    ...{ class: "w-full" },
}));
const __VLS_62 = __VLS_61({
    modelValue: (__VLS_ctx.form.password),
    type: "password",
    ...{ class: "w-full" },
}, ...__VLS_functionalComponentArgsRest(__VLS_61));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "field mb-2" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
const __VLS_64 = {}.Select;
/** @type {[typeof __VLS_components.Select, ]} */ ;
// @ts-ignore
const __VLS_65 = __VLS_asFunctionalComponent(__VLS_64, new __VLS_64({
    modelValue: (__VLS_ctx.form.role_id),
    options: (__VLS_ctx.roles),
    optionLabel: "name",
    optionValue: "id",
    ...{ class: "w-full" },
}));
const __VLS_66 = __VLS_65({
    modelValue: (__VLS_ctx.form.role_id),
    options: (__VLS_ctx.roles),
    optionLabel: "name",
    optionValue: "id",
    ...{ class: "w-full" },
}, ...__VLS_functionalComponentArgsRest(__VLS_65));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "field mb-2" },
});
const __VLS_68 = {}.ToggleSwitch;
/** @type {[typeof __VLS_components.ToggleSwitch, ]} */ ;
// @ts-ignore
const __VLS_69 = __VLS_asFunctionalComponent(__VLS_68, new __VLS_68({
    modelValue: (__VLS_ctx.form.active),
}));
const __VLS_70 = __VLS_69({
    modelValue: (__VLS_ctx.form.active),
}, ...__VLS_functionalComponentArgsRest(__VLS_69));
const __VLS_72 = {}.Button;
/** @type {[typeof __VLS_components.Button, ]} */ ;
// @ts-ignore
const __VLS_73 = __VLS_asFunctionalComponent(__VLS_72, new __VLS_72({
    ...{ 'onClick': {} },
    label: "Salvar",
    ...{ class: "w-full" },
}));
const __VLS_74 = __VLS_73({
    ...{ 'onClick': {} },
    label: "Salvar",
    ...{ class: "w-full" },
}, ...__VLS_functionalComponentArgsRest(__VLS_73));
let __VLS_76;
let __VLS_77;
let __VLS_78;
const __VLS_79 = {
    onClick: (__VLS_ctx.save)
};
var __VLS_75;
var __VLS_51;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-content-between']} */ ;
/** @type {__VLS_StyleScopedClasses['align-items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['field']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
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
/** @type {__VLS_StyleScopedClasses['field']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            DataTable: DataTable,
            Column: Column,
            Button: Button,
            Tag: Tag,
            Dialog: Dialog,
            InputText: InputText,
            Select: Select,
            ToggleSwitch: ToggleSwitch,
            users: users,
            roles: roles,
            loading: loading,
            dialogVisible: dialogVisible,
            editing: editing,
            form: form,
            showDialog: showDialog,
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
