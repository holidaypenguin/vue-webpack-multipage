<template>
  <div class="ry-main">
    <transition name="fade">
      <!-- <keep-alive> -->
        <router-view></router-view>
      <!-- </keep-alive> -->
    </transition>
    <div class="ry-main-tabs">
      <router-link
        class="ry-main-tab ry-main-tab--list"
        tag="div"
        :to="{ name: 'list'}"
        active-class="ry-main-tab--active"
        replace>
        <div class="ry-main-tab-icon ry-main-tab-icon--list"></div>
        卡券首页
      </router-link>
      <router-link
        class="ry-main-tab ry-main-tab--my"
        tag="div"
        :to="{ name: 'my'}"
        active-class="ry-main-tab--active"
        replace>
        <div class="ry-main-tab-icon ry-main-tab-icon--my"></div>
        我的卡券
      </router-link>
    </div>
  </div>
</template>

<script src="./vm.js"></script>

<style lang="postcss">
  @import 'ryMain.postcss'
</style>
