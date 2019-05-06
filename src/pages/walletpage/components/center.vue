<template>
    <div class="center-box">
        <div class="center-title">
            <div class="finish">已完成总额</div>
            <div class="money">{{money}}</div>
        </div>
        <div class="center-line"></div>
        <div class="nodata" v-if="show">
            无相关数据
        </div>
        <div class="money-content" v-for="(item,index) of thislist" :key="index">
            <div class="list-item">
                <div class="item-date">{{item.createTime | formatDate}}</div>
                <div class="item-address">{{item.addresses.details}}</div>
            </div>
            <div class="item-money">
                +{{item.price}}
            </div>
        </div>
        <div class="nodata" v-if="showfoot">
            无更多数据
        </div>
        <div class="more" @click="more" v-if="showmore">更多&nbsp;&nbsp;></div>
    </div>
</template>

<script>
import {formatDate} from '@/common/date.js'
export default {
  data () {
    return {
    }
  },
  props: ['list', 'money'],
  computed: {
    thislist () {
      if (this.list.length > 3) {
        return this.list.slice(0, 3)
      } else {
        return this.list
      }
    },
    show () {
      if (this.list.length === 0) {
        return true
      } else {
        return false
      }
    },
    showmore () {
      if (this.list.length > 3) {
        return true
      } else {
        return false
      }
    },
    showfoot () {
      if (this.list.length <= 3 && this.list.length === 1) {
        return true
      } else {
        return false
      }
    }
  },
  filters: {
    formatDate (time) {
      var date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd')
    }
  },
  methods: {
    more () {
      this.$router.push({path: '/finish'})
    }
  }
}
</script>

<style lang="stylus" scoped>
.center-box
  margin-top .18rem
  position: fixed
  border-bottom: 1px solid #eee
  background-color: #fff
  padding: .18rem .3rem
  position: relative
  z-index: 4
  bottom: .03rem
  .nodata
    height .8rem
    background #ffffff
    text-align center
    color #aaaaaa
    font-size 16px
    margin-top .4rem
  .center-title
    position: relative
    margin-top: .1rem
    .finish
      color: #515151
      float: left
      font-size: 20px
    .money
      font-size: 21px
      float:right
      color: #515151
  .center-line
    margin-top: .7rem
    border-bottom: 1px solid #eee
  .money-content
    padding-bottom .2rem
    display: flex
    border-bottom: 1px solid #F5F7FA
    .list-item
      display:flex
      width: 60%
      margin-top: .3rem
      flex-direction: column
      .item-date
        // text-align: center
        font-size: 16px
      .item-address
        width 100%
        margin-top: .2rem
        font-size: 15px
        color: #686868
    .item-money
       margin-left: -webkit-calc(100% - 4.5rem)
       margin-top: auto
       margin-bottom: auto
       font-size: 18px
       color: #6B6B6B
  .more
    display inline-block
    margin-left -webkit-calc(100% - 1.1rem)
    // margin-top: .3rem
    // margin-bottom:
    margin-top: .2rem
    font-size: 16px
</style>
