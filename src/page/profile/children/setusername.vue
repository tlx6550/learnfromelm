<template>
  <transition name="slide">
    <div class="rating_page">
      <head-top head-title="修改用户名" :go-back='true'></head-top>
      <section class="setname">
        <yd-cell-group>
          <yd-cell-item>
            <span slot="left">用户名：</span>
            <yd-input slot="right" @input="resetName" ref="newUserName" required v-model="newUserName" min="5" max="24" placeholder="请输入用户名"></yd-input>
          </yd-cell-item>
          </yd-cell-group>
        <div>
          <p v-if="!earn">用户名只能修改一次（5-24字符之间）</p>
          <p class="unlikep" v-if="earn" >用户名长度在5到24位之间</p>
        </div>
        <div class="btn">
          <button @click="comfirmResetName" class="yd-btn-block" :class="[!btnValid ? 'yd-btn-disabled':'yd-btn-primary']">确认修改</button>
       <!--   <button disabled="disabled" class="yd-btn-block" :class="{'yd-btn-primary':btnValid,'yd-btn-disabled':!btnValid}">提交</button>-->
        </div>
      </section>

    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import headTop from 'components/header/head'
  import {mapMutations} from 'vuex'
  export default {
  data(){
  return{
    earn:true,
    newUserName:'',
    btnValid:false
  }
   },
   created(){
   },
   mounted(){
   },
   computed: {
   },
   methods: {
     ...mapMutations([
       'RETSET_NAME'
     ]),
     resetName(){
       const input = this.$refs.newUserName;
       //注意这个坑！const valid = `${input.valid}`，得到的是一个字符串变量而不是布尔值
       const valid = input.valid;
       if(valid){
         this.earn = false;
         this.btnValid = true;
       }else{
         this.btnValid = false;
         this.earn = true;
       }
     },
     comfirmResetName(){
       if(this.btnValid){
         this.RETSET_NAME(this.newUserName);
         this.$dialog.toast({
           mes: '修改成功',
           timeout: 300,
           icon: 'success',
           callback: () => {
             this.$router.go(-1);
           }
         });
       }
     }
   },
   components:{
     headTop
   },
   watch:{
/*     newUserName(newV){
       const input = this.$refs.newUserName;
       const valid = input.valid;
       if(valid){
         this.earn = false;
       }else{
         this.earn = true;
       }
     }*/
   }
  }
</script>
<style scoped lang="scss" rel="stylesheet/scss">
  @import '../../../style/mixin';
  .rating_page{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 202;
    background:#f2f2f2;
    padding-top: 1.95rem;
    p, span{
      font-family: Helvetica Neue,Tahoma,Arial;
    }
  }
  .setname{
    width:100%;
    padding:0 0.3rem;
    margin:0.5rem auto;
    .unlikep{
      @include sc(.58rem,$danger);
      padding-top:.1rem;
    }
    .setname-top{
      padding-top:.4rem;
      input{
        background:none;
        width:15.2rem;
        border:1px solid #ddd;
        @include borderRadius(2px);
        padding:.2rem .1rem;
        line-height:1.2rem;
        font-size:.7rem;
        display:block;
      }
      .setname-input{
        border-color:#ea3106;
      }
      p{
        width:100%;
        @include sc(.4rem,#666);
        padding:.4rem 0 1rem;
      }

    }
    .reset{
      width:100%;
      background:#3199e8;
      button{
        display:block;
        width:100%;
        background:none;
        line-height:2rem;
        @include sc(.7rem,#fff);
        opacity:.6;
        transition: all 1s;
      }
      .fontopacity{
        transition: all 1s;
        opacity:1;
      }
    }
  }
</style>
