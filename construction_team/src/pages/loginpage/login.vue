<template>
    <div class="login-box">
      <div class="content">
        <img src="@/assets/imgs/login.png" width="80" height="80" class="loginImg">
        <div class="input-box">
          <div class="input-item">
            <img src="@/assets/imgs/lguser.png" width="28" height="28" class="userimg">
            <input
              type="tel"
              placeholder="请输入账号"
              class="thisInput"
              maxlength="11"
              v-model="phone"
            >
          </div>
          <div class="input-item">
            <img src="@/assets/imgs/pwd.png" width="30" height="30" class="userimg">
            <input v-model="password" type="password" placeholder="请输入密码" class="thisInput">
          </div>
        </div>
        <button type="button" class="confirmBtn" @click="confirm">登陆</button>
      </div>
      <div class="foot-text" @click="route">
        忘记密码
      </div>
    </div>
</template>

<script>
import Vue from 'vue'
import {Toast} from 'vant'
Vue.use(Toast)
export default {
  name: 'login',
  data () {
    return {
      phone: '',
      password: ''
    }
  },
  methods: {
    route () {
      this.$router.push({path: '/forgetPwd'})
    },
    confirm () {
      const vm = this
      const phone = vm.phone
      const password = vm.password
      if (phone !== '' && password !== '') {
        const params = new URLSearchParams()
        params.append('phone', phone)
        params.append('password', password)
        vm.$http.post('/constructionBuilderLogin', params)
          .then((res) => {
            if (res.data.code === 200) {
              const token = res.data.data.token
              window.localStorage.setItem('token', token)
              Toast.success(res.data.message)
              vm.$router.replace({path: '/'})
            } else {
              Toast(res.data.message)
            }
          })
          .catch((err) => {
            console.log(err)
          })
      } else {
        Toast('请填写账号信息')
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/theme.styl'
.login-box
    background linear-gradient(80deg,#F5F7FA,#eeeeee)
    // background-color #F5F7FA
    height 100vh
    .content
      display flex
      flex-direction column
      margin-top 1.5rem
      .loginImg
        margin-left auto
        margin-right auto
        border-radius 50%
        box-shadow 1px 1px 3px 1px rgba(170,170,170,.1)
      .input-box
        margin-top .3rem
        width 93%
        margin-left auto
        margin-right auto
        height 3rem
        box-shadow 3px 1px 3px 3px rgba(170,170,170,.1)
        background-color #ffffff
        .input-item
          margin-top .5rem
          .userimg
            margin-left .5rem
          .thisInput
            margin-top .1rem
            margin-left .3rem
            border-bottom 1px solid #eeeeee
            font-size 13px
            width 70%
            color #515151
            position relative
            padding-left .1rem
            padding-bottom .05rem
            // margin-top .1rem
          .thisInput:focus
            border-bottom 1px solid $themeColor
            transition all 0.3s ease-in-out
            transform scale3d(0.97,1.1,1)
            transform-origin 100% 0
      .confirmBtn
        margin-top .5rem
        border-radius 5px
        width 90%
        height .8rem
        font-size 18px
        color #ffffff
        background $color
        margin-left auto
        margin-right auto
      .confirmBtn:active
        background #00818A
    .foot-text
      margin-top .4rem
      margin-right .35rem
      text-align right
      color $themeColor
      font-size 16px
</style>
