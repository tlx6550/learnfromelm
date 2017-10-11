<template>
  <transition name="slide">
    <div class="rating_page">
      <head-top head-title="搜索地址" :go-back='true'></head-top>
      <section class="adddetail">
        <yd-cell-group>
          <yd-cell-item>
            <yd-input slot="left" v-model="inputAdress"  placeholder="请输入小区/写字楼/学校等"></yd-input>
            <span slot="right"><yd-button type="primary" @click.native="addcomfirm">确认</yd-button></span>
          </yd-cell-item>
        </yd-cell-group>
        <div class="warnpart">为了满足商家的送餐要求，建议您从列表中选择地址</div>
        <div class="point" v-show="warning">
          <p>找不到地址？</p>
          <p>请尝试输入小区、写字楼或学校名</p>
          <p>详细地址（如门牌号）可稍后输入哦。</p>
        </div>
      </section>
      <section class="poisearch-container">
        <ul>
          <li v-for="(item,index) in adressList" @click="selectItem(index)">
            <p>{{item.name}}</p>
            <p>{{item.address}}</p>
          </li>
        </ul>
      </section>
      <router-view></router-view>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import headTop from 'components/header/head'
  import {searchNearby} from 'src/service/getData'
  import {mapGetters,mapMutations} from 'vuex'
  export default {
    data(){
      return{
        warning:true,
        inputAdress:'岗地拿个',
        adressList:[],
      }
    },
    created(){
      this.inputAdress = this.addAddress ? this.addAddress : this.inputAdress
    },
    mounted(){
    },
    computed: {
      ...mapGetters([
       'addAddress'
      ])
    },
    methods: {
      ...mapMutations([
        'SAVE_ADDDETAIL'
      ]),
      async  addcomfirm(){
        let res = await searchNearby(this.inputAdress);
        this.adressList = res;
        this.warning=true;
        if(this.adressList.length > 0){
          this.warning = false;
          if(this.inputAdress == ''){
            this.adressList=[];
            this.warning=true;
          }
        }
      },
      selectItem(index){
        this.SAVE_ADDDETAIL(this.adressList[index].name);
        this.$router.go(-1);
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
  @import '../../../../../../style/mixin';
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
  .warnpart{
    background:#FFF6E4;
    @include sc(.62rem,#FF883F);
    text-align:center;
    padding: .2rem 0;
  }
  .point{
    margin-top: 3rem;
    width:100%;
    p{
      width:100%;
      text-align:center;
      @include sc(.7rem,#969696);
      margin-bottom:.4rem;
    }
  }
  .poisearch-container{
    background:#f2f2f2;
    li{
      border-bottom:1px solid #ccc;
      padding:.4rem;
      p{
        @include sc(.65rem,#969696);
      }
      p:first-child{
        margin-bottom:.2rem;
      }
    }
    li:last-child{
      border:0;
    }
  }
</style>
