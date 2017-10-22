import Vue from 'vue'
import Router from 'vue-router'
import routes from './route'
Vue.use(Router)

export default new Router({
  mode: 'history',
  linkActiveClass: 'actived',
  routes
})
