import Vue from 'vue'
import Vuex from 'vuex'
import {getCompanies, getCompanyEmployees, getCompanyPositions} from "../api/api";

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
        setPositions(state, positions) {
            state.positions = positions
        }
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
        },
        getCompanyPositions(context, companyId) {
            return getCompanyPositions(companyId).then(res => {
                context.commit('setPositions', res.data)
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
        getPositions(state) {
            return state.positions
        }
    }
})
