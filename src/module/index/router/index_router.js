import Vue from 'vue'
import Router from 'vue-router'
import Main from '../components/Main.vue'
import config from '../../../../config'
import setting from '../setting'

Vue.use(Router)

// console.log(process.env.RUN_ENV)

export default new Router({
  mode: 'history',
  base: `${config.produceName}/${config.moduleRootName}/${setting.moduleName}`,
  routes: [
    {
      path: '/',
      name: 'index',
      component: Main,
    },
    {
      path: '/:page_path',
      name: 'main',
      component: Main,
    },
    {
      path: '/home',
      name: 'home',
      component: Main,
    },
    {
      path: '/login',
      name: 'login',
      component: Main,
    },
  ],
})
