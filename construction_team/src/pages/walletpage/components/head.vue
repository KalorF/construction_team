<template>
    <div class="header-box">
        <div class="header-div">
            <p class="header-p">总收入(元)</p>
            <p class="header-number" v-if="show">暂无收入</p>
            <p class="header-number" v-if="show2">{{money}}</p>
        </div>
    </div>
</template>

<script>
export default {
  props: ['money'],
  computed: {
    show () {
      if (this.money === 0 || this.money === '') {
        return true
      } else {
        return false
      }
    },
    show2 () {
      if (this.money === 0 || this.money === '') {
        return false
      } else {
        return true
      }
    }
  },
  methods: {
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/theme.styl'
.header-box
  position: fixed
  height: 2.3rem
  background linear-gradient(70deg, #3FAAB2, #2CC0B3)
  // background-color: $themeColor
  position: relative
  bottom: .02rem
  z-index: 3
  .header-div
    padding-top: .1rem
    .header-p
      font-size: 25px
      margin-left: .5rem
      margin-top: .4rem
      color: #fff
    .header-number
      font-size: 22px
      color: #fff
      margin-top: .3rem
      margin-left: .5rem
</style>
