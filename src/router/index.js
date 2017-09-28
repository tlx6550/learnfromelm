import Vue from 'vue'
import App from '../App'
import Router from 'vue-router'
import Hello from '@/components/Hello'

/*import home from 'page/home/home'*/
const home = r => require.ensure([], () => r(require('../page/home/home')), 'home')
Vue.use(Router)
console.log(home)

export default [{
  path:'/',
  components:App,
  children:[
    //地址为空时跳转home页面
    {
      path: '',
      redirect: '/home'
    },
    //首页城市列表页
    {
      path: '/home',
      component: home
    }
  ]
}]
/*export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    }
  ]
})*/
