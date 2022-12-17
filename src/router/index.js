import Vue from 'vue'
import VueRouter from 'vue-router'
import CompaniesView from "../views/CompaniesView";

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    name: 'Companies',
    component: CompaniesView
  },
]

const router = new VueRouter({
  routes
})

export default router
