import * as types from './mutation-types'
import {setStore,getStore} from "../config/mUtils"
const  matutaions = {
  /*记录用户信息*/
  [types.RECORD_USERINFO](state,info){
    state.userInfo = info;
    state.login = true;
    setStore('user_id',info.user_id)
  },
  /*获取用户信息存入vuex*/
  [types.GET_USERINFO](state,info){
    /*if (state.userInfo && (state.userInfo.username !== info.username)) {
      return;
    };
    if (!state.login) {
      return
    }
    if (!info.message) {
      state.userInfo = {...info};
    } else {
      state.userInfo = null;
    }*/
    state.userInfo = info;
    state.login = true;
  },
  /*退出登录*/
  [types.OUT_LOGIN](state){
    state.userInfo = {}
    state.login = false
  },
  //修改用户名
  [types.RETSET_NAME](state,username){
    state.userInfo = Object.assign({},state.userInfo,{username})
  },
  //增加地址
  [types.ADD_ADDRESS](state,obj){
    state.removeAddress = [obj,...state.removeAddress]
  },
  //通过搜索，添加地址
  [types.SAVE_ADDDETAIL](state,addAddress){
    state.addAddress=addAddress;
  }
}
export default matutaions
