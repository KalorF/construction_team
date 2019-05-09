<template>
  <div class="first-order-box">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div v-for="(item,index) of list" :key="index">
        <!-- <div v-for="index of 8" :key="index"> -->
        <div class="box-content">
          <img src="@/assets/imgs/house.png" class="img" height="40" width="40">
          <div class="line"></div>
          <div class="content">
            <div class="name">
              <!-- <div class="text">大师傅</div>
              <span class="phone">211332535435</span>-->
              <div class="text">{{item.userName}}</div>
              <span class="phone">{{item.phone}}</span>
            </div>
            <div class="time">
              预约时间 : {{item.examinationTime | formatDate }}
              <!-- 预约时间 : 2018-10-23 -->
            </div>
            <div class="time">
              施工面积 : {{item.constructionArea}} ㎡
              <!-- 施工面积 : 123 -->
            </div>
            <div class="time">
              价格 :
              <span v-if="item.price === null || item.price === 0">待填写</span>
              <span v-else>
                {{item.price}}
                <i>（元）</i>
              </span>
              <!-- 价格 : 231 -->
            </div>
            <div class="address">
              <div class="adName">地址 :</div>
              <p class="ad">{{item.addresses.details}}</p>
              <!-- <p class="ad">士大夫随风倒给风格化风格化法国</p> -->
            </div>
          </div>
        </div>
        <div class="operate">
          <span v-if="item.orderAttribute === 0">家装</span>
          <span v-else-if="item.orderAttribute === 1">工装</span>
          <!-- <button class="btn" @click="writeResult(1,2)">结果填写</button>
                <button class="btn2">价格填写</button>
          <button class="btncacel">取消检测</button>-->
          <button class="btn" @click="writeResult(item.examinationOneId, item)">结果填写</button>
          <button
            v-if="item.price === null || item.price === 0"
            class="btn2"
            @click="writePrice(item.examinationOneId, item.orderAttribute)"
          >填写价格</button>
          <button
            v-if="item.price !== null && item.orderAttribute === 1"
            class="btn2"
            @click="changePrice(item.examinationOneId)"
          >更改价格</button>
          <button class="btncacel" @click="cancel(item.examinationOneId)">取消检测</button>
        </div>
      </div>
      <div :class="{foot:footer,foot2:!footer}">{{footertext}}</div>
    </van-pull-refresh>
    <van-dialog
      v-model="show"
      show-cancel-button
      :before-close="beforeClose"
      confirm-button-text="确认"
      cancel-button-text="取消"
    >
      <div class="dialogContent">确认取消检测吗？</div>
    </van-dialog>
    <!-- <van-dialog
            v-model="show2"
            show-cancel-button
            :before-close="beforeClose2"
            confirm-button-text="确认"
            cancel-button-text="取消"
            >
            <van-field
                v-model="number"
                onkeyup="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')"
                label="价格填写"
                placeholder="请填写价格"
                maxlength="7"
            />
    </van-dialog>-->
  </div>
</template>

<script>
import Vue from 'vue'
import { formatDate } from '@/common/date.js'
import { PullRefresh, Toast, Dialog } from 'vant'
import { setTimeout } from 'timers'
Vue.use(Dialog)
Vue.use(PullRefresh)
Vue.use(Toast)
export default {
  name: 'firstDetection',
  data () {
    return {
      list: [],
      isLoading: false,
      show: false,
      show2: false,
      number: '',
      listid: '',
      listid2: ''
    }
  },
  activated () {
    this.getData()
  },
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
  beforeRouteLeave (to, from, next) {
    this.$destroy()
    next()
  },
  methods: {
    writeResult (examinationOneId, item) {
      if (item.price === null || item.price === 0) {
        Toast('请先填写价格')
      } else {
        this.$router.push({
          path: '/writeFirstData',
          query: { examinationOneId: examinationOneId }
        })
      }
    },
    cancel (id) {
      const vm = this
      vm.listid = id
      vm.show = true
    },
    beforeClose (action, done) {
      if (action === 'confirm') {
        const vm = this
        const params = new URLSearchParams()
        params.append('examinationOneId', vm.listid)
        vm.$http
          .post(
            '/ExaminationOneConstructionTeamController/ExaminationOneConstructionTeamCancel',
            params
          )
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
    writePrice (id, orderAttribute) {
      const vm = this
      if (orderAttribute === 0) {
        vm.$router.push({ path: '/writePrice', query: { id: id } })
      } else if (orderAttribute === 1) {
        vm.$router.push({ path: '/writeToolPrice', query: { id: id } })
      }
      // vm.listid2 = id
      // vm.show2 = true
    },
    changePrice (id) {
      const vm = this
      vm.$router.push({ path: '/resetToolPrice', query: { id: id } })
    },
    // Price () {
    //   const vm = this
    //   const thisId = vm.listid2
    //   const price = vm.number
    //   const parmas = new URLSearchParams()
    //   parmas.append('examinationOneId', thisId)
    //   parmas.append('price', price)
    //   vm.$http.post('/ExaminationOneConstructionTeamController/ConstructionTeamInsertMoney', parmas)
    //     .then(res => {
    //       Toast.success('修改成功')
    //       vm.getData()
    //     })
    //     .catch(error => {
    //       console.log(error)
    //     })
    // },
    // beforeClose2 (action, done) {
    //   if (action === 'confirm') {
    //     const vm = this
    //     const number = vm.number
    //     if (number !== '') {
    //       vm.Price()
    //       setTimeout(() => {
    //         vm.number = ''
    //       }, 1000)
    //       setTimeout(done, 1000)
    //     } else {
    //       Toast('修改失败,请填写价格')
    //       setTimeout(done, 1000)
    //     }
    //   } else {
    //     this.number = ''
    //     done()
    //   }
    // },
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
      vm.$http
        .post(
          '/ExaminationOneConstructionTeamController/ExaminationOneWaitSelect'
        )
        .then(res => {
          console.log(res.data)
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
.first-order-box {
  // background-color #F5F7FA
  .dialogContent {
    text-align: center;
    height: 1.5rem;
    line-height: 1.5rem;
    color: #5f5f5f;
  }

  .foot {
    font-size: 16px;
    color: #aeaeae;
    text-align: center;
    margin-top: 0.3rem;
    padding-bottom: 7rem;
  }

  .foot2 {
    font-size: 16px;
    color: #aeaeae;
    text-align: center;
    margin-top: 0.3rem;
    padding-bottom: 0.2rem;
  }

  .box-content {
    // border-top 2px solid #eeeeee
    background-color: #ffffff;
    display: flex;
    flex: 1;

    .img {
      margin-top: auto;
      margin-bottom: auto;
      margin-left: 0.2rem;
      margin-right: 0.2rem;
      width: 40px;
      height: 40px;
    }

    .line {
      width: 1px;
      height: 8vh;
      margin: auto 0.1rem;
      background-color: #eeeeee;
    }

    .content {
      margin: 0.2rem 0.2rem 0.1rem 0.2rem;
      width: 100%;

      .name {
        display: flex;
        font-size: 16px;
        color: #434343;

        .text {
          width: 70%;
          margin-right: 0.2rem;
        }

        .phone {
          flex: 1;
          font-size: 15px;
          color: #6B6B6B;
        }
      }

      .time {
        margin-top: 0.15rem;
        font-size: 12px;
        color: #515151;

        span {
          color: #F75940;

          i {
            color: #5f5f5f;
          }
        }
      }

      .address {
        margin-top: 0.15rem;
        display: flex;
        flex-direction: row;

        .adName {
          width: 0.8rem;
          color: #515151;
          font-size: 13px;
        }

        .ad {
          line-height: 0.32rem;
          width: 93%;
          color: #515151;
          font-size: 13px;
        }
      }
    }
  }

  .operate {
    height: 0.8rem;
    background-color: #fff;
    border-bottom: 0.17rem solid #f5f7fa;
    border-top: 1px solid #eee;
    margin-bottom: 0.16rem;

    span {
      display: inline-block;
      margin-top: 0.25rem;
      font-size: 15px;
      border-left: 3px solid #28cc75;
      color: #666666;
      padding-left: 0.12rem;
      margin-left: 0.2rem;
    }

    .btn {
      margin-top: 0.1rem;
      margin-right: 0.2rem;
      float: right;
      color: #ffffff;
      background: linear-gradient(10deg, #28cc75, #5BE7C4);
      border-radius: 5px;
      height: 0.6rem;
      line-height: 0.6rem;
      width: 1.5rem;
    }

    .btn2 {
      margin-top: 0.1rem;
      margin-right: 0.2rem;
      float: right;
      color: #ffffff;
      background: linear-gradient(10deg, #00c853, #b9f6ca);
      border-radius: 5px;
      height: 0.6rem;
      line-height: 0.6rem;
      width: 1.5rem;
    }

    .btncacel {
      margin-top: 0.1rem;
      margin-right: 0.2rem;
      float: right;
      color: #ffffff;
      background: linear-gradient(-170deg, #F38181, #F75940);
      border-radius: 5px;
      height: 0.6rem;
      line-height: 0.6rem;
      width: 1.5rem;
    }
  }
}
</style>
