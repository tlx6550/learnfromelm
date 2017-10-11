import {getUser,getAddressList,deleteAddress} from '../service/getData'
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
export const saveAddress = async function ({commit,state}) {
  if(state.removeAddress.length > 0) return;
  const addres = await getAddressList(state.userInfo.user_id);
  commit(types.SAVE_ADDRESS, addres);
}
export const addRemoveAddres = function ({commit,state},item) {
  let oldRemoveAddrees = state.removeAddress.slice()
  oldRemoveAddrees.splice(0,0,item)
  commit(types.ADD_ADDRESS,oldRemoveAddrees);
}
export const deleteRemoveAddress = function ({commit,state},removeList) {
  if(state.removeAddress ===0) return;
    commit(types.DELETEREMOVEADDRESS,removeList);
}
