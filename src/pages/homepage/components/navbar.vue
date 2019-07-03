<template>
    <div style="background:#fff;height:45vh">
    <div class="navtitle">
      <div class="tool-span"></div>
      功能选择
    </div>
    <div class="navbar">
        <div class="nav-item">
            <router-link :to="{name:'order'}">
                <img src="@/assets/imgs/list.png" width="45" height="45" class="nav-img">
                <div class="item-text">客户订单</div>
            </router-link>
        </div>
        <div class="line"></div>
        <div class="nav-item">
            <router-link :to="{name:'Wallet'}">
                <img src="@/assets/imgs/wallet.png" width="50" class="nav-img1">
                <p class="item-text1">我的钱包</p>
            </router-link>
        </div>
        <div class="nav-item">
            <router-link :to="{name:'Evaluate'}">
                <img src="@/assets/imgs/respon.png" width="45" height="45" class="nav-img">
                <p class="item-text">客户评价</p>
            </router-link>
        </div>
        <div class="line"></div>
        <div class="nav-item">
            <router-link :to="{name:'holiday'}">
                <img src="@/assets/imgs/rili.png" width="50" class="nav-img1">
                <p class="item-text1">休假选择</p>
            </router-link>
        </div>
        <div class="line"></div>
        <div class="nav-item">
            <router-link :to="{name:'Notices'}">
                <img src="@/assets/imgs/zysx.png" width="45" height="45" class="nav-img">
                <p class="item-text">注意事项</p>
            </router-link>
        </div>
    </div>
    </div>
</template>
<script>
export default {
  name: 'navbar',
  methods: {
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/theme.styl'
.navtitle
  padding-top .25rem
  // margin-left .13rem
  padding-bottom .3rem
  display flex
  // border-left 4px solid $themeColor
  font-size 18px
  // padding-left .1rem
  .tool-span
    height: .3rem
    width: .08rem
    background-color: $themeColor
    // margin-top: .22rem
    margin-left: .15rem
    margin-right .15rem
.navbar
  display:flex
  flex-wrap wrap
  position relative
  background-color #ffffff
  // bottom .12rem
  box-shadow 1px 1px 3px 2px rgba(170,170,170,.18)
  // height: 1.8rem
  border-radius 5px
  width 93%
  margin-left auto
  margin-right auto
  padding-top .12rem
  padding-bottom .3rem
  .nav-item
    width 33%
    margin-bottom .22rem
    .nav-img
      display: block
      margin: .24rem auto
    .item-text
      text-align:center
      margin: .1rem auto
      font-size: 15px
    .nav-img1
      display: block
      margin: .19rem auto
    .item-text1
      text-align:center
      margin: .08rem auto
      font-size: 15px
</style>
