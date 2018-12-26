<template>
    <div class="wallet-box">
        <van-nav-bar
        title="钱包"
        left-arrow
        @click-left="onClickLeft"
        />
        <wallet-head :money='allmoney'></wallet-head>
        <div class="content">
        <wallet-center :list='successOrder' :money='successMoney'></wallet-center>
        <wallet-foot :list2='failOrder' :money2='failMoney'></wallet-foot>
        </div>
    </div>
</template>

<script>
import WalletCenter from '@/pages/walletpage/components/center'
import WalletHead from '@/pages/walletpage/components/head'
import WalletFoot from '@/pages/walletpage/components/foot'
export default {
  components: {
    WalletHead,
    WalletCenter,
    WalletFoot
  },
  data () {
    return {
      successMoney: '',
      successOrder: [],
      failMoney: '',
      failOrder: [],
      allmoney: ''
    }
  },
  activated () {
    this.getData()
  },
  beforeRouteLeave (to, from, next) {
    this.$destroy()
    next()
  },
  methods: {
    onClickLeft () {
      this.$router.replace({path: '/'})
    },
    getData () {
      const vm = this
      vm.$http.post('/ConstructionBuilderAppControllerLxb/TeamWallet')
        .then(res => {
          vm.successMoney = res.data.data.successMoney
          vm.successOrder = res.data.data.successOrder
          vm.failMoney = res.data.data.failMoney
          vm.failOrder = res.data.data.failOrder
          vm.allmoney = parseFloat(vm.failMoney) + parseFloat(vm.successMoney)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }

}
</script>

<style lang="stylus" scoped>
.wallet-box
  height: 100vh
  background-color: #F5F7FA
  .content
    background-color #F5F7FA
</style>
