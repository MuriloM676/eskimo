import api from './api';
export const StockService = {
    async list(params) {
        const { data } = await api.get('/stock', { params });
        return data;
    },
    async movements(params) {
        const { data } = await api.get('/stock/movements', { params });
        return data;
    },
    async adjust(productId, type, quantity, reason) {
        const { data } = await api.post('/stock/adjust', { product_id: productId, type, quantity, reason });
        return data.data;
    },
    async entry(productId, quantity, reason) {
        const { data } = await api.post('/stock/in', { product_id: productId, quantity, reason });
        return data.data;
    },
};
