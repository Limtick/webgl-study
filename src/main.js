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

// UI
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import '@/assets/iconfont/material-icons.css'

import { Input, Button, ColorPicker } from 'element-ui'

import '@/assets/css/custom.styl'

// 工具
import moment from 'moment'
import _ from 'lodash'

// request
import { $get, $post } from '@/utils/request'

Vue.use(MuseUI)

let elementComponents = [
  Input,
  Button,
  ColorPicker
]
elementComponents.forEach((component) => {
  Vue.component(component.name, component)
})

Vue.config.productionTip = false

window.THREE = THREE
window.Detector = Detector
window.Stats = Stats
window.THREEx = THREEx

Vue.prototype.$get = $get
Vue.prototype.$post = $post
Vue.prototype.$moment = moment
Vue.prototype.$_ = _

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
