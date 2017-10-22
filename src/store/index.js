import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'
import actions from './actions'
import getters from './getters'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex);

//可配置模块
export default new Vuex.Store({
  actions,
  getters,
  modules,
  // 打印action，state日志，仅供开发时使用；
  plugins: [createLogger()]
})
