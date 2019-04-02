<template>
  <div class="ry-result">

    <div class="ry-result--success">
      <div class="ry-result-icon ry-result-icon--success"></div>
      <div class="ry-result-title">支付成功</div>

      <div class="ry-result-coupon">
        <div class="ry-result-left">
          <img class="ry-result-left-image" :src="detail.src"/>
        </div>
        <div class="ry-result-middle">
          <div class="ry-result-middle-split"></div>
        </div>
        <div class="ry-result-right">
          <div class="ry-result-title">舟山一卡通10000元电子卡券</div>
          <div class="ry-result-time">有效期：2018.07.20-2018.10.02</div>
        </div>
      </div>

      <div class="ry-result-button">
        <div class="ry-result-button-return ry-button-minor">返回</div>
        <div class="ry-result-button-go ry-button-main">去使用</div>
      </div>
    </div>

    <div class="ry-result-error">
      <div class="ry-result-icon ry-result-icon--error"></div>
      <div class="ry-result-title">支付失败</div>

      <div class="ry-result-result">
        提示：失败原因
      </div>

      <div class="ry-result-button">
        <div class="ry-result-button-go ry-button-main">去使用</div>
      </div>
    </div>
  </div>
</template>

<script src="./vm.js"></script>

<style lang="postcss" scoped>
  @import './ryResult.postcss';
</style>
