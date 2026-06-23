import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { AuthService } from '@/services/AuthService';
import router from '@/router';
export const useAuthStore = defineStore('auth', () => {
    const user = ref(JSON.parse(localStorage.getItem('user') || 'null'));
    const token = ref(localStorage.getItem('token'));
    const loading = ref(false);
    const isAuthenticated = computed(() => !!token.value);
    const permissions = computed(() => user.value?.permissions || []);
    const role = computed(() => user.value?.role || '');
    function hasPermission(key) {
        return permissions.value.includes(key);
    }
    function hasRole(...roles) {
        return roles.includes(role.value);
    }
    async function login(email, password) {
        loading.value = true;
        try {
            const result = await AuthService.login({ email, password });
            token.value = result.token;
            user.value = result.user;
            localStorage.setItem('token', result.token);
            localStorage.setItem('user', JSON.stringify(result.user));
            await router.push('/pdv');
        }
        finally {
            loading.value = false;
        }
    }
    async function logout() {
        try {
            await AuthService.logout();
        }
        catch {
            // ignore
        }
        token.value = null;
        user.value = null;
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        await router.push('/login');
    }
    async function fetchMe() {
        try {
            const me = await AuthService.me();
            user.value = me;
            localStorage.setItem('user', JSON.stringify(me));
        }
        catch {
            await logout();
        }
    }
    return {
        user, token, loading,
        isAuthenticated, permissions, role,
        hasPermission, hasRole,
        login, logout, fetchMe,
    };
});
