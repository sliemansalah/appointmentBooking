import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
    mode: 'history',
    scrollBehavior() {
        return window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    routes: [
        // Dashboards

        {
            path: '/admin/users',
            name: 'users',
            component: () => import('../Pages/Users/UsersPage.vue'),
        },

        {
            path: '/',
            name: 'home',
            meta: {layout: 'userpages'},
            component: () => import('../Pages/Home/HomePage.vue'),
        },
        {
            path: '/admin/login',
            name: 'login',
            meta: {layout: 'userpages'},
            component: () => import('../Pages/Login/LoginPage.vue'),
        },
        {
            path: '/admin/services',
            name: 'services',
            component: () => import('../Pages/Services/ServicesPage.vue'),
        },
        
    ]
})
