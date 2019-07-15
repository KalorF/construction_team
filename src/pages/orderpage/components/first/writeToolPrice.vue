<template>
  <div>
    <van-nav-bar title="价格填写" left-arrow @click-left="$router.goBack" fixed></van-nav-bar>

    <div class="price_box">
      <div class="img_box">
        <img src="@/assets/imgs/area.png" alt="加载中">
      </div>
      <div class="write_box">
        <div class="write_item">
          <span>面积</span>
          <input v-model="area" type="tel" maxlength="4" class="thisinput" placeholder="请填写面积">
        </div>
        <div class="write_item">
          <span>单价</span>
          <input
            v-model="unitPrice"
            type="tel"
            maxlength="3"
            class="thisinput"
            placeholder="请填写每平方米价格"
          >
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
  computed: {
    totalPrice () {
      const vm = this
      return vm.area * vm.unitPrice
    }
  },
  methods: {
    sendPrice () {
      const vm = this
      if (vm.area === '') {
        Toast('请填写面积')
      } else if (vm.unitPrice === '') {
        Toast('请填写每平方米的价格')
      } else {
        vm.send()
      }
    },
    // 提交价格
    send () {
      const vm = this
      const thisId = vm.$route.query.id
      const basicPrice = vm.totalPrice
      const total = vm.totalPrice
      const constructionArea = vm.area
      const areaUnitPrice = vm.unitPrice
      const params = new URLSearchParams()
      params.append('examinationOneId', thisId)
      params.append('constructionArea', constructionArea)
      params.append('areaUnitPrice', areaUnitPrice)
      params.append('basicPrice', basicPrice)
      params.append('totalPrice', total)
      vm.$http
        .post(
          '/ExaminationOneConstructionTeamController/enterpriseOrdertablePriceInsert',
          params
        )
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
.price_box {
  margin-top: 35%;
  position: relative;
  height: 3.5rem;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  border-radius: 10px;
  box-shadow: 0px 0px 4px #dddddd;

  .img_box {
    position: absolute;
    top: -15%;
    left: 42%;
    background: #ffffff;
    border-radius: 50%;
    width: 60px;
    height: 58px;
    box-shadow: 0px 0px 5px #eeeeee;

    img {
      width: 50px;
      margin-left: 5px;
    }
  }

  .write_box {
    position: absolute;
    top: 22%;
    width: 80%;
    left: 10%;
    right: 10%;

    .write_item {
      display: flex;
      margin-top: 0.1rem;
      margin-bottom: 0.2rem;

      span {
        display: inline-block;
        margin-top: 6px;
        font-size: 17px;
        color: #666666;
      }

      .thisinput {
        width: 80%;
        font-size: 16px;
        margin-left: 0.3rem;
        text-align: center;
        color: #2d2d2d;
        border-bottom: 1px solid #eeeeee;
        margin-bottom: 10px;
      }

      .thisinput:focus {
        border-bottom: 1px solid #42D66C;
      }
    }

    .total_price {
      margin-top: 10px;
      color: #666666;
      font-size: 17px;

      span:nth-child(2) {
        display: inline-block;
        margin-left: 0.3rem;
        color: #E8222D;
        font-size: 18px;
      }
    }
  }
}

.cfmBtn {
  width: 88%;
  height: 0.85rem;
  margin-top: 6%;
  margin-left: 6%;
  line-height: 0.85rem;
  font-size: 18px;
  color: #ffffff;
  border-radius: 8px;
  background: linear-gradient(10deg, #28cc75, #5BE7C4);
}
</style>
