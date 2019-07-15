<template>
    <div class="view-finish-detail-box">
        <van-nav-bar
        title="完成情况"
        left-arrow
        @click-left="$router.goBack"
        fixed
        />
        <div class="order-box">
            <img src="@/assets/imgs/user.png" class="thisImg">
            <div class="order-name">客户姓名: {{Data.userName}}</div>
        </div>
        <div class="phone-box">
            <img src="@/assets/imgs/tel.png" class="thisImg">
            <div class="order-name">客户电话: <span>{{Data.phone}}</span></div>
        </div>
        <!-- 订单详情 -->
        <div class="order-data">
            <div class="data-head">
                <img src="@/assets/imgs/order.png" class="thisImg">
                <div class="data-text">订单信息</div>
                <img src="@/assets/imgs/bot.png" width="23" height="18" class="thisImgSecd">
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
        <div class="time-box">
            <img src="@/assets/imgs/time.png" class="thisImg">
            <div class="order-name">完成时间: <span>{{Data.buildingTime | formatDate}}</span></div>
        </div>
        <!-- 报告 -->
        <div class="report-box" @click="viewreport(Data.examinationOneId)">
            <img src="@/assets/imgs/report.png" width="25" height="23">
            <div>&nbsp; 初测报告</div>
            <img src="@/assets/imgs/right.png" width="20" height="20" class="rigth-img">
        </div>
        <div class="img-box" @click="showimg()">
            <img src="@/assets/imgs/picture.png" width="19" height="23">
            <div>&nbsp;&nbsp; 施工现场</div>
            <img src="@/assets/imgs/right.png" width="20" height="20" class="rigth-img">
        </div>
    </div>
</template>

<script>
import {formatDate} from '@/common/date.js'
import {ImagePreview} from 'vant'
export default {
  name: 'finishDetail',
  data () {
    return {
      Data: [],
      ordersId: '',
      imgArray: []
    }
  },
  filters: {
    formatDate (time) {
      var date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
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
    viewreport (thisId) {
      this.$router.push({path: '/viewFirst', query: {thisId: thisId}})
    },
    showimg () {
      const vm = this
      ImagePreview(vm.imgArray, 0)
    },
    // 获取已除醛订单的详细数据
    getData () {
      const vm = this
      const index = vm.$route.query.index
      vm.$http.post('/OrderTableConstructionTeamController/selectOrderOver')
        .then(res => {
          vm.Data = res.data[index]
          const ordersId = res.data[index].ordersId
          vm.getImg(ordersId)
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 获取施工现场图片
    getImg (ordersId) {
      const vm = this
      const parmas = new URLSearchParams()
      parmas.append('ordersId', ordersId)
      vm.$http.post('/OrderTableController/OrdertableDate', parmas)
        .then(res => {
          for (const i in res.data) {
            vm.imgArray.push(res.data[i].imgUrl)
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
.view-finish-detail-box
    height 100vh
    background-color #F5F7FA
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
            width 25px
            height 25px
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
            width 25px
            height 25px
        .order-name
            margin-left .16rem
            font-size 16px
            span
                color #5f5f5f
    .time-box
        margin-top 0.2rem
        height 7vh
        line-height 7vh
        vertical-align middle
        background-color #ffffff
        display flex
        flex-direction row
        .thisImg
            margin-left .33rem
            margin-top auto
            margin-bottom auto
            width 22px
            height 23px
        .order-name
            margin-left .18rem
            font-size 15px
            // color #5e5e5e
            span
                color #9e9999
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
                width 25px
                height 25px
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
    .img-box
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
            margin-left .34rem
            margin-top auto
            margin-bottom auto
        .rigth-img
            margin-left -webkit-calc(100% - 2.85rem)
            margin-top auto
            margin-bottom auto
</style>
