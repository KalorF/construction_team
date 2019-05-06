<template>
    <div class="wait-order-box">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <div v-for="(item, index) of list" :key="index">
            <div class="box-content">
                <img src="@/assets/imgs/order.png" class="img">
                <div class="line"></div>
                <div class="content">
                    <div class="name">
                        <div class="text">{{item.customeres.customerName}}</div>
                        <span class="phone">{{item.phone}}</span>
                    </div>
                    <div class="tiem">
                        下单时间 : {{item.createTime | formatDate}}
                    </div>
                    <div class="address">
                        <div class="adName">地址 : </div>
                        <p class="ad">{{item.addresses.details}}</p>
                    </div>
                </div>
            </div>
            <div class="operate">
                <button class="btn" @click="vieworder(index)">查看订单</button>
            </div>
        </div>
        <div class="foot">
            {{footertext}}
        </div>
        </van-pull-refresh>
    </div>
</template>

<script>
import Vue from 'vue'
import {formatDate} from '@/common/date.js'
import { PullRefresh, Toast } from 'vant'
import { setTimeout } from 'timers'
Vue.use(PullRefresh)
Vue.use(Toast)
export default {
  name: 'waitOrder',
  data () {
    return {
      list: [],
      isLoading: false
    }
  },
  activated () {
    this.getData()
  },
  beforeRouteLeave (to, from, next) {
    this.$destroy()
    next()
  },
  filters: {
    formatDate (time) {
      var date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
  },
  computed: {
    footertext () {
      if (this.list.length === 0) {
        return '下拉获取数据'
      } else {
        return '没有更多数据'
      }
    }
  },
  methods: {
    vieworder (index) {
      this.$router.push({path: '/viewOrder', query: {index: index}})
    },
    onRefresh () {
      const vm = this
      vm.getData()
      setTimeout(() => {
        if (vm.list.length !== 0) {
          vm.$toast('刷新成功')
          vm.isLoading = false
        } else {
          vm.$toast('无相关数据')
          vm.isLoading = false
        }
      }, 500)
    },
    getData () {
      const vm = this
      vm.$http.post('/OrderTableConstructionTeamController/selectOrderByconstructionTeamIDAndStatus')
        .then(res => {
          vm.list = res.data
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
.wait-order-box
    // background-color #F5F7FA
    .foot
        font-size 16px
        color #aeaeae
        text-align center
        margin-top .3rem
        padding-bottom 1.8rem
    .box-content
        background-color #ffffff
        display flex
        flex 1
        .img
            margin auto .2rem
            width 40px
            height 40px
        .line
            width .02rem
            height 10vh
            margin auto .1rem
            background-color #eee
        .content
            margin .2rem .2rem .1rem .2rem
            width 100%
            .name
                display flex
                font-size 16px
                color #434343
                .text
                    width 70%
                    margin-right .2rem
                .phone
                    flex 1
                    font-size 15px
                    color #6B6B6B
            .tiem
                margin-top .15rem
                font-size 12px
                color #515151
            .address
                margin-top .15rem
                display flex
                flex-direction row
                .adName
                    width .8rem
                    color #515151
                    font-size 13px
                .ad
                    line-height .32rem
                    width 93%
                    color #515151
                    font-size 13px
    .operate
        height .8rem
        background-color #fff
        border-bottom .17rem solid #f5f7fa
        border-top 1px solid #eee
        margin-bottom .16rem
        .btn
            margin-top .1rem
            margin-right .2rem
            float right
            color #ffffff
            background linear-gradient(10deg, #28cc75, #5BE7C4)
            border-radius 5px
            height .6rem
            line-height .6rem
            width 1.5rem
</style>
