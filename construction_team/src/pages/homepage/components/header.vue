<template>
    <div class="head">
        <div class="head-img">
            <img v-lazy="img" class="homedimg" lazy='loading'>
            <router-link :to="{name:'Personal'}">
                <img src="@/assets/imgs/zx5.png" width="28" class="personal">
            </router-link>
        </div>
        <center>
            <div class="head-text">
                {{name}}
            </div>
            <div class="company">
                {{company}}
            </div>
            <div class="data">
                <p><img src="@/assets/imgs/phone.png" width="20" style="margin-bottom:.05rem"> {{phone}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="@/assets/imgs/team.png" width="22" style="margin-bottom:.05rem"> 成员人数 : {{number}}</p>
            </div>
        </center>
    </div>
</template>

<script>
export default {
  data () {
    return {
      name: '',
      company: '',
      phone: '',
      number: '',
      img: ''
    }
  },
  activated () {
    this.getData()
  },
  methods: {
    getData () {
      const vm = this
      vm.$http.post('/constructionBuilderInfo')
        .then(res => {
          const team = res.data.data.constructionBuilder.team
          if (team === null || team === '') {
            vm.img = require('@/assets/imgs/head.png')
            vm.company = '暂无所属公司'
            vm.name = '暂无团队'
            vm.number = 0
          } else {
            if (team.logoImgurl === null || team.logoImgurl === '') {
              vm.img = require('@/assets/imgs/head.png')
            } else {
              vm.img = team.logoImgurl
            }
            vm.company = team.company.name
            vm.name = team.constructionTeamName
            vm.number = team.member.length
          }
          vm.phone = res.data.data.constructionBuilder.phone
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/theme.styl'
.head
  // background: $color
  background linear-gradient(-177deg, #3FAAB2 10%, #2CC0B3 95%)
  padding-bottom .2rem
  padding-top 22px
  .head-img
    display: flex
    margin: 0 auto
    width: 1.5rem
    .homedimg
     margin-top: .28rem
     border-radius: 50%
     background-color #ffffff
     border: 1px solid #fff
     width 100%
     height 75px
    .personal
     margin-top .1rem
     flex .3
     margin-left -webkit-calc(395% - .1rem)
  .head-text
    display: block
    margin-top: .15rem
    color: #fff
    font-size: 17px
  .company
    display: block
    width 70%
    text-align center
    line-height .4rem
    margin-top: .18rem
    font-size: 15px
    color: #393E46
  .data
    display: block
    margin-top: .25rem
    font-size: 15px
    color: #fff
</style>
