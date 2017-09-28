import App from '../App'
/*import home from 'page/home/home'*/
const home = r => require.ensure([], () => r(require('../page/home/home')), 'home')

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
    }
  ]
}]

