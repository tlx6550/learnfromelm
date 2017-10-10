import fetch from '../config/fetch'
import {getStore} from '../config/mUtils'
//获取所有城市
export const groupcity = ()=>fetch('/v1/cities',{
  type:'group'
});
/**
 * 获取首页热门城市
 */
export const hotcity =()=>fetch('/v1/cities',{
  type:'hot'
});
/**
 * 获取首页默认地址
 */

export const cityGuess = () => fetch('/v1/cities', {
  type: 'guess'
});
/**
 * 检测帐号是否存在
 */

export const checkExsis = (checkNumber, type) => fetch('/v1/users/exists', {
  [type]: checkNumber,
  type
});
/**
 * 获取短信验证码
 */

export const mobileCode = phone => fetch('/v4/mobile/verify_code/send', {
  mobile: phone,
  scene: 'login',
  type: 'sms'
}, 'POST');

/**
 * 手机号登录
 */

export const sendLogin = (code, mobile, validate_token) => fetch('/v1/login/app_mobile', {
  code,
  mobile,
  validate_token
}, 'POST');
/**
 * 获取图片验证码
 */
/**
 * 获取用户信息
 */

export const getUser = () => fetch('/v1/user', {user_id: getStore('user_id')});
export const getcaptchas = () => fetch('/v1/captchas', {},'POST');
/**
 * 账号密码登录
 */
export const accountLogin = (username, password, captcha_code) => fetch('/v2/login', {username, password, captcha_code}, 'POST');
/**
 * 改密码
 */
export const changePassword = (username, oldpassWord, newpassword, confirmpassword, captcha_code) => fetch('/v2/changepassword', {username, oldpassWord, newpassword, confirmpassword, captcha_code}, 'POST');

/**
 * 退出登录
 */
export const signout = () => fetch('/v2/signout');
/**
 * 添加地址
 */

export const postAddAddress = (userId, address, address_detail, geohash, name, phone, phone_bk, poi_type, sex, tag, tag_type) => fetch('/v1/users/' + userId + '/addresses', {
  address,
  address_detail,
  geohash,
  name,
  phone,
  phone_bk,
  poi_type,
  sex,
  tag,
  tag_type,
}, 'POST');
/**
 * 搜索地址
 */

export const searchNearby = keyword => fetch('/v1/pois', {
  type: 'nearby',
  keyword
});
