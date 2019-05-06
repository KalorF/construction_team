<template>
    <div style="background:#fff">
    <div class="navbar">
        <div class="nav-item">
            <router-link :to="{name:'order'}">
                <img src="@/assets/imgs/list.png" width="35" height="35" class="nav-img">
                <div class="item-text">订单</div>
            </router-link>
        </div>
        <div class="line"></div>
        <div class="nav-item">
            <router-link :to="{name:'Evaluate'}">
                <img src="@/assets/imgs/respon.png" width="35" height="35" class="nav-img">
                <p class="item-text">评价</p>
            </router-link>
        </div>
        <div class="line"></div>
        <div class="nav-item">
            <router-link :to="{name:'Wallet'}">
                <img src="@/assets/imgs/wallet.png" width="40" class="nav-img1">
                <p class="item-text1">钱包</p>
            </router-link>
        </div>
        <div class="line"></div>
        <div class="nav-item">
            <router-link :to="{name:'Notices'}">
                <img src="@/assets/imgs/zysx.png" width="35" height="35" class="nav-img">
                <p class="item-text">注意</p>
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
.navbar
  display:flex
  position relative
  background-color #ffffff
  bottom .12rem
  box-shadow 1px 1px 3px 2px rgba(170,170,170,.18)
  height: 1.8rem
  width 93%
  margin-left auto
  margin-right auto
  .nav-item
    width:25%
    height: 1.8rem
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
