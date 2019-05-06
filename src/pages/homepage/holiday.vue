<template>
    <div class="holiday-box">
        <van-nav-bar
            title="休假选择"
            left-arrow
            class="header"
            @click-left="$router.goBack"
         >
         <div slot="right" class="cfmRight" @click="confrim">
            确认
         </div>
        </van-nav-bar>
        <div class="head-box">
            <img src="@/assets/imgs/holiday.png" width="35" height="35" class="firstimg">
            <div class="text">选择休假日期</div>
            <img src="@/assets/imgs/bot.png" width="20" height="20" class="secondimg">
        </div>
        <group>
                <calendar v-model="date" :title="'日期'" show-popup-header :popup-header-title="'请选择'"></calendar>
        </group>

        <van-checkbox-group v-model="result" :max='2' @change='change'>
            <van-cell-group>
                <van-cell
                v-for="(item,index) in list"
                clickable
                :key="index"
                :title="`${item}`"
                >
                <van-checkbox :name="item" />
                </van-cell>
            </van-cell-group>
        </van-checkbox-group>

        <van-dialog
            v-model="show"
            show-cancel-button
            :before-close="beforeClose"
            confirm-button-text="确认"
            cancel-button-text="取消"
            >
            <div class="dialogContent">
                是否确认休假？
            </div>
        </van-dialog>
    </div>
</template>

<script>
import Vue from 'vue'
import { RadioGroup, Radio, Cell, CellGroup, Toast, Dialog, Checkbox, CheckboxGroup } from 'vant'
import { Calendar, Group } from 'vux'
import { setTimeout } from 'timers'
Vue.use(RadioGroup, Cell, CellGroup)
Vue.use(Checkbox).use(CheckboxGroup)
Vue.use(Radio)
Vue.use(Toast)
Vue.use(Dialog)
export default {
  name: 'holiday',
  components: {
    Calendar,
    Group
  },
  data () {
    return {
      date: 'TODAY',
      show: false,
      result: [],
      list: ['早上', '下午', '晚上', '全天'],
      morning: '',
      afternoon: '',
      evening: ''
    }
  },
  beforeRouteLeave (to, from, next) {
    this.$destroy()
    next()
  },
  methods: {
    beforeClose (action, done) {
      const vm = this
      if (action === 'confirm') {
        if (vm.morning !== '') {
          vm.morning = vm.date + ' ' + vm.morning
        }
        if (vm.afternoon !== '') {
          vm.afternoon = vm.date + ' ' + vm.afternoon
        }
        if (vm.evening !== '') {
          vm.evening = vm.date + ' ' + vm.evening
        }
        const parmas = new URLSearchParams()
        parmas.append('busyBegintime', vm.morning)
        parmas.append('busyOvertime', vm.afternoon)
        parmas.append('createTime', vm.evening)
        vm.$http.post('/OrderTableConstructionTeamController/ConstructionTeamfurlough', parmas)
          .then(res => {
            Toast(res.data.message)
            setTimeout(done, 500)
          })
          .catch(error => {
            console.log(error)
          })
      } else {
        done()
      }
    },
    change () {
      const vm = this
      vm.morning = ''
      vm.afternoon = ''
      vm.evening = ''
      for (const i in vm.result) {
        if (vm.result[i] === '早上') {
          vm.morning = '8:00:00'
        } else if (vm.result[i] === '下午') {
          vm.afternoon = '16:00:00'
        } else if (vm.result[i] === '晚上') {
          vm.evening = '20:00:00'
        } else if (vm.result[i] === '全天') {
          vm.morning = '8:00:00'
          vm.afternoon = '16:00:00'
          vm.evening = '20:00:00'
        }
      }
    },
    confrim () {
      const vm = this
      if (vm.result.length === 0) {
        Toast('请选择休假时间段')
      } else {
        vm.show = true
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.dialogContent
        text-align center
        height 1.5rem
        line-height 1.5rem
        color #5f5f5f
.van-cell
    margin-top .1rem
    font-size 15px
.cfmRight
    color #ffffff
    font-size 16px
.holiday-box
    height 100vh
    background #F5F7FA
    .head-box
        margin-top .1rem
        height 9vh
        background-color #ffffff
        border-bottom 1px solid #eeeeee
        display flex
        flex-direction row
        .firstimg
            margin auto .3rem auto .3rem
        .text
            margin-top auto
            margin-bottom auto
            color #5f5f5f
            font-size 18px
        .secondimg
            margin-top auto
            margin-bottom auto
            margin-left -webkit-calc(100% - 4.2rem)
</style>
