<template>
    <div class="resetpwd-box">
        <van-nav-bar
          title="重置密码"
          left-arrow
          @click-left="$router.goBack"
        />
        <div class="head-box">
          <img src="@/assets/imgs/resetpwd.png" width="40" height="40" class="head-img">
          <div class="text">密码重置</div>
        </div>
        <div class="content-box">
          <div class="item">
              <div class="item-pwd">新密码</div>
              <input v-model="pwd" type="password" placeholder="请输入新密码" class="pwd" maxlength="26">
          </div>
          <div class="item">
              <div class="item-pwd">确认密码</div>
              <input v-model="pwd2" type="password" placeholder="请再次输入新密码" class="pwd" maxlength="26">
          </div>
        </div>
        <div class="footer">
          <div class="text">
              重置密码,长度为6 ~ 26个字符
          </div>
          <button type="button" class="confirmBtn" @click="confirm">确认</button>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import {Toast} from 'vant'
import { setTimeout } from 'timers'
Vue.use(Toast)
export default {
  name: 'resetPwd',
  data () {
    return {
      pwd: '',
      pwd2: ''
    }
  },
  methods: {
    confirm () {
      const vm = this
      const pwd = vm.pwd
      const pwd2 = vm.pwd2
      const PhoneToken = vm.$route.query.PhoneToken
      if (pwd !== '' && pwd2 !== '') {
        if (pwd.length < 6 || pwd2.length < 6) {
          Toast('请输入不少于6个字符的密码')
        } else if (pwd !== pwd2) {
          Toast('密码不一致,请重新输入')
        } else {
          const parmas = new URLSearchParams()
          parmas.append('PhoneToken', PhoneToken)
          parmas.append('pwd', pwd)
          parmas.append('pwd2', pwd2)
          vm.$http.post('/ConstructionBuilderAppControllerLxb/updatePassword', parmas)
            .then(res => {
              setTimeout(() => {
                Toast('设置成功,请重新登陆')
                vm.$router.replace({path: '/login'})
              }, 1000)
            })
            .catch(error => {
              console.log(error)
            })
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/theme.styl'
.resetpwd-box
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
            .item-pwd
                margin-top auto
                margin-bottom auto
                margin-left .2rem
                width 28%
                font-size 18px
            .pwd
                border-bottom 1px solid #eeeeee
                padding-left .1rem
                padding-bottom .05rem
                width 66%
            .pwd:focus
                border-bottom 1px solid $themeColor
                transition all 0.3s ease-in-out
                transform scale3d(0.97,1.1,1)
                transform-origin 100% 0
    .footer
        text-align center
        margin-top .4rem
        .text
            color #aaaaaa
            font-size 15px
        .confirmBtn
            height 1rem
            width 90%
            margin .3rem auto .1rem auto
            box-shadow 3px 1px 3px 3px rgba(170,170,170,.1)
            border-radius 5px
            background-color #ffffff
            font-size 18px
            color $themeColor
        .confirmBtn:active
            background-color #eeeeee
</style>
