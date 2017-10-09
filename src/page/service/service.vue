<template>
  <transition name="slide">
    <div class="rating_page">999999999999999999</div>
  </transition>
</template>

<script type="text/ecmascript-6">
  export default {
    data(){
      return{}
    },
    created(){
    },
    mounted(){
    },
    computed: {
    },
    methods: {
    },
    components:{}
  }
</script>
<style scoped lang="scss" rel="stylesheet/scss">
  .rating_page{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #f2f2f2;
    z-index: 202;
    padding-top: 1.95rem;
  }
  .slide-enter-active,.slide-leave-active{
    transition :all 0.3s
  }

  .slide-enter,.slide-leave-to{
    transform:translate3d(100%,0,0)
  }
</style>
