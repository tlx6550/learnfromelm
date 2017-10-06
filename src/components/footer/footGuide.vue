<template>
  <div id="foot_guide">
    <section @click = "gotoAddress({path: '/msite', query: {geohash}})" class="guide_item">
      <a class="icon_style" href="$route.path.indexOf('msite') !== -1? '#msiteActive' : '#msite'">
        <yd-icon  color="#666666" name="shopcart" size=".8rem"></yd-icon>
      </a>
      <span>外卖</span>
    </section>
    <section @click = "gotoAddress({path: '/search/' + geohash})" class="guide_item">
      <a class="icon_style" href="$route.path.indexOf('search') !== -1? '#findActive' : '#find'">
        <yd-icon name="discover"  color="#666666" size=".8rem"></yd-icon>
      </a>
      <span>搜索</span>
    </section>
    <section @click = "gotoAddress({path: '/search/' + geohash})" class="guide_item">
      <a class="icon_style" href="$route.path.indexOf('order') !== -1? '#orderActive' : '#order'">
        <yd-icon name="type" color="#666666" size=".8rem"></yd-icon>
      </a>
      <span>订单</span>
    </section>
    <section @click = "gotoAddress({path: '/search/' + geohash})" class="guide_item">
      <a class="icon_style" href="$route.path.indexOf('profile') !== -1? '#profileActive' : '#profile'">
        <yd-icon  color="#666666" name="ucenter" size=".8rem"></yd-icon>
      </a>
      <span>我的</span>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
    data(){
      return{
        iconColor:'#ccc'
      }
    },
    created(){},
    mounted(){},
    computed:{},
    methods:{}
}
</script>
<style lang="scss" scoped>
  @import '../../style/mixin';

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
    .icon_style{
      @include wh(.8rem, .8rem);
      margin-bottom: .2rem;
      margin-top: .3rem;
      fill: #ccc;
    }
    span{
      padding-bottom: 5px;
      @include sc(.45rem, #666);
    }
  }
</style>
