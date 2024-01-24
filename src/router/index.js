import Vue from 'vue'
import VueRouter from 'vue-router'
import CompaniesView from "../views/CompaniesView";
import EmployeesView from "../views/EmployeesView.vue";
import HomeView from "../views/HomeView.vue";
import store from "../store";
import NotFound from "../views/NotFound.vue";


Vue.use(VueRouter)

const userGuard = (to, from, next) => {
    if (store.getters.getToken) {
        next();
    }
}

const notAuthGuard = (to, from, next) => {
    if (!store.getters.getToken) {
        next();
    }
}

const routes = [
    {
        path: '',
        name: 'Home',
        component: HomeView,
        beforeEnter: notAuthGuard
    },
    {
        path: '/companies',
        name: 'Companies',
        component: CompaniesView,
        beforeEnter: userGuard
    },
    {
        path: '/employees/:id',
        name: 'Employees',
        component: EmployeesView,
        beforeEnter: userGuard
    },
    {
        path: '*',
        name: 'NotFound',
        component: NotFound
    }
]

const router = new VueRouter({
    routes
})

export default router
