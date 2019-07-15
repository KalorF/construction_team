<template>
    <div class="view-order-box">
        <van-nav-bar
        title="订单详情"
        left-arrow
        @click-left="$router.goBack"
        fixed
        />
        <div class="order-box">
            <img src="@/assets/imgs/user.png" width="25" height="25" class="thisImg">
            <div class="order-name">客户姓名: {{Data.userName}}</div>
        </div>
        <div class="phone-box">
            <img src="@/assets/imgs/tel.png" width="25" height="25" class="thisImg">
            <div class="order-name">客户电话: {{Data.phone}}</div>
        </div>
        <!-- 订单详情 -->
        <div class="order-data">
            <div class="data-head">
                <img src="@/assets/imgs/order.png" width="25" height="25" class="thisImg">
                <div class="data-text">订单信息</div>
                <img src="@/assets/imgs/bot.png" width="20" height="18" class="thisImgSecd">
            </div>
            <div class="line"></div>
            <div class="data">
                <div class="arer">
                    <p>施工面积</p>
                    <p>{{Data.constructionArea}} m²</p>
                </div>
                <div class="order-time">
                    <p>下单时间</p>
                    <p>{{Data.createTime | formatDate}}</p>
                </div>
            </div>
            <div class="address">
                <div>地址: </div>
                <p>{{Data.addresses.details}}</p>
            </div>
            <div class="prize">
                <div>价格: <span>{{Data.price}}</span> (元)</div>
            </div>
        </div>
        <!-- 报告 -->
        <div class="report-box" @click="viewreport(Data.examinationOneId)">
            <img src="@/assets/imgs/report.png" width="25" height="23">
            <div>&nbsp; 初测报告</div>
            <img src="@/assets/imgs/right.png" width="20" height="20" class="rigth-img">
        </div>
        <div class="btn-box">
            <button type="button" class="calBtn" @click="cancel(Data.ordersId)">取消除醛</button>
            <!-- <button type="button" class="cfmBtn">确认接单</button> -->
        </div>
        <van-dialog
            v-model="show"
            show-cancel-button
            :before-close="beforeClose"
            confirm-button-text="确认"
            cancel-button-text="取消"
            >
            <div class="dialogContent">
                是否取消除醛？
            </div>
        </van-dialog>
    </div>
</template>

<script>
import Vue from 'vue'
import {Toast, Dialog} from 'vant'
import {formatDate} from '@/common/date.js'
Vue.use(Toast)
Vue.use(Dialog)
export default {
  name: 'viewOrder',
  data () {
    return {
      Data: [],
      show: false,
      id: ''
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
  methods: {
    viewreport (thisId) {
      this.$router.push({path: '/viewFirst', query: {thisId: thisId}})
    },
    cancel (id) {
      const vm = this
      vm.show = true
      vm.id = id
    },
    beforeClose (action, done) {
      if (action === 'confirm') {
        const vm = this
        const ordersId = vm.id
        const params = new URLSearchParams()
        params.append('ordersId', ordersId)
        vm.$http.post('/OrderTableConstructionTeamController/ordertableConstructionTeamCancel', params)
          .then(res => {
            Toast.success('取消成功')
            setTimeout(done, 1000)
            vm.$router.goBack()
          })
          .catch(error => {
            console.log(error)
          })
      } else {
        done()
      }
    },
    // 查看除醛订单详情数据
    getData () {
      const vm = this
      const index = vm.$route.query.index
      vm.$http.post('/OrderTableConstructionTeamController/selectOrderByconstructionTeamIDAndStatus')
        .then(res => {
          vm.Data = res.data[index]
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
.view-order-box
    height 100vh
    background-color #F5F7FA
    .dialogContent
        text-align center
        height 1.5rem
        line-height 1.5rem
        color #5f5f5f
    .order-box
        margin-top 1.33rem
        height 7vh
        line-height 7vh
        vertical-align middle
        background-color #ffffff
        display flex
        flex-direction row
        .thisImg
            margin-left .3rem
            margin-top auto
            margin-bottom auto
        .order-name
            margin-left .16rem
            font-size 16px
    .phone-box
        margin-top 0.2rem
        height 7vh
        line-height 7vh
        vertical-align middle
        background-color #ffffff
        display flex
        flex-direction row
        .thisImg
            margin-left .3rem
            margin-top auto
            margin-bottom auto
        .order-name
            margin-left .16rem
            font-size 16px
    .order-data
        background-color #ffffff
        margin-top .2rem
        padding-bottom .7rem
        .data-head
            display flex
            flex-direction row
            padding-top .16rem
            margin-bottom .1rem
            .thisImg
                margin-left .3rem
                margin-top auto
                margin-bottom auto
            .data-text
                margin-left .16rem
                margin-top .12rem
                font-size 16px
            .thisImgSecd
                display block
                margin-top .1rem
                margin-left -webkit-calc(100% - 3rem)
        .line
            height 1px
            width 93%
            background-color #eeeeee
            margin-left auto
            margin-right auto
        .data
            display flex
            flex-direction row
            margin-top .3rem
            border-bottom 1px solid #eeeeee
            padding-bottom .3rem
            .arer
                width 50%
                text-align center
                border-right 1px solid #eeeeee
                p:nth-child(1)
                    font-size 16px
                    color #515151
                p:nth-child(2)
                    margin-top .2rem
                    color #949494
                    font-size 15px
            .order-time
                width 50%
                text-align center
                p:nth-child(1)
                    font-size 16px
                    color #515151
                p:nth-child(2)
                    margin-top .2rem
                    color #949494
                    font-size 15px
        .address
            display flex
            flex-direction row
            padding-left .3rem
            padding-right .2rem
            margin-top .2rem
            padding-bottom .27rem
            border-bottom 1px solid #eeeeee
            div
                border-left 3px solid #28cc75
                padding-left .1rem
                height .25rem
                width .8rem
                color #5e5e5e
            p
                color #5e5e5e
                line-height .34rem
        .prize
            float right
            margin-top .2rem
            margin-right .3rem
            div
                font-size 16px
                span
                    color #E8222D
                    font-size 17px
    .report-box
        margin-top .2rem
        height 7vh
        line-height 7vh
        display flex
        flex-direction row
        background-color #ffffff
        div
            text-align center
            font-size 16px
            margin-top 1px
        img:nth-child(1)
            margin-left .27rem
            margin-top auto
            margin-bottom auto
        .rigth-img
            margin-left -webkit-calc(100% - 2.8rem)
            margin-top auto
            margin-bottom auto
    .btn-box
        text-align center
        margin-top .5rem
        .calBtn
            width 85%
            height .8rem
            line-height .8rem
            font-size 18px
            color #ffffff
            border-radius 15px
            background linear-gradient(-170deg,#F38181,#F75940)
        // .cfmBtn
        //     width 85%
        //     margin-top .3rem
        //     height .8rem
        //     line-height .8rem
        //     color #ffffff
        //     font-size 18px
        //     border-radius 15px
        //     background linear-gradient(120deg,#28cc75,#5BE7C4)
</style>
