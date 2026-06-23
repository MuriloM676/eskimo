import api from './api';
export const CashRegisterService = {
    async open(initialAmount) {
        const { data } = await api.post('/cash-register/open', { initial_amount: initialAmount / 100 });
        return data.data;
    },
    async close() {
        const { data } = await api.post('/cash-register/close');
        return data.data;
    },
    async current() {
        const { data } = await api.get('/cash-register/current');
        return data.data;
    },
};
