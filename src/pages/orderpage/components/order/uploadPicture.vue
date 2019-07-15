<template>
    <div class="upload-picture-box">
        <van-nav-bar
        title="图片上传"
        left-arrow
        @click-left="$router.goBack"
        fixed
        >
        <div slot="right" class="right" @click="confirmSend">
            完成
        </div>
        </van-nav-bar>
        <div class="upload-title">
            <img src="@/assets/imgs/picture.png" width="27" height="27" class="title-img">
            <div class="title">上传图片<small>(最多上传9张)</small></div>
            <img src="@/assets/imgs/bot.png" width="25" height="18" class="title-img-second">
        </div>
        <div class="picture-box">
            <div class="box-width">
              <transition-group name="fadeIn" mode="out-in">
                <div class="img" v-for="(item, index) of imgArray" :key="index">
                    <img src="@/assets/imgs/delimg.png" width="20" height="20" class="delimg" @click="del(index)">
                    <img :src="item" width="89" height="89" class="image" @click="showimg(index)">
                </div>
              </transition-group>
                <div class="addimg" v-if="showAdd">
                    <!-- <input type="file" accept="image/*" class="file" @change="upload"> -->
                    <img src="@/assets/imgs/addimg.png" @click="selupload" width="89" height="89" class="fileimg">
                </div>
            </div>
        </div>
        <div class="foot">
            <span>上传施工现场图片并且确认完成</span>
            <div class="line"></div>
        </div>
        <van-actionsheet v-model="show" :actions="actions" cancel-text="取消" />
        <loading :show="showloading" :text="'上传中'"></loading>
    </div>
</template>

<script>
import Vue from 'vue'
import { ImagePreview, Toast, Actionsheet } from 'vant'
Vue.use(Toast)
Vue.use(Actionsheet)
export default {
  name: 'uploadPicture',
  data () {
    return {
      imgArray: [],
      showloading: false,
      show: false,
      picValue: '',
      imgs: [],
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
  computed: {
    showAdd () {
      if (this.imgArray.length === 9) {
        return false
      } else {
        return true
      }
    }
  },
  beforeRouteLeave (to, from, next) {
    this.$destroy()
    next()
  },
  methods: {
    showimg (index) {
      const vm = this
      ImagePreview(vm.imgArray, index)
    },
    confirmSend () {
      const vm = this
      if (vm.imgArray.length !== 0) {
        vm.showloading = true
        vm.sendImg()
      } else {
        Toast('请上传图片')
      }
    },
    sendImg () {
      const vm = this
      const ordersId = vm.$route.query.ordersId
      const parmas = new URLSearchParams()
      parmas.append('ordersId', ordersId)
      parmas.append('imgs', vm.imgs)
      vm.$http.post('/OrderTableConstructionTeamController/OrderTableImgInsert', parmas)
        .then(res => {
          vm.showloading = false
          Toast.success('上传成功')
          setTimeout(() => {
            vm.$router.goBack()
          }, 500)
        })
        .catch(error => {
          console.log(error)
        })
    },
    selupload () {
      const vm = this
      vm.show = true
    },
    del (index) {
      const vm = this
      vm.imgArray.splice(index, 1)
      vm.imgs.splice(index, 1)
    },
    showPics (url, name) {
      let self = this
      window.plus.io.resolveLocalFileSystemURL(url, function (entry) {
        entry.file(function (file) {
          var fileReader = new window.plus.io.FileReader()
          fileReader.readAsDataURL(file)
          fileReader.onloadend = function (e) {
            self.imgArray.push(e.target.result.toString())
            let liImg = e.target.result.toString().split(',')[1]
            self.imgs.push(liImg)
          }
        })
      })
    },
    // 对图片进行压缩
    compressImage (url, filename) {
      let self = this
      var name = '_doc/' + filename
      window.plus.zip.compressImage({
        src: url, // src: (String 类型 )压缩转换原始图片的路径
        dst: name, // 压缩转换目标图片的路径
        quality: 25, // quality: (Number 类型 )压缩图片的质量.取值范围为1-100
        overwrite: true// overwrite: (Boolean 类型 )覆盖生成新文件
      },
      function (event) {
        // 页面显示图片
        self.showPics(event.target, name)
      }, function (error) {
        console.log(error)
      })
    },
    // 调用手机拍照功能
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
    // 调用本机相册
    galleryImgs () {
      let self = this
      self.show = false
      window.plus.gallery.pick(function (e) {
        for (var i in e.files) {
          var name = e.files[i].substr(e.files[i].lastIndexOf('/') + 1)
          self.compressImage(e.files[i].replace('file://', ''), name)
        }
      }, function (e) {
      }, {filter: 'image', multiple: true}) // 允许选择多张
    }
  }
}
</script>

<style lang="stylus" scoped>
.fadeIn-enter-active,.fadeIn-leave-active {
  transition: all .7s ease;
}
.fadeIn-enter-active,.fadeIn-leave{
    opacity: 1;
}
.fadeIn-enter,.fadeIn-leave-active {
  opacity: 0;
}
.right
    font-size 16px
    color #ffffff
.upload-picture-box
    height 100vh
    background-color #F5F7FA
    .upload-title
        margin-top 1.28rem
        height 9vh
        display flex
        flex-direction row
        background #ffffff
        .title-img
            margin auto .1rem auto .3rem
        .title
            margin-top auto
            margin-bottom auto
            font-size 16px
            color #515151
            small
                margin-left .1rem
                color #aeaeae
                font-size 12px
        .title-img-second
            flex .5
            margin-top auto
            margin-bottom auto
            margin-left -webkit-calc(100% - 4.5rem)
    .picture-box
        padding-top .35rem
        margin-top .1rem
        background #ffffff
        padding-bottom .4rem
        padding-left .1rem
        .box-width
            display inline-block
            width 90%
            padding-left .6rem
            .img
                position relative
                float left
                width 28%
                height 1.8rem
                margin-left .15rem
                margin-bottom .2rem
                .image
                    position absolute
                .delimg
                    position absolute
                    z-index 3
                    left 1.35rem
            .addimg
                float left
                position relative
                margin-left .15rem
                width 28%
                height 1.8rem
                .file
                    position absolute
                    height 1.7rem
                    width 100%
                    z-index 3
                    opacity 0
                .fileimg
                    position absolute
    .foot
        margin-top .3rem
        text-align center
        span
            color #aeaeae
            font-size 16px
        .line
            height 1px
            width 88%
            background #eeeeee
            margin-top .2rem
            margin-left auto
            margin-right auto
</style>
