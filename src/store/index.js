import Vue from 'vue'
import Vuex from 'vuex'
import {getCompanies} from "../api/api";

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
    }
  },
  actions: {
    getAllCompanies(context) {
      return getCompanies().then(res => {
        context.commit('setCompanies', res.data)
      })
    }
  },
  getters: {
    getCompanies(state) {
      return state.companies
    }
  }
})
