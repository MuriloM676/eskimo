import api from './api';
export const SaleService = {
    async start() {
        const { data } = await api.post('/sales/start');
        return data.data;
    },
    async addItem(barcode, quantity = 1) {
        const { data } = await api.post('/sales/add-item', { barcode, quantity });
        return data.data;
    },
    async removeItem(saleId, itemId) {
        const { data } = await api.post(`/sales/${saleId}/remove-item`, { item_id: itemId });
        return data.data;
    },
    async applyDiscount(saleId, discount) {
        const { data } = await api.post(`/sales/${saleId}/apply-discount`, { discount });
        return data.data;
    },
    async pay(saleId, methods) {
        const { data } = await api.post(`/sales/${saleId}/pay`, { methods });
        return data.data;
    },
    async cancel(saleId, reason) {
        const { data } = await api.post(`/sales/${saleId}/cancel`, { reason });
        return data.data;
    },
    async get(saleId) {
        const { data } = await api.get(`/sales/${saleId}`);
        return data.data;
    },
    async list(params) {
        const { data } = await api.get('/sales', { params });
        return data;
    },
};
