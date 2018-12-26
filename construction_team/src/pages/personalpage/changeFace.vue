<template>
    <div class="changeFace-box">
        <van-nav-bar
            title="人脸修改"
            left-arrow
            class="header"
            @click-left="$router.goBack"
        >
        <div slot="right" @click="confirm">
            <span class="span">确认</span>
        </div>
        <!-- <div v-else slot="right" @click="confirmup">
            <span class="span">确认</span>
        </div> -->
        </van-nav-bar>
        <div class="face">
            <img :src="faceimg" class="faceImg">
        </div>
        <div class="upBtn">
            <!-- <input type="file" class="file" accept="image/*" @change="uploadface"> -->
            <button type="button" class="upload" @click="selBtn">修改人脸</button>
        </div>
        <van-actionsheet v-model="show" :actions="actions" cancel-text="取消" />
        <loading :show="showloading" :text="'上传中'"></loading>
    </div>
</template>

<script>
import Vue from 'vue'
// import Exif from 'exif-js'
import {Toast, Actionsheet} from 'vant'
Vue.use(Toast)
Vue.use(Actionsheet)
export default {
  name: 'changeFace',
  data () {
    return {
      faceimg: '',
      img: '',
      firsturl: '',
      showloading: false,
      show: false,
      actions: [
        {
          name: '拍照',
          callback: this.getImage
        }, {
          name: '从相册中选择',
          callback: this.galleryImgs
        }
      ]
    }
  },
  activated () {
    this.getdata()
    function plusReady () {
      let ws = window.plus.webview.currentWebview()
      console.log(ws)
    }
    if (window.plus) {
      plusReady()
    } else {
      document.addEventListener('plusready', plusReady, false)
    }
  },
  beforeRouteLeave (to, from, next) {
    this.$destroy()
    next()
  },
  methods: {
    getdata () {
      const vm = this
      const faceUrl = vm.$route.params.url
      if (faceUrl === '' || faceUrl === null) {
        vm.faceimg = require('@/assets/imgs/face.png')
        vm.firsturl = require('@/assets/imgs/face.png')
      } else {
        vm.faceimg = faceUrl.imgUrl
        vm.firsturl = faceUrl.imgUrl
      }
    },
    // 确认上传图片
    confirm () {
      const vm = this
      if (vm.faceimg !== vm.firsturl) {
        vm.showloading = true
        vm.img = vm.faceimg.split(',')[1]
        const imgs = [vm.img]
        const parmas = new URLSearchParams()
        parmas.append('imgs', imgs)
        vm.$http.post('/FaceAppControllerLxb/uploadUpdateFace', parmas)
          .then(res => {
            vm.showloading = false
            Toast(res.data.message)
          })
          .catch(error => {
            console.log(error)
          })
      } else {
        Toast('请选择人脸进行上传')
      }
    },
    selBtn () {
      this.show = true
    },
    showPics (url, name) {
      let self = this
      window.plus.io.resolveLocalFileSystemURL(url, function (entry) {
        entry.file(function (file) {
          var fileReader = new window.plus.io.FileReader()
          fileReader.readAsDataURL(file)
          fileReader.onloadend = function (e) {
            self.faceimg = e.target.result.toString()
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
    getImage () {
      let self = this
      self.show = false
      var cmr = window.plus.camera.getCamera()
      cmr.captureImage(function (p) {
        window.plus.io.resolveLocalFileSystemURL(p, function (entry) {
          // alert(entry.toLocalURL().replace('file://', ''))
          // self.img = entry.toLocalURL().replace('file://', '')
          self.compressImage(entry.toLocalURL().replace('file://', ''), entry.name)
        }, function (e) {
          console.log(e.message)
        })
      }, function (e) {
      }, { filename: '_doc/camera/', index: 1 })
    },
    galleryImgs () {
      let self = this
      self.show = false
      window.plus.gallery.pick(function (e) {
        var name = e.substr(e.lastIndexOf('/') + 1)
        self.compressImage(e.replace('file://', ''), name)
      }, function (e) {
      }, {
        filter: 'image'
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.changeFace-box
    height 100vh
    background-color #F5F7FA
    .span
        font-size 16px
        color #ffffff
    .face
        display flex
        flex-direction column
        width 100%
        .faceImg
            margin .5rem auto .05rem auto
            width 200px
            height 230px
            border 3px solid rgba(170,170,170,.3)
    .upBtn
        display flex
        flex-direction column
        .upload
            color #ffffff
            width 90%
            height 50px
            border-radius 10px
            background linear-gradient(10deg, #24a8ac, #128b8e)
            font-size 18px
            margin .3rem auto
        .file
            position relative
            opacity 0
            width 80%
            left .5rem
            top .7rem
</style>
