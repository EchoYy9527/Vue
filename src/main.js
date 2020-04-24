// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import vuex from 'vuex'
import store from './store'
import './assets/css/1.css'
import mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import { Range } from 'mint-ui'; //使用mint-ui
Vue.component(Range.name, Range);//压入ui组件
Vue.prototype.$http = axios
Vue.use(vuex,mint)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
