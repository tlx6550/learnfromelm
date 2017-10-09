import App from '../App'
import login from 'page/login/login'
const home = r => require.ensure([], () => r(require('../page/home/home')), 'home')
const forget = r => require.ensure([], () => r(require('../page/forget/forget')), 'forget')
const profile = r => require.ensure([], () => r(require('../page/profile/profile')), 'profile')
const info = r => require.ensure([], () => r(require('../page/profile/children/info')), 'info')
/*const login = r => require.ensure([], () => r(require('../page/login/login')), 'login')*/
// Vue.use(Router)

export default [{
  path:'/',
  component:App,
  children:[
    {
      path: '',
      redirect: '/home'
    },
    {
      path: '/home',
      component: home
    },
    {
      path: '/login',
      component: login
    },
    {
      path: '/forget',
      component: forget
    },
    {
      path:'/profile',
      component:profile,
      children:[{
        path:'info',
        component: info,
      }]
    }
  ]
}]

