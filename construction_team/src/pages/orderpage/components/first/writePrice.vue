<template>
    <div>
         <van-nav-bar
        title="价格填写"
        left-arrow
        @click-left="$router.goBack"
        fixed
        >
        <div slot="right" class="right" @click="send">
            提交
        </div>
        </van-nav-bar>
        <div class="head">
            <img src="@/assets/imgs/sgprice.png">
            <div>施工价格</div>
            <p>总价：<span>{{Total}}</span> 元</p>
        </div>
        <div class="area-box">
            <img src="@/assets/imgs/area.png">
            <div>面积</div>
            <input v-model="area" type="number" min="0" max="10000" class="thisinput" placeholder="请填写">
        </div>
        <div class="level-box">
            <div class="box-head">
                <div class="circle"></div>
                <span>一级</span>
                <!-- <img src="@/assets/imgs/tj.png" @click="addOne"> -->
            </div>
            <div class="line"></div>
            <!-- <div class="warn" v-if="list === 0">请添加一级数据</div> -->
            <transition-group name="fadeIn" mode="out-in">
                <div class="level-item" v-for="(i,index) in list" :key="index">
                    <!-- <img src="@/assets/imgs/js.png" @click="decreaseOne(index)"> -->
                    <input type="text" v-model="columnsOne[index]" :key="index" placeholder="请选择" readonly>
                    <div>
                        <van-stepper v-model="valueOne[index]" :min="0"/>
                    </div>
                </div>
            </transition-group>
            <div class="line2"></div>
            <div class="total" v-if="list !== 0">
                <p>价格：<span>{{oneTotal}}</span> 元</p>
            </div>
        </div>
        <div class="level-box">
            <div class="box-head">
                <div class="circle"></div>
                <span>二级</span>
                <!-- <img src="@/assets/imgs/tj.png" @click="addTwo"> -->
            </div>
            <div class="line"></div>
            <!-- <div class="warn" v-if="list2 === 0">请添加二级数据</div> -->
            <transition-group name="fadeIn" mode="out-in">
                <div class="level-item" v-for="(i,index) in list2" :key="index">
                    <!-- <img src="@/assets/imgs/js.png" @click="decreaseTwo(index)"> -->
                    <input type="text" v-model="columnsTwo[index]" :key="index" placeholder="请选择" readonly>
                    <div>
                        <van-stepper v-model="valueTwo[index]" :min="0"/>
                    </div>
                </div>
            </transition-group>
            <div class="line2"></div>
            <div class="total" v-if="list2 !== 0">
                <p>价格：<span>{{twoTotal}}</span> 元</p>
            </div>
        </div>
        <div class="level-box">
            <div class="box-head">
                <div class="circle"></div>
                <span>三级</span>
                <!-- <img src="@/assets/imgs/tj.png" @click="addThree"> -->
            </div>
            <div class="line"></div>
            <!-- <div class="warn" v-if="list3 === 0">请添加三级数据</div> -->
            <transition-group name="fadeIn" mode="out-in">
                <div class="level-item" v-for="(i,index) in list3" :key="index">
                    <!-- <img src="@/assets/imgs/js.png" @click="decreaseThree(index)"> -->
                    <input type="text" v-model="columnsThree[index]" :key="index" placeholder="请选择" readonly>
                    <div class="ThreeDiv">
                        <input type="number" v-model="valueThree[index]" class="ThreeInput" min="0" placeholder="请填写">
                        <span>m²</span>
                    </div>
                </div>
            </transition-group>
            <div class="line2"></div>
            <div class="total" v-if="list3 !== 0">
                <p>价格：<span>{{threeTotal}}</span> 元</p>
            </div>
        </div>
        <!-- <div class="other-box">
            <div class="circle"></div>
            <span>其它</span>
            <input type="text" v-model="other" class="thisInput" placeholder="请填写">
            <p> 元</p>
        </div> -->
        <!-- <van-actionsheet :overlay='false' v-model="show">
            <van-picker
                :columns="columnsOne"
                title="一级"
                show-toolbar
                @cancel="onCancel"
                @confirm="onConfirm"
                :visible-item-count='3' />
        </van-actionsheet>
        <van-actionsheet :overlay='false' v-model="show2">
            <van-picker
                :columns="columnsTwo"
                title="二级"
                show-toolbar
                @cancel="onCancelTwo"
                @confirm="onConfirmTwo"
                :visible-item-count='3' />
        </van-actionsheet>
        <van-actionsheet :overlay='false' v-model="show3">
            <van-picker
                :columns="columnsThree"
                title="三级"
                show-toolbar
                @cancel="onCancelThree"
                @confirm="onConfirmThree"
                :visible-item-count='3' />
        </van-actionsheet> -->
        <van-dialog
            v-model="showDialog"
            show-cancel-button
            :before-close="beforeClose"
            confirm-button-text="确认"
            cancel-button-text="取消"
            >
            <div class="dialogContent">
                是否确认提交此价格？
            </div>
        </van-dialog>
    </div>
</template>

<script>
import Vue from 'vue'
import { Picker, Toast, Actionsheet, Stepper, Dialog } from 'vant'
Vue.use(Picker)
Vue.use(Actionsheet)
Vue.use(Toast)
Vue.use(Stepper)
Vue.use(Dialog)
export default {
  data () {
    return {
      columnsOne: [],
      columnsTwo: [],
      columnsThree: [],
      columns: [],
      sendcolumns: [],
      listName: [],
      listNumber: [],
      customerFurnitureList: [],
      area: '',
      other: '',
      show: false,
      show2: false,
      show3: false,
      showDialog: false,
      valueOne: [],
      valueTwo: [],
      valueThree: [],
      inputOneValue: [],
      inputTwoValue: [],
      inputThreeValue: [],
      list: 0,
      list2: 0,
      list3: 0,
      thisIndex: 0,
      thisIndexTwo: 0,
      thisIndexThree: 0,
      levelOnePrice: '',
      levelTwoPrice: '',
      levelThreePrice: '',
      areaUnitPrice: ''
    }
  },
  //   created () {
  //     const vm = this
  //     vm.getPrice()
  //   },
  activated () {
    const vm = this
    vm.getPrice()
  },
  beforeRouteLeave (to, from, next) {
    this.$destroy()
    next()
  },
  computed: {
    oneTotal () {
      const vm = this
      let sum = vm.list
      if (vm.list === 0) {
        return 0
      } else {
        for (const i in vm.valueOne) {
          sum += (vm.valueOne[i] - 1)
        }
        return sum * vm.levelOnePrice
      }
    },
    twoTotal () {
      const vm = this
      let sum = vm.list2
      if (vm.list2 === 0) {
        return 0
      } else {
        for (const i in vm.valueTwo) {
          sum += (vm.valueTwo[i] - 1)
        }
        return sum * vm.levelTwoPrice
      }
    },
    threeTotal () {
      const vm = this
      let sum = vm.list3
      if (vm.list3 === 0) {
        return 0
      } else {
        for (const i in vm.valueThree) {
          sum += (vm.valueThree[i] - 1)
        }
        return sum * vm.levelThreePrice
      }
    },
    Total () {
      const vm = this
      if (vm.list === 0 && vm.list2 === 0 && vm.list3 === 0 && vm.area === '' && vm.other === '') {
        return 0
      } else {
        return vm.oneTotal + vm.twoTotal + vm.threeTotal + vm.area * vm.areaUnitPrice
      }
    }
  },
  methods: {
    // addOne () {
    //   const vm = this
    //   vm.list++
    // },
    // addTwo () {
    //   const vm = this
    //   vm.list2++
    // },
    // addThree () {
    //   const vm = this
    //   vm.list3++
    // },
    // decreaseOne (index) {
    //   const vm = this
    //   vm.list--
    //   vm.inputOneValue.splice(index, 1)
    //   vm.valueOne.splice(index, 1)
    // //   vm.oneItem.splice(index, 1)
    // },
    // decreaseTwo (index) {
    //   const vm = this
    //   vm.list2--
    //   vm.inputTwoValue.splice(index, 1)
    //   vm.valueTwo.splice(index, 1)
    // },
    // decreaseThree (index) {
    //   const vm = this
    //   vm.list3--
    //   vm.inputThreeValue.splice(index, 1)
    //   vm.valueThree.splice(index, 1)
    // },
    // selOne (index) {
    //   const vm = this
    //   vm.show = true
    //   vm.thisIndex = index
    // },
    // selTwo (index) {
    //   const vm = this
    //   vm.show2 = true
    //   vm.thisIndexTwo = index
    // },
    // selThree (index) {
    //   const vm = this
    //   vm.show3 = true
    //   vm.thisIndexThree = index
    // },
    // onCancel () {
    //   const vm = this
    //   vm.show = false
    // },
    // onCancelTwo () {
    //   const vm = this
    //   vm.show2 = false
    // },
    // onCancelThree () {
    //   const vm = this
    //   vm.show3 = false
    // },
    // onConfirm (value) {
    //   const vm = this
    //   const index = vm.thisIndex
    //   vm.inputOneValue[index] = value
    //   if (vm.valueOne[index] === undefined) {
    //     vm.valueOne[index] = 1
    //   }
    //   vm.show = false
    // },
    // onConfirmTwo (value) {
    //   const vm = this
    //   const index = vm.thisIndexTwo
    //   vm.inputTwoValue[index] = value
    //   if (vm.valueTwo[index] === undefined) {
    //     vm.valueTwo[index] = 1
    //   }
    //   vm.show2 = false
    // },
    // onConfirmThree (value) {
    //   const vm = this
    //   const index = vm.thisIndexThree
    //   vm.inputThreeValue[index] = value
    //   if (vm.valueThree[index] === undefined) {
    //     vm.valueThree[index] = 1
    //   }
    //   vm.show3 = false
    // },
    send () {
      const vm = this
      vm.listName = [...vm.columnsOne, ...vm.columnsTwo, ...vm.columnsThree] // ES6写法 ES5: arr1.concat(arr2,arr3) 对象:Object.assign(obj1,obj2,obj3)
      vm.listNumber = [...vm.valueOne, ...vm.valueTwo, ...vm.valueThree]
      if (vm.area === '' || vm.area === null) {
        Toast('请填写施工面积')
      } else {
        for (const i in vm.listNumber) {
          if (vm.listNumber[i] !== 0 && vm.listNumber[i] !== '') {
            const name = vm.listName[i]
            const number = vm.listNumber[i]
            const item = {name, number}
            vm.sendcolumns.push(item)
          }
        }
        for (const j in vm.sendcolumns) {
          for (const n in vm.columns) {
            if (vm.sendcolumns[j].name === vm.columns[n].name) {
              const a = vm.columns[n].id
              const b = vm.sendcolumns[j].number
              const level = vm.columns[n].level
              var unitPrice = 0
              if (level === '1') {
                unitPrice = vm.levelOnePrice
              } else if (level === '2') {
                unitPrice = vm.levelTwoPrice
              } else if (level === '3') {
                unitPrice = vm.levelThreePrice
              }
              const furnitureDetails = a + ',' + b
              const totalPrice = unitPrice * b
              const CustomerFurniture = {furnitureDetails, unitPrice, totalPrice}
              vm.customerFurnitureList.push(CustomerFurniture)
            }
          }
        }
        vm.showDialog = true
      }
    },
    beforeClose (action, done) {
      const vm = this
      if (action === 'confirm') {
        vm.sendcolumns = []
        vm.sendPrice()
        setTimeout(done, 600)
      } else {
        vm.sendcolumns = []
        done()
      }
    },
    sendPrice () {
      const vm = this
      const customerFurnitureList = vm.customerFurnitureList
      const FurnitureList = {customerFurnitureList}
      const basicPrice = vm.area * vm.areaUnitPrice
      const thisId = vm.$route.query.id
      const params = new URLSearchParams()
      params.append('customerFurnitureList', JSON.stringify(FurnitureList))
      params.append('examinationOneId', thisId)
      params.append('constructionArea', vm.area)
      params.append('areaUnitPrice', vm.areaUnitPrice)
      params.append('basicPrice', basicPrice)
      params.append('additionalPrice', vm.oneTotal + vm.twoTotal + vm.threeTotal)
      params.append('totalPrice', vm.Total)
      vm.$http.post('/ExaminationOneConstructionTeamController/OrdertablePriceAndCustomerFurnitureInsert', params)
        .then(res => {
          Toast.success('提交成功')
          setTimeout(() => {
            vm.$router.goBack()
          }, 300)
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getPrice () {
      const vm = this
      vm.$http.post('/ExaminationOneConstructionTeamController/GetTheSystemPrice')
        .then(res => {
          vm.levelOnePrice = res.data.priceSystem.levelOnePrice
          vm.levelTwoPrice = res.data.priceSystem.levelTwoPrice
          vm.levelThreePrice = res.data.priceSystem.levelThreePrice
          vm.areaUnitPrice = res.data.priceSystem.areaUnitPrice
          for (const i in res.data.furnitureList) {
            if (res.data.furnitureList[i].level === '1') {
              vm.columnsOne.push(res.data.furnitureList[i].furnitureName)
              vm.valueOne.push(0)
            } else if (res.data.furnitureList[i].level === '2') {
              vm.columnsTwo.push(res.data.furnitureList[i].furnitureName)
              vm.valueTwo.push(0)
            } else if (res.data.furnitureList[i].level === '3') {
              vm.columnsThree.push(res.data.furnitureList[i].furnitureName)
              vm.valueThree.push('')
            }
          }
          vm.list = vm.columnsOne.length
          vm.list2 = vm.columnsTwo.length
          vm.list3 = vm.columnsThree.length
          for (const j in res.data.furnitureList) {
            const name = res.data.furnitureList[j].furnitureName
            const id = res.data.furnitureList[j].id
            const level = res.data.furnitureList[j].level
            const item = {name, id, level}
            vm.columns.push(item)
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
.fadeIn-enter-active,.fadeIn-leave-active {
  transition: all .5s ease;
}
.fadeIn-enter-active,.fadeIn-leave{
    opacity: 1;
}
.fadeIn-enter,.fadeIn-leave-active {
  opacity: 0;
}
.dialogContent
    text-align center
    height 1.5rem
    line-height 1.5rem
    color #5f5f5f
.right
    font-size 17px
    color #ffffff
.head
    height 1rem
    position fixed
    width 100%
    display flex
    margin-top 1.28rem
    background-color #ffffff
    box-shadow 2px 4px 6px rgba(240,240,240,.5)
    z-index 99
    img
        width 35px
        height 35px
        margin-top auto
        margin-left .4rem
        margin-bottom auto
    div
        margin-top auto
        margin-bottom auto
        font-size 17px
        color #252A34
        margin-left .2rem
    p
        font-size 17px
        margin-top auto
        margin-bottom auto
        color #2d2d2d
        margin-left -webkit-calc(100% - 5.3rem)
        span
            color #E8222D
.other-box
    width 93%
    height 1rem
    display flex
    margin-left auto
    margin-right auto
    box-shadow rgb(240,240,240) 0px 0px 12px
    border-radius 5px
    background-color #ffffff
    margin-bottom .6rem
    .circle
        width 18px
        height 18px
        background-color #42D66C
        border-radius 50%
        margin-top auto
        margin-bottom auto
        margin-left .4rem
    span
        font-size 17px
        width 50%
        color #252A34
        margin-top auto
        margin-bottom auto
        margin-left .3rem
    p
        margin-top .4rem
        margin-bottom auto
        font-size 15px
        margin-right .3rem
    .thisInput
        border-bottom 1px solid #eeeeee
        width 1.3rem
        margin-top auto
        margin-bottom auto
        color #E8222D
        font-size 16px
        margin-left .1rem
        margin-right .2rem
        text-align center
    .thisInput:focus
        border-bottom 1px solid #42D66C
.area-box
    width 93%
    height 1rem
    margin-left auto
    margin-top 2.85rem
    margin-right auto
    box-shadow rgb(240,240,240) 0px 0px 12px
    border-radius 5px
    background-color #ffffff
    display flex
    img
        margin-top auto
        margin-bottom auto
        margin-left .3rem
        width 29px
        height 29px
    div
        margin-top auto
        margin-bottom auto
        width 70%
        margin-left .2rem
        font-size 17px
        color #2d2d2d
    .thisinput
        width 1.3rem
        margin-top auto
        margin-bottom auto
        font-size 16px
        margin-left .1rem
        margin-right .2rem
        text-align center
        color #2d2d2d
        border-bottom 1px solid #eeeeee
    .thisinput:focus
        border-bottom 1px solid #42D66C
.level-box
    width 93%
    margin-left auto
    margin-right auto
    margin-top .5rem
    box-shadow rgb(240,240,240) 0px 0px 12px
    border-radius 5px
    padding-bottom .5rem
    background-color #ffffff
    margin-bottom .4rem
    .box-head
        height .9rem
        display flex
        .circle
            width 18px
            height 18px
            background-color #42D66C
            border-radius 50%
            margin-top auto
            margin-bottom auto
            margin-left .4rem
        span
            font-size 17px
            color #252A34
            margin-top auto
            margin-bottom auto
            margin-left .3rem
        img
            width 25px
            height 25px
            margin-top auto
            margin-bottom auto
            margin-left -webkit-calc(100% - 2.5rem)
    .line
        width 94%
        margin-left auto
        margin-right auto
        height 1px
        border-bottom 1px dotted #eeeeee
    .line2
        width 94%
        margin-left auto
        margin-right auto
        margin-top .4rem
        height 1px
        border-bottom 1px dotted #eeeeee
    .warn
        text-align center
        margin-top .3rem
        color #aaaaaa
    .level-item
        display flex
        margin-top .25rem
        img
            width 18px
            height 18px
            margin-left .2rem
            margin-top auto
            margin-bottom auto
        input
            width 1.8rem
            margin-left .5rem
            border 1px solid #42D66C
            text-align center
        div
            margin-left -webkit-calc(100% - 3rem)
        .ThreeDiv
            margin-left -webkit-calc(100% - 4.65rem)
            .ThreeInput
                width 1rem
                color #2d2d2d
                border-top 0
                border-left 0
                border-right 0
                border-bottom 1px solid #eeeeee
            .ThreeInput:focus
                border-bottom 1px solid #42D66C
            span
                margin-top auto
                margin-bottom auto
    .total
        padding-left -webkit-calc(100% - 2rem)
        font-size 14px
        margin-top .3rem
        span
            color #E8222D
</style>
