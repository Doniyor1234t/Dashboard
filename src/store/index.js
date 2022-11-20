import { createStore } from 'vuex'
import helper from './helper'
import workers from './pages/workers'
import direction from './pages/direction'
import types from './pages/type'
import groups from './pages/group'
import pupils from './pages/pupil'
import spendings from './pages/spending'
import payments from './pages/pay'
export default createStore({
  state: {
    url:'http://localhost:5070',
    count:0
  },
  getters: {
    url(state){
      return state.url
    },
    count(state){
      return state.count
    }
  },
  mutations: {
    count(state,payload){
      return state.count = payload
    }
  },
  actions: {
    count(context,payload){
      context.commit('count',payload)
    }
  },
  modules: {helper, workers, direction, types, groups, pupils, spendings, payments}
})
