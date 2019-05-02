// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import i18n from './lang' // Internationalization

import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-carbon.css'
import 'echarts'
import * as filters from './filters' // global filters
import VueCurrencyFilter from 'vue-currency-filter' // money format

Vue.config.productionTip = false
Vue.use(MuseUI)
/* eslint-disable no-new */

Vue.use(VueCurrencyFilter, {
  symbol: '￥',
  thousandsSeparator: ',',
  fractionSeparator: '.',
  fractionCount: '2',
  symbolSpacing: false
})

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requireAuth)) {
    if (sessionStorage.user) {
      console.log(sessionStorage.user)
      next()
    } else {
      next({
        path: '/sign',
        query: {
          redirect: to.fullPath
        }
      })
    }
  } else {
    next()
  }
})
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  template: '<App/>',
  components: {
    App
  }
})
