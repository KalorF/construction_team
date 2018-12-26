<template>
    <div class="order-box">
        <div class="header">
        <van-nav-bar
        title="订单"
        left-arrow
        @click-left="back"
        />
        </div>
        <van-tabs v-model="active" swipeable class="tabs">
            <van-tab :title="'待初测'">
                <div class="content">
                <first-detection></first-detection>
                </div>
            </van-tab>
            <van-tab :title="'已初测'">
                <div class="content">
                <have-detection></have-detection>
                </div>
            </van-tab>
            <!-- <van-tab :title="'待接单'">
                <wait-order></wait-order>
            </van-tab> -->
            <van-tab :title="'待除醛'">
                <div class="content">
                <not-finish></not-finish>
                </div>
            </van-tab>
            <van-tab :title="'已除醛'">
                <div class="content">
                <have-finish></have-finish>
                </div>
            </van-tab>
            <van-tab :title="'待复测'">
                <div class="content">
                <wait-second></wait-second>
                </div>
            </van-tab>
            <van-tab :title="'已复测'">
                <div class="content">
                <finish-second></finish-second>
                </div>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
import Vue from 'vue'
import { Tab, Tabs } from 'vant'
import firstDetection from '@/pages/orderpage/components/first/firstDetection'
import haveDetection from '@/pages/orderpage/components/first/haveDetection'
import waitOrder from '@/pages/orderpage/components/order/waitOrder'
import notFinish from '@/pages/orderpage/components/order/notFinish'
import haveFinish from '@/pages/orderpage/components/order/haveFinish'
import waitSecond from '@/pages/orderpage/components/second/waitSecond'
import finishSecond from '@/pages/orderpage/components/second/finishSecond'
Vue.use(Tab).use(Tabs)
export default {
  name: 'order',
  components: {
    firstDetection,
    haveDetection,
    waitOrder,
    notFinish,
    haveFinish,
    waitSecond,
    finishSecond,
    hackReset: true
  },
  data () {
    return {
      active: 0
    }
  },
  methods: {
    back () {
      this.$router.replace({path: '/'})
    }
  }
}
</script>

<style lang="stylus" scoped>
.content
    height 78vh
    width 100%
    overflow-y auto
.header
    position -webkit-sticky
    position sticky
    top 0
    width 100%
.tabs
    position -fixed
    position sticky
    top 0
    width 100%
</style>
