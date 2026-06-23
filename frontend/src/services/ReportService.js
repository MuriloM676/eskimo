import api from './api';
export const ReportService = {
    async dashboard() {
        const { data } = await api.get('/reports/dashboard');
        return data.data;
    },
    async sales(params) {
        const { data } = await api.get('/reports/sales', { params });
        return data;
    },
    async cash() {
        const { data } = await api.get('/reports/cash');
        return data;
    },
    async products() {
        const { data } = await api.get('/reports/products');
        return data;
    },
    async stock() {
        const { data } = await api.get('/reports/stock');
        return data;
    },
};
