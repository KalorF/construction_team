<template>
    <div class="data-box">
        <div class="data-title">
            <div class="text-span"></div>
            <div class="text">
                经营数据
            </div>
            <div class="data-more">
                <div class="more-item">
                    <router-link :to="{name:'MonthData'}">
                        <span class="more-text">详情</span>
                        <img src="@/assets/imgs/jt3.png" width="20">
                    </router-link>
                </div>
            </div>
        </div>
        <div class="data-detail">
            <div class="detail-item" @click="toView">
                <p class="detail-title">月收入</p>
                <p class="detail" v-if="show1">无数据</p>
                <p class="detail-money">{{price}}</p>
            </div>
            <div class="detail-line"></div>
            <div class="detail-item" @click="toView">
                <p class="detail-title">订单数</p>
                <p class="detail" v-if="show2">无数据</p>
                <p class="detail-money">{{orders}}</p>
            </div>
            <div class="detail-line"></div>
            <div class="detail-item" @click="toView">
                <p class="detail-title">平均</p>
                <p class="detail" v-if="show3">无数据</p>
                <p class="detail-money">{{avePrice}}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  activated () {
    this.getData()
  },
  computed: {
    show1 () {
      if (this.price === '' || this.price === null) {
        return true
      } else {
        return false
      }
    },
    show2 () {
      if (this.orders === '' || this.orders === null) {
        return true
      } else {
        return false
      }
    },
    show3 () {
      if (this.avePrice === '' || this.avePrice === null) {
        return true
      } else {
        return false
      }
    }
  },
  data () {
    return {
      price: '',
      orders: '',
      avePrice: ''
    }
  },
  methods: {
    toView () {
      const vm = this
      vm.$router.push({name: 'MonthData'})
    },
    getData () {
      const vm = this
      vm.$http.post('/ConstructionBuilderAppControllerLxb/IncomeDetails')
        .then(res => {
          vm.price = res.data.data.price
          vm.orders = res.data.data.orders
          vm.avePrice = res.data.data.avePrice
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/theme.styl'
.data-box
  background-color #ffffff
  height: 3.2rem
  border-bottom:2px solid #fcfcfc
  .data-title
    height: .7rem
    display: flex
    border-bottom:1px solid #FCFCFC
    .text
      display: flex
      font-size: 18px
      margin-top: .2rem
      margin-left: .15rem
    .text-span
      height: .3rem
      width: .08rem
      background-color: $themeColor
      margin-top: .22rem
      margin-left: .15rem
    .data-more
      margin-top: .2rem
      margin-left: -webkit-calc(100% - 3.1rem)
      .more-text
        color: #2C2C2C
   .data-detail
     height: 2rem
     display: flex
     .detail-item
       text-align:center
       width: 33%
       height: 1rem
       .detail-title
         margin-top: .7rem
         font-size: 22px
         color: #515151
       .detail-money
         margin-top: 2vh
         font-size: 19px
         color: #868686
       .detail
         margin-top: .3rem
         font-size: 15px
         color: #868686
     .detail-line
       width: .02rem
       height: 1.3rem
       background-color: #eee
       margin-top: 5vh
</style>
