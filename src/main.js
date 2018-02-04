// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// Three
import * as THREE from 'three'
import Detector from 'three/examples/js/detector'
import Stats from 'three/examples/js/libs/stats.min'
// import-loader 解决module依赖全局变量 THREE
import 'imports-loader?THREE=three!three/examples/js/controls/OrbitControls';
import THREEx from '@/utils/THREEx'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import '@/assets/iconfont/material-icons.css'
import '@/assets/css/custom.styl'
Vue.use(MuseUI)

Vue.config.productionTip = false
window.THREE = THREE
window.Detector = Detector
window.Stats = Stats
window.THREEx = THREEx


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
