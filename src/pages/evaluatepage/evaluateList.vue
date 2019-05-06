<template>
    <div class="evaluate-box">
      <van-nav-bar
      title="评价"
      left-arrow
      class="header"
      @click-left="onLeft"
      />
      <div class="list">
          <div class="noData" v-if="showData">
            无相关数据
          </div>
          <van-list
          v-model="loading"
          :finished="finished"
          @load="onLoad"
          >
          <div v-for="(item,index) in nowlist" :key="index">
            <router-link :to="{path:'/showEvaluate',query:{node:index}}">
              <div class="eval-item">

                    <div class="eval-img">
                        <img src="@/assets/imgs/pl8.png" width="25" height="25">
                    </div>
                    <div class="line"></div>
                    <div class="eval-desc">
                        <p class="name">{{item.order.userName}}</p>
                        <p class="date">{{item.createTime | formatDate}}</p>
                        <p class="address">地址：{{item.order.addresses.details}}</p>
                    </div>
                    <img src="@/assets/imgs/right.png" width="25" height="25" class="this-right">
              </div>
            </router-link>
          </div>

          </van-list>
      </div>
    </div>
</template>

<script>
import { List, Toast } from 'vant'
import {formatDate} from '../../common/date.js'
import Vue from 'vue'
Vue.use(List)
export default {
  name: 'evaluateList',
  data () {
    return {
      list: [],
      nowlist: [],
      offset: 100,
      j: 0,
      loading: false,
      finished: false
    }
  },
  mounted () {
    this.getlist()
  },
  // beforeRouteEnter (to, from, next) {
  //   if (from.meta.index < to.meta.index) {
  //     next()
  //   } else {
  //     next()
  //   }
  // },
  // 时间戳转换
  filters: {
    formatDate (time) {
      var date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd')
    }
  },
  computed: {
    showData () {
      const vm = this
      if (vm.list.length === 0 || vm.list.length === null) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    onLeft () {
      this.$router.replace({path: '/'})
    },
    getlist () {
      const vm = this
      vm.$http.post('/evaluationApp/builderEvaluationList')
        .then((res) => {
          console.log(res.data)
          vm.list = res.data.data.evaluationList
        })
        .catch((error) => {
          console.log(error)
        })
    },
    // list数据懒加载
    onLoad () {
      setTimeout(() => {
        for (var i = 0; i < 6; i++) {
          this.j++
          if (this.j <= this.list.length) {
            var index = this.nowlist.length
            this.nowlist.push(this.list[index])
          }
        }
        this.loading = false
        if (this.nowlist.length >= this.list.length) {
          this.finished = true
          Toast('没有更多了')
        }
      }, 2000)
    }
  }
}
</script>

<style lang="stylus" scoped>
.evaluate-box
  height: 100vh
  background-color: #FCFCFC
  .header
    position: fixed
    width: 100%
    border-bottom: 2px solid #F6F6F6
  .list
    margin-top: 1.4rem
    .noData
      padding-top .5rem
      text-align center
      font-size 17px
      color #aaaaaa
    .this-right
      margin:auto .1rem
    .eval-item
      display: flex
      height 15vh
      border-bottom: 2px solid #eee
      background-color: #fff
      // margin-bottom: .2rem
      .eval-img
        margin-left: .3rem
        margin-right .3rem
        margin-top auto
        margin-bottom auto
      .line
        margin-top auto
        margin-bottom auto
        margin-right .2rem
        height 1.05rem
        width 1px
        background-color #eeeeee
      .eval-desc
        flex: 1
        width: 72%
        margin-top .25rem
        .name
          margin-top: .12rem
          font-size: 16px
          color: #5E5E5E
        .date
          position: relative
          bottom: .4rem
          float: right
          margin-top: .1rem
          font-size: 15px
          color: #868686
        .address
          margin-top: .5rem
          font-size: 15px
          white-space:nowrap
          text-overflow:ellipsis
          overflow:hidden
          color: #868686
</style>
