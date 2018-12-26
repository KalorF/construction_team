## 关于wabapp打包成App后无法使用input调出相机问题解决方法
- 关于Input的使用
   * 在浏览器中我们可以通过input中的file属性加上accept=‘image/*’属性做到上传图片的功能，同时此方法也可以调出本地的相册和摄像头。当然也可以使用capture=‘camera’属限制只使用摄像头进行拍照 &nbsp;&nbsp;&nbsp;==此方法适用于浏览器端以及微信公众号==
   * 方法举例
```
<input type="file" accept="image/*">
<input type="file" accept="image/*" capture='camera'>
```
* 图片压缩方法
  * 关于拍照时候的图片旋转问题，可以引入Exif.js解决,压缩时可以采用画布进行压缩（canvas）
  * 代码示例（以Vue为例）

```
<template>
    <div>
        <img :src='headerImage' width="55" height="55" class="upimg">
        <input type="file" accept="image/*" class="file" @change="upload">
    </div>
</template>

<script>
import Exif from 'exif-js'

export default {
    data () {
        return () {
            headerImage: ''
        }
    },
    methods: {
            // 上传图片
    upload (e) {
      let files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      this.picValue = files[0]
      this.imgPreview(this.picValue)
    },
    imgPreview (file) {
      let self = this
      let Orientation
      // 去获取拍照时的信息，解决拍出来的照片旋转问题
      Exif.getData(file, function () {
        Orientation = Exif.getTag(this, 'Orientation')
      })
      // 看支持不支持FileReader
      if (!file || !window.FileReader) return

      if (/^image/.test(file.type)) {
        // 创建一个reader
        let reader = new FileReader()
        // 将图片2将转成 base64 格式
        reader.readAsDataURL(file)
        // 读取成功后的回调
        reader.onloadend = function () {
          let result = this.result
          let img = new Image()
          img.src = result
          // 判断图片是否大于100K,是就直接上传，反之压缩图片
          if (this.result.length <= (100 * 1024)) {
            self.headerImage = this.result
            // console.log(this.result)
            // self.postImg()
          } else {
            img.onload = function () {
              let data = self.compress(img, Orientation)
              self.headerImage = data
            //   console.log(data)
            //   self.postImg()
            }
          }
        }
      }
    },
    rotateImg (img, direction, canvas) {
      // 最小与最大旋转方向，图片旋转4次后回到原方向
      const minstep = 0
      const maxstep = 3
      if (img == null) return
      // img的高度和宽度不能在img元素隐藏后获取，否则会出错
      let height = img.height
      let width = img.width
      let step = 2
      if (step == null) {
        step = minstep
      }
      if (direction === 'right') {
        step++
        // 旋转到原位置，即超过最大值
        step > maxstep && (step = minstep)
      } else {
        step--
        step < minstep && (step = maxstep)
      }
      // 旋转角度以弧度值为参数
      let degree = step * 90 * Math.PI / 180
      let ctx = canvas.getContext('2d')
      switch (step) {
        case 0:
          canvas.width = width
          canvas.height = height
          ctx.drawImage(img, 0, 0)
          break
        case 1:
          canvas.width = height
          canvas.height = width
          ctx.rotate(degree)
          ctx.drawImage(img, 0, -height)
          break
        case 2:
          canvas.width = width
          canvas.height = height
          ctx.rotate(degree)
          ctx.drawImage(img, -width, -height)
          break
        case 3:
          canvas.width = height
          canvas.height = width
          ctx.rotate(degree)
          ctx.drawImage(img, -width, 0)
          break
      }
    },
    compress (img, Orientation) {
      let canvas = document.createElement('canvas')
      let ctx = canvas.getContext('2d')
      // 瓦片canvas
      let tCanvas = document.createElement('canvas')
      let tctx = tCanvas.getContext('2d')
      let initSize = img.src.length
      let width = img.width
      let height = img.height
      // 如果图片大于四百万像素，计算压缩比并将大小压至400万以下
      let ratio
      if ((ratio = width * height / 4000000) > 1) {
        console.log('大于400万像素')
        ratio = Math.sqrt(ratio)
        width /= ratio
        height /= ratio
      } else {
        ratio = 1
      }
      canvas.width = width
      canvas.height = height
      //        铺底色
      ctx.fillStyle = '#fff'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      // 如果图片像素大于100万则使用瓦片绘制
      let count
      if ((count = width * height / 1000000) > 1) {
        console.log('超过100W像素')
        count = ~~(Math.sqrt(count) + 1) // 计算要分成多少块瓦片
        //            计算每块瓦片的宽和高
        let nw = ~~(width / count)
        let nh = ~~(height / count)
        tCanvas.width = nw
        tCanvas.height = nh
        for (let i = 0; i < count; i++) {
          for (let j = 0; j < count; j++) {
            tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh)
            ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh)
          }
        }
      } else {
        ctx.drawImage(img, 0, 0, width, height)
      }
      // 修复ios上传图片的时候 被旋转的问题
      if (Orientation !== '' && Orientation !== 1) {
        switch (Orientation) {
          case 6:// 需要顺时针（向左）90度旋转
            this.rotateImg(img, 'left', canvas)
            break
          case 8:// 需要逆时针（向右）90度旋转
            this.rotateImg(img, 'right', canvas)
            break
          case 3:// 需要180度旋转
            this.rotateImg(img, 'right', canvas)// 转两次
            this.rotateImg(img, 'right', canvas)
            break
        }
      }
      // 进行最小压缩
      let ndata = canvas.toDataURL('image/jpeg', 0.3)
      console.log('压缩前：' + initSize)
      console.log('压缩后：' + ndata.length)
      console.log('压缩率：' + ~~(100 * (initSize - ndata.length) / initSize) + '%')
      tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0
      return ndata
    }
  }
}
</script>
```
# H5+ 调出摄像头以及相册选择图片功能
* webapp在打包成App如果使用input==注意input无法做到多图上传==，只能调出相册而无法调出摄像头进行拍照，这是因为系统不支持采用此方法来调用设备的摄像头   ==此时我们可以采用 H5+ 做到调出摄像头和相册进行单图选择或者多图选择==
* 示例代码
  *  运用Button标签调用本机的摄像头及相册
  *  摄像头  ++entry.toLocalURL().replace('file://', '')++==此句十分重要，在获取本机路径时系统会默认给图片路径加上file://,若使用系统默认的图片路径则无法将此路径赋给<img>的src，<img>显示的图片为空，采用此方法可去掉file://使图片路径变成绝对路径后便可正确复制给<img>的src== 注意此方法在对接下来进行图片压缩也是必要的。

```
<template>
    <div>
        <button type="button" @click='getImage'></button>
    </div>
</template>

<script>
    methods: {
        export default {
            getImage () {
              let self = this
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
            }
        }
    }
</script>
```
* 示例代码
    * 本机相册进行多图和单张图片选择
    
```
<template>
    <div>
        <button type="button" @click='galleryImgs'></button>
    </div>
</template>

<script>
    export default {
        methods: {
            // 多图选择
            galleryImgs () {
              let self = this
              window.plus.gallery.pick(function (e) {
                for (var i in e.files) {
                  var name = e.files[i].substr(e.files[i].lastIndexOf('/') + 1)
                  self.compressImage(e.files[i].replace('file://', ''), name)
                }
              }, function (e) {
              }, {filter: 'image', multiple: true})
            }
            // 单张图片选择
            galleryImgs () {
              let self = this
              window.plus.gallery.pick(function (e) {
                  var name = e.substr(e.lastIndexOf('/') + 1)
                  self.compressImage(e.replace('file://', ''), name)
              }, function (e) {
              }, {filter: 'image'})
            }
        }
    }
</script>
```
* 对图片进行压缩并且转换为base64进行加密
  * 可采用H5 +给我们的压缩方法对图片进行压缩

```
<script>
    export default {
        methods: {
            showPics (url, name) {
              let self = this
              window.plus.io.resolveLocalFileSystemURL(url, function (entry) {
                entry.file(function (file) {
                  // 转换成 base64
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
    compressImage (url, filename) {
              let self = this
              var name = '_doc/' + filename
              window.plus.zip.compressImage({
                src: url, // src: (String 类型 )压缩转换原始图片的路径
                dst: name, // 压缩转换目标图片的路径
                quality: 20, // quality: (Number 类型 )压缩图片的质量.取值范围为1-100
                overwrite: true// overwrite: (Boolean 类型 )覆盖生成新文件
              },
              function (event) {
                // 页面显示图片
                self.showPics(event.target, name)
              }, function (error) {
                console.log(error)
              })
            }
        }
    }
</script>
```

==注意事项:==
### 这里主要讲打包工具不同需要做的工作也不太一样。我这边是用的Hbuilder在线打包，当然外壳也可以是Android环境打包，下面具体讲下要注意的地方
1. Hbuilder：这个是一个很方便的web开发工具，可以在线打包APP。【由于网络问题，我上传不了图片，尽量文字描述】我们需要在Hbuilder里面建一个APP项目，点开manifest.json文件，这个文件就是我们APP的配置信息，下面导航栏分别为：应用信息、图标配置、启动Flash配置、SDK配置、权限模块配置等。一般我们需要配下应用信息（APP的名字、入口），图标，启动flash(可以选择启动图片)，SDK配置一般是一些地图、支付、推送等。重点来了，我们如果使用HTML5+，需要在模块权限配置里面，选择我们用到的功能，比如我们用到了plus.nativeUI.*，就需要选择NativeUI(原生UI)模块，也就是说，我们用了plus.xx.*，就需要勾选相应的模块。【这个manifest.json是可视化界面，大家下载安装就能明白】
2. Android环境：相对Hbuilder，Android环境稍微复杂一点，由于我没有在Android环境里搞过这个，这里只是介绍下Hbuilder官网的一些使用说明。
举例说明：例如我们需要使用Camera对象，需要做如下配置：

    2.1：添加camera.jar。

    2.2：AndroidManifest.xml permission节点中添加：
    
        <uses-permission android:name="android.permission.CAMERA"/>
        <uses-feature android:name="android.hardware.camera"/>
    
    2.3：properties.xml features节点中添加：
    
               <featurename="Camera" value="io.dcloud.js.camera.CameraFeatureImpl"/>
    
    这个配置方式在Hbuilder的官网上可以下载，里面包含所有的jar包和不同的权限所需的配置。

