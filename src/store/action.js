import {getUser} from '../service/getData'
import * as types from './mutation-types'

/*export default {
  async getUserInfo({commit,state}){
    let res = await getUser();
    commit(types.GET_USERINFO,res)
  }
}*/
// 提交mutation的动作，前提一定要保证提交的mutation存在
export const getUserInfo = async function ({commit,state}) {
  let res = await getUser();
  commit(types.GET_USERINFO,res)
}
