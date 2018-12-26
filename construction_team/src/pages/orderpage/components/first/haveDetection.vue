<template>
    <div class="have-order-box">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <div v-for="(item,index) of list" :key="index">
            <div class="box-content">
                <img src="@/assets/imgs/house2.png" class="img" width="40" height="40">
                <div class="line"></div>
                <div class="content">
                    <div class="name">
                        <div class="text">{{item.userName}}</div>
                        <span class="phone">{{item.phone}}</span>
                    </div>
                    <div class="tiem">
                        完成时间 : {{ item.examinationTime | formatDate}}
                    </div>
                    <div class="tiem">
                        施工面积 : {{ item.constructionArea}} m²
                    </div>
                    <div class="area">
                        价格 : <span>{{item.price}}</span> 元
                    </div>
                    <div class="address">
                        <div class="adName">地址 : </div>
                        <p class="ad">{{item.addresses.details}}</p>
                    </div>
                </div>
            </div>
            <div class="operate">
                <button class="btn" @click="result(item.examinationOneId)">初测结果</button>
                <!-- <button class="changebtn" @click="change(item.examinationOneId)">更改价格</button> -->
            </div>
        </div>
        <div :class="{foot:footer,foot2:!footer}">{{footertext}}</div>
        </van-pull-refresh>
        <!-- 更改价格 -->
        <van-dialog
            v-model="show"
            show-cancel-button
            :before-close="beforeClose"
            confirm-button-text="确认修改"
            cancel-button-text="取消修改"
            >
            <van-field
                v-model="number"
                onkeyup="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')"
                label="更改价格"
                placeholder="请输入更改的价格"
                maxlength="7"
            />
        </van-dialog>
    </div>
</template>

<script>
import Vue from 'vue'
import {formatDate} from '@/common/date.js'
import { setTimeout } from 'timers'
import { Dialog, Toast, PullRefresh } from 'vant'
Vue.use(Dialog)
Vue.use(PullRefresh)
Vue.use(Toast)
export default {
  name: 'haveDection',
  data () {
    return {
      show: false,
      number: '',
      thisid: '',
      list: [],
      isLoading: false
    }
  },
  // 进入时重新请求
  activated () {
    this.getData()
  },
  // 离开路由时候销毁数据
  beforeRouteLeave (to, from, next) {
    this.$destroy()
    next()
  },
  // 时间错转换
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
    },
    footer () {
      if (this.list.length === 0) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    result (id) {
      this.$router.push({path: '/resetFirst', query: {thisId: id}})
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
      vm.$http.post('/ExaminationOneConstructionTeamController/ExaminationOneSelect')
        .then(res => {
          vm.list = res.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    change (id) {
      const vm = this
      vm.show = true
      vm.thisid = id
    },
    changePrice () {
      const vm = this
      const thisId = vm.thisid
      const price = vm.number
      const parmas = new URLSearchParams()
      parmas.append('examinationOneId', thisId)
      parmas.append('price', price)
      vm.$http.post('/ExaminationOneConstructionTeamController/ConstructionTeamInsertMoney', parmas)
        .then(res => {
          Toast.success('修改成功')
          vm.getData()
        })
        .catch(error => {
          console.log(error)
        })
    },
    beforeClose (action, done) {
      if (action === 'confirm') {
        const vm = this
        const number = vm.number
        if (number !== '') {
          vm.changePrice()
          setTimeout(() => {
            vm.number = ''
          }, 1000)
          setTimeout(done, 1000)
        } else {
          Toast('修改失败,请填写价格')
          setTimeout(done, 1000)
        }
      } else {
        this.number = ''
        done()
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.have-order-box
    // background-color #F5F7FA
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
            margin-top auto
            margin-bottom auto
            margin-left .2rem
            margin-right .2rem
            width 40px
            height 40px
        .line
            width .02rem
            height 11vh
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
            .area
                margin-top .15rem
                font-size 12px
                color #515151
                span
                    color #E8222D
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
            background linear-gradient(10deg, #FFB310, #f5df65)
            border-radius 5px
            height .6rem
            line-height .6rem
            width 1.5rem
        .changebtn
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
