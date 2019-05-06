<template>
    <div class="chang-password-box">
        <van-nav-bar
            title="密码修改"
            left-arrow
            class="header"
            @click-left="$router.goBack"
         >
         <div slot="right" class="cfmRight" @click="comfirm">
            确认
         </div>
        </van-nav-bar>
        <div class="head-box">
             <img src="@/assets/imgs/changepwd.png" width="45" height="45" class="head-img">
             <div class="text">账号密码修改</div>
        </div>
        <div class="input-box">
            <div class="ibput-item">
                <div class="this-text">原密码</div>
                <input v-model="pwd" type="password" class="this-input" placeholder="请输入原始密码" maxlength="26">
            </div>
            <div class="ibput-item">
                <div class="this-text">新密码</div>
                <input v-model="pwd2" type="password" class="this-input" placeholder="请输入新密码" maxlength="26">
            </div>
            <div class="ibput-item">
                <div class="this-text">确认密码</div>
                <input v-model="pwd3" type="password" class="this-input" placeholder="请再次输入新密码" maxlength="26">
            </div>
        </div>
        <div class="foot">
            账号密码修改,密码长度为6 ~ 26个字符
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import {Toast} from 'vant'
Vue.use(Toast)
export default {
  name: 'changePwd',
  data () {
    return {
      pwd: '',
      pwd2: '',
      pwd3: ''
    }
  },
  methods: {
    comfirm () {
      const vm = this
      const pwd = vm.pwd
      const pwd2 = vm.pwd2
      const pwd3 = vm.pwd3
      if (pwd !== '' && pwd2 !== '' && pwd3 !== '') {
        if (pwd2.length < 6 || pwd3.length < 6) {
          Toast('请填写不少于6个字符的密码')
        } else {
          const parmas = new URLSearchParams()
          parmas.append('pwd', pwd)
          parmas.append('pwd2', pwd2)
          parmas.append('pwd3', pwd3)
          vm.$http.post('/ConstructionBuilderAppControllerLxb/updatePassword2', parmas)
            .then(res => {
              if (res.data.code === 0) {
                Toast(res.data.message)
              } else if (res.data.code === 1) {
                Toast(res.data.message)
              } else {
                Toast('密码修改成功，请重新登陆')
                window.localStorage.removeItem('token')
                vm.$router.push({path: '/login'})
              }
            })
            .catch(error => {
              console.log(error)
            })
        }
      } else {
        Toast('请填写完整')
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.cfmRight
    color #ffffff
    font-size 16px
.chang-password-box
    height 100vh
    background-color #F5F7FA
    .head-box
        background-color #ffffff
        height 1.2rem
        display flex
        flex-direction row
        .head-img
            margin auto .2rem auto .3rem
        .text
            margin-top auto
            margin-bottom auto
            margin-left .1rem
            font-size 19px
            color #5f5f5f
    .input-box
        margin-top .15rem
        height 3.3rem
        background-color #ffffff
        .ibput-item
            height 1rem
            display flex
            flex-direction row
            .this-text
                padding-left .3rem
                margin auto .1rem auto .2rem
                width 25%
                font-size 18px
                color #5f5f5f
            .this-input
                width 60%
                height .64rem
                font-size 13px
                margin-top .15rem
                vertical-align left
                padding-left .11rem
                background transparent
                color #aaaaaa
                line-height 0
                border-bottom 1px solid #eeeeee
            .this-input:focus
                border-bottom 1px solid #28cc75
            .this-input::-webkit-input-placeholder
                color #aaaaaa
            .this-input::-moz-placeholder
                color #aaaaaa
            .this-input:-moz-placeholder
                color #aaaaaa
            .this-input:-ms-input-placeholder
                color #aaaaaa
    .foot
        height 1rem
        margin-top .4rem
        color #aeaeae
        font-size 16px
        text-align center
</style>
