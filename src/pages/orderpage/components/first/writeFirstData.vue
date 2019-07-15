<template>
  <div style="height:100vh">
    <van-nav-bar title="初测结果填写" left-arrow @click-left="$router.goBack" fixed>
      <div slot="right" @click="add">
        <img src="@/assets/imgs/add3.png" width="36">
      </div>
    </van-nav-bar>
    <div class="box">
      <!-- <div class="prize-content">
              <div class="prize-box">
                <img src="@/assets/imgs/prize.png" width="40" height="40" class="prize-img">
                <div class="text">施工价格</div>
                <input type="text" v-model="price" class="prize-input" placeholder="价格填写" maxlength="7" onkeyup="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')">
                <div class="money">元</div>
              </div>
      </div>-->
      <div class="please" v-if="showplease">请添加数据</div>
      <transition-group name="fadeIn">
        <div class="data-box" v-for="(item, index) of list" :key="index">
          <!-- 每个数据的展示 -->
          <div class="data-detail">
            <div class="place-data">
              <div class="place">
                <div class="pl">
                  <img src="@/assets/imgs/address.png" width="18" height="18">
                  <div class="pl-text">
                    <p>检测地点</p>
                    <div class="line"></div>
                    <p class="placetext">{{item.adr}}</p>
                  </div>
                </div>
              </div>
              <div class="place">
                <div class="pl">
                  <img src="@/assets/imgs/data.png" width="16" height="16">
                  <div class="pl-text">
                    <p>甲醛指数</p>
                    <div class="line"></div>
                    <p class="placetext">{{item.number}}&nbsp;mg/m³</p>
                    <p>苯指数</p>
                    <div class="line"></div>
                    <p class="placetext">{{item.number2}}&nbsp;mg/m³</p>
                    <p>TVOC指数</p>
                    <div class="line"></div>
                    <p class="placetext">{{item.number3}}&nbsp;mg/m³</p>
                    <p>氨指数</p>
                    <div class="line"></div>
                    <p class="placetext">{{item.number4}}&nbsp;mg/m³</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="ctrl">
              <div>
                <img src="@/assets/imgs/del.png" width="20" class="delImg" @click="del(index)">
                <img
                  :src="item.src"
                  width="87"
                  height="70"
                  class="reportimg"
                  @click="showimg(index)"
                >
                <div class="text">{{item.result}}</div>
                <div class="text1">{{item.result2}}</div>
                <div class="text1">{{item.result3}}</div>
                <div class="text1">{{item.result4}}</div>
              </div>
            </div>
          </div>
        </div>
      </transition-group>
      <!-- 上传按钮 -->
      <div class="btnDiv">
        <button type="button" class="submit" v-if="showBtn" @click="confirm">提交结果</button>
      </div>
    </div>
    <!-- 数据填写 -->
    <van-dialog
      v-model="showDialog"
      show-cancel-button
      :before-close="beforeClose"
      confirm-button-text="确认添加"
      cancel-button-text="取消添加"
    >
      <van-field v-model="adr" label="检测地点" placeholder="请输入检测地点" maxlength="8" @blur="testadr"/>
      <van-field
        v-model="number"
        type="tel"
        onkeyup="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')"
        label="甲醛指数"
        placeholder="请输入甲醛指数"
        maxlength="6"
        @blur="testnub"
      />
      <van-field
        v-model="number2"
        type="tel"
        onkeyup="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')"
        label="苯指数"
        placeholder="请输入苯指数"
        maxlength="6"
        @blur="testnub"
      />
      <van-field
        v-model="number3"
        type="tel"
        onkeyup="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')"
        label="TVOC"
        placeholder="请输入TVOC指数"
        maxlength="6"
        @blur="testnub"
      />
      <van-field
        v-model="number4"
        type="tel"
        onkeyup="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')"
        label="氨指数"
        placeholder="请输入氨指数"
        maxlength="6"
        @blur="testnub"
      />
      <div class="upload-img">
        <div class="text">上传图片</div>
        <img :src="headerImage" width="55" height="55" class="upimg" @click="galleryImgs">
        <!-- <input type="file" accept="image/*" class="file" @change="upload"> -->
      </div>
    </van-dialog>
    <div v-transfer-dom>
      <previewer :list="list" ref="previewer" :options="options"></previewer>
    </div>
    <loading :show="showloading" :text="'上传中'"></loading>
  </div>
</template>

<script>
import Vue from 'vue'
// import Exif from 'exif-js'
import { Previewer, TransferDom } from 'vux'
import { Dialog, Toast } from 'vant'
Vue.use(Dialog)
Vue.use(Toast)
export default {
  name: 'writeFirstData',
  directives: {
    TransferDom
  },
  components: {
    Previewer
  },
  data () {
    return {
      showDialog: false,
      showloading: false,
      price: '',
      hchoStatus: '',
      benzeneStatus: '',
      tvocStatus: '',
      ammoniaStatus: '',
      list: [],
      adr: '',
      number: '',
      number2: '',
      number3: '',
      number4: '',
      examinationOneRecordList: [],
      result: '',
      result2: '',
      result3: '',
      result4: '',
      headerImage: require('@/assets/imgs/addpicture.png'),
      picValue: '',
      imgs: [],
      options: {
        isClickableElement: function (el) {
          return /previewer-delete-icon/.test(el.className)
        }
      }
    }
  },
  // 路由离开前销毁数据
  beforeRouteLeave (to, from, next) {
    this.$destroy()
    next()
  },
  // 计算属性(显示或者隐藏文字和按钮)
  computed: {
    showBtn () {
      if (this.list.length) {
        return true
      } else {
        return false
      }
    },
    showplease () {
      if (this.list.length) {
        return false
      } else {
        return true
      }
    }
  },
  methods: {
    add () {
      const vm = this
      vm.showDialog = true
    },
    del (index) {
      const vm = this
      vm.list.splice(index, 1)
      vm.imgs.splice(index, 1)
      vm.examinationOneRecordList.splice(index, 1)
    },
    testadr () {
      const vm = this
      if (vm.adr === '') {
        Toast('请填写地址')
      }
    },
    testnub () {
      const vm = this
      if (vm.number === '') {
        Toast('请填写指数')
      }
    },
    confirm () {
      const vm = this
      if (vm.list.length !== 0) {
        vm.showloading = true
        // vm.sendPrice()
        vm.sendReport()
      } else if (vm.list.length === 0) {
        Toast('请上传初测数据')
      }
      // else if (vm.price === '') {
      //   Toast('请填写价格')
      // }
      // vm.sendPrice()
      // vm.sendReport()
    },
    sendReport () {
      const vm = this
      const examinationOneId = vm.$route.query.examinationOneId
      const examinationOneRecordList = vm.examinationOneRecordList
      const ReportList = { examinationOneRecordList }
      // vm.$set(ReportList, 'examinationOneId', examinationOneId)
      // console.log(JSON.stringify(ReportList))
      // console.log(examinationOneRecordList)
      const parmas = new URLSearchParams()
      parmas.append('examinationOneRecordList', JSON.stringify(ReportList))
      parmas.append('imgs', vm.imgs)
      parmas.append('examinationOneId', examinationOneId)
      vm.$http
        .post(
          '/ExaminationOneConstructionTeamController/ExaminationOneImgInsert',
          parmas
        )
        .then(res => {
          vm.showloading = false
          Toast.success('提交成功')
          setTimeout(() => {
            vm.$router.goBack()
          }, 500)
        })
        .catch(error => {
          console.log(error)
        })
    },
    sendPrice () {
      const vm = this
      const price = vm.price
      const examinationOneId = vm.$route.query.examinationOneId
      const parmas = new URLSearchParams()
      parmas.append('examinationOneId', examinationOneId)
      parmas.append('price', price)
      vm.$http
        .post(
          '/ExaminationOneConstructionTeamController/ConstructionTeamInsertMoney',
          parmas
        )
        .then(res => {
          console.log(res)
        })
        .catch(error => {
          console.log(error)
        })
    },
    showimg (index) {
      this.$refs.previewer.show(index)
      // const vm = this
      // ImagePreview(vm.imgArry, index)
    },
    showPics (url, name) {
      let self = this
      window.plus.io.resolveLocalFileSystemURL(url, function (entry) {
        entry.file(function (file) {
          var fileReader = new window.plus.io.FileReader()
          fileReader.readAsDataURL(file)
          fileReader.onloadend = function (e) {
            self.headerImage = e.target.result.toString()
            // let liImg = e.target.result.toString().split(',')[1]
            // self.imgs.push(liImg)
          }
        })
      })
    },
    // 对图片进行压缩
    compressImage (url, filename) {
      let self = this
      var name = '_doc/' + filename
      window.plus.zip.compressImage(
        {
          src: url, // src: (String 类型 )压缩转换原始图片的路径
          dst: name, // 压缩转换目标图片的路径
          quality: 30, // quality: (Number 类型 )压缩图片的质量.取值范围为1-100
          overwrite: true // overwrite: (Boolean 类型 )覆盖生成新文件
        },
        function (event) {
          // 页面显示图片
          self.showPics(event.target, name)
        },
        function (error) {
          console.log(error)
        }
      )
    },
    // 利用 H5+ api来获取本机图片
    galleryImgs () {
      let self = this
      window.plus.gallery.pick(
        function (e) {
          var name = e.substr(e.lastIndexOf('/') + 1)
          self.compressImage(e.replace('file://', ''), name) // 进行路径的替换，很重要
        },
        function (e) {},
        { filter: 'image' }
      )
    },
    // 上传初检数据，并且封装城json字符串
    beforeClose (action, done) {
      if (action === 'confirm') {
        const vm = this
        const examinationPointName = vm.adr
        const hchoFigure = vm.number
        const benzeneFigure = vm.number2
        const tvocFigure = vm.number3
        const ammoniaFigure = vm.number4
        const adr = vm.adr
        const number = vm.number
        const number2 = vm.number2
        const number3 = vm.number3
        const number4 = vm.number4
        if (
          adr !== '' &&
          number !== '' &&
          number2 !== '' &&
          number3 !== '' &&
          number4 !== '' &&
          vm.headerImage !== require('@/assets/imgs/addpicture.png')
        ) {
          if (number > 0.1) {
            vm.result = '指数偏高'
            vm.hchoStatus = 1
          } else if (number <= 0.1) {
            vm.result = '合格指数'
            vm.hchoStatus = 0
          }
          if (number2 > 0.11) {
            vm.result2 = '指数偏高'
            vm.benzeneStatus = 1
          } else if (number2 <= 0.11) {
            vm.result2 = '合格指数'
            vm.benzeneStatus = 0
          }
          if (number3 > 0.6) {
            vm.result3 = '指数偏高'
            vm.tvocStatus = 1
          } else if (number3 <= 0.6) {
            vm.result3 = '合格指数'
            vm.tvocStatus = 0
          }
          if (number4 > 0.2) {
            vm.result4 = '指数偏高'
            vm.ammoniaStatus = 1
          } else if (number4 <= 0.2) {
            vm.result4 = '合格指数'
            vm.ammoniaStatus = 0
          }
          const result = vm.result
          const result2 = vm.result2
          const result3 = vm.result3
          const result4 = vm.result4
          const src = vm.headerImage
          const hchoStatus = vm.hchoStatus
          const benzeneStatus = vm.benzeneStatus
          const tvocStatus = vm.tvocStatus
          const ammoniaStatus = vm.ammoniaStatus
          const examinationOneRecord = {
            examinationPointName,
            hchoFigure,
            benzeneFigure,
            tvocFigure,
            ammoniaFigure,
            hchoStatus,
            benzeneStatus,
            tvocStatus,
            ammoniaStatus
          }
          const item = {
            adr,
            number,
            number2,
            number3,
            number4,
            result,
            result2,
            result3,
            result4,
            src
          }
          vm.list.push(item)
          vm.examinationOneRecordList.push(examinationOneRecord)
          const url = src.split(',')[1]
          vm.imgs.push(url)
          setTimeout(() => {
            vm.number = ''
            vm.number2 = ''
            vm.number3 = ''
            vm.number4 = ''
            vm.adr = ''
            vm.result = ''
            vm.result2 = ''
            vm.result3 = ''
            vm.result4 = ''
            vm.headerImage = require('@/assets/imgs/addpicture.png')
          }, 1000)
          Toast.success('添加成功')
          setTimeout(done, 1000)
        } else {
          setTimeout(() => {
            vm.number = ''
            vm.number2 = ''
            vm.number3 = ''
            vm.number4 = ''
            vm.adr = ''
            vm.headerImage = require('@/assets/imgs/addpicture.png')
          }, 1000)
          Toast('添加失败,请将数据填写完整')
          setTimeout(done, 1000)
        }
      } else {
        const vm = this
        vm.number = ''
        vm.number2 = ''
        vm.number3 = ''
        vm.number4 = ''
        vm.adr = ''
        vm.headerImage = require('@/assets/imgs/addpicture.png')
        done()
      }
    }
  }
}
</script>

<style lang='stylus' scoped>
.fadeIn-enter-active, .fadeIn-leave-active {
  transition: all 0.7s ease;
}

.fadeIn-enter-active, .fadeIn-leave {
  opacity: 1;
}

.fadeIn-enter, .fadeIn-leave-active {
  opacity: 0;
}

p {
  color: #ffffff;
  font-size: 18px;
}

.upload-img {
  margin-top: 0.2rem;
  margin-bottom: 0.3rem;
  display: flex;

  .text {
    margin-left: 0.3rem;
    margin-top: auto;
    margin-bottom: auto;
    font-size: 14px;
  }

  .upimg {
    margin-left: 0.65rem;
  }

  .file {
    width: 45px;
    opacity: 0;
    position: relative;
    right: 1rem;
    top: 0.25rem;
  }
}

.box {
  margin-top: 1.7rem;

  // .prize-content
  // padding-top .3rem
  // height 1.2rem
  // background-color #fcfcfc
  // box-shadow 3px 1px 3px 3px rgba(170,170,170,.1)
  // .prize-box
  // display flex
  // flex-direction row
  // .prize-img
  // margin auto .2rem auto .4rem
  // .text
  // margin-top auto
  // margin-bottom auto
  // font-size 17px
  // width 40%
  // .prize-input
  // color #aaaaaa
  // width 25%
  // margin-left .3rem
  // padding-top .1rem
  // margin-bottom .18rem
  // font-size 16px
  // text-align center
  // color #E8222D
  // caret-color #aaaaaa
  // background-color transparent
  // border-bottom 1px solid #aaaaaa
  // .prize-input:focus
  // border-bottom 1px solid #28cc75
  // .money
  // margin-top auto
  // margin-bottom auto
  // margin-left .2rem
  // font-size 16px
  .please {
    text-align: center;
    font-size: 18px;
    margin-top: 0.6rem;
    border-bottom: 1px solid #eeeeee;
    width: 80%;
    padding-bottom: 0.2rem;
    margin-left: auto;
    margin-right: auto;
  }

  .data-box {
    // background linear-gradient(50deg, #50C1E9, #00B9E6)
    // background linear-gradient(50deg, #0087cb, #24a8ac)
    background: linear-gradient(30deg, #39BAE8, #14EBCA);
    // background linear-gradient(-50deg, #F5F7FA, #fcfcfc)
    border: 1px solid #eeeeee;
    margin-left: auto;
    margin-right: auto;
    margin-top: 0.4rem;
    margin-bottom: 0.6rem;
    width: 90%;
    padding-bottom: 0.4rem;
    border-radius: 5px;
    box-shadow: 6px 6px 6px rgba(170, 170, 170, 0.13), 6px -6px 6px rgba(170, 170, 170, 0.13), -6px 6px 6px rgba(170, 170, 170, 0.13), -6px -6px 6px rgba(170, 170, 170, 0.13);
    box-sizing: border-box;

    .data-detail {
      display: flex;

      .place-data {
        width: 70%;

        .place .pl {
          display: flex;
          flex-direction: row;
          margin-left: 0.4rem;
          padding-top: 0.4rem;

          .pl-text {
            flex-direction: column;
            margin-left: 0.3rem;

            .line {
              width: 38px;
              height: 0.05rem;
              background-color: #ffffff;
              margin-top: 0.1rem;
            }

            .placetext {
              margin-top: 0.2rem;
              margin-bottom: 0.3rem;
            }
          }
        }
      }

      .ctrl {
        width: 30%;
        flex: 1;
        margin-right: 0.4rem;

        .text {
          border: 2px solid #ffffff;
          margin-top: 0.4rem;
          width: 90px;
          text-align: center;
          color: #ffffff;
          font-size: 16px;
          padding-top: 0.12rem;
          padding-bottom: 0.1rem;
        }

        .text1 {
          border: 2px solid #ffffff;
          margin-top: 0.7rem;
          width: 90px;
          text-align: center;
          color: #ffffff;
          font-size: 16px;
          padding-top: 0.12rem;
          padding-bottom: 0.1rem;
        }

        .delImg {
          margin-left: -webkit-calc(100% - 0.13rem);
          margin-top: 0.12rem;
        }

        .reportimg {
          margin-top: 0.2rem;
          box-shadow: 6px 4px 8px rgba(170, 170, 170, 0.65);
          border: 3px solid #ffffff;
        }
      }
    }
  }

  .btnDiv {
    text-align: center;

    .submit {
      width: 90%;
      height: 45px;
      background: linear-gradient(40deg, #50C1E9, #5BE7C4);
      color: #ffffff;
      font-size: 18px;
      border-radius: 100px;
      margin-bottom: 0.8rem;
    }
  }
}
</style>
