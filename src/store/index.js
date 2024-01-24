import Vue from 'vue'
import Vuex from 'vuex'
import {getAllEmployees, getCompanies, getCompanyEmployees, getCompanyPositions} from "../api/api";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        companies: [],
        positions: [],
        employees: [],
        allEmployees: [],
        token: '',
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
        },
        setAllEmployees(state, employees) {
            state.allEmployees = employees
        },
        setToken(state, payload) {

            state.token = payload.token
        },
        clearToken(state) {
            state.token = ''
            state.companies = []
            state.positions = []
            state.employees = []
            state.allEmployees = []
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
        },
        getAllEmployees(context) {
            return getAllEmployees().then(res => {
                context.commit('setAllEmployees', res.data)
            })
        },
        clearToken(context) {
            context.commit('clearToken')
            localStorage.removeItem('token')
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
        },
        getAllEmployees(state) {
            return state.allEmployees
        },
        getToken(state) {
            return state.token
        }
    }
})
