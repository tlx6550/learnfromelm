<template>
  <transition name="slide">
    <div class="rating_page">
      <head-top head-title="新增地址" :go-back='true'></head-top>
      <section class="adddetail">
        <form action="" @submit.prevent>
        <yd-cell-group>
          <yd-cell-item>
            <span slot="left">姓名:</span>
            <yd-input v-model="message" slot="right" required type="text" placeholder="请填写你的姓名"></yd-input>
          </yd-cell-item>
          <yd-cell-item type="link" href="/profile/info/address/add/addDetail">
            <span slot="left">地址:</span>
            <yd-input v-model="addAddress" slot="right" type="text" placeholder="小区/写字楼/学校等"></yd-input>
          </yd-cell-item>
          <yd-cell-item>
            <span slot="left">送餐地址:</span>
            <yd-input v-model="mesthree" slot="right" required type="text" placeholder="请填写详细送餐地址"></yd-input>
          </yd-cell-item>
          <yd-cell-item>
            <span slot="left">联系方式:</span>
            <yd-input v-model="telenum" slot="right" required type="number" placeholder="请填写能够联系到您的手机号"></yd-input>
          </yd-cell-item>
          <yd-cell-item>
            <span slot="left">备留电话:</span>
            <yd-input v-model="standbytelenum" slot="right" type="number" placeholder="备用联系电话（选填）"></yd-input>
          </yd-cell-item>
        </yd-cell-group>
        </form>
      </section>
      <div class="btn">
        <button class="yd-btn-block yd-btn-primary">新增地址</button>
      </div>
      <router-view></router-view>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import headTop from 'components/header/head'
  import {mapMutations} from 'vuex'
  export default {
    data(){
      return{
        sendaddress:'',  //地址
        message:'', //信息
        mesthree:'', //送餐地址
        telenum:'', //手机号
        telephone:'', //手机号提示
        standbytele:'', //备用手机号提示
        standbytelenum:'', //备用手机号
        addSearch:false, //添加搜索地址
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
  @import '../../../../../style/mixin';
  .rating_page{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 202;
    background:#f2f2f2;
    padding-top: 1.95rem;
  }
  .address{
    width:100%;
    margin:0.5rem auto;
  }
  .btn{
    width:100%;
    padding:0 0.3rem;
    margin:0.5rem auto;
  }
</style>
