import Vue from 'vue'
import Vuex from 'vuex'

// Global vuex
import AppModule from './app'
import TendersModule from './tenders'
import DealsModule from './deals'
Vue.use(Vuex)

/**
 * Main Vuex Store
 */
const store = new Vuex.Store({
  modules: {
    app: AppModule,
    tenders: TendersModule,
    deals: DealsModule
  }
})

export default store
