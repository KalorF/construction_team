<template>
    <div style="height:100vh">
        <van-nav-bar
        title="复测结果填写"
        left-arrow
        @click-left="$router.goBack"
        fixed
        >
        <div slot="right" @click="add">
            <img src="@/assets/imgs/add3.png" width="36">
        </div>
        </van-nav-bar>
        <div class="box-second">
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
                            <img :src="item.src" width="87" height="70" class="reportimg" @click="showimg(index)">
                            <div class="text">
                                {{item.result}}
                            </div>
                            <div class="text1">
                                {{item.result2}}
                            </div>
                            <div class="text1">
                                {{item.result3}}
                            </div>
                            <div class="text1">
                                {{item.result4}}
                            </div>
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
            <van-field
                v-model="adr"
                label="检测地点"
                placeholder="请输入检测地点"
                maxlength="8"
                @blur="testadr"
            />
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
      result: '',
      result2: '',
      result3: '',
      result4: '',
      examinationTwoRecordList: [],
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
      vm.examinationTwoRecordList.splice(index, 1)
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
    showimg (index) {
      const vm = this
      vm.$refs.previewer.show(index)
      // ImagePreview(vm.imgArry, index)
    },
    confirm () {
      const vm = this
      vm.showloading = true
      vm.sendReport()
    },
    sendReport () {
      const vm = this
      const examinationTwoId = vm.$route.query.examinationTwoId
      const examinationTwoRecordList = vm.examinationTwoRecordList
      const ReportList = {examinationTwoRecordList}
      const parmas = new URLSearchParams()
      parmas.append('examinationTwoRecordList', JSON.stringify(ReportList))
      parmas.append('imgs', vm.imgs)
      parmas.append('examinationTwoId', examinationTwoId)
      vm.$http.post('/ExaminationTwoConstructionTeamController/ExaminationTwoImgInsert', parmas)
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
    // 上传图片
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
    compressImage (url, filename) {
      let self = this
      var name = '_doc/' + filename
      window.plus.zip.compressImage({
        src: url, // src: (String 类型 )压缩转换原始图片的路径
        dst: name, // 压缩转换目标图片的路径
        quality: 30, // quality: (Number 类型 )压缩图片的质量.取值范围为1-100
        overwrite: true// overwrite: (Boolean 类型 )覆盖生成新文件
      },
      function (event) {
        // 页面显示图片
        self.showPics(event.target, name)
      }, function (error) {
        console.log(error)
      })
    },
    galleryImgs () {
      let self = this
      window.plus.gallery.pick(function (e) {
        var name = e.substr(e.lastIndexOf('/') + 1)
        self.compressImage(e.replace('file://', ''), name)
      }, function (e) {
      }, {filter: 'image'})
    },
    // upload (e) {
    //   let files = e.target.files || e.dataTransfer.files
    //   if (!files.length) return
    //   this.picValue = files[0]
    //   this.imgPreview(this.picValue)
    // },
    // imgPreview (file) {
    //   let self = this
    //   let Orientation
    //   // 去获取拍照时的信息，解决拍出来的照片旋转问题
    //   Exif.getData(file, function () {
    //     Orientation = Exif.getTag(this, 'Orientation')
    //   })
    //   // 看支持不支持FileReader
    //   if (!file || !window.FileReader) return

    //   if (/^image/.test(file.type)) {
    //     // 创建一个reader
    //     let reader = new FileReader()
    //     // 将图片2将转成 base64 格式
    //     reader.readAsDataURL(file)
    //     // 读取成功后的回调
    //     reader.onloadend = function () {
    //       let result = this.result
    //       let img = new Image()
    //       img.src = result
    //       // 判断图片是否大于100K,是就直接上传，反之压缩图片
    //       if (this.result.length <= (100 * 1024)) {
    //         self.headerImage = this.result
    //         // console.log(this.result)
    //         // self.postImg()
    //       } else {
    //         img.onload = function () {
    //           let data = self.compress(img, Orientation)
    //           self.headerImage = data
    //         //   console.log(data)
    //         //   self.postImg()
    //         }
    //       }
    //     }
    //   }
    // },
    // postImg () {
    //   // 这里写接口
    // },
    // rotateImg (img, direction, canvas) {
    //   // 最小与最大旋转方向，图片旋转4次后回到原方向
    //   const minstep = 0
    //   const maxstep = 3
    //   if (img == null) return
    //   // img的高度和宽度不能在img元素隐藏后获取，否则会出错
    //   let height = img.height
    //   let width = img.width
    //   let step = 2
    //   if (step == null) {
    //     step = minstep
    //   }
    //   if (direction === 'right') {
    //     step++
    //     // 旋转到原位置，即超过最大值
    //     step > maxstep && (step = minstep)
    //   } else {
    //     step--
    //     step < minstep && (step = maxstep)
    //   }
    //   // 旋转角度以弧度值为参数
    //   let degree = step * 90 * Math.PI / 180
    //   let ctx = canvas.getContext('2d')
    //   switch (step) {
    //     case 0:
    //       canvas.width = width
    //       canvas.height = height
    //       ctx.drawImage(img, 0, 0)
    //       break
    //     case 1:
    //       canvas.width = height
    //       canvas.height = width
    //       ctx.rotate(degree)
    //       ctx.drawImage(img, 0, -height)
    //       break
    //     case 2:
    //       canvas.width = width
    //       canvas.height = height
    //       ctx.rotate(degree)
    //       ctx.drawImage(img, -width, -height)
    //       break
    //     case 3:
    //       canvas.width = height
    //       canvas.height = width
    //       ctx.rotate(degree)
    //       ctx.drawImage(img, -width, 0)
    //       break
    //   }
    // },
    // compress (img, Orientation) {
    //   let canvas = document.createElement('canvas')
    //   let ctx = canvas.getContext('2d')
    //   // 瓦片canvas
    //   let tCanvas = document.createElement('canvas')
    //   let tctx = tCanvas.getContext('2d')
    //   let initSize = img.src.length
    //   let width = img.width
    //   let height = img.height
    //   // 如果图片大于四百万像素，计算压缩比并将大小压至400万以下
    //   let ratio
    //   if ((ratio = width * height / 4000000) > 1) {
    //     console.log('大于400万像素')
    //     ratio = Math.sqrt(ratio)
    //     width /= ratio
    //     height /= ratio
    //   } else {
    //     ratio = 1
    //   }
    //   canvas.width = width
    //   canvas.height = height
    //   //        铺底色
    //   ctx.fillStyle = '#fff'
    //   ctx.fillRect(0, 0, canvas.width, canvas.height)
    //   // 如果图片像素大于100万则使用瓦片绘制
    //   let count
    //   if ((count = width * height / 1000000) > 1) {
    //     console.log('超过100W像素')
    //     count = ~~(Math.sqrt(count) + 1) // 计算要分成多少块瓦片
    //     //            计算每块瓦片的宽和高
    //     let nw = ~~(width / count)
    //     let nh = ~~(height / count)
    //     tCanvas.width = nw
    //     tCanvas.height = nh
    //     for (let i = 0; i < count; i++) {
    //       for (let j = 0; j < count; j++) {
    //         tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh)
    //         ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh)
    //       }
    //     }
    //   } else {
    //     ctx.drawImage(img, 0, 0, width, height)
    //   }
    //   // 修复ios上传图片的时候 被旋转的问题
    //   if (Orientation !== '' && Orientation !== 1) {
    //     switch (Orientation) {
    //       case 6:// 需要顺时针（向左）90度旋转
    //         this.rotateImg(img, 'left', canvas)
    //         break
    //       case 8:// 需要逆时针（向右）90度旋转
    //         this.rotateImg(img, 'right', canvas)
    //         break
    //       case 3:// 需要180度旋转
    //         this.rotateImg(img, 'right', canvas)// 转两次
    //         this.rotateImg(img, 'right', canvas)
    //         break
    //     }
    //   }
    //   // 进行最小压缩
    //   let ndata = canvas.toDataURL('image/jpeg', 0.3)
    //   console.log('压缩前：' + initSize)
    //   console.log('压缩后：' + ndata.length)
    //   console.log('压缩率：' + ~~(100 * (initSize - ndata.length) / initSize) + '%')
    //   tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0
    //   return ndata
    // },
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
        if (adr !== '' && number !== '' && number2 !== '' && number3 !== '' && number4 !== '' && vm.headerImage !== require('@/assets/imgs/addpicture.png')) {
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
          const examinationTwoRecord = {
            examinationPointName, hchoFigure, benzeneFigure, tvocFigure, ammoniaFigure, hchoStatus, benzeneStatus, tvocStatus, ammoniaStatus
          }
          const item = {
            adr, number, number2, number3, number4, result, result2, result3, result4, src
          }
          vm.list.push(item)
          vm.examinationTwoRecordList.push(examinationTwoRecord)
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
.fadeIn-enter-active,.fadeIn-leave-active {
  transition: all .7s ease;
}
.fadeIn-enter-active,.fadeIn-leave{
    opacity: 1;
}
.fadeIn-enter,.fadeIn-leave-active {
  opacity: 0;
}
p
    color #ffffff
    font-size 18px
.upload-img
    margin-top .2rem
    margin-bottom .3rem
    display flex
    .text
        margin-left .3rem
        margin-top auto
        margin-bottom auto
        font-size 14px
    .upimg
        margin-left .65rem
    .file
        width 45px
        opacity 0
        position relative
        right 1rem
        top .25rem
.box-second
    margin-top 1.6rem
    .please
        text-align center
        font-size 18px
        border-bottom 1px solid #eeeeee
        width 80%
        padding-bottom .2rem
        margin-left auto
        margin-right auto
    .data-box
        background linear-gradient(30deg, #1EDBA0, #67E7BE)
        // background linear-gradient(50deg, #0087cb, #24a8ac)
        // background linear-gradient(-50deg, #F5F7FA, #fcfcfc)
        border 1px solid #eeeeee
        margin-left auto
        margin-right auto
        margin-top .4rem
        margin-bottom .6rem
        width 90%
        padding-bottom .4rem
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
                margin-right .4rem
                .text
                    border 2px solid #ffffff
                    margin-top .4rem
                    width 90px
                    text-align center
                    color #ffffff
                    font-size 16px
                    padding-top .12rem
                    padding-bottom .1rem
                .text1
                    border 2px solid #ffffff
                    margin-top .7rem
                    width 90px
                    text-align center
                    color #ffffff
                    font-size 16px
                    padding-top .12rem
                    padding-bottom .1rem
                .delImg
                    margin-left -webkit-calc(100% - .13rem)
                    margin-top .12rem
                .reportimg
                    margin-top .2rem
                    box-shadow 6px 4px 8px rgba(170,170,170,.65)
                    border 3px solid #ffffff
    .btnDiv
        text-align center
        .submit
            width 90%
            height 45px
            background linear-gradient(-177deg, #1af48b, #1fd17c)
            color #ffffff
            font-size 18px
            border-radius 100px
            margin-bottom .8rem
</style>
