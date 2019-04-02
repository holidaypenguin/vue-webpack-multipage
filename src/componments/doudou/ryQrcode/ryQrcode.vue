<template>
  <div class="ry-qrcode">
    <div :class="[
      'ry-qrcode-wrap',
      `ry-qrcode-wrap--s${codeSource}${isUn ? 'un' : codeStatus}`]">
      <div class="ry-qrcode-title">{{title}}</div>
      <div class="ry-qrcode-time">有效期：{{startAt}}-{{endAt}}</div>
      <div class="ry-qrcode-detail" v-if="!isUn">查看详情</div>
      <div class="ry-qrcode-detail ry-qrcode-detail--un" v-if="isUn">查看详情</div>
      <div class="ry-qrcode-split"></div>
      <template v-if="codeSource === 0">
        <div class="ry-qrcode-code">券码：{{codeFormate}}</div>
        <img class="ry-qrcode-qrcode" :src="qrCodeUrl" alt=""/>
        <img class="ry-qrcode-bar" :src="barCodeUrl" alt/>
        <div class="ry-qrcode-tips">请向收银员展示卡券码用于核销</div>
      </template>

      <template v-if="codeSource === 1">
        <div class="ry-qrcode-codetitle">券码</div>
        <div class="ry-qrcode-code2">{{codeStatusOpts[codeStatus] || codeFormate}}</div>
        <div class="ry-qrcode-tips">请向收银员展示卡券码用于核销</div>
      </template>
    </div>
    <div :class="['ry-qrcode-statu', `ry-qrcode-statu--s${codeStatus}`]"></div>
  </div>
</template>

<script src="./vm.js"></script>

<style lang="postcss">
  @import 'ryQrcode.postcss'
</style>
