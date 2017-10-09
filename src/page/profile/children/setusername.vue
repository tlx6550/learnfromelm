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
          <p v-if="earn">用户名只能修改一次（5-24字符之间）</p>
          <p class="unlikep" v-if="!earn" >用户名长度在5到24位之间</p>
        </div>
        <div class="btn">
          <yd-button size="large" type="primary">提交</yd-button>
        </div>
      </section>

    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import headTop from 'components/header/head'
  export default {
  data(){
  return{
    earn:true,
    newUserName:''
  }
   },
   created(){
   },
   mounted(){
   },
   computed: {
   },
   methods: {
     resetName(){
       const input = this.$refs.newUserName;
       const valid = `${input.valid}`;
       if(valid){
         this.earn = false;
       }else{
         this.earn = true;
       }
     }
   },
   components:{
     headTop
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
