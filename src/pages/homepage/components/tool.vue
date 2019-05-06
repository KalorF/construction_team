<template>
  <div class="tool-box">
    <div class="tool-title">
      <div class="tool-span"></div>
      <div class="text">
          实用工具
      </div>
    </div>
    <div class="tool">
      <div class="tool-item">
        <router-link :to="{name:'holiday'}">
            <img class="tool-img" src="@/assets/imgs/rili.png" width="40" height="40">
            <p class="tool-text">休假选择</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="stylus" scoped>
@import '~styles/theme.styl'
.tool-box
  background-color #ffffff
  height 3.4rem
  border-bottom: .2rem solid #f5f7fa
  .tool-title
    height: .5rem
    display: flex
    border-bottom:1px solid #FCFCFC
    .text
      display: flex
      font-size: 18px
      margin-top: .2rem
      margin-left: .15rem
    .tool-span
      height: .3rem
      width: .08rem
      background-color: $themeColor
      margin-top: .22rem
      margin-left: .15rem
  .tool
    height: 21vh
    display: flex
    .tool-item
     width:33%
    .tool-img
      display:block
      margin: .5rem auto
    .tool-text
      text-align: center
      font-size: 18px
</style>
