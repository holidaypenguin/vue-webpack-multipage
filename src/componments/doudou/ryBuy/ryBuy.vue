<template>
  <div class="ry-buy">
    <div class="ry-buy-top">
      <img class="ry-buy-image" src="https://www.holidaypenguin.com/images/css/028.png" alt="">
      <div class="ry-buy-main">
        <div class="ry-buy-title">宝贝豆美术课程500元代金券</div>
        <div class="ry-buy-money">￥500.00</div>
        <div class="ry-buy-old">原价￥510.00</div>
        <div class="ry-buy-num-wrap">
          <div class="ry-buy-num-mini">-</div>
          <div class="ry-buy-num-el">1</div>
          <div class="ry-buy-num-add">+</div>
        </div>
      </div>
    </div>

    <div class="ry-buy-other">
      <div class="ry-buy-other-title">优惠说明</div>
      <div class="ry-buy-other-line">
        <div class="ry-buy-other-left">使用须知</div>
        <div class="ry-buy-other-right">
          1.该电子券仅可在上海宝山万达店和上海虹口嘉杰店使用。<br>
          2.该电子券不可兑换现金，仅限课程报名时使用。<br>
          3.该电子券每次使用只能一张。<br>
          4.该电子券于2019年2月25日开始使用，有效期至：2019年7月31日。须在有效期内使用，过期作废。<br>
          友情提示：宝贝豆门店将于2019年1月28日至2019年2月24日休假，请于2019年2月25日起前往使用。<br>
        </div>
      </div>
      <div class="ry-buy-other-line">
        <div class="ry-buy-other-left">适用门店</div>
        <div class="ry-buy-other-right">
          <div class="ry-buy-other-shop" @click="transShop">查看适用门店</div>
        </div>
      </div>
    </div>

    <div class="ry-buy-other">
      <div class="ry-buy-other-title">订单详情</div>
      <div class="ry-buy-other-line">
        <div class="ry-buy-other-left">
          订单号：<br>
          支付时间：<br>
          订单金额：<br>
          实付金额：<br>
          优惠券：<br>
          工行积分：<br>
        </div>
        <div class="ry-buy-other-right">
            201901302938MDIE0<br>
            2019-01-30 13:21:18<br>
            500.00<br>
            450.00<br>
            20.00<br>
            30.00<br>
        </div>
      </div>
    </div>

    <div class="ry-buy-bottom">
      <div class="ry-buy-bottom-left">
        <span>合计：</span>
        <span class="ry-buy-bottom-left--money">¥1000</span>
      </div>
      <div class="ry-buy-bottom-right ry-button-main">支付</div>
    </div>

    <div :class="['ry-buy-shop', showShop ? 'ry-buy-shop--show' : '']">
      <div :class="['ry-buy-shop-wrap', showShop ? 'ry-buy-shop-wrap--show' : '']">
        <div class="ry-buy-shop-head">
          适用门店
          <div class="ry-buy-shop-close scale15" @click="transShop"></div>
        </div>
        <div class="ry-buy-shop-list">
          <div class="ry-buy-shop-item">
            <div class="ry-buy-shop-name">宝贝豆（石泉店）</div>
            <div class="ry-buy-shop-addr">上海市普陀区石泉路220号</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./vm.js"></script>

<style lang="postcss" scoped>
  @import './ryBuy.postcss';
</style>
