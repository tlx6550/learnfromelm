<template>
  <transition name="slide">
    <div class="rating_page">
      <head-top head-title="编辑地址" :go-back='true'></head-top>
      <section class="address">
        <ul class="addresslist">
          <li v-for="(item,index) in removeAddress">
            <div>
              <p>{{item.address}}</p>
              <p>
                <span>{{item.phone}}</span>
                <span v-if="item.phonepk">、{{item.phonepk}}</span>
              </p>
            </div>
            <div class="deletesite" v-if="deletesite">
              <span @click="deleteSite(index,item)"></span>
            </div>
          </li>
        </ul>
        <yd-cell-group>
          <yd-cell-item arrow type="link" href="/profile/info/address/add">
            <span slot="left">新增地址</span>
            <span slot="right"></span>
          </yd-cell-item>
        </yd-cell-group>
      </section>
      <router-view></router-view>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import headTop from 'components/header/head'
  import {mapGetters,mapMutations} from 'vuex'
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
      ...mapGetters([
        'userInfo','removeAddress'
      ]),
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
  @import '../../../../style/mixin';
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
  .edit{
    right: 0.4rem;
    @include sc(0.7rem, #fff);
    @include ct;
  }
  .address{
    width:100%;
    margin-top:.4rem;
    border-top:1px solid #d9d9d9;
    border-bottom:1px solid #d9d9d9;
    .addresslist{
      background:#fff;
      li{
        border-bottom:1px solid #d9d9d9;
        padding:.4rem;
        @include fj(space-between);
        p{
          line-height:.9rem;
          @include sc(.6rem,#333);
          span{
            display:inline-block;
            @include sc(.6rem,#333);
          }
        }
        .deletesite{
          display:flex;
          align-items:center;
          span{
            display:block;
            @include sc(.8rem,#999)
          }
        }
      }
      li:nth-of-type(1){
        background:#FFF8C3;
      }
    }
    .addsite{
      margin-top:.4rem;
      background:#fff;
      padding:.2rem .4rem;
      border-top:1px solid #d9d9d9;
      @include fj(space-between);
      span{
        display:block;
        @include sc(.7rem,#333);
        line-height:1.4rem;
      }
      .addsvg{
        @include wh(.66667rem,1.4rem);
        svg{
          @include wh(100%,100%);
        }
      }
    }
  }
</style>
