<template>
    <div>
    <div class="uonmsg-box">
      <van-nav-bar
        title="团队信息"
        left-arrow
        @click-left="$router.goBack"
        />
        <div class="msg-box">
            <div class="header-img">
                <div class="img-text">
                    团队头像
                </div>
                <div id="demo">
                  <div class="container" v-show="panel">
                    <div>
                      <img id="image" :src="url" alt="Picture">
                    </div>
                    <button type="button" id="button" @click="crop">确定</button>
                    <button type="button" id="button2" @click="cancel">取消</button>
                  </div>
                </div>
                <input type="file" id="change" accept="image/*" @change="change">
                <label for="change"></label>
                <img :src="headerImage" width="50" height="50" class="thisImg" lazy='loading'>
            </div>
            <div class="header-item2" @click="upname">
                <div class="phone-text">团队名称</div>
                <img src="@/assets/imgs/right.png" width="20" height="20" class="next-img">
                <div class="phone-number1">{{name}}</div>
                <div class="phone-number1" v-if="writeName">请填写团队名称</div>
            </div>
            <div class="header-item" @click="upPhone">
                <div class="phone-text">手机号码</div>
                <div class="phone-number" ref="pho">{{phone}}</div>
                <img src="@/assets/imgs/right.png" width="20" height="20" class="next-img">
            </div>
            <div class="desc-box">
                <div class="desc-title">
                    所属公司
                </div>
                <div class="desc">
                    <p class="desc-p" ref="pCompany">{{companyName}}</p>
                </div>
            </div>
            <div class="desc-box">
                <div class="desc-title">
                    团队简介
                </div>
                <div class="desc" @click="updata">
                    <p class="desc-p" v-if="writeDes">请填写团队简历</p>
                    <p class="desc-p">{{desc}}</p>
                </div>
            </div>
        </div>
    </div>

     <van-dialog
      v-model="show2"
      show-cancel-button
      confirm-button-text="确认修改"
      cancel-button-text="取消修改"
      :before-close="beforeClosenameUp"
    >
      <van-cell-group>
        <van-field
          v-model="name2"
          label="团队名称"
          placeholder="请输入团队名称(15个字符以内)"
          maxlength="15"
          onkeyup="value=value.replace(/[\d]/g,'') " onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[\d]/g,''))"
        />
      </van-cell-group>
    </van-dialog>

    <!-- <van-dialog
      v-model="show1"
      show-cancel-button
      confirm-button-text="确认修改"
      cancel-button-text="取消修改"
      :before-close="beforeClosephoneUp"
    >
      <van-cell-group>
        <van-field
          v-model="phone"
          label="手机号"
          maxlength="11"
          placeholder="请输入手机号"
          onkeyup="(this.v=function(){this.value=this.value.replace(/[^0-9-]+/,'');}).call(this)"
        />
      </van-cell-group>
    </van-dialog> -->

        <!-- <van-dialog
      v-model="show3"
      show-cancel-button
      confirm-button-text="确认修改"
      cancel-button-text="取消修改"
      :before-close="beforeCloseCompany"
    >
      <van-cell-group>
        <van-field
          v-model="companyName"
          label="所属公司"
          type="textarea"
          rows="1"
          autosize
        />
      </van-cell-group>
    </van-dialog> -->

    <van-dialog
      v-model="show"
      show-cancel-button
      confirm-button-text="确认修改"
      cancel-button-text="取消修改"
      :before-close="beforeClose"
    >
      <van-cell-group>
        <van-field
          v-model="desc2"
          label="团队简介"
          type="textarea"
          rows="1"
          placeholder="请输入团队简介"
          autosize
        />
      </van-cell-group>
    </van-dialog>
    </div>
</template>

<script>
import Vue from 'vue'
import Cropper from 'cropperjs'
import { Dialog, Field, Toast } from 'vant'
Vue.use(Dialog)
Vue.use(Field)
export default {
  name: 'permsg',
  data () {
    return {
      desc: '',
      desc2: '',
      phone: '',
      companyName: '',
      name: '',
      name2: '',
      show: false,
      show1: false,
      show2: false,
      show3: false,
      headerImage: '',
      picValue: '',
      cropper: '',
      croppable: false,
      panel: false,
      url: ''
    }
  },
  activated () {
    this.getData()
  },
  beforeRouteLeave (to, from, next) {
    this.$destroy()
    next()
  },
  computed: {
    writeDes () {
      const vm = this
      if (vm.desc === '' || vm.desc === null) {
        return true
      } else {
        return false
      }
    },
    writeName () {
      const vm = this
      if (vm.name === '' || vm.name === null) {
        return true
      } else {
        return false
      }
    }
  },
  mounted () {
    // 初始化这个裁剪框
    var self = this
    var image = document.getElementById('image')
    this.cropper = new Cropper(image, {
      aspectRatio: 1,
      viewMode: 1,
      background: false,
      zoomable: false,
      ready: function () {
        self.croppable = true
      }
    })
  },
  methods: {
    // 获取团队信息
    getData () {
      const vm = this
      vm.$http.post('/ConstructionBuilderAppControllerLxb/showAll')
        .then(res => {
          vm.name = res.data.data.ConstructionBuilder.team.constructionTeamName
          vm.phone = res.data.data.ConstructionBuilder.team.header.phone
          vm.companyName = res.data.data.ConstructionBuilder.team.company.name
          vm.desc = res.data.data.ConstructionBuilder.team.info
          if (res.data.data.ConstructionBuilder.team.logoImgurl === '' || res.data.data.ConstructionBuilder.team.logoImgurl === null) {
            vm.headerImage = require('@/assets/imgs/head.png')
          } else {
            vm.headerImage = res.data.data.ConstructionBuilder.team.logoImgurl
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 修改名称
    upname () {
      this.show2 = true
      this.name2 = this.name
    },
    beforeClosenameUp (action, done) {
      const vm = this
      if (action === 'confirm') {
        if (vm.name2 === '') {
          Toast('修改失败,请输入团队名称')
          setTimeout(done, 500)
        } else {
          const parmas = new URLSearchParams()
          const constructionTeamName = vm.name2
          parmas.append('constructionTeamName', constructionTeamName)
          vm.$http.post('/ConstructionTeamAppControllerLxb/updateMessage', parmas)
            .then(res => {
              if (res.data.code === 200) {
                Toast.success('修改成功')
                setTimeout(done, 500)
                vm.getData()
              } else {
                Toast(res.data.message)
                setTimeout(done, 500)
              }
            })
            .catch(error => {
              console.log(error)
              Toast.fail('修改失败')
              setTimeout(done, 500)
            })
          setTimeout(done, 500)
        }
      } else {
        done()
      }
    },
    upPhone () {
      Toast('无法修改手机号')
    },
    // 修改手机号码
    // upPhone () {
    //   this.show1 = true
    //   this.phone = this.$refs.pho.innerHTML
    // },
    // beforeClosephoneUp (action, done) {
    //   var reg = /^((13|14|15|17|18)[0-9]{1}\d{8})$/
    //   if (action === 'confirm') {
    //     if (!reg.test(this.phone)) {
    //       Toast('修改失败,请输入正确的手机号码')
    //       setTimeout(done, 500)
    //     } else {
    //       Toast.success('修改成功')
    //       this.$refs.pho.innerHTML = this.phone
    //       setTimeout(done, 500)
    //     }
    //   } else {
    //     done()
    //   }
    // },
    // 修改所诉公司
    // updataCompany () {
    //   this.show3 = true
    //   this.companyName = this.$refs.pCompany.innerHTML
    // },
    // beforeCloseCompany (action, done) {
    //   if (action === 'confirm') {
    //     setTimeout(done, 500)
    //     this.$refs.pCompany.innerHTML = this.companyName
    //     Toast.success('修改成功')
    //   } else {
    //     done()
    //   }
    // },
    // 修改团队简介
    updata () {
      this.show = true
      this.desc2 = this.desc
    },
    beforeClose (action, done) {
      const vm = this
      if (action === 'confirm') {
        if (vm.desc2 === '') {
          Toast('修改失败,请填写团队简历')
          setTimeout(done, 500)
        } else {
          const parmas = new URLSearchParams()
          const Info = vm.desc2
          parmas.append('Info', Info)
          vm.$http.post('/ConstructionTeamAppControllerLxb/updateMessage', parmas)
            .then(res => {
              if (res.data.code === 200) {
                Toast.success('修改成功')
                setTimeout(done, 500)
                vm.getData()
              } else {
                Toast(res.data.message)
                setTimeout(done, 500)
              }
            })
            .catch(error => {
              console.log(error)
              Toast.fail('修改失败')
              setTimeout(done, 500)
            })
          setTimeout(done, 500)
        }
      } else {
        done()
      }
    },
    // 头像修改
    cancel () {
      this.panel = false
      var obj = document.getElementById('change')
      obj.innerHTML = obj.outerHTML
    },
    getObjectURL (file) {
      var url
      if (window.createObjectURL !== undefined) { // basic
        url = window.createObjectURL(file)
      } else if (window.URL !== undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file)
      } else if (window.webkitURL !== undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file)
      }
      return url
    },
    change (e) {
      let files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      this.panel = true
      this.picValue = files[0]

      this.url = this.getObjectURL(this.picValue)
      // 每次替换图片要重新得到新的url
      if (this.cropper) {
        this.cropper.replace(this.url)
      }
      this.panel = true
    },
    crop () {
      this.panel = false
      var croppedCanvas
      var roundedCanvas

      if (!this.croppable) {
        return
      }
      // Crop
      croppedCanvas = this.cropper.getCroppedCanvas()
      console.log(this.cropper)
      // Round
      roundedCanvas = this.getRoundedCanvas(croppedCanvas)

      this.headerImage = roundedCanvas.toDataURL('image/jpeg', 0.3)
      // alert(roundedCanvas.toDataURL())
      this.postImg()
    },
    getRoundedCanvas (sourceCanvas) {
      var canvas = document.createElement('canvas')
      var context = canvas.getContext('2d')
      var width = sourceCanvas.width
      var height = sourceCanvas.height

      canvas.width = width
      canvas.height = height

      context.imageSmoothingEnabled = true
      context.drawImage(sourceCanvas, 0, 0, width, height)
      context.globalCompositeOperation = 'destination-in'
      context.beginPath()
      context.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, 2 * Math.PI, true)
      context.fill()

      return canvas
    },
    postImg () {
      const vm = this
      const imgs = vm.headerImage.split(',')[1]
      const parmas = new URLSearchParams()
      parmas.append('imgs', imgs)
      vm.$http.post('/ConstructionTeamAppControllerLxb/updatelogoImg', parmas)
        .then(res => {
          if (res.data.code === 200) {
            Toast.success(res.data.message)
          } else {
            Toast(res.data.message)
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>
.uonmsg-box{
  height: 100vh;
  background-color: #FCFCFC;
}
.uonmsg-box .msg-box{
  background-color:#fff;
  padding-bottom: .6rem;
  /* border-bottom: 1px solid #eee; */
  padding-left: .3rem;
}
.uonmsg-box .header-img{
display: flex;
height: 12vh;
border-bottom: 1px solid #eee;
}
.uonmsg-box .img-text{
font-size: 16px;
margin: auto .1rem;
}
.uonmsg-box .thisImg{
margin-left: -webkit-calc(100% - 2.85rem);
margin-top: auto;
margin-bottom: auto;
border-radius: 50%;
border: 1px solid #ffffff
}
.header-item{
display: flex;
height: 6vh;
border-bottom: 1px solid #eee;
-webkit-tap-highlight-color:red;
}
.phone-text{
font-size: 16px;
margin: auto .1rem}
.phone-number
{font-size: 15px;
color: #AEAEAE;
margin-bottom: auto;
margin-top: auto;
margin-left: -webkit-calc(100% - 4rem)}
.next-img
{margin: auto .05rem}
.desc-box
{padding-bottom: .3rem;
border-bottom: 1px solid #eee}
.desc-title{
font-size: 16px;
margin-top: .2rem;
margin-left: .1rem}
.desc{
width: 96%;
padding-bottom: .4rem;
padding-left: .1rem}
.desc-p{
line-height: .4rem;
color: #AEAEAE;
margin-top: .28rem}
.header-item2{
height: 6vh;
border-bottom: 1px solid #eee;
}
.uonmsg-box .header-item2 .phone-text{
font-size: 16px;
margin-top: .19rem;
float: left;
}
.uonmsg-box .header-item2 .phone-number1{
font-size: 15px;
color: #AEAEAE;
margin-top: .2rem;
float: right;
}
.uonmsg-box .header-item2 .next-img
{
  margin-top: .15rem;
  margin-right: .2rem;
  float: right;
}
</style>
