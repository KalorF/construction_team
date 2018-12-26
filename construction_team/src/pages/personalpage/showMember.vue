<template>
    <div class="member-box">
        <van-nav-bar
        title="施工队成员"
        left-arrow
        @click-left="$router.goBack"
        />
        <div class="noMember" v-if="haveMumber">
          暂无成员
        </div>
        <div class="member-list" v-for="(item,index) of list" :key="index">
            <div class="list-item">
                <div class="item-img">
                    <img v-if="item.headimgurl === '' || item.headimgurl === null" class="this-img" src="@/assets/imgs/head.png" width="55" height="55">
                    <img v-else :src="item.headimgurl" class="this-img" width="55" height="55">
                </div>
                <div class="item-msg">
                    <div class="msg-name">{{item.constructionBuilderName}}</div>
                    <div class="msg-phone">{{item.phone}}</div>
                </div>
                <button class="btn" @click="deleted(item.constructionBuilderId)">删除</button>
            </div>
        </div>
        <van-dialog
            v-model="show"
            show-cancel-button
            :before-close="beforeClose"
            confirm-button-text="确认"
            cancel-button-text="取消"
            >
            <div class="dialogContent">
                是否删除该成员？
            </div>
        </van-dialog>
    </div>
</template>

<script>
import Vue from 'vue'
import {Toast, Dialog} from 'vant'
import { setTimeout } from 'timers'
Vue.use(Toast)
Vue.use(Dialog)
export default {
  name: 'member',
  data () {
    return {
      list: [],
      show: false,
      thisId: ''
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
    haveMumber () {
      const vm = this
      if (vm.list.length === 0 || vm.list.length === null) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    deleted (id) {
      const vm = this
      vm.thisId = id
      vm.show = true
    },
    beforeClose (action, done) {
      if (action === 'confirm') {
        const vm = this
        const parmas = new URLSearchParams()
        parmas.append('constructionBuilderId', vm.thisId)
        vm.$http.post('/ConstructionTeamAppControllerLxb/delMember', parmas)
          .then(res => {
            if (res.data.code === 200) {
              Toast.success('删除成功')
              vm.getData()
              setTimeout(done, 700)
            } else {
              Toast('无权删除该成员')
              setTimeout(done, 700)
            }
          })
          .catch(error => {
            console.log(error)
          })
      } else {
        done()
      }
    },
    getData () {
      const vm = this
      vm.$http.post('/ConstructionBuilderAppControllerLxb/showAll')
        .then(res => {
          const id = res.data.data.ConstructionBuilder.constructionBuilderId
          for (const i in res.data.data.ConstructionBuilder.team.member) {
            if (res.data.data.ConstructionBuilder.team.member[i].constructionBuilderId !== id) {
              vm.list.push(res.data.data.ConstructionBuilder.team.member[i])
            }
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
.member-box
  height: 100vh
  background-color: #F5F7FA
  .noMember
    text-align center
    font-size 17px
    margin-top .3rem
    color #aaaaaa
  .dialogContent
        text-align center
        height 1.5rem
        line-height 1.5rem
        color #5f5f5f
  .list-item
    display:flex
    height: 12vh
    background-color: #fff
    border-bottom: 1px solid #eee
    margin-bottom: .2rem
    .item-img
      margin: auto .2rem
      .this-img
        border-radius: 50%
    .item-msg
      margin-top: auto
      margin-bottom: auto
      margin-left: .2rem
      width 55%
      .msg-name
        font-size: 17px
      .msg-phone
        margin-top: .3rem
        color: #6B6B6B
        font-size: 16px
    .btn
      height: 5vh
      width: 15%
      color: #ffffff
      background-color: #FF3300
      border-radius: 10px
      // margin-left: -webkit-calc(100% - 5rem)
      margin-top: auto
      margin-bottom: auto
</style>
