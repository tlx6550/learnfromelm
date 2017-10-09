<template>
  <transition name="slide">
  <div class="rating_page">
    <head-top head-title="账户信息" :go-back=true></head-top>
    <section class="profile-info">
      <yd-cell-group>
        <yd-cell-item>
          <span slot="left">修改头像</span>
          <span slot="right">
            <input type="file" class="profileinfopanel-upload" @change="uploadAvatar">
            <img  v-if="userInfo" :src="imgBaseUrl + userInfo.avatar" class="headportrait-div-top">
            <span class="headportrait-div-top" v-else>
              <i class="fa fa-user-circle"></i>
            </span>
          </span>
        </yd-cell-item>

        <yd-cell-item arrow type="link" href="/profile/setusername">
          <span slot="left">用户名</span>
          <span slot="right">{{username}}</span>
        </yd-cell-item>
        <yd-cell-item arrow type="link" href="/profile/info/address">
          <span slot="left">收货地址</span>
          <span slot="right"></span>
        </yd-cell-item>
      </yd-cell-group>
      <yd-cell-group title="帐号绑定">
        <yd-cell-item arrow href="#"  @click.native="changePhone">
          <yd-icon slot="icon" name="phone3" size=".8rem"></yd-icon>
          <span slot="left">手机</span>
        </yd-cell-item>
      </yd-cell-group>
      <yd-cell-group title="安全设置">
        <yd-cell-item arrow href="/forget" type="link">
          <span slot="left">登录密码</span>
          <span slot="right">修改</span>
        </yd-cell-item>
      </yd-cell-group>
    </section>
    <section class="section-btn">
      <yd-button size="large" type="danger" shape="circle"  @click.native="exitlogin">退出登录</yd-button>
    </section>
  </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import headTop from 'components/header/head'
  import {baseUrl} from '../../../config/env'
  import {imgBaseUrl} from '../../../config/env'
  import {mapGetters,mapMutations} from 'vuex'
  import {signout} from '../../../service/getData'
  import {removeStore} from '../../../config/mUtils'
  export default {
  data(){
    return{
      username:'',    //用户名
      avatar:'',      //用户头像
      imgBaseUrl,
      loginOutMsg:'',
      that:''
    }
   },
   created(){
    this.that = this;
   },
   mounted(){
   },
   computed: {
     ...mapGetters([
       'userInfo'
     ])
   },
   methods: {
     //async 表示这是一个async函数，[await]只能用在这个函数里面!(配对出现)。
     async uploadAvatar(){
      if(this.userInfo){
        let input = document.querySelector('.profileinfopanel-upload')
        let data = new FormData();
        //FormData 对象的使用
        // https://developer.mozilla.org/zh-CN/docs/Web/API/FormData/Using_FormData_Objects
        data.append('file',input.files[0])
        try{
          let response = await fetch('/eus/v1/users/' + this.userInfo.user_id + '/avatar', {
            method: 'POST',
            credentials: 'include',
            body: data
          })
          let res = await response.json();
          if (res.status == 1) {
            this.userInfo.avatar = res.image_path;
          }
        }catch (error){
          this.$dialog.alert({mes: '上传失败'});
          throw new Error(error);
        }
      }
     },
     changePhone(){
       this.$dialog.alert({mes: '绑定手机'});
     },
     exitlogin(){
       this.$dialog.confirm({
         title: '退出登录',
         mes: '确认退出吗？',
         opts: () => {
           this.that.outLogin();
           this.$dialog.notify({
             mes: '退出成功',
             timeout:800,
             callback: () => {
               this.that.$router.go(-1);
             }
           });
         }
       })
     },
     async outLogin(){
       this.OUT_LOGIN();
       removeStore('user_id');
       await signout();
     },
     ...mapMutations([
       'OUT_LOGIN'
     ]),
   },
   components:{
     headTop
   }
  }
</script>
<style scoped lang="scss" rel="stylesheet/scss">
  @import '../../../style/mixin';
  /*.slide-enter-active,.slide-leave-active{
    transition :all 0.3s
  }

  .slide-enter,.slide-leave-to{
    transform:translate3d(100%,0,0)
  }*/
  .rating_page{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #f2f2f2;
    z-index: 202;
    padding-top: 1.95rem;
    p, span{
      font-family: Helvetica Neue,Tahoma,Arial;
    }
  }
  .profile-info{
    .profileinfopanel-upload{
      display: block;
      position: absolute;
      opacity: 0;
      left: 0;
      @include wh(100%,2rem);
    }
    .headportrait-div-top{
      @include wh(2rem,2rem);
      @include borderRadius(50%);
      vertical-align:middle;
      & .fa{
        font-size: .8rem;
      }
    }
    .headportrait{
      margin-top:.4rem;
      padding:.5rem .4rem;
      @include fj(space-between);
      align-items:center;
      border-top:1px solid #ddd;
      background:#fff;

      h2{
        @include sc(.6rem,#333);
        font-weight:500;
        display:flex;
        align-items:center;
      }
      .headportrait-div{
        span{
          display:inline-block;

          svg{
            @include wh(100%,100%);
          }
        }

        .headportrait-div-bottom{
          @include wh(.66667rem,1.4rem);
          position:relative;
          top:0.44rem;
        }
      }
    }
    .headportraitwo{
      margin-top:0;
      padding:.3rem .4rem;
      .headportrait-div{
        @include fj(left)
        p{
          text-align:left;
          line-height:1.39rem;
          @include sc(.7rem,#999);
          margin-right:.2rem;
          font-weight:100;
          font-family:Arial;
        }
        .headportrait-div-bottom{
          top:0;
        }
      }
    }
    .headportraithree{
      border-bottom:1px solid #ddd;
    }
    .bind-phone{
      padding:.4rem .4rem;
      @include sc(.5rem,#666);
    }
    .exitlogin{
      width:96%;
      margin:1.3rem auto 0;
      line-height:1.5rem;
      @include borderRadius(5px);
      text-align:center;
      background:#d8584a;
      @include sc(.6rem,#fff);

    }
    .exitlogin:active{
      opacity:.8;
      background:#C1C1C1;
    }
  }
  .info-router{
    display:block;
  }
  .coverpart{
    @include wh(100%,100%);
    @include allcover;
    .cover-background{
      @include wh(100%,100%);
      @include allcover;
      background:#000;
      z-index:100;
      opacity:.2;
    }
    .cover-content{
      width:94%;
      background:$fc;
      padding:17px;
      position:absolute;
      top:20%;
      left:3%;
      z-index:1000;
      @include borderRadius(5px);
      .sa-icon{
        @include wh(90px,90px);
        border:4px solid #f8bb86;
        @include borderRadius(50%);
        margin:20px auto;
        position:relative;
        .sa-body{
          @include wh(5px,47px);
          @include borderRadius(2px);
          background:#f8bb86;
          @include cl;
          top:10px;
        }
        .sa-dot{
          @include wh(7px,7px);
          @include borderRadius(50%);
          background:#f8bb86;
          @include cl;
          bottom:10px;
        }
      }
      h2{
        width:100%;
        text-align:center;
        @include sc(30px,#575757);
        font-weight:500;
        margin:25px 0;
      }
      .sa-botton{
        width:100%;
        text-align:center;

        button{
          display:inline-block;
          padding:.4rem 1rem;
          @include borderRadius(5px);
          @include sc(.6rem,$fc);
          letter-spacing:1px;
          margin-top:26px;
        }
        .waiting{
          background:#C1C1C1;
          margin-right:.4rem;
        }
        .quitlogin{
          background:rgb(221, 107, 85);
        }
      }

    }
  }
  .section-btn{
    padding: 0.5rem;
  }
  @-webkit-keyframes bounceIn {
    from, 20%, 40%, 60%, 80%, 100% {
      -webkit-animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
      animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
    }

    0% {
      opacity: 0;
      -webkit-transform: scale3d(.3, .3, .3);
      transform: scale3d(.3, .3, .3);
    }

    20% {
      -webkit-transform: scale3d(1.1, 1.1, 1.1);
      transform: scale3d(1.1, 1.1, 1.1);
    }

    40% {
      -webkit-transform: scale3d(.9, .9, .9);
      transform: scale3d(.9, .9, .9);
    }

    60% {
      opacity: 1;
      -webkit-transform: scale3d(1.03, 1.03, 1.03);
      transform: scale3d(1.03, 1.03, 1.03);
    }

    80% {
      -webkit-transform: scale3d(.97, .97, .97);
      transform: scale3d(.97, .97, .97);
    }

    100% {
      opacity: 1;
      -webkit-transform: scale3d(1, 1, 1);
      transform: scale3d(1, 1, 1);
    }
  }

  @keyframes bounceIn {
    from, 20%, 40%, 60%, 80%, 100% {
      -webkit-animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
      animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
    }

    0% {
      opacity: 0;
      -webkit-transform: scale3d(.3, .3, .3);
      transform: scale3d(.3, .3, .3);
    }

    20% {
      -webkit-transform: scale3d(1.1, 1.1, 1.1);
      transform: scale3d(1.1, 1.1, 1.1);
    }

    40% {
      -webkit-transform: scale3d(.9, .9, .9);
      transform: scale3d(.9, .9, .9);
    }

    60% {
      opacity: 1;
      -webkit-transform: scale3d(1.03, 1.03, 1.03);
      transform: scale3d(1.03, 1.03, 1.03);
    }

    80% {
      -webkit-transform: scale3d(.97, .97, .97);
      transform: scale3d(.97, .97, .97);
    }

    100% {
      opacity: 1;
      -webkit-transform: scale3d(1, 1, 1);
      transform: scale3d(1, 1, 1);
    }
  }
  @-webkit-keyframes zoomOut {
    from {
      opacity: 1;
    }

    50% {
      opacity: 0;
      -webkit-transform: scale3d(.3, .3, .3);
      transform: scale3d(.3, .3, .3);
    }

    100% {
      opacity: 0;
    }
  }

  @keyframes zoomOut {
    from {
      opacity: 1;
    }

    50% {
      opacity: 0;
      -webkit-transform: scale3d(.3, .3, .3);
      transform: scale3d(.3, .3, .3);
    }

    100% {
      opacity: 0;
    }
  }
  body .coverpart .cover-animate{
    transition:all 1s;
    animation:bounceIn .6s;
  }
  body .coverpart .cover-animate-leave{
    animation:zoomOut .4s;
  }
  .router-slid-enter-active, .router-slid-leave-active {
    transition: all .4s;
  }
  .router-slid-enter, .router-slid-leave-active {
    transform: translate3d(2rem, 0, 0);
    opacity: 0;
  }
</style>
