import App from '../App'
import login from 'page/login/login'
const home = r => require.ensure([], () => r(require('../page/home/home')), 'home')
const forget = r => require.ensure([], () => r(require('../page/forget/forget')), 'forget')
const profile = r => require.ensure([], () => r(require('../page/profile/profile')), 'profile')
const info = r => require.ensure([], () => r(require('../page/profile/children/info')), 'info')
const service = r => require.ensure([], () => r(require('../page/service/service')), 'service')
const setusername = r => require.ensure([], () => r(require('../page/profile/children/setusername')), 'setusername')
const address = r => require.ensure([], () => r(require('../page/profile/children/children/address')), 'address')
const add = r => require.ensure([], () => r(require('../page/profile/children/children/children/add')), 'add')
const addDetail = r => require.ensure([], () => r(require('../page/profile/children/children/children/children/addDetail')), 'addDetail')
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
      children:[
        {
        path:'info',
        component: info,
          children:[{
            path:'address',
            component:address,
            children:[{
              path:'add',
              component:add,
              children:[{
                path:'addDetail',
                component:addDetail
              }]
            }]
          } ]
        },
        {
          path:'setusername',
          component: setusername
        },
        {
          path: 'service', //服务中心
          component: service
        }
      ]
    },
    {
      path: 'service', //服务中心
      component: service
    }
  ]
}]

