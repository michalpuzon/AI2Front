import Vue from 'vue'
import Vuex from 'vuex'
import {getCompanies, getCompanyEmployees} from "../api/api";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        companies: [],
        positions: [],
        employees: [],
    },
    mutations: {
        setCompanies(state, companies) {
            state.companies = companies
        },
        setEmployees(state, employees) {
            state.employees = employees
        },
    },
    actions: {
        getAllCompanies(context) {
            return getCompanies().then(res => {
                context.commit('setCompanies', res.data)
            })
        },
        getAllCompanyEmployees(context, companyId) {
            return getCompanyEmployees(companyId).then(res => {
                context.commit('setEmployees', res.data)
            })
        }
    },
    getters: {
        getCompanies(state) {
            return state.companies
        },
        getEmployees(state) {
            return state.employees
        },
    }
})
