<template>
    <div>
        <van-nav-bar
        title="初测结果"
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
                            <div class="text">
                                {{item.zhishu}}
                            </div>
                            <div class="text1">
                                {{item.zhishu2}}
                            </div>
                            <div class="text1">
                                {{item.zhishu3}}
                            </div>
                            <div class="text1">
                                {{item.zhishu4}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-transfer-dom>
            <previewer :list="reportList" ref="previewer" :options="options"></previewer>
        </div>
    </div>
</template>

<script>
import { Previewer, TransferDom } from 'vux'
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
    getData () {
      const vm = this
      const params = new URLSearchParams()
      const thisId = vm.$route.query.thisId
      params.append('examinationOneId', thisId)
      vm.$http.post('/ExaminationOneController/ExaminationOneDate', params)
        .then(res => {
          //   vm.reportList = res.data
          for (const i in res.data.ExaminationOneDate) {
            // console.log(res.data.ExaminationOneDate[i])
            const hchoFigure = res.data.ExaminationOneDate[i].hchoFigure
            const benzeneFigure = res.data.ExaminationOneDate[i].benzeneFigure
            const tvocFigure = res.data.ExaminationOneDate[i].tvocFigure
            const ammoniaFigure = res.data.ExaminationOneDate[i].ammoniaFigure
            const examinationPointName = res.data.ExaminationOneDate[i].examinationPointName
            const hchoStatus = res.data.ExaminationOneDate[i].hchoStatus
            const benzeneStatus = res.data.ExaminationOneDate[i].benzeneStatus
            const tvocStatus = res.data.ExaminationOneDate[i].tvocStatus
            const ammoniaStatus = res.data.ExaminationOneDate[i].ammoniaStatus
            if (hchoStatus === 1) {
              vm.zhishu = '指数偏高'
            } else {
              vm.zhishu = '合格指数'
            }
            if (benzeneStatus === 1) {
              vm.zhishu2 = '指数偏高'
            } else {
              vm.zhishu2 = '合格指数'
            }
            if (tvocStatus === 1) {
              vm.zhishu3 = '指数偏高'
            } else {
              vm.zhishu3 = '合格指数'
            }
            if (ammoniaStatus === 1) {
              vm.zhishu4 = '指数偏高'
            } else {
              vm.zhishu4 = '合格指数'
            }
            const zhishu = vm.zhishu
            const zhishu2 = vm.zhishu2
            const zhishu3 = vm.zhishu3
            const zhishu4 = vm.zhishu4
            const Data = {examinationPointName, hchoFigure, benzeneFigure, tvocFigure, ammoniaFigure, zhishu, zhishu2, zhishu3, zhishu4}
            vm.reportList.push(Data)
          }
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
      zhishu: '',
      zhishu2: '',
      zhishu3: '',
      zhishu4: '',
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
    margin-top 1.6rem
    .data-box
        // background linear-gradient(-100deg, #50C1E9, #00B9E6)
        background linear-gradient(30deg, #39BAE8, #14EBCA)
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
</style>
