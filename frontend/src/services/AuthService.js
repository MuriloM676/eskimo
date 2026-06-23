import api from './api';
export const AuthService = {
    async login(payload) {
        const { data } = await api.post('/auth/login', payload);
        return data.data;
    },
    async logout() {
        await api.post('/auth/logout');
    },
    async me() {
        const { data } = await api.get('/auth/me');
        return data.data;
    },
};
