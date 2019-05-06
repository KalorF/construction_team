<template>
  <div class="view-order-detail-box">
    <van-nav-bar title="订单详情" left-arrow @click-left="$router.goBack" fixed/>
    <div class="order-box">
      <img src="@/assets/imgs/user.png" width="25" height="25" class="thisImg">
      <div class="order-name">客户姓名: 程小易</div>
    </div>
    <div class="phone-box">
      <img src="@/assets/imgs/tel.png" width="25" height="25" class="thisImg">
      <div class="order-name">客户电话: 13456789130</div>
    </div>
    <!-- 订单详情 -->
    <div class="order-data">
      <div class="data-head">
        <img src="@/assets/imgs/order.png" width="25" height="25" class="thisImg">
        <div class="data-text">订单信息</div>
        <img src="@/assets/imgs/bot.png" width="20" height="18" class="thisImgSecd">
      </div>
      <div class="line"></div>
      <div class="data">
        <div class="arer">
          <p>施工面积</p>
          <p>100 m²</p>
        </div>
        <div class="order-time">
          <p>下单时间</p>
          <p>2018-03-13 03:40:44</p>
        </div>
      </div>
      <div class="address">
        <div>地址:</div>
        <p>第哦啊圣诞节奥克兰的温热炯违反为了人民大大撒大师傅大师傅大师傅</p>
      </div>
      <div class="prize">
        <div>
          价格:
          <span>3000</span> (元)
        </div>
      </div>
    </div>
    <!-- 报告 -->
    <div class="report-box" @click="viewreport">
      <img src="@/assets/imgs/report.png" width="25" height="23">
      <div>&nbsp; 初测报告</div>
      <img src="@/assets/imgs/right.png" width="20" height="20" class="rigth-img">
    </div>
  </div>
</template>

<script>
export default {
  name: 'orderDetail',
  data () {
    return {}
  },
  methods: {
    viewreport () {
      this.$router.push({ path: '/viewFirst' })
    }
  }
}
</script>

<style lang="stylus" scoped>
.view-order-detail-box {
  height: 100vh;
  background-color: #F5F7FA;

  .order-box {
    margin-top: 0.98rem;
    height: 7vh;
    line-height: 7vh;
    vertical-align: middle;
    background-color: #ffffff;
    display: flex;
    flex-direction: row;

    .thisImg {
      margin-left: 0.3rem;
      margin-top: auto;
      margin-bottom: auto;
    }

    .order-name {
      margin-left: 0.16rem;
      font-size: 16px;
    }
  }

  .phone-box {
    margin-top: 0.2rem;
    height: 7vh;
    line-height: 7vh;
    vertical-align: middle;
    background-color: #ffffff;
    display: flex;
    flex-direction: row;

    .thisImg {
      margin-left: 0.3rem;
      margin-top: auto;
      margin-bottom: auto;
    }

    .order-name {
      margin-left: 0.16rem;
      font-size: 16px;
    }
  }

  .order-data {
    background-color: #ffffff;
    margin-top: 0.2rem;
    padding-bottom: 0.7rem;

    .data-head {
      display: flex;
      flex-direction: row;
      padding-top: 0.16rem;
      margin-bottom: 0.1rem;

      .thisImg {
        margin-left: 0.3rem;
        margin-top: auto;
        margin-bottom: auto;
      }

      .data-text {
        margin-left: 0.16rem;
        margin-top: 0.12rem;
        font-size: 16px;
      }

      .thisImgSecd {
        display: block;
        margin-top: 0.1rem;
        margin-left: -webkit-calc(100% - 3rem);
      }
    }

    .line {
      height: 1px;
      width: 93%;
      background-color: #eeeeee;
      margin-left: auto;
      margin-right: auto;
    }

    .data {
      display: flex;
      flex-direction: row;
      margin-top: 0.3rem;
      border-bottom: 1px solid #eeeeee;
      padding-bottom: 0.3rem;

      .arer {
        width: 50%;
        text-align: center;
        border-right: 1px solid #eeeeee;

        p:nth-child(1) {
          font-size: 16px;
          color: #515151;
        }

        p:nth-child(2) {
          margin-top: 0.2rem;
          color: #949494;
          font-size: 15px;
        }
      }

      .order-time {
        width: 50%;
        text-align: center;

        p:nth-child(1) {
          font-size: 16px;
          color: #515151;
        }

        p:nth-child(2) {
          margin-top: 0.2rem;
          color: #949494;
          font-size: 15px;
        }
      }
    }

    .address {
      display: flex;
      flex-direction: row;
      padding-left: 0.3rem;
      padding-right: 0.2rem;
      margin-top: 0.2rem;
      padding-bottom: 0.27rem;
      border-bottom: 1px solid #eeeeee;

      div {
        border-left: 3px solid #28cc75;
        padding-left: 0.1rem;
        height: 0.25rem;
        width: 1rem;
        color: #5e5e5e;
      }

      p {
        color: #5e5e5e;
        line-height: 0.34rem;
      }
    }

    .prize {
      float: right;
      margin-top: 0.2rem;
      margin-right: 0.3rem;

      div {
        font-size: 16px;

        span {
          color: #E8222D;
          font-size: 17px;
        }
      }
    }
  }

  .report-box {
    margin-top: 0.2rem;
    height: 7vh;
    line-height: 7vh;
    display: flex;
    flex-direction: row;
    background-color: #ffffff;

    div {
      text-align: center;
      font-size: 16px;
      margin-top: 1px;
    }

    img:nth-child(1) {
      margin-left: 0.27rem;
      margin-top: auto;
      margin-bottom: auto;
    }

    .rigth-img {
      margin-left: -webkit-calc(100% - 2.8rem);
      margin-top: auto;
      margin-bottom: auto;
    }
  }
}
</style>
