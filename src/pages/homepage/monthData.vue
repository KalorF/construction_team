<template>
    <div>
        <van-nav-bar
        title="月经营数据"
        left-arrow
        @click-left="$router.goBack"
        />
        <div class="month-box">
            <div class="noData" v-if="showno">无相关数据</div>
            <div class="money-content" v-for="(item,index) of list" :key="index">
                <div class="list-item">
                    <div class="item-date">{{item.time | formatDate}}</div>
                    <div class="item-address">{{item.address}}</div>
                </div>
                <div class="item-money">
                    +{{item.price}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {formatDate} from '@/common/date.js'
export default {
  name: 'monthData',
  data () {
    return {
      list: []
    }
  },
  filters: {
    formatDate (time) {
      var date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd')
    }
  },
  computed: {
    showno () {
      if (this.list.length === 0) {
        return true
      } else {
        return false
      }
    }
  },
  activated () {
    this.getData()
  },
  beforeRouteLeave (to, from, next) {
    this.$destroy()
    next()
  },
  methods: {
    getData () {
      const vm = this
      vm.$http.post('/ConstructionBuilderAppControllerLxb/IncomeDetails')
        .then(res => {
          vm.list = res.data.data.details
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
.month-box
  background-color: #fff
  padding: .18rem .3rem
  position: relative
  z-index: 4
  bottom: .03rem
  .noData
    margin-top .5rem
    text-align center
    font-size 16px
    color #aaaaaa
  .money-content
    display: flex
    border-bottom: 1px solid #eeeeee
    .list-item
      display:flex
      width: 60%
      margin-top: .3rem
      flex-direction: column
      .item-date
        // text-align: center
        font-size: 16px
      .item-address
        margin-top: .2rem
        line-height .4rem
        font-size: 15px
        color: #686868
        margin-bottom .3rem
    .item-money
       margin-left: -webkit-calc(100% - 5rem)
       margin-top: auto
       margin-bottom: auto
       font-size: 18px
       color: #6B6B6B
</style>
