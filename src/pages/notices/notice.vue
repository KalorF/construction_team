<template>
    <div class="notice-box">
        <van-nav-bar
        title="注意事项"
        left-arrow
        fixed
        @click-left="onClickLeft"
        />
        <div class="detail-box">
            <div class="title">施工须知</div>
            <div class="content">
                <p>1. 施工队应该先在平台完成照片身份等各种认证</p>
                <p>2. 施工队应该配合业主进行人脸识别，确定身份(若业主忘记，主动提醒，一定要先完成人脸识别这个动作)</p>
                <p>3. 施工队初检，复检结束后都应该及时上传检测数据以及现场图片，除醛施工结束后应上上传是施工现场图片(主要针对检测点以及施工点进行上传)</p>
                <p>4. 若用户有意进行除醛服务，与业主协商好价格后上传此单施工价格</p>
                <p>5. 施工之前应该穿戴工作服，提前与业主做好充分沟通(看到订单之后主动联系用户进行信息确认)</p>
            </div>
            <div class="content-img">
                <img src="@/assets/imgs/sg.png" width="100%" height="200">
            </div>
            <div class="content">
                <p>6. 在施工过程中注意防护业主家具，尽量避免损业主家的物品</p>
                <p>7. 在施工之前要注意材料</p>
                <p>8. 在施工的过程中注意前后细节，如家具的一些缝隙之处等</p>
                <p>9. 施工过程中注意前后沟通和人员安排</p>
                <p>10. 在整个施工过程中要做到专业除醛，保证业主家甲醛除醛干净</p>
                <p>11. 除醛完成后为业主收拾好房子，联系完业主确定后才可离开，在整个过程中应该做到面带微笑，为业主提供最真诚的服务</p>
                <p>12. 若有事无法接单，请提前联系后台或者公司</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  methods: {
    onClickLeft () {
      this.$router.replace({path: '/'})
    }
  }
}
</script>

<style lang="stylus" scoped>
.notice-box
 background-color: #fcfcfc
 height: 100vh
 .detail-box
   width:88%
   margin: 1.5rem auto .3rem auto
   .title
     font-size: 20px
     margin-top: .4rem
     border-bottom: .1px solid #ccc
     padding-bottom: .2rem
     padding-left: .1rem
   .content
     margin-top: .2rem
     padding-left: .1rem
     width: 100%
     font-size: 15px
     line-height: .5rem
     color: #393E46
   .content-img
     margin-top: .2rem
</style>
