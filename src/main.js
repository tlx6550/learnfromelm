// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import './config/rem'
// 使用路由组件
import VueRouter from 'vue-router'
/*使用Mint Ui*/
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'
Vue.use(Mint);
//引入定义的路由页面
import routerPages from './router/index'


import FastClick from 'fastclick'
import {routerMode} from './config/env'


Vue.config.productionTip = false
//当文档加载解析完执行（不含css、js等文件）
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
    FastClick.attach(document.body);
  }, false);
}
Vue.use(VueRouter)

/*如何在返回时返回到上次滚动位置http://m.blog.csdn.net/zjl516088421/article/details/77937440*/
const router = new VueRouter({
  routes:routerPages,
  mode: routerMode,
  strict: process.env.NODE_ENV !== 'production',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop;
      }
      return { x: 0, y: to.meta.savedPosition ||0}
    }
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
