<template>
  <div id="app">
    <transition :name="transitionName">
      <keep-alive>
        <router-view :key="$route.fullPath" class="child-view"></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      transitionName: 'slide-left'
    }
  },
  watch: {// 使用watch 监听$router的变化
    $route (to, from) {
      // 如果to索引大于from索引,判断为前进状态,反之则为后退状态
      if (to.meta.index > from.meta.index) {
        // 设置动画名称
        this.transitionName = 'slide-left'
      } else {
        this.transitionName = 'slide-right'
      }
    }
  }
}
</script>

<style>
  #app,.child-view {
    height: 100vh;
    width: auto;
  }
  #app {
    position: relative;
    overflow: hidden;
  }
  #app {
    -webkit-overflow-scrolling: touch
  }
  .child-view {
    position: absolute;
    left: 0;
    overflow-x: hidden;
    overflow-y: scroll;
  }
  .child-view::-webkit-scrollbar {
    display: none
  }
  /* 路由切换动画 */
  .child-view {
    position: absolute;
    width:100%;
    transition: all .9s cubic-bezier(.55,1,.1,1);
  }
  .slide-left-enter, .slide-right-leave-active {
    opacity: .6;
    transform: translate(100%, 0);
  }
  .slide-left-leave-active, .slide-right-enter {
    opacity: .6;
    transform: translate(-100%, 0);
  }
</style>
