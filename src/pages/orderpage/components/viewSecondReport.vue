<template>
    <div>
        <van-nav-bar
        title="复测结果"
        left-arrow
        @click-left="$router.goBack"
        fixed
        />
        <div class="box">
            <div class="data-box" v-for="(item,index) of reportList" :key="index">
                <!-- 每个数据的展示 -->
                <div class="data-detail">
                    <div class="place-data">
                        <div class="place">
                            <div class="pl">
                                <img src="@/assets/imgs/address.png" width="18" height="18">
                                <div class="pl-text">
                                    <p>检测地点</p>
                                    <div class="line"></div>
                                    <p class="placetext">{{item.examinationPointName}}</p>
                                </div>
                            </div>
                        </div>
                        <div class="place">
                            <div class="pl">
                                <img src="@/assets/imgs/data.png" width="16" height="16">
                                <div class="pl-text">
                                    <p>甲醛指数</p>
                                    <div class="line"></div>
                                    <p class="placetext">{{item.hchoFigure}}&nbsp;mg/m³</p>
                                    <p>苯指数</p>
                                    <div class="line"></div>
                                    <p class="placetext">{{item.benzeneFigure}}&nbsp;mg/m³</p>
                                    <p>TVOC指数</p>
                                    <div class="line"></div>
                                    <p class="placetext">{{item.tvocFigure}}&nbsp;mg/m³</p>
                                    <p>氨指数</p>
                                    <div class="line"></div>
                                    <p class="placetext">{{item.ammoniaFigure}}&nbsp;mg/m³</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="ctrl">
                        <div>
                            <img :src="item.src" width="87" height="70" class="cardimg" @click="show(index)">
                            <div class="text" v-if="item.hchoStatus === 1">
                                指数偏高
                            </div>
                            <div class="text" v-else>
                                指数合格
                            </div>
                            <div class="text1" v-if="item.benzeneStatus === 1">
                                指数偏高
                            </div>
                             <div class="text1" v-else>
                                指数合格
                            </div>
                            <div class="text1" v-if="item.tvocStatus === 1">
                                指数偏高
                            </div>
                            <div class="text1" v-else>
                                指数合格
                            </div>
                            <div class="text1" v-if="item.ammoniaStatus === 1">
                                指数偏高
                            </div>
                            <div class="text1" v-else>
                                指数合格
                            </div>
                            <div class="button">
                                <button type="button" class="thisbutton" @click="reset(item)">修改数据</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-transfer-dom>
            <previewer :list="reportList" ref="previewer" :options="options"></previewer>
        </div>
        <van-dialog
            v-model="showDialog"
            show-cancel-button
            :before-close="beforeClose"
            confirm-button-text="确认修改"
            cancel-button-text="取消修改"
            >
            <van-field
                v-model="number"
                onkeyup="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')"
                label="甲醛指数"
                placeholder="请输入数据"
                maxlength="7"
            />
            <van-field
                v-model="number2"
                onkeyup="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')"
                label="苯指数"
                placeholder="请输入数据"
                maxlength="7"
            />
            <van-field
                v-model="number3"
                onkeyup="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')"
                label="TVOC指数"
                placeholder="请输入数据"
                maxlength="7"
            />
            <van-field
                v-model="number4"
                onkeyup="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')"
                label="氨指数"
                placeholder="请输入数据"
                maxlength="7"
            />
        </van-dialog>
    </div>
</template>

<script>
import Vue from 'vue'
import { Previewer, TransferDom } from 'vux'
import { Dialog, Toast } from 'vant'
Vue.use(Toast)
Vue.use(Dialog)
export default {
  directives: {
    TransferDom
  },
  components: {
    Previewer
  },
  activated () {
    this.getData()
  },
  beforeRouteLeave (to, from, next) {
    this.$destroy()
    next()
  },
  methods: {
    show (index) {
      this.$refs.previewer.show(index)
    },
    // 修改复检报告数据
    reset (item) {
      const vm = this
      vm.showDialog = true
      vm.thisId = item.examinationTwoRecordId
      vm.number = item.hchoFigure
      vm.number2 = item.benzeneFigure
      vm.number3 = item.tvocFigure
      vm.number4 = item.ammoniaFigure
    },
    beforeClose (action, done) {
      if (action === 'confirm') {
        const vm = this
        const number = vm.number
        const number2 = vm.number2
        const number3 = vm.number3
        const number4 = vm.number4
        if (number !== '' && number2 !== '' && number3 !== '' && number4 !== '') {
          vm.confirmReset()
          setTimeout(() => {
            vm.number = ''
            vm.number2 = ''
            vm.number3 = ''
            vm.number4 = ''
          }, 1000)
          setTimeout(done, 1000)
        } else {
          Toast('修改失败,请将数据填写完整')
          setTimeout(done, 1000)
        }
      } else {
        this.number = ''
        this.number2 = ''
        this.number3 = ''
        this.number4 = ''
        done()
      }
    },
    confirmReset () {
      const vm = this
      // const examinationTwoId = vm.$route.query.thisId
      const examinationTwoRecordId = vm.thisId
      const hchoFigure = parseFloat(vm.number)
      const benzeneFigure = parseFloat(vm.number2)
      const tvocFigure = parseFloat(vm.number3)
      const ammoniaFigure = parseFloat(vm.number4)
      if (vm.number > 0.1) {
        vm.hchoStatus = 1
      } else if (vm.number <= 1) {
        vm.hchoStatus = 0
      }
      if (vm.number2 > 0.11) {
        vm.benzeneStatus = 1
      } else if (vm.number2 <= 0.11) {
        vm.benzeneStatus = 0
      }
      if (vm.number3 > 0.6) {
        vm.tvocStatus = 1
      } else if (vm.number3 <= 0.6) {
        vm.tvocStatus = 0
      }
      if (vm.number4 > 0.2) {
        vm.ammoniaStatus = 1
      } else if (vm.number4 <= 0.2) {
        vm.ammoniaStatus = 0
      }
      const hchoStatus = vm.hchoStatus
      const benzeneStatus = vm.benzeneStatus
      const tvocStatus = vm.tvocStatus
      const ammoniaStatus = vm.ammoniaStatus
      const data = {hchoFigure, benzeneFigure, tvocFigure, ammoniaFigure, hchoStatus, benzeneStatus, tvocStatus, ammoniaStatus, examinationTwoRecordId}
      const examinationTwoRecordList = [data]
      const resetData = {examinationTwoRecordList}
      const params = new URLSearchParams()
      //   params.append('examinationTwoId', thisId)
      //   params.append('examinationTwoRecordId', id)
      params.append('examinationTwoRecordList', JSON.stringify(resetData))
      vm.$http.post('/ExaminationTwoConstructionTeamController/UpdateExaminationTwoRecord', params)
        .then(res => {
          vm.getData()
          Toast.success('修改成功')
        })
        .catch(error => {
          console.log(error)
        })
    },
    getData () {
      const vm = this
      const examinationTwoId = vm.$route.query.examinationTwoId
      const params = new URLSearchParams()
      //   const thisId = vm.$route.query.thisId
      params.append('examinationTwoId', examinationTwoId)
      vm.$http.post('/ExaminationTwoConstructionTeamController/ExaminationTwoDate', params)
        .then(res => {
          vm.reportList = res.data.ExaminationTwoDate
          for (const j in res.data.ExaminationOneImgDate) {
            const src = res.data.ExaminationOneImgDate[j].imgUrl
            vm.$set(vm.reportList[j], 'src', src)
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  data () {
    return {
      reportList: [],
      thisId: '',
      hchoStatus: '',
      benzeneStatus: '',
      tvocStatus: '',
      ammoniaStatus: '',
      number: '',
      number2: '',
      number3: '',
      number4: '',
      zhishu: '',
      zhishu2: '',
      zhishu3: '',
      zhishu4: '',
      showDialog: false,
      options: {
        isClickableElement: function (el) {
          return /previewer-delete-icon/.test(el.className)
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
p
    color #ffffff
    font-size 18px
.box
    margin-top 1.5rem
    .data-box
        // background linear-gradient(-100deg, #50C1E9, #00B9E6)
        // background linear-gradient(30deg, #39BAE8, #14EBCA)
        background linear-gradient(30deg, #1EDBA0, #67E7BE)
        margin-left auto
        margin-right auto
        margin-top .3rem
        margin-bottom .6rem
        width 90%
        padding-bottom .3rem
        border-radius 5px
        box-shadow 6px 6px 6px rgba(170,170,170,.13),6px -6px 6px rgba(170,170,170,.13),-6px 6px 6px rgba(170,170,170,.13),-6px -6px 6px rgba(170,170,170,.13)
        box-sizing border-box
        .data-detail
            display flex
            .place-data
                width 70%
                .place .pl
                    display flex
                    flex-direction row
                    margin-left .4rem
                    padding-top .4rem
                    .pl-text
                        flex-direction column
                        margin-left .3rem
                        .line
                            width 38px
                            height .05rem
                            background-color #ffffff
                            margin-top .1rem
                        .placetext
                            margin-top .2rem
                            margin-bottom .3rem
            .ctrl
                width 30%
                flex 1
                margin-right .3rem
                .cardimg
                    margin-top .45rem
                    border 3px solid #ffffff
                    box-shadow 6px 4px 8px rgba(170,170,170,.65)
                .text
                    border 2px solid #ffffff
                    width 90px
                    text-align center
                    margin-top .5rem
                    color #ffffff
                    font-size 16px
                    padding-top .12rem
                    padding-bottom .1rem
                .text1
                    border 2px solid #ffffff
                    width 90px
                    text-align center
                    margin-top .7rem
                    color #ffffff
                    font-size 16px
                    padding-top .12rem
                    padding-bottom .1rem
                .button
                    margin-top .4rem
                    width 94px
                    .thisbutton
                        width 100%
                        background linear-gradient(30deg, #39BAE8, #14EBCA)
                        border-radius 10px
                        height 35px
                        font-size 16px
                        color #ffffff
                        box-shadow  1px 1px 2px #39BAE8
                    .thisbutton:active
                        background #39BAE8
                        color #ffffff
</style>
