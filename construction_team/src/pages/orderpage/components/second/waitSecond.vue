<template>
    <div class="wait-order-box">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <div v-for="(item,index) of list" :key="index">
            <div class="box-content">
                <img src="@/assets/imgs/wait.png" class="img" width="40" height="40">
                <div class="line"></div>
                <div class="content">
                    <div class="name">
                        <div class="text">{{item.userName}}</div>
                        <span class="phone">{{item.phone}}</span>
                    </div>
                    <div class="tiem">
                        预约时间 : {{item.examinationTime | formatDate}}
                    </div>
                    <div class="address">
                        <div class="adName">地址 : </div>
                        <p class="ad">{{item.addresses.details}}</p>
                    </div>
                </div>
            </div>
            <div class="operate">
                <button class="btnview" @click="viewresult(index)">查看情况</button>
                <button class="btn" @click="writeResult(item.examinationTwoId)">结果填写</button>
                <button class="btncal" @click="cancel(item.examinationTwoId)">取消检测</button>
            </div>
        </div>
        <div :class="{foot:footer,foot2:!footer}">
            {{footertext}}
        </div>
        </van-pull-refresh>
        <van-dialog
            v-model="show"
            show-cancel-button
            :before-close="beforeClose"
            confirm-button-text="确认"
            cancel-button-text="取消"
            >
            <div class="dialogContent">
                确认取消检测吗？
            </div>
        </van-dialog>
    </div>
</template>

<script>
import Vue from 'vue'
import {PullRefresh, Toast, Dialog} from 'vant'
import {formatDate} from '@/common/date.js'
Vue.use(PullRefresh)
Vue.use(Toast)
Vue.use(Dialog)
export default {
  name: 'waitSecond',
  data () {
    return {
      list: [],
      isLoading: false,
      show: false,
      listid: ''
    }
  },
  activated () {
    this.getData()
  },
  beforeRouteLeave (to, from, next) {
    this.$destroy()
    next()
  },
  computed: {
    footertext () {
      if (this.list.length === 0) {
        return '下拉获取数据'
      } else {
        return '没有更多数据'
      }
    },
    footer () {
      if (this.list.length === 0) {
        return true
      } else {
        return false
      }
    }
  },
  filters: {
    formatDate (time) {
      var date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
  },
  methods: {
    viewresult (index) {
      this.$router.push({path: '/finishDetail', query: {index: index}})
    },
    writeResult (examinationTwoId) {
      this.$router.push({path: '/writeSecondData', query: {examinationTwoId: examinationTwoId}})
    },
    cancel (id) {
      const vm = this
      vm.listid = id
      vm.show = true
    },
    beforeClose (action, done) {
      if (action === 'confirm') {
        const vm = this
        const examinationTwoId = vm.listid
        const params = new URLSearchParams()
        params.append('examinationTwoId', examinationTwoId)
        vm.$http.post('/ExaminationTwoConstructionTeamController/ordertableConstructionTeamCancel', params)
          .then(res => {
            Toast.success('取消成功')
            setTimeout(done, 1000)
            vm.getData()
          })
          .catch(error => {
            console.log(error)
          })
      } else {
        done()
      }
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
      vm.$http.post('/ExaminationTwoConstructionTeamController/selectByconstructionTeamIDAndStatus')
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
    .dialogContent
        text-align center
        height 1.5rem
        line-height 1.5rem
        color #5f5f5f
    .foot
        font-size 16px
        color #aeaeae
        text-align center
        margin-top .3rem
        padding-bottom 7rem
    .foot2
        font-size 16px
        color #aeaeae
        text-align center
        margin-top .3rem
        padding-bottom .2rem
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
            height 7vh
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
            background linear-gradient(40deg, #28cc75, #5BE7C4)
            border-radius 5px
            height .6rem
            line-height .6rem
            width 1.5rem
        .btnview
            margin-top .1rem
            margin-right .2rem
            float right
            color #ffffff
            background linear-gradient(10deg, #FFB310, #f5df65)
            border-radius 5px
            height .6rem
            line-height .6rem
            width 1.5rem
        .btncal
            margin-top .1rem
            margin-right .2rem
            float right
            color #ffffff
            background linear-gradient(-170deg,#F38181,#F75940)
            border-radius 5px
            height .6rem
            line-height .6rem
            width 1.5rem
</style>
