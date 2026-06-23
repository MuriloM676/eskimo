import api from './api';
export const ProductService = {
    async list(params) {
        const { data } = await api.get('/products', { params });
        return data;
    },
    async search(term) {
        const { data } = await api.get('/products/search', { params: { q: term } });
        return data.data;
    },
    async find(id) {
        const { data } = await api.get(`/products/${id}`);
        return data.data;
    },
    async create(payload) {
        const { data } = await api.post('/products', payload);
        return data.data;
    },
    async update(id, payload) {
        const { data } = await api.put(`/products/${id}`, payload);
        return data.data;
    },
    async delete(id) {
        await api.delete(`/products/${id}`);
    },
    async listCategories() {
        const { data } = await api.get('/categories');
        return data.data;
    },
    async createCategory(payload) {
        const { data } = await api.post('/categories', payload);
        return data.data;
    },
    async updateCategory(id, payload) {
        const { data } = await api.put(`/categories/${id}`, payload);
        return data.data;
    },
    async deleteCategory(id) {
        await api.delete(`/categories/${id}`);
    },
};
