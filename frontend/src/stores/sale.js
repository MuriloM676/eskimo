import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { SaleService } from '@/services/SaleService';
import { useToast } from 'primevue/usetoast';
export const useSaleStore = defineStore('sale', () => {
    const toast = useToast();
    const sale = ref(null);
    const loading = ref(false);
    const items = computed(() => sale.value?.items || []);
    const total = computed(() => sale.value?.total || 0);
    const subtotal = computed(() => sale.value?.subtotal || 0);
    const discount = computed(() => sale.value?.discount || 0);
    const isOpen = computed(() => sale.value?.status === 'OPEN');
    function formatPrice(cents) {
        return (cents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }
    async function start() {
        loading.value = true;
        try {
            sale.value = await SaleService.start();
        }
        catch (err) {
            const msg = err.response?.data?.message || 'Erro ao iniciar venda';
            toast.add({ severity: 'error', summary: 'Erro', detail: msg, life: 3000 });
        }
        finally {
            loading.value = false;
        }
    }
    async function addItem(barcode) {
        loading.value = true;
        try {
            sale.value = await SaleService.addItem(barcode);
        }
        catch (err) {
            const msg = err.response?.data?.message || 'Produto não encontrado';
            toast.add({ severity: 'warn', summary: 'Aviso', detail: msg, life: 2000 });
            throw err;
        }
        finally {
            loading.value = false;
        }
    }
    async function removeItem(itemId) {
        if (!sale.value)
            return;
        loading.value = true;
        try {
            sale.value = await SaleService.removeItem(sale.value.id, itemId);
        }
        finally {
            loading.value = false;
        }
    }
    async function applyDiscount(discountValue) {
        if (!sale.value)
            return;
        loading.value = true;
        try {
            sale.value = await SaleService.applyDiscount(sale.value.id, discountValue);
        }
        finally {
            loading.value = false;
        }
    }
    async function pay(methods) {
        if (!sale.value)
            return;
        loading.value = true;
        try {
            sale.value = await SaleService.pay(sale.value.id, methods);
            toast.add({ severity: 'success', summary: 'Venda finalizada', detail: `Total: ${formatPrice(total.value)}`, life: 3000 });
            sale.value = null;
        }
        catch (err) {
            const msg = err.response?.data?.message || 'Erro ao finalizar venda';
            toast.add({ severity: 'error', summary: 'Erro', detail: msg, life: 3000 });
            throw err;
        }
        finally {
            loading.value = false;
        }
    }
    async function cancel(reason) {
        if (!sale.value)
            return;
        loading.value = true;
        try {
            sale.value = await SaleService.cancel(sale.value.id, reason);
            toast.add({ severity: 'info', summary: 'Venda cancelada', life: 2000 });
            sale.value = null;
        }
        finally {
            loading.value = false;
        }
    }
    function reset() {
        sale.value = null;
    }
    return {
        sale, loading, items, total, subtotal, discount, isOpen,
        formatPrice, start, addItem, removeItem, applyDiscount, pay, cancel, reset,
    };
});
