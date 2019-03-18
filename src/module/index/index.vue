
<template>
  <div id="app">
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>

export default {
  name: 'app',
  //  页面加载之前
  created () {
  },
  //  页面加载后
  mounted () {
    // console.log(this.$route)
    // 注册菜单和侧边栏分级事件
    // $(".button-collapse").sideNav();
    // $('.collapsible').collapsible();

    // //菜单列表点击隐藏
    // $('.menu-item').click(function () {
    //   $('#menu-list').sideNav('hide');
    // })
  },
}
</script>

<style>
  @n app{

    @b aaaa{
      height: 100px; /*no*/

      @e fff{
        overflow: hidden;

        @m sef{
          font-size: 12px;
        }
      }
    }
  }

  /*侧边栏头部背景*/
  .side-nav .userView .background img {
    width: 100%;
  }

  /*导航名字*/
  .nav-name {
    margin: 0 15px;
    padding:0;
    font-size: 16px;
  }

  /*右侧导航栏图标*/
  .nav-wrapper .right li a i{
    padding: 0;
    margin: 0;
    font-size: 16px;
  }
  /*右侧导航栏文字*/
  .nav-wrapper .right li a span{
    margin-left: 8px;
  }

  /*为大屏幕的侧边栏提供空间*/
  header, main, footer {
    padding-left: 300px;
  }

  /*主干区域*/
  main {
    position: fixed;
    width: 100%;
    height: calc(100% - 64px);
    z-index: -1;
  }

  @media only screen and (max-width : 992px) {
    header, main, footer {
      padding-left: 0;
    }
  }
</style>
