<template>
    <div class="home">
        <home-header></home-header>
        <div class="home-line-second"></div>
        <home-data></home-data>
        <home-navbar></home-navbar>
        <!-- <div class="home-line"></div> -->
        <!-- <home-tool></home-tool> -->
        <!-- <div class="foot">
          更多内容敬请期待
        </div> -->
        <van-dialog
            v-model="updateShow"
            show-cancel-button
            :before-close="beforeClose"
            confirm-button-text="更新"
            cancel-button-text="取消"
            >
            <div class="dialogContent">
                检查到有新版本，是否立即更新？
            </div>
        </van-dialog>
    </div>
</template>

<script>
import Vue from 'vue'
import { Toast, Dialog } from 'vant'
import HomeHeader from './components/header'
import HomeNavbar from './components/navbar'
import HomeData from './components/data'
// import HomeTool from './components/tool'
Vue.use(Toast)
Vue.use(Dialog)
export default {
  data () {
    return {
      updateShow: false,
      url: ''
    }
  },
  created () {
    const vm = this
    vm.getUpdate()
  },
  components: {
    HomeHeader,
    HomeNavbar,
    HomeData
    // HomeTool
  },
  methods: {
    getUpdate () {
      const vm = this
      const params = new URLSearchParams()
      // const VersionNumber = 1
      params.append('VersionNumber', 9) // 版本号
      vm.$http.post('/updateApp', params)
        .then(res => {
          if (res.data.code === 100) {
            vm.updateShow = true
            vm.url = res.data.data.version
            console.log(vm.url)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    beforeClose (action, done) {
      const vm = this
      if (action === 'confirm') {
        var url = vm.url
        // 利用H5 + 自动检查下载App
        var dtask = window.plus.downloader.createDownload(url, {}, function (d, status) {
          if (status === 200) {
            var path = d.filename
            window.plus.runtime.install(path)
          } else {
            Toast('下载失败')
          }
        })
        dtask.start()
        setTimeout(done, 1000)
      } else {
        done()
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.dialogContent
  text-align center
  height 1.5rem
  line-height 1.5rem
  color #5f5f5f
.home
  height 100vh
  background-color #ffffff
.home-line-second
  height .18rem
  background-color #ffffff
.home-line
  height: .18rem
  background-color: #F5F7FA
.foot
  text-align center
  font-size 15px
  color #aaaaaa
  margin-top .2rem
</style>
