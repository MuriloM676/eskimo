import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
const auth = useAuthStore();
const email = ref('admin@sorveteria.com');
const password = ref('123456');
const error = ref('');
async function handleLogin() {
    error.value = '';
    try {
        await auth.login(email.value, password.value);
    }
    catch (err) {
        error.value = err.response?.data?.message || 'Erro ao fazer login';
    }
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "login-page" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "login-card" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)({
    ...{ onSubmit: (__VLS_ctx.handleLogin) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "field mb-3" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    for: "email",
});
const __VLS_0 = {}.InputText;
/** @type {[typeof __VLS_components.InputText, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    id: "email",
    modelValue: (__VLS_ctx.email),
    type: "email",
    ...{ class: "w-full" },
    placeholder: "admin@sorveteria.com",
    autofocus: true,
}));
const __VLS_2 = __VLS_1({
    id: "email",
    modelValue: (__VLS_ctx.email),
    type: "email",
    ...{ class: "w-full" },
    placeholder: "admin@sorveteria.com",
    autofocus: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "field mb-3" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    for: "password",
});
const __VLS_4 = {}.InputText;
/** @type {[typeof __VLS_components.InputText, ]} */ ;
// @ts-ignore
const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
    id: "password",
    modelValue: (__VLS_ctx.password),
    type: "password",
    ...{ class: "w-full" },
    placeholder: "123456",
}));
const __VLS_6 = __VLS_5({
    id: "password",
    modelValue: (__VLS_ctx.password),
    type: "password",
    ...{ class: "w-full" },
    placeholder: "123456",
}, ...__VLS_functionalComponentArgsRest(__VLS_5));
const __VLS_8 = {}.Button;
/** @type {[typeof __VLS_components.Button, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
    type: "submit",
    label: "Entrar",
    ...{ class: "w-full" },
    loading: (__VLS_ctx.auth.loading),
}));
const __VLS_10 = __VLS_9({
    type: "submit",
    label: "Entrar",
    ...{ class: "w-full" },
    loading: (__VLS_ctx.auth.loading),
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
if (__VLS_ctx.error) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: "text-red-500 text-sm mt-2" },
    });
    (__VLS_ctx.error);
}
/** @type {__VLS_StyleScopedClasses['login-page']} */ ;
/** @type {__VLS_StyleScopedClasses['login-card']} */ ;
/** @type {__VLS_StyleScopedClasses['field']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['field']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['text-red-500']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            InputText: InputText,
            Button: Button,
            auth: auth,
            email: email,
            password: password,
            error: error,
            handleLogin: handleLogin,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
