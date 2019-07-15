<template>
  <div>
    <van-nav-bar
      title="价格修改"
      left-arrow
      @click-left="$router.goBack"
      fixed
    >
    </van-nav-bar>

    <div class="price_box">
      <div class="img_box">
        <img src="@/assets/imgs/area.png" alt="加载中">
      </div>
      <div class="write_box">
        <div class="write_item">
          <span>面积</span>
          <input v-model="area" disabled type="tel" maxlength="4" class="thisinput" placeholder="请填写面积">
        </div>
        <div class="write_item">
          <span>单价</span>
          <input v-model="unitPrice" type="tel" maxlength="3" class="thisinput" placeholder="请填写每平方米价格">
        </div>
        <div class="total_price">
          <span>总价</span>
          <span>{{totalPrice}}</span>
        </div>
      </div>
    </div>
    <button type="button" @click="sendPrice" class="cfmBtn">提交价格</button>
  </div>
</template>

<script>
import Vue from 'vue'
import { Toast } from 'vant'
Vue.use(Toast)
export default {
  data () {
    return {
      area: '',
      unitPrice: ''
    }
  },
  activated () {
    const vm = this
    vm.getPrice()
  },
  beforeRouteLeave (to, from, next) {
    this.$destroy()
    next()
  },
  computed: {
    totalPrice () {
      const vm = this
      return vm.area * vm.unitPrice
    }
  },
  methods: {
    // 获取工装价格
    getPrice () {
      const vm = this
      const thisId = vm.$route.query.id
      const params = new URLSearchParams()
      params.append('examinationOneId', thisId)
      vm.$http.post('/ExaminationOneConstructionTeamController/GetenterpriseOrdertablePrice', params)
        .then(res => {
          vm.area = res.data.ordertablePrice.constructionArea
          vm.unitPrice = res.data.ordertablePrice.areaUnitPrice
        })
        .catch(err => {
          console.log(err)
        })
    },
    sendPrice () {
      const vm = this
      if (vm.unitPrice === '') {
        Toast('请填写每平方米的价格')
      } else {
        vm.send()
      }
    },
    // 修改工装价格接口
    send () {
      const vm = this
      const thisId = vm.$route.query.id
      const params = new URLSearchParams()
      params.append('examinationOneId', thisId)
      params.append('areaUnitPrice', vm.unitPrice)
      params.append('basicPrice', vm.totalPrice)
      params.append('totalPrice', vm.totalPrice)
      vm.$http.post('/ExaminationOneConstructionTeamController/enterpriseOrdertablePriceUpdate', params)
        .then(res => {
          Toast.success('提交成功')
          setTimeout(() => {
            vm.$router.goBack()
          }, 300)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
.price_box
  margin-top 35%
  position relative
  height 3.5rem
  width 90%
  margin-left auto
  margin-right auto
  border-radius 10px
  box-shadow 0px 0px 4px #dddddd
  .img_box
    position absolute
    top -15%
    left 42%
    background #ffffff
    border-radius 50%
    width 60px
    height 58px
    box-shadow 0px 0px 5px #eeeeee
    img
      width 50px
      margin-left 5px
  .write_box
    position absolute
    top 22%
    width 80%
    left 10%
    right 10%
    .write_item
      display flex
      margin-top .1rem
      margin-bottom .2rem
      span
        display inline-block
        margin-top 6px
        font-size 17px
        color #666666
      .thisinput
        width 80%
        font-size 16px
        margin-left .3rem
        text-align center
        color #2d2d2d
        border-bottom 1px solid #eeeeee
        margin-bottom 10px
      .thisinput:focus
        border-bottom 1px solid #42D66C
    .total_price
      margin-top 10px
      color #666666
      font-size 17px
      span:nth-child(2)
        display inline-block
        margin-left .3rem
        color #E8222D
        font-size 18px
.cfmBtn
  width 88%
  height .85rem
  margin-top 6%
  margin-left 6%
  line-height .85rem
  font-size 18px
  color #ffffff
  border-radius 8px
  background linear-gradient(10deg, #28cc75, #5BE7C4)
</style>
