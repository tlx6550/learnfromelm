import fetch from '../config/fetch'

//获取所有城市
export const groupcity = ()=>fetch('/v1/cities',{
  type:'group'
})
