import App from '../App'
/*import home from 'page/home/home'*/
const home = r => require.ensure([], () => r(require('../page/home/home')), 'home')
const login = r => require.ensure([], () => r(require('../page/login/login')), 'login')
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
  ]
}]

