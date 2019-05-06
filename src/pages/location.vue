<template>
  <div>
    <img :src="img" width="100" height="100">
    <button type="button" @click="getImage">点击</button>
    <button type="button" @click="galleryImgs">选择图片</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      img: require('@/assets/imgs/addimg.png')
    }
  },
  created () {
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
  methods: {
    showPics (url, name) {
      let self = this
      window.plus.io.resolveLocalFileSystemURL(url, function (entry) {
        entry.file(function (file) {
          var fileReader = new window.plus.io.FileReader()
          fileReader.readAsDataURL(file)
          fileReader.onloadend = function (e) {
            self.img = e.target.result.toString()
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
        quality: 40, // quality: (Number 类型 )压缩图片的质量.取值范围为1-100
        overwrite: true// overwrite: (Boolean 类型 )覆盖生成新文件
      },
      function (event) {
        // 页面显示图片
        // self.img = event.target
        // alert(event.target)
        self.showPics(event.target, name)
      }, function (error) {
        console.log(error)
      })
    },
    getImage () {
      let self = this
      var cmr = window.plus.camera.getCamera()
      cmr.captureImage(function (p) {
        window.plus.io.resolveLocalFileSystemURL(p, function (entry) {
          // alert(entry.toLocalURL().replace('file://', ''))
          // self.img = entry.toLocalURL().replace('file://', '')
          alert(entry.name)
          self.compressImage(entry.toLocalURL().replace('file://', ''), entry.name)
        }, function (e) {
          console.log(e.message)
        })
      }, function (e) {
      }, { filename: '_doc/camera/', index: 1 })
    },
    galleryImgs () {
      let self = this
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

<style>

</style>
