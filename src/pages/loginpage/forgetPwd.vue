<template>
    <div class="forget-password-box">
        <van-nav-bar
            title="找回密码"
            left-arrow
            @click-left="$router.goBack"
        />
        <div class="head-box">
            <img src="@/assets/imgs/findpwd.png" width="40" height="40" class="head-img">
            <div class="text">密码找回</div>
        </div>
        <div class="content-box">
            <div class="item">
                <div class="item-phone">手机号码</div>
                <input
                    type="text"
                    placeholder="请输入手机号码获取验证码"
                    class="phone"
                    maxlength="11"
                    v-model="phone"
                    onkeyup="(this.v=function(){this.value=this.value.replace(/[^0-9-]+/,'');}).call(this)"
                >
            </div>
            <div class="item-test">
                <div class="item-text">验证码</div>
                <input v-model="validationCode" type="text" placeholder="请输入验证码" class="test" maxlength="6">
                <button type="button" ref="btn" :disabled="!canClick" class="btn" @click="countDown">{{content}}</button>
            </div>
        </div>
        <div class="btn-box">
            <button type="button" class="confirmBtn" @click="confrim">确认</button>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import {Toast} from 'vant'
Vue.use(Toast)
export default {
  name: 'forgetPwd',
  beforeRouteLeave (to, from, next) {
    this.$destroy()
    next()
  },
  data () {
    return {
      content: '发送验证码',
      totalTime: 60,
      phone: '',
      canClick: true,
      token: '',
      validationCode: ''
    }
  },
  methods: {
    // 验证手机是否正确，以及设置验证码倒计时
    countDown () {
      const vm = this
      let reg = /^((13|14|15|17|18)[0-9]{1}\d{8})$/
      if (!reg.test(vm.phone)) {
        Toast('请输入正确手机号')
      } else if (vm.phone !== '') {
        if (!vm.canClick) return
        vm.getvalidationCode()
        vm.canClick = false
        vm.content = vm.totalTime + 's后重新获取'
        let clock = window.setInterval(() => {
          vm.totalTime--
          vm.content = vm.totalTime + 's后重新获取'
          if (vm.totalTime < 0) {
            window.clearInterval(clock)
            vm.content = '重新获取验证码'
            vm.totalTime = 60
            vm.canClick = true
          }
        }, 1000)
      } else if (vm.phone === '') {
        Toast('请输入手机号')
      }
    },
    // 发送验证码
    getvalidationCode () {
      const vm = this
      const phone = vm.phone
      const parmas = new URLSearchParams()
      parmas.append('phone', phone)
      vm.$http.post('/aliPhoneMsg', parmas)
        .then(res => {
          vm.token = res.data.token
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 验证验证码平且进行路由跳转
    confrim () {
      const vm = this
      if (vm.phone !== '' && vm.validationCode !== '') {
        const parmas = new URLSearchParams()
        const token = vm.token
        const validationCode = vm.validationCode
        const phone = vm.phone
        parmas.append('token', token)
        parmas.append('validationCode', validationCode)
        parmas.append('phone', phone)
        vm.$http.post('/ConstructionBuilderAppControllerLxb/forgetPasswordValidationCode', parmas)
          .then(res => {
            if (res.data.code === 0) {
              Toast(res.data.message)
            } else if (res.data.code === 1) {
              Toast(res.data.message)
            } else {
              const PhoneToken = phone
              Toast('验证成功,请设置新密码')
              vm.$router.push({path: '/resetPwd', query: {PhoneToken: PhoneToken}})
            }
          })
          .catch(error => {
            console.log(error)
          })
      } else {
        Toast('请填写验证码')
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/theme.styl'
.forget-password-box
    height 100vh
    background-color #f5f7fa
    .head-box
        height 1.5rem
        display flex
        flex-direction row
        .head-img
            margin auto .3rem auto .5rem
        .text
            margin-top auto
            margin-bottom auto
            color #5f5f5f
            font-size 19px
    .content-box
        height 3rem
        width 93%
        box-shadow 3px 1px 3px 3px rgba(170,170,170,.1)
        background-color #ffffff
        margin-left auto
        margin-right auto
        .item
            display flex
            flex-direction row
            padding-top .6rem
            width 90%
            margin-left auto
            margin-right auto
            .item-phone
                margin-top auto
                margin-bottom auto
                margin-left .2rem
                width 28%
                font-size 18px
            .phone
                border-bottom 1px solid #eeeeee
                padding-left .1rem
                padding-bottom .05rem
                width 66%
            .phone:focus
                border-bottom 1px solid $themeColor
                transition all 0.3s ease-in-out
                transform scale3d(0.97,1.1,1)
                transform-origin 100% 0
        .item-test
            display flex
            flex-direction row
            padding-top .6rem
            width 90%
            margin-left auto
            margin-right auto
            .item-text
                margin-top auto
                margin-bottom auto
                margin-left .2rem
                width 32%
                font-size 18px
            .test
                border-bottom 1px solid #eeeeee
                padding-left .1rem
                padding-bottom .05rem
                width 40%
            .test:focus
                border-bottom 1px solid $themeColor
                transition all 0.3s ease-in-out
                transform scale3d(0.98,1.1,1)
                transform-origin 100% 0
            .btn
                background-color $themeColor
                color #ffffff
                height .5rem
                line-height .5rem
                width 2rem
                font-size 11px
                border-radius 3px
                line-height .5rem
                margin-left .2rem
    .btn-box
        text-align center
        .confirmBtn
            height 1rem
            width 90%
            margin .4rem auto .1rem auto
            box-shadow 3px 1px 3px 3px rgba(170,170,170,.1)
            border-radius 5px
            background-color #ffffff
            font-size 18px
            color $themeColor
        .confirmBtn:active
            background-color #eeeeee
</style>
