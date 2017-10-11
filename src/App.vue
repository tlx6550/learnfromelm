<template>
  <div>
<!--    <keep-alive>
      <router-view></router-view>
    </keep-alive>-->
    <transition name="slide" mode="out-in">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <transition name="slide" mode="out-in">
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
    <svg-icon></svg-icon>
    <!--<home></home>-->
  </div>
</template>

<script>
  import svgIcon from './components/common/svg';
  export default {
    components:{
      svgIcon,
    },
  }

</script>

<style lang="scss">
  @import './style/common';
  .slide-enter-active,.slide-leave-active{
    transition :all 0.3s
  }

  .slide-enter,.slide-leave-to{
    transform:translate3d(0,-100%,0)
  }
</style>
