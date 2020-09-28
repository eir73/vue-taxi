import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isUserLogged: false
  },
  mutations: {
    loginUser(state, responseStatus) {
      state.isUserLogged = responseStatus
    }
  },
  actions: {
    async login({ commit }, { email, password }) {
      let receivedData;
      try {
        const data = await axios.post("https://taxiadmin.ddns.mksat.net/taxi/api/v2/disp/login", { email, password }, {
          headers: {
            "Content-Type": "application/json",
          }
        })
          .then(response => {
            receivedData = response.data
            commit('loginUser', receivedData.status)  
          })
          .catch(error => {
            throw error
          });
      } catch (error) {
        throw error
      }
    }
  },
  modules: {
  },
  getters: {
    isUserLogged: s => s.isUserLogged
  }
})
