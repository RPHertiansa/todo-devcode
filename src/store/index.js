import Vue from 'vue'
import Vuex from 'vuex'
import products from './Products'
import activity from './activity'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    products,
    activity
  }
})
