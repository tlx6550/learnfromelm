<template>
  <div id="foot_guide">
    <section @click = "gotoAddress({path: '/msite', query: {geohash}})" class="guide_item" :class="{'active':$route.path.indexOf('msite') !== -1}">
      <i class="fa fa-shopping-cart"></i>
      <span>外卖</span>
    </section>
    <section @click = "gotoAddress({path: '/search/' + geohash})" class="guide_item" :class="{'active':$route.path.indexOf('search') !== -1}">
      <i class="fa fa-search"></i>
      <span>搜索</span>
    </section>
    <section @click = "gotoAddress('/order')" class="guide_item" :class="{'active':$route.path.indexOf('order') !== -1}">
      <i class="fa fa-file-text-o"></i>
      <span>订单</span>
    </section>
    <section @click.stop = "gotoAddress('/profile')" class="guide_item" :class="{'active':$route.path.indexOf('profile') !== -1}">
      <i class="fa fa-user-o"></i>
      <span>我的</span>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex'
export default {
    computed:{
      ...mapGetters([
        'geohash'
      ])
    },
    methods:{
      gotoAddress(path){
        /*this.$dialog.alert({mes: '请输入正确的账号'});*/
        this.$router.push(path);
      }
    }
}
</script>
<style lang="scss" scoped>
  @import '../../style/mixin';
  @import '../../style/css/font-awesome.min.css';

  #foot_guide{
    background-color: #fff;
    position: fixed;
    z-index: 100;
    left: 0;
    right: 0;
    bottom: 0;
    @include wh(100%, 1.95rem);
    display: flex;
    box-shadow: 0 -0.026667rem 0.053333rem rgba(0,0,0,.1);
  }
  .guide_item{
    flex: 1;
    display: flex;
    text-align: center;
    flex-direction: column;
    align-items: center;
    .fa{
      font-size: .8rem;
      margin-bottom: .2rem;
      margin-top: .3rem;
      color:$icon;
    }
    &.active .fa{
      color:$blue;
    }
    &.active .fa-user-o:before{
      content: "\f007";
    }
    span{
      padding-bottom: 5px;
      @include sc(.45rem, #666);
    }
  }
</style>
