/* eslint-disable no-console */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './app.vue'
import router from './router'
import interponents from '../../public/services/interponents.js'
import filters from '../../public/filters'
// import setTitle from '../../public/utils/setTitle'

import '../../public/styles/reset.css'
import '../../public/styles/screen.less'
import './styles/main.css'
import './styles/transition.css'

Vue.use(interponents(router))
Vue.use(filters)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App,
  },
})

router.beforeEach((to, from, next) => {
  console.log('-----------------beforeEach------------------')
  next()
})

router.beforeResolve((to, from, next) => {
  console.log('-----------------beforeResolve------------------')
  next()
})

router.afterEach((to, from) => {
  console.log('-----------------afterEach------------------')

  // setTitle((to.meta && to.meta.title) || 'doudou')
})
