import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
const routes = [
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/Login/LoginView.vue'),
        meta: { requiresAuth: false },
    },
    {
        path: '/',
        component: () => import('@/layouts/DefaultLayout.vue'),
        meta: { requiresAuth: true },
        children: [
            {
                path: '',
                redirect: '/pdv',
            },
            {
                path: 'pdv',
                name: 'PDV',
                component: () => import('@/views/PDV/PDVView.vue'),
                meta: { requiresAuth: true, permission: 'sale.create' },
            },
            {
                path: 'products',
                name: 'Products',
                component: () => import('@/views/Products/ProductListView.vue'),
                meta: { requiresAuth: true, permission: 'product.view' },
            },
            {
                path: 'products/new',
                name: 'ProductNew',
                component: () => import('@/views/Products/ProductFormView.vue'),
                meta: { requiresAuth: true, permission: 'product.manage' },
            },
            {
                path: 'products/:id/edit',
                name: 'ProductEdit',
                component: () => import('@/views/Products/ProductFormView.vue'),
                meta: { requiresAuth: true, permission: 'product.manage' },
            },
            {
                path: 'categories',
                name: 'Categories',
                component: () => import('@/views/Products/CategoryListView.vue'),
                meta: { requiresAuth: true, permission: 'product.manage' },
            },
            {
                path: 'stock',
                name: 'Stock',
                component: () => import('@/views/Stock/StockView.vue'),
                meta: { requiresAuth: true, permission: 'stock.manage' },
            },
            {
                path: 'stock/movements',
                name: 'StockMovements',
                component: () => import('@/views/Stock/StockMovementsView.vue'),
                meta: { requiresAuth: true, permission: 'stock.manage' },
            },
            {
                path: 'dashboard',
                name: 'Dashboard',
                component: () => import('@/views/Dashboard/DashboardView.vue'),
                meta: { requiresAuth: true, permission: 'report.view' },
            },
            {
                path: 'reports/sales',
                name: 'SalesReport',
                component: () => import('@/views/Reports/SalesReportView.vue'),
                meta: { requiresAuth: true, permission: 'report.view' },
            },
            {
                path: 'users',
                name: 'Users',
                component: () => import('@/views/Users/UserListView.vue'),
                meta: { requiresAuth: true, permission: 'user.manage' },
            },
            {
                path: 'cash-register',
                name: 'CashRegister',
                component: () => import('@/views/CashRegister/CashRegisterView.vue'),
                meta: { requiresAuth: true, permission: 'cash.open' },
            },
        ],
    },
];
const router = createRouter({
    history: createWebHistory(),
    routes,
});
router.beforeEach(async (to, _from, next) => {
    const auth = useAuthStore();
    if (to.meta.requiresAuth !== false && !auth.isAuthenticated) {
        return next('/login');
    }
    if (to.meta.permission && !auth.hasPermission(to.meta.permission)) {
        return next('/pdv');
    }
    next();
});
export default router;
