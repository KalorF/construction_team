<template>
    <div>
        <van-nav-bar
        title="已完成总额详情"
        left-arrow
        fixed
        @click-left="$router.goBack"
        />
        <div class="finish-box">
            <div class="money-content" v-for="(item,index) of successOrder" :key="index">
                <div class="list-item">
                    <div class="item-date">{{item.createTime | formatDate}}</div>
                    <div class="item-address">{{item.addresses.details}}</div>
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
  name: 'finish',
  data () {
    return {
      successOrder: []
    }
  },
  filters: {
    formatDate (time) {
      var date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd')
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
    // 已完成订单数据
    getData () {
      const vm = this
      vm.$http.post('/ConstructionBuilderAppControllerLxb/TeamWallet')
        .then(res => {
          vm.successOrder = res.data.data.successOrder
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
.finish-box
  background-color: #fff
  margin-top 1.4rem
  padding: .18rem .3rem
  position: relative
  bottom: .03rem
  .money-content
    height: 1.7rem
    display: flex
    border-bottom: 2px solid #FCFCFC
    .list-item
      display:flex
      width: 60%
      margin-top: .3rem
      flex-direction: column
      .item-date
        // text-align: center
        font-size: 16px
      .item-address
        margin-top: .1rem
        font-size: 15px
        color: #686868
    .item-money
       margin-left: -webkit-calc(100% - 4.5rem)
       margin-top: auto
       margin-bottom: auto
       font-size: 18px
       color: #6B6B6B
</style>
