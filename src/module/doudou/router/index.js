import Vue from 'vue'
import Router from 'vue-router'
import RyList from '../../../componments/doudou/ryList/ryList'
import RyMy from '../../../componments/doudou/ryMy/ryMy'
import RyMain from '../../../componments/doudou/ryMain/ryMain'
import RyQrcode from '../../../componments/doudou/ryQrcode/ryQrcode'
import RyBuy from '../../../componments/doudou/ryBuy/ryBuy'
import RyResult from '../../../componments/doudou/ryResult/ryResult'
import config from '../../../../config'
import setting from '../setting'

Vue.use(Router)

// console.log(process.env.RUN_ENV)

export default new Router({
  mode: 'history',
  base: `${config.produceName}/${config.moduleRootName}/${setting.moduleName}`,
  routes: [
    {
      name: 'main',
      path: '/main',
      component: RyMain,
      meta: {title: 'doudou'},
      redirect: {name: 'list'},
      children: [
        {
          name: 'list',
          path: 'list',
          component: RyList,
          meta: {title: 'doudou'},
        },
        {
          name: 'my',
          path: 'my',
          component: RyMy,
          meta: {title: '我的卡包'},
        },
      ],
    },
    {
      name: 'qrcode',
      path: '/qrcode',
      component: RyQrcode,
      meta: {title: '卡券二维码'},
    },
    {
      name: 'buy',
      path: '/buy',
      component: RyBuy,
      meta: {title: '卡券详情'},
    },
    {
      name: 'result',
      path: '/result',
      component: RyResult,
      meta: {title: '支付结果'},
    },
    {
      path: '*',
      redirect: {name: 'list'},
      component: Vue.extend({
        template: '<router-view transition="fade" transition-mode="out-in"></router-view>',
      }),
    },
  ],
})
