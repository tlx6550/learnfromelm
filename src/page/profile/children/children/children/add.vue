<template>
  <transition name="slide">
    <div class="rating_page">
      <head-top head-title="新增地址" :go-back='true'></head-top>
      <section class="adddetail">
        <yd-cell-group>
          <yd-cell-item>
            <span slot="left">姓名:</span>
            <yd-input ref="message" v-model="message" slot="right" required type="text" placeholder="请填写你的姓名"></yd-input>
          </yd-cell-item>
          <yd-cell-item type="link" href="/profile/info/address/add/addDetail">
            <span slot="left">地址:</span>
            <yd-input  ref="refaddAddress" v-model="addAddress" slot="right" type="text" placeholder="小区/写字楼/学校等"></yd-input>
          </yd-cell-item>
          <yd-cell-item >
            <span slot="left">送餐地址:</span>
            <yd-input ref="mesthree" v-model="mesthree" slot="right" required type="text" placeholder="请填写详细送餐地址"></yd-input>
          </yd-cell-item>
          <yd-cell-item >
            <span slot="left">联系方式:</span>
            <yd-input ref="telenum" v-model="telenum" slot="right" regex="mobile" required type="number" placeholder="请填写能够联系到您的手机号"></yd-input>
          </yd-cell-item>
          <yd-cell-item>
            <span slot="left">备留电话:</span>
            <yd-input v-model="standbytelenum" slot="right" type="number" placeholder="备用联系电话（选填）"></yd-input>
          </yd-cell-item>
        </yd-cell-group>
      </section>
      <div class="btn">
       <!-- <button  @click.native="aa" class="yd-btn-block" :class="[!checkF ? 'yd-btn-disabled':'yd-btn-primary']">新增地址</button>-->
        <yd-button size="large" @click.native="myAdd" type="primary">新增地址</yd-button>
      </div>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
      <
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import headTop from 'components/header/head'
  import {postAddAddress} from 'src/service/getData'
  import {mapGetters,mapMutations} from 'vuex'
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
        checkF:false,
      }
    },
    created(){
    },
    mounted(){
    },
    computed: {
      ...mapGetters([
        'userInfo', 'addAddress','removeAddress','newAddress', 'geohash'
      ])
    },
    methods: {
      ...mapMutations([
        'ADD_ADDRESS'
      ]),
      checkInput(){
        const message =  this.$refs.message;
        const refaddAddress = this.$refs.refaddAddress;
        const mesthree =  this.$refs.mesthree;
        const telenum =  this.$refs.telenum;
        const checkFlag = message.valid && refaddAddress.valid && mesthree.valid && telenum.valid;
        return checkFlag;
      },
      async  myAdd(){
        if(this.checkInput()){
          let res = await postAddAddress(this.userInfo.user_id, this.mesthree, this.addAddress, this.geohash, this.message, this.telenum, this.standbytelenum, 0, 1, '公司', 4);
          if( res.status===1 ){
            this.$dialog.toast({
              mes: '新增成功',
              timeout: 300,
              icon: 'success',
              callback: () => {
                this.ADD_ADDRESS({
                  name: this.message,
                  address: this.mesthree,
                  address_detail: this.addAddress,
                  geohash: 'wtw37r7cxep4',
                  phone: this.telenum,
                  phone_bk: this.standbytelenum,
                  poi: this.addAddress,
                  poi_type: 0,
                });
                this.$router.go(-1);
              }
            });
          }else{
            this.$dialog.toast({
              mes: '新增失败！',
              timeout: 500,
              icon: 'error'
            });
          }
        }else{
          this.$dialog.toast({
            mes: '请填写正确信息',
            timeout: 500,
            icon: 'error'
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
