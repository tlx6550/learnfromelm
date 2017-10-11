<template>
  <transition name="slide">
    <div class="rating_page">
      <span slot="edit" class="edit" @click="editAddress">{{editTitle}}</span>
      <head-top head-title="编辑地址" :go-back='true'></head-top>
      <!--<p>{{removeAddress}}</p>-->
      <section class="address">
        <ul class="addresslist">
          <li v-for="(item,index) in addressList">
            <div>
              <p><span class="badge"><yd-badge>{{index}}</yd-badge></span>{{item.address}}</p>
              <p>
                <span>{{item.phone}}</span>
                <span v-if="item.phonepk">、{{item.phonepk}}</span>
              </p>
            </div>
            <div class="deletesite" v-if="deletesite">
              <span @click.stop="deleteSite(item,index)"><yd-icon size=".8rem" color="#FF685D" name="error"></yd-icon></span>
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
  import {mapGetters,mapMutations,mapActions} from 'vuex'
  import {deleteAddress,getAddressList} from 'src/service/getData'
  export default {
    data(){
      return{
        earn:true,
        newUserName:'',
        btnValid:true,
        editTitle:'编辑',
        deletesite:false,
        addressList:''
      }
    },
    created(){
      //假如刷新页面（观察用户数据的watch函数将失效（没有变化）），而这里从服务器拿地址数据存在延迟，
      //会导致vuex里面取得地址数据了，而页面依赖其数据还没更新渲染
      setTimeout(()=>{
        this.reloadAddrees();
      },1000)
    },
    mounted(){
    },
    computed: {
      ...mapGetters([
        'userInfo','removeAddress'
      ]),
    },
    methods: {
      ...mapActions([
        'saveAddress','deleteRemoveAddress'
      ]),
      ...mapMutations([
        'DELETEREMOVEADDRESS'
      ]),
      reloadAddrees(){
        this.addressList = this.removeAddress;
      },
      initData(){
        if(this.userInfo && this.userInfo.user_id){
         this.saveAddress();
         this.addressList = this.removeAddress;
        }
      },
      fetchData(){
        //从state取数有延迟
        setTimeout(()=>{
          this.reloadAddrees();
        },300)

      },
        editAddress() {
        if(this.btnValid){
          this.editTitle = '完成';
          this.deletesite = true;
          this.btnValid = !this.btnValid;
        }else{
          this.editTitle = '编辑';
          this.deletesite = false;
          this.btnValid = !this.btnValid;
        }

      },
     async deleteSite(item,index){
       //在后加slice创建 其副本，解决Do not mutate vuex store state outside mutation handlers（需要在mutation的回调函数中修改！）
       let removeList = this.removeAddress.slice();
      if (this.userInfo && this.userInfo.user_id) {
         // 不要把把操作业务的逻辑放进action中
         let res = await deleteAddress(this.userInfo.user_id,item.id)
         if(res.status===1){
           //this.removeAddress.splice(index,1),这样会改变原来的数组，也千万不要removeList=removeList.splice(index,1)
           removeList.splice(index,1);
           this.DELETEREMOVEADDRESS(removeList);
           this.$nextTick(() => {
             this.addressList= removeList;
           })

           this.$dialog.toast({
             mes: res.success,
             timeout: 500,
             icon: 'success',
           });
         }else{
           this.$dialog.toast({
             mes: '删除失败！',
             timeout: 500,
             icon: 'error'
           });
         }
       }

      }
    },
    components:{
      headTop
    },
    watch:{
      // 初次加载时候
      userInfo:function (newV) {
        if(newV && newV.user_id){
          this.initData();
        }
      },
      '$route': 'fetchData'
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
    position: absolute;
    top:0.4rem;
    right: 0.4rem;
    z-index: 101;
    @include sc(0.7rem, #fff);
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
          .badge{
            margin-right: 5px;
            & span{
              color:$fc ;
            }
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
