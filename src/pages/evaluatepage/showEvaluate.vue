<template>
    <div>
      <van-nav-bar
        title="评价详情"
        left-arrow
        class="header"
        @click-left="$router.goBack"
      />
      <div class="detail-box">
          <div class="header-box">
              <div class="header-img-box">
                  <img src="@/assets/imgs/user.png" class="thisImg1">
              </div>
              <div class="line"></div>
              <div class="name-phone">
                  <p class="name">姓名 : {{name}}</p>
                  <p class="phone">手机 : {{phone}}</p>
              </div>
          </div>
          <div class="order-box">
              <div class="order-box-img">
                  <img src="@/assets/imgs/order.png" class="order-img">
              </div>
              <div class="line"></div>
              <div class="order-area">
                  <p class="ar">施工面积(m²)</p>
                  <p class="arNumber">{{area}}</p>
              </div>
              <div class="order-time">
                  <p class="tm">下单时间</p>
                  <p class="tmNumber">{{buildingTime | formatDate}}</p>
              </div>
          </div>
          <div class="address-box">
              <div class="ad-box">
                  <p class="adname">客户地址</p>
                  <p class="address">{{address}}</p>
              </div>
          </div>
          <div class="content-box">
              <div class="content">
                  <p class="coText">客户评价</p>
                  <!-- <van-rate v-model="value" disabled disabled-color="#F9CE00" class="star"/> -->
                  <p class="this-text">{{content}}</p>
              </div>
              <div class="content-img">
                  <div v-for="(img, index) of images" :key="index" @click="show(index)">
                      <img  :src="img"  class="cont-img">
                  </div>
              </div>
          </div>
      </div>
    </div>
</template>

<script>
import Vue from 'vue'
import { ImagePreview, Rate } from 'vant'
import {formatDate} from '../../common/date.js'
Vue.use(Rate)
export default {
  name: 'showEvaluate',
  data () {
    return {
      // value: 3,
      images: [],
      name: '',
      phone: '',
      area: '',
      buildingTime: '',
      address: '',
      content: ''
    }
  },
  // 进入路由前获取数据
  activated () {
    this.getData()
  },
  // 路由离开前销毁数据
  beforeRouteLeave (to, from, next) {
    this.$destroy()
    next()
  },
  // 时间戳转换
  filters: {
    formatDate (time) {
      var date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd')
    }
  },
  methods: {
  // 数据获取
    getData () {
      const vm = this
      const index = vm.$route.query.node
      vm.$http.post('/evaluationApp/builderEvaluationList')
        .then((res) => {
          const des = res.data.data.evaluationList[index]
          const image = des.imgs
          vm.name = des.order.userName
          vm.phone = des.order.phone
          vm.area = des.order.constructionArea
          vm.buildingTime = des.order.buildingTime
          vm.address = des.order.addresses.details
          vm.content = des.content
          for (let i = 0; i < image.length; i++) {
            vm.images.push(image[i].imgUrl)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    // 图片预览
    show (index) {
      const vm = this
      ImagePreview(vm.images, index)
    }
  }
}
</script>

<style lang="stylus" scoped>
.header
  position: fixed
  width: 100%
.detail-box
  height: 100vh
  background-color: #fcfcfc
  .header-box
    margin: 1.55rem auto .3rem auto
    width: 88%
    height: 1.5rem
    display: flex
    background-color: #ffffff
    box-shadow: 3px 1px 5px 2px #eee
    .header-img-box
      width: 2rem
      height: 1.5rem
      display: flex
      justify-content: center
      align-items: center
      .thisImg1
        width: 50px
        height: 50px
    .line
      width:.03rem
      height: 8.5vh
      margin: auto .1rem
      background-color: #eee
    .name-phone
      display: flex
      flex-direction: column
      margin: auto .2rem
      .name
        font-size: 17px
        color: #515151
      .phone
        font-size: 15px
        color: #515151
        margin-top: .3rem
  .order-box
    margin: .4rem auto .3rem auto
    width: 88%
    height: 1.5rem
    display: flex
    background-color: #ffffff
    box-shadow: 3px 1px 5px 2px #eee
    .order-box-img
      width: 1.5rem
      height: 13vh
      display: flex
      justify-content: center
      align-items: center
      .order-img
        width: 45px
        height: 45px
    .line
      width:.03rem
      height: 7vh
      margin: auto .1rem
      background-color: #eee
    .order-area
      width: 40%
      height: 13vh
      display: flex
      flex-direction: column
      justify-content: center
      align-items: center
      .ar
        font-size: 15px
        color: #515151
      .arNumber
        margin-top: .2rem
        font-size: 16px
        color: #aeaeae
    .order-time
      width: 30%
      height: 13vh
      display: flex
      flex-direction: column
      justify-content: center
      align-items: center
      .tm
        font-size: 15px
        color: #515151
      .tmNumber
        margin-top: .2rem
        font-size: 16px
        color: #aeaeae
  .address-box
    margin: .4rem auto .3rem auto
    width: 88%
    padding-top .2rem
    padding-bottom .2rem
    display: flex
    background-color: #ffffff
    box-shadow: 3px 1px 5px 2px #eee
    border-left: .1rem solid #28CC75
    .ad-box
      margin: auto .2rem
      display: flex
      flex-direction: column
      .adname
        margin-left: .2rem
        font-size: 16px
        color: #515151
      .address
        margin-left: .2rem
        margin-top: .12rem
        line-height 18px
        font-size: 15px
        color: #aeaeae
  .content-box
    margin: .4rem auto .3rem auto
    padding-bottom: .5rem
    width: 88%
    background-color: #ffffff
    box-shadow: 3px 1px 5px 2px #eee
    border-left: .1rem solid #28CC75
    .content
      padding-top: .2rem
      margin-right: .2rem
      margin-left: .3rem
      .coText
        color: #515151
        font-size: 16px
        margin-left: .1rem
      // .star
      //   margin-top: .1rem
      .this-text
        color: #6b6b6b
        margin-top: .1rem
        line-height: .4rem
        margin-left: .1rem
        font-size: 15px
    .content-img
      padding-top: .3rem
      margin-right: .2rem
      margin-left: .3rem
      width: 88%
      display: inline-block
      .cont-img
        width: 26%
        height: 50px
        float: left
        margin-left: .3rem
        margin-bottom: .3rem
        box-shadow: 1px 4px 5px #eee
        border-radius: .1rem
</style>
