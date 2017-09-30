<template>
  <div class="restContainer">
    <head-top head-title="重置密码" :goBack=true></head-top>
    <form class="restForm">
      <yd-cell-group>
        <yd-cell-item>
          <span slot="left">账号：</span>
          <yd-input slot="right" required v-model="phoneNumber" regex="mobile"  @input="inputPhone" placeholder="请输入用户名"></yd-input>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">旧密码：</span>
          <yd-input slot="right" type="password" v-model="oldPassWord" placeholder="旧密码"></yd-input>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">新密码：</span>
          <yd-input slot="right" type="password" v-model="newPassWord" placeholder="新密码"></yd-input>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">确认密码：</span>
          <yd-input slot="right" type="password" v-model="confirmPassWord" placeholder="请输入密码"></yd-input>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">验证码：</span>
          <yd-input slot="right" type="text" v-model="mobileCode" placeholder="请输入验证码"></yd-input>
          <div slot="right" class="img_change_img">
            <img v-show="captchaCodeImg" :src="captchaCodeImg"  @click.stop="getCaptchaCode">
          </div>
        </yd-cell-item>
      </yd-cell-group>
    </form>
    <div class="login_container" @click.stop="resetButton">
      <yd-button size="large" type="primary">确认修改</yd-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import headTop from 'components/header/head'
  import {mobileCode,getcaptchas , checkExsis,changePassword} from '../../service/getData'
  export default {
    data(){
      return{
        phoneNumber: null, //电话号码
        oldPassWord: null,
        newPassWord: null, //新密码
        rightPhoneNumber: false, //输入的手机号码是否符合要求
        confirmPassWord: null, //确认密码
        captchaCodeImg: null, //验证码地址
        mobileCode: null, //短信验证码
        computedTime: 0, //倒数记时
        showAlert: false, //显示提示组件
        alertText: null, //提示的内容
        accountType: 'mobile',//注册方式
        captchaCodeImg: null,
      }
    },
    methods:{
      //判断输入的电话号码
      inputPhone(){
        if(/.+/gi.test(this.phoneNumber)){
          this.rightPhoneNumber = true;
        }else{
          this.rightPhoneNumber = false;
        }
      },
      //获取验证吗
      async getVerifyCode(){
        if(this.rightPhoneNumber){
          this.computedTime = 30;
          this.timer = setInterval(()=>{
            this.computedTime--;
            if(this.computedTime === 0){
              clearTimeout(this.timer)
            }
          },1000)
          //判断用户是否存在
          let res = await checkExsis(this.phoneNumber, this.accountType);
          //判断返回的信息是否正确，用户是否注册
          if(res.message){
            this.$dialog.alert({mes: res.message});
          }else if(!res.is_exists){
            this.$dialog.alert({mes: '您输入的手机号尚未绑定'});
            return
          }
          //获取验证信息
          let getCode = await mobileCode(this.phoneNumber);
          if(getCode.message){
            this.$dialog.alert({mes: getCode.message});
            return
          }
          this.validate_token = getCode.validate_token;
        }
      },
      // 生成验证码
      async getCaptchaCode(){
        let res = await getcaptchas();
        this.captchaCodeImg = res.code;
      },
      //重置密码
      async resetButton(){
        if(!this.rightPhoneNumber){
          this.$dialog.alert({mes: '请输入正确的账号'});
          return
        }else if(!this.oldPassWord){
          this.$dialog.alert({mes: '请输入旧密码'});
          return
        }else if(!this.newPassWord){
          this.$dialog.alert({mes: '请输入新密码'});
          return
        }else if(!this.confirmPassWord){
          this.$dialog.alert({mes: '请输确认密码'});
          return
        }else if(this.newPassWord !== this.confirmPassWord){
          this.$dialog.alert({mes: '两次输入的密码不一致'});
          return
        }else if(!this.mobileCode){
          this.$dialog.alert({mes: '请输验证码'});
          return
        }
        // 发送重置信息
        let res = await changePassword(this.phoneNumber, this.oldPassWord, this.newPassWord, this.confirmPassWord, this.mobileCode);
        if (res.message) {
          this.$dialog.alert({mes: res.message});
          this.getCaptchaCode()
          return
        }else{
          this.$dialog.alert({mes: '密码修改成功'});
        }
      }
    },
    created(){
      this.getCaptchaCode()
    },
    components: {
      headTop
    }
  }
</script>
<style scoped lang="scss" rel="stylesheet/scss">
  @import '../../style/mixin';

  .restContainer{
    padding-top: 1.95rem;
  }
  .login_container{
    margin: 1rem .5rem;
  }
  .restForm{
    margin-top: 0.6rem;
  }
  .img_change_img{

  }
</style>
