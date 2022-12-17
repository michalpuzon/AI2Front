import Vue from 'vue'
import VueRouter from 'vue-router'
import CompaniesView from "../views/CompaniesView";
import EmployeesView from "../views/EmployeesView.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    name: 'Companies',
    component: CompaniesView
  },
  {
    path: '/employees/:id',
    name: 'Employees',
    component: EmployeesView
  },
]

const router = new VueRouter({
  routes
})

export default router
