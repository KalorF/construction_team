<template>
    <div class="personal-box">
        <div class="per-nav">
            <img src="@/assets/imgs/left.png" width="25" class="nav-back" @click="goback">
            <div class="nav-title">
                个人中心
            </div>
        </div>
        <div class="per-header">
            <center>
                <img v-lazy="img" class="per-img" lazy='loading'>
            </center>
            <p class="per-name">{{name}}</p>
        </div>
        <div class="select">
            <van-cell-group>
                <van-cell title="修改信息" is-link icon="edit" @click="selEdit" />
                <router-link :to="{name:'ShowMember'}">
                    <van-cell title="施工队成员" is-link icon="contact" />
                </router-link>
                <router-link :to="{name:'changeFace', params:{url:faceUrl}}">
                    <van-cell title="人脸修改" is-link icon="password-view" />
                </router-link>
                <router-link :to="{name:'changePwd'}">
                    <van-cell title="密码修改" is-link icon="edit-data" />
                </router-link>
            </van-cell-group>
        </div>
        <center>
            <button type="button" class="btn" @click="loginOut">退出登陆</button>
        </center>
        <van-actionsheet v-model="show" :actions="actions" cancel-text="取消" />
    </div>
</template>

<script>
import Vue from 'vue'
import { Cell, CellGroup, Actionsheet } from 'vant'
Vue.use(Cell).use(CellGroup)
Vue.use(Actionsheet)
export default {
  name: 'personal',
  data () {
    return {
      show: false,
      img: '',
      name: '',
      faceUrl: '',
      actions: [
        {
          name: '选项',
          disabled: true
        }, {
          name: '修改团队信息',
          callback: this.onClickUon
        }, {
          name: '修改个人信息',
          callback: this.onClickPer
        }
      ]
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
    getData () {
      const vm = this
      vm.$http.post('/ConstructionBuilderAppControllerLxb/showAll')
        .then(res => {
          vm.name = res.data.data.ConstructionBuilder.constructionBuilderName
          const url = res.data.data.ConstructionBuilder.headimgurl
          if (url === '' || url === null) {
            vm.img = require('@/assets/imgs/head.png')
          } else {
            vm.img = url
          }
          vm.faceUrl = res.data.data.ConstructionBuilder.faceImg
        })
    },
    selEdit () {
      this.show = true
    },
    goback () {
      this.$router.replace({name: 'Home', query: { time: new Date().getTime() }})
    },
    onClickUon () {
      this.$router.push({path: '/uonMsg'})
    },
    onClickPer () {
      this.$router.push({path: '/perMsg'})
    },
    loginOut () {
      window.localStorage.removeItem('token')
      this.$router.replace({path: '/login'})
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/theme.styl'
.van-cell
    border-top: 1px solid #eeeeee
.personal-box
  background-color: #FCFCFC
  height:100vh
  .nav-back
    position:fixed
    top:18px
    left: .13rem
  .per-nav
   background $color
   z-index 9
   padding-top 14px
   height:.8rem
   display: flex
   .nav-title
     margin: .2rem auto
     color:#fff
     font-size: 17px
  .per-header
    height: 1.1rem
    position: relative
    z-index: 18
    bottom:.02rem
    background linear-gradient(50deg, #3FAAB2, #2CC0B3)
    // background-color: $themeColor
    border-radius: 0 0 100% 90% / 100%
    .per-img
      background-color #ffffff
      border-radius: 50%
      border: 2px solid #fff
      margin-top: .4rem
      width: 1.5rem
      height:1.5rem
    .per-name
      color: $themeColor
      font-size: 20px
      text-align:center
      margin-top: .2rem
   .select
     margin: 2.2rem auto 1.5rem auto
     width: 97%
     box-shadow: 1px 1px 3px #eee
   .btn
     width: 90%
     height: .9rem
     background $color
     font-size: 17px
     color: #fff
     border-radius: 8px
     box-shadow: 5px 5px 5px #EEE
   .btn:active
     background #00818A
</style>
