<template>
  <div class="loginContainer">
    <head-top :head-title="loginWay? '登录':'密码登录'" :goBack=true></head-top>
    <form class="loginForm" v-if="loginWay">
      <section class="input_container phone_number">
        <input type="text" placeholder="账号密码随便输入" name="phone" maxlength="11" v-model="phoneNumber">
        <button @click.prevent="getVerifyCode" :class="{right_phone_number:rightPhoneNumber}" v-show="!computedTime">获取验证码</button>
        <button  @click.prevent v-show="computedTime">已发送({{computedTime}}s)</button>
      </section>
      <section class="input_container">
        <input type="text" placeholder="验证码" name="mobileCode" maxlength="6" v-model="mobileCode">
      </section>
    </form>
    <form class="loginForm" v-else>
      <section class="input_container">
        <!--修饰符：.lazy - 取代 input 监听 change 事件-->
        <input type="text" placeholder="账号" v-model.lazy="userAccount">
      </section>
      <section class="input_container">
        <input type="password" v-if="!showPassword" placeholder="密码" v-model="passWord">
        <input v-else type="text" placeholder="密码"  v-model="passWord">
        <div class="button_switch" >
          <yd-switch v-model="showPassword"></yd-switch>
        </div>
      </section>
      <section class="input_container">
        <input type="text" placeholder="验证码" maxlength="4" v-model="codeNumber">
        <div class="img_change_img">
          <img v-show="captchaCodeImg" :src="captchaCodeImg">
          <div class="change_img" @click="getCaptchaCode">
            <p>看不清</p>
            <p>换一张</p>
          </div>
        </div>
      </section>

    </form>
    <p class="login_tips">
      温馨提示：未注册过的账号，登录时将自动注册
    </p>
    <p class="login_tips">
      注册过的用户可凭账号密码登录
    </p>

    <div class="login_container">
      <yd-button size="large" type="primary" @click.native="mobileLogin">登陆</yd-button>
    </div>
    <div class="login_container">
      <router-link  to="/forget"v-if="!loginWay">
        <yd-button size="large" type="hollow">重置密码</yd-button>
      </router-link>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  import headTop from 'components/header/head'
  import {mobileCode, checkExsis, sendLogin, getcaptchas, accountLogin} from '../../service/getData'
  import {mapMutations} from 'vuex'
  export default {
    data(){
      return {
        loginWay: false, //登录方式，默认短信登录
        showPassword: false, // 是否显示密码
        phoneNumber: null, //电话号码
        mobileCode: null, //短信验证码
        validate_token: null, //获取短信时返回的验证值，登录时需要
        computedTime: 0, //倒数记时
        userInfo: null, //获取到的用户信息
        userAccount: null, //用户名
        passWord: null, //密码
        captchaCodeImg: null, //验证码地址
        codeNumber: null, //验证码
        showAlert: false, //显示提示组件
        alertText: null, //提示的内容
      }
    },
    methods:{
      //获取短信验证码
      //https://segmentfault.com/a/1190000007535316
      //async 用于申明一个 function 是异步的,其返回值是一个 Promise 对象。
      async getVerifyCode(){
        if (this.rightPhoneNumber) {
          this.computedTime = 30;
          this.timer = setInterval(() => {
            this.computedTime --;
            if (this.computedTime == 0) {
              clearInterval(this.timer)
            }
          }, 1000)
          //判读用户是否存在
          let exsis = await checkExsis(this.phoneNumber, 'mobile');
          if (exsis.message) {
            this.showAlert = true;
            this.alertText = exsis.message;
            return
          }else if(!exsis.is_exists) {
            this.showAlert = true;
            this.alertText = '您输入的手机号尚未绑定';
            return
          }
          //发送短信验证码
          let res = await mobileCode(this.phoneNumber);
          if (res.message) {
            this.showAlert = true;
            this.alertText = res.message;
            return
          }
          this.validate_token = res.validate_token;
      }
    },
      //获取验证吗，线上环境使用固定的图片，生产环境使用真实的验证码
      async getCaptchaCode(){
        let res = await getcaptchas();
        this.captchaCodeImg = res.code;
      },
      //发送登录信息
      async mobileLogin(){
        if (this.loginWay) {
          if (!this.rightPhoneNumber) {
            this.$dialog.alert({mes: '手机号码不正确'});
            return
          }else if(!(/^\d{6}$/gi.test(this.mobileCode))){
            this.$dialog.alert({mes: '短信验证码不正确'});
            return
          }
          //手机号登录
          this.userInfo = await sendLogin(this.mobileCode, this.phoneNumber, this.validate_token);
        }else{
          if (!this.userAccount) {
            this.$dialog.alert({mes: '请输入手机号/邮箱/用户名'});
            return
          }else if(!this.passWord){
            this.$dialog.alert({mes: '请输入密码'});
            return
          }else if(!this.codeNumber){
            this.$dialog.alert({mes: '请输入验证码'});
            return
          }
          //用户名登录
          this.userInfo = await accountLogin(this.userAccount, this.passWord, this.codeNumber);
        }
        //如果返回的值不正确，则弹出提示框，返回的值正确则返回上一页
        if (!this.userInfo.user_id) {
          this.$dialog.alert({mes: this.userInfo.message});
          if (!this.loginWay) this.getCaptchaCode();
        }else{
          this.RECORD_USERINFO(this.userInfo);
          this.$router.go(-1);

        }
      },
      ...mapMutations([
        'RECORD_USERINFO'
      ])

   },
    created(){
      this.getCaptchaCode();
    },
    computed:{
        rightPhoneNumber:function () {
          return /^1\d{10}$/gi.test(this.phoneNumber)
        }
      },
   components:{
    headTop
  }
  }
</script>
<style lang="scss" scoped>
  @import '../../style/mixin';
  .loginContainer{
    padding-top: 1.95rem;
    p, span, input{
      font-family: Helvetica Neue,Tahoma,Arial;
    }
  }
  .change_login{
    position: absolute;
    @include ct;
    right: 0.75rem;
    @include sc(.7rem, #fff);
  }

  .loginForm{
    background-color: #fff;
    margin-top: .6rem;
    .input_container{
      display: flex;
      justify-content: space-between;
      padding: .6rem .8rem;
      border-bottom: 1px solid #f1f1f1;
      input{
        flex: 1;
        padding-right: 0.5rem;
        height: 32px;
        line-height: 32px;
      }
      button{
        @include sc(.65rem, #fff);
        font-family: Helvetica Neue,Tahoma,Arial;
        padding: .28rem .4rem;
        border: 1px;
        border-radius: 0.15rem;
      }
      .right_phone_number{
        background-color: #4cd964;
      }
    }
    .phone_number{
      padding: .3rem .8rem;
    }
    .img_change_img{
      display: flex;
      flex: 0 0 100px;
      width: 100px;
      align-items: center;
      img{
        @include wh(3.5rem, 1.5rem);
        margin-right: .2rem;
      }
      .change_img{
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        width: 3rem;
        justify-content: center;
        p{
          @include sc(.55rem, #666);
        }
        p:nth-of-type(2){
          color: #3b95e9;
          margin-top: .2rem;
        }
      }
    }
  }
  .login_tips{
    @include sc(.5rem, red);
    padding: .4rem .6rem;
    line-height: .5rem;
    a{
      color: #3b95e9;
    }
  }
  .login_container{
    margin: 0 .5rem 1rem;
    height: 52px;
    line-height: 52px;
    padding: .5rem 0;
  }
  .button_switch{

  }
  .change_to_text{
    background-color: #4cd964;
  }
  .to_forget{
    float: right;
    @include sc(.6rem, #3b95e9);
    margin-right: .3rem;
  }
</style>
